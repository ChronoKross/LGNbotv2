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
      const eventDate = new Date(event.start.dateTime || event.start.date);
      const formattedDate = `${
        monthNames[eventDate.getMonth()]
      } ${eventDate.getDate()}, ${eventDate.getFullYear()}`;
      return { date: formattedDate, summary: event.summary };
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}
