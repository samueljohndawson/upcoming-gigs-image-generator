import { Title, Text, Card, Stack, Box, Avatar } from "@mantine/core";
// Import the static JSON file directly from your data directory
import gbpData from "../data/reviews.json";

type Reviewer = {
  displayName: string;
  profilePhotoUrl?: string;
};

type GBPReview = {
  name: string;
  reviewId: string;
  reviewer: Reviewer;
  starRating: string;
  comment?: string;
  createTime: string;
  updateTime?: string;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2); // Ensures a max of 2 characters (e.g., "John Doe" -> "JD")
};

const getThemeColorByName = (name: string): string => {
  const colors = [
    "blue",
    "cyan",
    "grape",
    "indigo",
    "orange",
    "pink",
    "red",
    "teal",
    "violet",
  ];

  // Calculate a basic hash code from the string
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Use the hash to pick an index from the array
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const LatestReview = () => {
  const reviews: GBPReview[] = gbpData.reviews || [];

  // Sort by createTime descending to isolate the absolute latest review item
  const latestReview = [...reviews].sort(
    (a, b) =>
      new Date(b.createTime).getTime() - new Date(a.createTime).getTime(),
  )[0];

  // Gracefully handle situations where no reviews are available yet
  if (!latestReview) {
    return (
      <Box
        style={{
          background: "#111",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text color="white">No reviews found just yet.</Text>
      </Box>
    );
  }

  // Map Google's string rating layout to clear star symbols
  const starMap: Record<string, string> = {
    ONE: "★☆☆☆☆",
    TWO: "★★☆☆☆",
    THREE: "★★★☆☆",
    FOUR: "★★★★☆",
    FIVE: "★★★★★",
  };
  const starDisplay = starMap[latestReview.starRating] || "★★★★★";

  // Clean format for the review date (e.g., "October 24, 2025")
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(latestReview.createTime));

  const backgroundUrl = latestReview.comment?.toLowerCase().includes("wedding")
    ? "/reviews/wedding-background.jpg"
    : "/reviews/party-background.jpg";

  return (
    // OUTER PREVIEW STAGE (Centres your square poster layout on desktop preview windows)
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        padding: 20,
      }}
    >
      {/* SQUARE GRID FRAME (1:1 Aspect Ratio) */}
      <Box
        style={{
          width: 540, // Balanced desktop preview sizing scale
          aspectRatio: "1 / 1", // Forces the container to form a perfect square frame
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        {/* ACTUAL POSTER CANVAS */}
        <Box
          className="poster"
          style={{
            height: "100%",
            width: "100%",
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Pushes content evenly into top/middle/bottom zones
            gap: 20,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* HEADER */}
          <Box style={{ textAlign: "center" }}>
            <Text
              style={{
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.35em",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              Recent Feedback
            </Text>

            <Title
              order={1}
              style={{
                color: "white",
                fontSize: 34,
                lineHeight: 1.1,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginTop: 6,
                textShadow: "0 6px 25px rgba(0,0,0,0.6)",
              }}
            >
              WHAT PEOPLE SAY
            </Title>
          </Box>

          {/* MAIN REVIEW CARD */}
          <Box style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <Card
              radius={20}
              padding="lg"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
            >
              <Stack gap={12} align="center" style={{ textAlign: "center" }}>
                {/* USER PHOTO IMAGE - Only renders if present */}
                {latestReview.reviewer.profilePhotoUrl && (
                  <Avatar
                    size={64}
                    radius="xl"
                    // src={latestReview.reviewer.profilePhotoUrl}
                    alt={latestReview.reviewer.displayName}
                    style={{ border: "2px solid rgba(255,255,255,0.8)" }}
                    color={getThemeColorByName(
                      latestReview.reviewer.displayName || "User",
                    )}
                  >
                    {getInitials(latestReview.reviewer.displayName || "User")}
                  </Avatar>
                )}

                <Box>
                  {/* REVIEWER NAME (Handwriting style applied) */}
                  <Text
                    style={{
                      color: "white",
                      fontSize: 24, // Bumped slightly as handwriting fonts usually look smaller
                      fontFamily: "Euphoria Script, cursive",
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {latestReview.reviewer.displayName}
                  </Text>

                  {/* STAR RATINGS */}
                  <Text
                    style={{
                      color: "#FFD700",
                      fontSize: 18,
                      letterSpacing: "2px",
                      marginTop: 2,
                    }}
                  >
                    {starDisplay}
                  </Text>

                  {/* REVIEW DATE */}
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 10,
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    {formattedDate}
                  </Text>
                </Box>

                {/* REVIEW COMMENT */}
                <Text
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    fontSize: 13,
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  "
                  {latestReview.comment ||
                    "An incredible performance! Highly recommended."}
                  "
                </Text>
              </Stack>
            </Card>
          </Box>

          {/* FOOTER */}
          <Box style={{ textAlign: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: 32,
                fontFamily: "Euphoria Script, cursive",
                lineHeight: 1,
              }}
            >
              Sam Dawson
            </Text>

            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 9,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginTop: 4,
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
