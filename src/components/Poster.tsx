import { Title, Text, Card, Stack, Group, Box } from "@mantine/core";
import { useEffect, useState } from "react";

type GoogleCalEvent = {
  summary: string;
  start: { dateTime: string };
};

type TransformedEvent = {
  venue: string;
  city: string;
  startTime: string;
};

export const Poster = () => {
  const API_KEY = "AIzaSyAQ2JTzP28JSXnDl2Jmy4a_9tBqPim_pvo";
  const [events, setEvents] = useState<TransformedEvent[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const timeNow = new Date().toISOString();
    const fetchEvents = async () => {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/f71a45cb3ffe6e9883d82e3b0024b893e64bd816c875ea56077920ab8e10d878@group.calendar.google.com/events?key=${API_KEY}&maxResults=4&fields=items(summary,start)&singleEvents=true&orderBy=startTime&timeMin=${timeNow}`,
      );
      const data = await response.json();
      const events = data.items.map((item: GoogleCalEvent) => {
        return {
          venue: item.summary.split(" - ")[0],
          city: item.summary.split(" - ")[1],
          startTime: item.start.dateTime,
        };
      });
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    // OUTER PREVIEW STAGE (centres your story on desktop)
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        padding: 40,
      }}
    >
      {/* PHONE / STORY FRAME */}
      <Box
        style={{
          width: 360,
          aspectRatio: "9 / 16",
          borderRadius: 0,
          overflow: "hidden",
          // boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* ACTUAL POSTER */}
        <Box
          className="poster"
          style={{
            height: "100%",
            width: "100%",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url(/background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* HEADER */}
          <Box
            style={{
              textAlign: "center",
              paddingTop: 10,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.35em",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Live Music
            </Text>

            <Title
              order={1}
              style={{
                color: "white",
                fontSize: 48,
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                marginTop: 10,
                textShadow: "0 6px 25px rgba(0,0,0,0.6)",
              }}
            >
              UPCOMING
              <br />
              SHOWS
            </Title>
          </Box>

          {/* EVENTS */}
          <Stack style={{ flex: 1 }} gap={12}>
            {events?.map((event) => {
              const date = new Date(event.startTime);

              const day = new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                timeZone: "Europe/London",
              }).format(date);

              const month = new Intl.DateTimeFormat("en-GB", {
                month: "short",
                timeZone: "Europe/London",
              }).format(date);

              const time = new Intl.DateTimeFormat("en-GB", {
                hour: "numeric",
                minute: "2-digit",
                timeZone: "Europe/London",
              }).format(date);

              return (
                <Card
                  key={event.startTime}
                  radius={18}
                  padding="sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Group gap={12}>
                      <Box style={{ minWidth: 50 }}>
                        <Text
                          style={{
                            color: "white",
                            fontWeight: 900,
                            fontSize: 18,
                            lineHeight: 1,
                          }}
                        >
                          {day}
                        </Text>

                        <Text
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {month}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 14,
                            fontWeight: 800,
                          }}
                        >
                          {event.venue}
                        </Text>

                        <Text
                          style={{
                            color: "rgba(255,255,255,0.6)",
                            fontSize: 11,
                          }}
                        >
                          {event.city}
                        </Text>
                      </Box>
                    </Group>

                    <Text
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {time}
                    </Text>
                  </Group>
                </Card>
              );
            })}
          </Stack>

          {/* FOOTER */}
          <Box style={{ textAlign: "center", marginTop: "auto" }}>
            <Text
              style={{
                color: "white",
                fontSize: 42,
                fontFamily: "Euphoria Script",
                lineHeight: 1,
              }}
            >
              Sam Dawson
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 11,
                marginTop: 6,
              }}
            >
              Live • Acoustic • Music
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
