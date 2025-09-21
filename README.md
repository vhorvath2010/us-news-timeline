## US Political News Timeline

A static, client-side timeline that aggregates major US political news each day and presents them in a horizontally scrollable UI. A scheduled workflow ingests stories daily and opens a pull request with the new data for review.

### What this project does
- Renders a timeline of days from `timeline-data.json`
- Shows a detail panel with the top headline and a few key stories for the selected day
- Runs a daily GitHub Actions workflow that aggregates the current day's top US politics stories from multiple RSS feeds and proposes a PR updating `timeline-data.json`

## Project structure
- `index.html` — Static page shell and markup
- `styles.css` — Visual styles and layout
- `app.js` — Loads `timeline-data.json`, sorts days, renders timeline and detail panel
- `timeline-data.json` — Source of truth for all timeline days (array of day objects)
- `scripts/generate-daily-news.js` — Node script that aggregates stories and appends a new day entry
- `.github/workflows/daily-news.yml` — Daily workflow that runs the ingester and opens a PR
- `package.json` — Dependency on `rss-parser` and npm scripts

## Data model (`timeline-data.json`)
Each entry in the array is a day object:

```json
{
  "id": "2025-09-20",
  "dateLabel": "Sep 20, 2025",
  "weekday": "Saturday",
  "descriptor": "Top Stories",
  "topHeadline": "Short headline for the day",
  "snippet": "One-line teaser used in the timeline card",
  "lead": "A slightly longer lead used in the details panel",
  "events": [
    {
      "title": "Story title",
      "summary": "Brief description of the story",
      "source": "Publisher name",
      "url": "https://example.com/story"
    }
  ]
}
```

Notes:
- `id` must be `YYYY-MM-DD` and unique
- The UI sorts by `id` ascending and auto-selects the newest day on load

## How the UI works
- `app.js` fetches `timeline-data.json` and sorts the days by `id`
- A scrollable row of buttons is rendered; clicking a day updates the details panel
- The details panel shows `topHeadline`, a meta line of `weekday | descriptor`, the `lead`, and event cards
- External links use `target="_blank" rel="noopener noreferrer"`

## Daily ingestion workflow

### What it does
The Node script `scripts/generate-daily-news.js`:
- Collects US politics items from multiple RSS feeds (e.g., Reuters, NYT, CNN, NBC)
- Filters stories to the current calendar day in America/New_York (Eastern Time)
- Sorts by recency, deduplicates across feeds by hostname + title, and picks the top N items (default 3)
- Builds a new day entry and appends it to `timeline-data.json` (keeps array sorted by `id`)
- Prints a final `[done]` log line and exits

### GitHub Actions schedule
- Workflow: `.github/workflows/daily-news.yml`
- Runs daily at about 10:15pm Eastern (02:15 UTC; DST-aware timing varies)
- If a new entry is generated, it commits the change and opens a PR titled “Automated daily news update”

### Configuration
- `NEWS_MAX_EVENTS` — Maximum number of items to include per day (default: 3)

## Local development

### Prerequisites
- Node.js 20+

### Install
```bash
npm install
```

### Generate today’s entry locally
```bash
node scripts/generate-daily-news.js
```

Expected outcomes:
- If today’s entry is missing: `[info] Added entry for YYYY-MM-DD …` then `[done] …`
- If it exists already: `[info] Entry for YYYY-MM-DD already exists. No changes.` then `[done] …`
- If no stories matched today: `[warn] No items found for today. No changes.` then `[done] …`

### Preview the site
Serve the folder with any static server, e.g.:
```bash
npx http-server -p 5173 -c-1
# open http://localhost:5173
```

### Reverting local test data
```bash
git restore --source=HEAD -- timeline-data.json
```

## Security notes
- The workflow uses least-privilege permissions at the job level and a concurrency group to avoid overlapping runs
- Checkout is shallow with credentials not persisted; Node version is pinned
- The ingester only accepts `http/https` URLs and strips HTML; items are de-duplicated
- PRs are limited to changes in `timeline-data.json`

Recommended hardening (optional):
- Pin action references by full commit SHA
- Require approval for outside contributor workflows in repository settings
- Enable Dependabot security updates and secret scanning

## Roadmap / Backfill (optional)
- Short backfill: add a date override/range to regenerate entries for recent days
- Longer history: use publisher APIs, sitemaps, or an aggregator (e.g., GDELT) with filtering

## Troubleshooting
- “No items found for today”: Feeds may be slow to publish or don’t include politics stories matching filters; try later
- “Entry already exists”: The day is already present in `timeline-data.json`
- Strange characters: All separators are plain ASCII (`|`), and HTML is stripped before writing

## License
MIT (or your preferred license). Replace this line if you choose a different license.


