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
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime?: string;
};

export const LatestReview = () => {
  const reviews: GBPReview[] = gbpData.reviews || [];

  // Sort by createTime descending to isolate the absolute latest feedback item
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
        <Text color="white">No performance reviews found.</Text>
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
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/background.jpg)",
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
              Recent Wedding Feedback
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
              CLIENT REVIEWS
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
                {/* USER PHOTO IMAGE */}
                <Avatar
                  size={64}
                  radius="xl"
                  src={latestReview.reviewer.profilePhotoUrl}
                  alt={latestReview.reviewer.displayName}
                  style={{ border: "2px solid rgba(255,255,255,0.8)" }}
                  // imgProps={{ referrerPolicy: "no-referrer" }} // Prevents broken avatars via cross-domain tokens
                />

                <Box>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: 800,
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
                </Box>

                {/* WEDDING CLIENT PERFORMANCE COMMENT */}
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
              Live Music & Acoustic Performances
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
              Weddings • Corporate • Private Events
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
