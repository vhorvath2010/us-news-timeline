const timelineData = [
  {
    id: "2024-03-05",
    dateLabel: "Mar 5, 2024",
    weekday: "Tuesday",
    descriptor: "Super Tuesday",
    topHeadline: "Super Tuesday cements a Biden–Trump rematch",
    snippet: "Fifteen nominating contests delivered decisive delegate hauls for both campaigns.",
    lead:
      "Voters in 15 states handed sweeping victories to President Biden and former President Trump, effectively locking in a general-election rematch and shrinking the field of alternatives.",
    events: [
      {
        title: "Biden sweeps every Democratic contest but American Samoa",
        summary:
          "The president dominated the Super Tuesday map, reinforcing party backing even as long-shot protest votes continued to register.",
        source: "Associated Press",
        url: "https://apnews.com/article/super-tuesday-primary-results-2024-biden-trump-50b57cc0f03ce3c778f73611984ea87d",
      },
      {
        title: "Trump romps across GOP field, Haley takes Vermont",
        summary:
          "Donald Trump netted commanding victories in the Republican primaries, while Nikki Haley notched an upset win in Vermont but suspended her campaign the next day.",
        source: "New York Times",
        url: "https://www.nytimes.com/live/2024/03/05/us/super-tuesday-results",
      },
      {
        title: "Democrats eye turnout warning signs",
        summary:
          "Strategists flagged underwhelming primary participation in key swing states, worrying about enthusiasm in November.",
        source: "NBC News",
        url: "https://www.nbcnews.com/politics/2024-election/super-tuesday-turnout-warning-signs-rcna141808",
      },
    ],
  },
  {
    id: "2024-02-13",
    dateLabel: "Feb 13, 2024",
    weekday: "Tuesday",
    descriptor: "Border & Aid Deal",
    topHeadline: "Senate passes bipartisan border and foreign aid package",
    snippet: "A rare cross-party coalition advanced funding for Ukraine, Israel, and Indo-Pacific allies.",
    lead:
      "After days of procedural hurdles, the Senate approved a $95 billion security package that pairs overseas aid with modest border enforcement adjustments, setting up a clash with House Republicans.",
    events: [
      {
        title: "Senate moves $95B aid bill with 70-29 vote",
        summary:
          "The supplemental includes support for Ukraine, Israel, and Taiwan alongside humanitarian funding.",
        source: "Reuters",
        url: "https://www.reuters.com/world/us/us-senate-vote-ukraine-aid-bill-after-clearing-procedural-hurdles-2024-02-12/",
      },
      {
        title: "House conservatives vow to block the package",
        summary:
          "Speaker Mike Johnson signaled the bill was 'dead on arrival,' citing insufficient US border changes.",
        source: "Politico",
        url: "https://www.politico.com/live-updates/2024/02/13/congress/senate-foreign-aid-package-00141075",
      },
      {
        title: "Biden urges House to act quickly",
        summary:
          "The White House warned that Ukraine's front lines risk collapse without immediate congressional action.",
        source: "Washington Post",
        url: "https://www.washingtonpost.com/politics/2024/02/13/senate-foreign-aid-package/",
      },
    ],
  },
  {
    id: "2024-01-15",
    dateLabel: "Jan 15, 2024",
    weekday: "Monday",
    descriptor: "Iowa Caucuses",
    topHeadline: "Trump wins Iowa GOP caucuses in a landslide",
    snippet: "The former president set a modern record for a non-incumbent in the opening contest.",
    lead:
      "Braving subzero temperatures, Iowa Republicans delivered Donald Trump a 30-point margin over Ron DeSantis and Nikki Haley, underscoring his dominance heading into New Hampshire.",
    events: [
      {
        title: "Trump captures 51% of the caucus vote",
        summary:
          "He cleared the 50% threshold for the first time in modern Iowa GOP history for a non-incumbent.",
        source: "Des Moines Register",
        url: "https://www.desmoinesregister.com/story/news/elections/2024/01/16/iowa-caucus-results-2024-republican-trump-winner/72166502007/",
      },
      {
        title: "DeSantis edges Haley for second",
        summary:
          "Florida's governor argued his runner-up finish keeps him viable, though the path forward remains narrow.",
        source: "CNN",
        url: "https://www.cnn.com/2024/01/15/politics/iowa-caucus-results-republicans/index.html",
      },
      {
        title: "Democrats run mail-in 'caucus'",
        summary:
          "State Democrats shifted to mostly absentee participation with results delayed until Super Tuesday.",
        source: "USA Today",
        url: "https://www.usatoday.com/story/news/politics/elections/2024/01/15/iowa-democratic-caucus-2024-mail-in/72160167007/",
      },
    ],
  },
  {
    id: "2023-12-19",
    dateLabel: "Dec 19, 2023",
    weekday: "Tuesday",
    descriptor: "Ballot Access",
    topHeadline: "Colorado Supreme Court removes Trump from 2024 ballot",
    snippet: "A first-of-its-kind ruling applied the 14th Amendment insurrection clause to a presidential candidate.",
    lead:
      "In a 4-3 decision, Colorado's high court found Donald Trump engaged in insurrection on January 6, ordering the secretary of state to exclude him from the Republican primary ballot, a decision immediately appealed.",
    events: [
      {
        title: "Majority cites Section 3 of the 14th Amendment",
        summary:
          "The court concluded that the former president's efforts to overturn the 2020 election triggered the Civil War-era disqualification clause.",
        source: "Colorado Supreme Court",
        url: "https://www.courts.state.co.us/userfiles/file/Court_Probation/Supreme_Court/Opinions/2023/23SA300.pdf",
      },
      {
        title: "Trump campaign vows swift appeal",
        summary:
          "Campaign lawyers said the U.S. Supreme Court must settle the question to avoid electoral chaos.",
        source: "Axios",
        url: "https://www.axios.com/2023/12/19/donald-trump-colorado-ballot-appeal",
      },
      {
        title: "Other states watch closely",
        summary:
          "Activist groups pursued similar lawsuits nationwide, though most had been rejected before Colorado's breakthrough.",
        source: "The Hill",
        url: "https://thehill.com/homenews/campaign/4383046-colorado-trump-ballot-removal-reaction/",
      },
    ],
  },
  {
    id: "2023-11-07",
    dateLabel: "Nov 7, 2023",
    weekday: "Tuesday",
    descriptor: "Off-Year Elections",
    topHeadline: "Ohio voters enshrine abortion rights in state constitution",
    snippet: "Reproductive rights advocates secured a decisive win viewed as a bellwether for 2024 races.",
    lead:
      "Ohioans approved Issue 1 with nearly 57% support, continuing a streak of post-Dobbs victories for abortion-rights campaigns even in Republican-leaning states.",
    events: [
      {
        title: "Issue 1 passes with a 13-point margin",
        summary:
          "The amendment protects access to abortion up to viability and allows post-viability exceptions for patient health.",
        source: "Cleveland.com",
        url: "https://www.cleveland.com/news/2023/11/issue-1-results-ohio-voters-approve-abortion-rights-amendment.html",
      },
      {
        title: "DeWine says lawmakers must respect the vote",
        summary:
          "Ohio's Republican governor acknowledged the outcome while hinting at future regulatory tweaks.",
        source: "Columbus Dispatch",
        url: "https://www.dispatch.com/story/news/politics/2023/11/07/ohio-abortion-rights-election-results-governor-dewine-reacts/71390969007/",
      },
      {
        title: "Democrats net wins in other key races",
        summary:
          "Kentucky's governor held on, Democrats flipped Virginia's House of Delegates, and Pennsylvania retained a liberal supreme court majority.",
        source: "Guardian",
        url: "https://www.theguardian.com/us-news/2023/nov/08/us-elections-results-democrats-abortion-rights",
      },
    ],
  },
];

const timelineSequence = [...timelineData].sort((a, b) => a.id.localeCompare(b.id));

const timelineContainer = document.getElementById("timeline");
const detailsPanel = document.getElementById("details-panel");

let activeButton = null;

const formatMetaLine = (day) => {
  if (!day.weekday && !day.descriptor) {
    return "";
  }
  if (day.weekday && day.descriptor) {
    return `${day.weekday} · ${day.descriptor}`;
  }
  return day.weekday || day.descriptor || "";
};

const renderDetails = (day) => {
  const meta = formatMetaLine(day);

  const eventsMarkup = day.events
    .map(
      (event) => `
        <article class="event-card">
          <h3>${event.title}</h3>
          <p>${event.summary}</p>
          <a href="${event.url}" target="_blank" rel="noopener noreferrer">
            View source · ${event.source}
          </a>
        </article>
      `
    )
    .join("");

  detailsPanel.innerHTML = `
    <div class="day-header">
      <h2>${day.topHeadline}</h2>
      ${meta ? `<span>${meta}</span>` : ""}
    </div>
    <p class="lead">${day.lead}</p>
    <div class="event-list">
      ${eventsMarkup}
    </div>
  `;
};

const handleDaySelect = (day, button) => {
  if (activeButton) {
    activeButton.classList.remove("is-active");
    activeButton.setAttribute("aria-pressed", "false");
  }

  activeButton = button;
  activeButton.classList.add("is-active");
  activeButton.setAttribute("aria-pressed", "true");

  renderDetails(day);
};

const renderTimeline = () => {
  let initialButton = null;

  timelineSequence.forEach((day, index) => {
    const isNewest = index === timelineSequence.length - 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "timeline-node";
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-pressed", isNewest ? "true" : "false");
    button.dataset.dayId = day.id;
    button.innerHTML = `
      <span class=\"date\">${day.dateLabel}</span>
      <div class=\"headline\">${day.topHeadline}</div>
      <p class=\"summary\">${day.snippet}</p>
    `;

    button.addEventListener("click", () => {
      handleDaySelect(day, button);
      button.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });

    timelineContainer.appendChild(button);

    if (isNewest) {
      initialButton = button;
    }
  });

  if (initialButton) {
    handleDaySelect(timelineSequence[timelineSequence.length - 1], initialButton);
  }
};

renderTimeline();
