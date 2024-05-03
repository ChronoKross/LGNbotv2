/**
 * Fetches and logs a list of upcoming events from a specified Google Calendar.
 *
 * @param {Object} calendar - The Google Calendar API object.
 * @param {String} calendarId - The ID of the calendar from which to fetch events.
 * @param {Date} startDate - The start date from which to begin fetching events.
 * @param {Number} maxResults - The maximum number of events to fetch.
 * @returns {Array} An array of events.
 */
async function listEvents(
  calendar,
  calendarId = "primary",
  startDate = new Date(),
  maxResults = 10
) {
  try {
    const res = await calendar.events.list({
      calendarId,
      timeMin: startDate.toISOString(),
      maxResults,
      singleEvents: true,
      orderBy: "startTime",
    });

    console.log("Upcoming Events:");
    if (res.data.items.length === 0) {
      console.log("No upcoming events found.");
      return []; // Return an empty array if no events are found
    }

    const events = res.data.items.map((event) => {
      const eventDate = event.start.dateTime || event.start.date;
      const eventSummary = event.summary;
      console.log(`${eventDate} - ${eventSummary}`);
      return { date: eventDate, summary: eventSummary }; // Return event details in an object format
    });

    return events; // Return the array of event objects
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
}

module.exports = listEvents;
