/*
  Daily news ingester for US politics.
  - Aggregates from multiple RSS feeds
  - Builds a timeline entry for the previous calendar day (America/New_York)
  - Appends to timeline-data.json if the day is missing

  Usage: node scripts/generate-daily-news.js
*/

const fs = require('fs/promises');
const path = require('path');
const Parser = require('rss-parser');

const parser = new Parser({ timeout: 15000 });

const FEEDS = [
  // Broad, reputable U.S. politics RSS feeds
  'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
  'https://feeds.nbcnews.com/nbcnews/public/politics',
];

const MAX_EVENTS = Number(process.env.NEWS_MAX_EVENTS || 3);
const TIMELINE_FILE = path.join(process.cwd(), 'timeline-data.json');

function getEasternParts(date) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map(p => [p.type, p.value]));
  return { year: Number(parts.year), month: Number(parts.month), day: Number(parts.day) };
}

function getYesterdayEastern() {
  const now = new Date();
  const todayParts = getEasternParts(now);
  // Construct a stable UTC date from Eastern today parts, then subtract 1 day
  const todayUtcFromEastern = new Date(Date.UTC(todayParts.year, todayParts.month - 1, todayParts.day, 12));
  const yestUtc = new Date(todayUtcFromEastern.getTime() - 24 * 60 * 60 * 1000);
  const yestParts = getEasternParts(yestUtc);
  // Build a stable date for formatting weekday (noon UTC to avoid boundary issues)
  const yestMiddayUtc = new Date(Date.UTC(yestParts.year, yestParts.month - 1, yestParts.day, 12));
  return { parts: yestParts, dateForWeekday: yestMiddayUtc };
}

function formatDateLabelFromParts(parts) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parts.month - 1]} ${parts.day}, ${parts.year}`;
}

function formatWeekdayFromDate(date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(date);
}

function toIdFromParts(parts) {
  const y = parts.year;
  const m = String(parts.month).padStart(2, '0');
  const d = String(parts.day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function stripHtml(input) {
  if (!input) return '';
  return String(input)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(input, maxLen) {
  if (!input) return '';
  if (input.length <= maxLen) return input;
  return input.slice(0, maxLen - 1).trimEnd() + '…';
}

function normalizeHostname(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return 'Unknown';
  }
}

function isSafeHttpUrl(urlString) {
  try {
    const u = new URL(urlString);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    if (!u.hostname) return false;
    return true;
  } catch {
    return false;
  }
}

function friendlySourceName(url) {
  const host = normalizeHostname(url);
  const map = {
    'nytimes.com': 'New York Times',
    'cnn.com': 'CNN',
    'nbcnews.com': 'NBC News',
    'thehill.com': 'The Hill',
  };
  return map[host] || host;
}

function sameDayEastern(a, b) {
  const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
  const pa = Object.fromEntries(fmt.formatToParts(a).map(p => [p.type, p.value]));
  const pb = Object.fromEntries(fmt.formatToParts(b).map(p => [p.type, p.value]));
  return pa.year === pb.year && pa.month === pb.month && pa.day === pb.day;
}

async function fetchAllFeedItems() {
  const results = await Promise.allSettled(FEEDS.map(u => parser.parseURL(u)));
  const items = [];
  for (const r of results) {
    if (r.status !== 'fulfilled' || !r.value?.items) continue;
    for (const item of r.value.items) {
      const link = item.link || item.guid || '';
      const title = stripHtml(item.title || '');
      const description = stripHtml(item.contentSnippet || item.content || item.summary || '');
      const pubDate = item.isoDate ? new Date(item.isoDate) : item.pubDate ? new Date(item.pubDate) : null;
      if (!link || !isSafeHttpUrl(link)) continue;
      if (!title || !pubDate || Number.isNaN(pubDate.getTime())) continue;
      items.push({ link, title, description, pubDate });
    }
  }
  return items;
}

function pickTopForYesterday(allItems, targetDateEastern) {
  const yItems = allItems.filter(i => sameDayEastern(i.pubDate, targetDateEastern));
  // Sort by recency
  yItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  // Deduplicate by normalized URL and title
  const seen = new Set();
  const picked = [];
  for (const item of yItems) {
    const key = normalizeHostname(item.link) + '|' + item.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(item);
    if (picked.length >= MAX_EVENTS) break;
  }
  return picked;
}

function buildTimelineEntry(partsEastern, dateForWeekday, items) {
  const id = toIdFromParts(partsEastern);
  const dateLabel = formatDateLabelFromParts(partsEastern);
  const weekday = formatWeekdayFromDate(dateForWeekday);

  const top = items[0];
  const topHeadline = top ? truncate(top.title, 120) : 'Top U.S. political stories';
  const snippet = top ? truncate(top.description || top.title, 160) : 'Automated daily summary of notable U.S. political news.';
  const lead = top ? truncate(top.description || top.title, 280) : 'This entry aggregates notable political developments from major U.S. outlets.';

  const events = items.map(i => ({
    title: truncate(i.title, 120),
    summary: truncate(i.description || i.title, 200),
    source: friendlySourceName(i.link),
    url: i.link,
  }));

  return {
    id,
    dateLabel,
    weekday,
    descriptor: 'Top Stories',
    topHeadline,
    snippet,
    lead,
    events,
  };
}

async function readTimeline() {
  try {
    const raw = await fs.readFile(TIMELINE_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('timeline-data.json is not an array');
    return data;
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeTimeline(data) {
  const json = JSON.stringify(data, null, 2) + '\n';
  await fs.writeFile(TIMELINE_FILE, json, 'utf8');
}

async function main() {
  const { parts: yParts, dateForWeekday } = getYesterdayEastern();
  const id = toIdFromParts(yParts);

  const timeline = await readTimeline();
  const exists = timeline.some(d => d && d.id === id);
  if (exists) {
    console.log(`[info] Entry for ${id} already exists. No changes.`);
    console.log('[done] Finished daily news generation.');
    setImmediate(() => process.exit(0));
    return;
  }

  console.log('[info] Fetching RSS feeds…');
  const allItems = await fetchAllFeedItems();
  const picked = pickTopForYesterday(allItems, dateForWeekday);

  if (picked.length === 0) {
    console.log('[warn] No items found for yesterday. No changes.');
    console.log('[done] Finished daily news generation.');
    setImmediate(() => process.exit(0));
    return;
  }

  const entry = buildTimelineEntry(yParts, dateForWeekday, picked);
  const updated = [...timeline, entry];

  // Keep file deterministic: sort by id ascending (app also sorts on load, but we keep data tidy)
  updated.sort((a, b) => String(a.id).localeCompare(String(b.id)));

  await writeTimeline(updated);
  console.log(`[info] Added entry for ${id} with ${picked.length} event(s).`);
  console.log('[done] Finished daily news generation.');
  setImmediate(() => process.exit(0));
}

main().catch(err => {
  console.error('[error] Failed to generate daily news:', err);
  process.exitCode = 1;
});


