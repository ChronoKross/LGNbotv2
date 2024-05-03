// Assuming listEvents.js currently looks something like this:
async function listEvents(calendar) {
  // Add 'calendar' as a parameter
  const res = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });

  console.log("Upcoming Events:");
  res.data.items.forEach((event) => {
    console.log(
      `${event.start.dateTime || event.start.date} - ${event.summary}`
    );
  });
}

module.exports = listEvents;
