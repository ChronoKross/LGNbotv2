const { google } = require("googleapis");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDateTime(date, timezoneOffset) {
  const adjustedDate = new Date(date.getTime() + timezoneOffset * 3600000); // Milliseconds offset
  const month = monthNames[adjustedDate.getUTCMonth()];
  const day = adjustedDate.getUTCDate();
  const year = adjustedDate.getUTCFullYear();
  const hour = adjustedDate.getUTCHours();
  const minute = adjustedDate.getUTCMinutes();
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  return `${month} ${day}, ${year} at ${formattedTime}`;
}

async function listEvents(
  authClient,
  calendarId,
  startDate = new Date(),
  maxResults = 10
) {
  const calendar = google.calendar({ version: "v3", auth: authClient });
  try {
    const res = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    return res.data.items.map((event) => {
      if (event.start.dateTime || event.start.date) {
        const eventDate = new Date(event.start.dateTime || event.start.date); // Ensure correct date parsing
        const utcFormatted = formatDateTime(eventDate, 0); // UTC time
        const estFormatted = formatDateTime(eventDate, -5); // EST time (UTC-5)
        return {
          utcDate: utcFormatted,
          estDate: estFormatted,
          summary: event.summary,
        };
      } else {
        return {
          utcDate: "No date provided",
          estDate: "No date provided",
          summary: event.summary,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

module.exports = listEvents; // Export the listEvents function
