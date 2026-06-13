import { LatestReview } from "./components/LatestReview";
import { UpcomingGigs } from "./components/UpcomingGigs";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const posterType = urlParams.get("poster");

  switch (posterType) {
    case "review":
      return <LatestReview />;

    case "gigs":
    default:
      return <UpcomingGigs />;
  }
}
