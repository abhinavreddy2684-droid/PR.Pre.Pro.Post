import TalentScene from "@/features/home/components/ecosystem-story/scenes/TalentScene";
import PortfolioScene from "@/features/home/components/ecosystem-story/scenes/PortfolioScene";
import RecruiterScene from "@/features/home/components/ecosystem-story/scenes/RecruiterScene";
import DiscoveryScene from "@/features/home/components/ecosystem-story/scenes/DiscoveryScene";
import ConnectionScene from "@/features/home/components/ecosystem-story/scenes/ConnectionScene";

export default function StoryScene({ id }) {
  if (id === "talent") return <TalentScene />;
  if (id === "portfolio") return <PortfolioScene />;
  if (id === "recruiter") return <RecruiterScene />;
  if (id === "discovery") return <DiscoveryScene />;
  return <ConnectionScene />;
}
