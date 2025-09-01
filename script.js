const monthYear = document.getElementById("month-year");
const dates = document.getElementById("dates");
const eventBox = document.getElementById("event-box");
const eventDate = document.getElementById("event-date");
const eventList = document.getElementById("event-list");

let currentDate = new Date();

const events = {
  "1-1": ["New Year's Day"],
  "1-26": ["Republic Day (India)", "Australia Day"],
  "2-14": ["Valentine's Day"],
  "3-8": ["International Women's Day"],
  "4-22": ["Earth Day"],
  "5-1": ["International Workers' Day"],
  "6-21": ["International Yoga Day"],
  "7-4": ["Independence Day (USA)"],
  "8-15": ["Independence Day (India)"],
  "9-5": ["Teachers' Day (India)"],
  "10-31": ["Halloween"],
  "11-14": ["Children's Day (India)", "World Diabetes Day"],
  "12-25": ["Christmas Day"]
};

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.innerText = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  dates.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    dates.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let todayClass = "";
    if (
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      todayClass = "today";
    }
    dates.innerHTML += `<div class="${todayClass}" onclick="showEvents(${i}, ${month + 1}, ${year})">${i}</div>`;
  }
}

function showEvents(day, month, year) {
  const key = `${month}-${day}`;
  eventDate.innerText = `${day} ${new Date(year, month - 1).toLocaleString("en-US", { month: "long" })} ${year}`;
  eventList.innerHTML = "";

  if (events[key]) {
    events[key].forEach(event => {
      const li = document.createElement("li");
      li.innerText = event;
      eventList.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerText = "No major world events.";
    eventList.appendChild(li);
  }

  eventBox.style.display = "block";
}

function closeEvents() {
  eventBox.style.display = "none";
}

document.getElementById("prev").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("next").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);