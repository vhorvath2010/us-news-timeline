let timelineData = [];
let timelineSequence = [];

const timelineContainer = document.getElementById("timeline");
const detailsPanel = document.getElementById("details-panel");

let activeButton = null;

// Load timeline data from JSON file
const loadTimelineData = async () => {
  try {
    const response = await fetch('./timeline-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    timelineData = await response.json();
    timelineSequence = [...timelineData].sort((a, b) => a.id.localeCompare(b.id));
  } catch (error) {
    console.error('Failed to load timeline data:', error);
    // Fallback to empty array if loading fails
    timelineData = [];
    timelineSequence = [];
  }
};

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

// Initialize the timeline
const initTimeline = async () => {
  await loadTimelineData();
  renderTimeline();
};

initTimeline();
