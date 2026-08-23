import {
  Film,
  ClipboardList,
  Users,
  Clapperboard,
} from "lucide-react";

import WorkflowCard from "../components/cards/WorkflowCard";
import SectionHeading from "../components/ui/SectionHeading";

const steps = [
  {
    title: "Choose A Craft",
    description:
      "Explore all 24 cinematic disciplines and find the expertise your production needs.",
    icon: Film,
  },
  {
    title: "Submit Requirement",
    description:
      "Share your production vision, creative direction, and project goals.",
    icon: ClipboardList,
  },
  {
    title: "Talent Matching",
    description:
      "We connect you with verified filmmakers, artists, and cinema professionals.",
    icon: Users,
  },
  {
    title: "Production Begins",
    description:
      "Collaborate seamlessly and bring your cinematic vision to life.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="min-h-[calc(100svh-5rem)] flex items-center py-10 sm:py-12 lg:py-14 px-6 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          eyebrow="Workflow"
          title="How It Works"
          subtitle="A streamlined cinematic collaboration experience."
          center
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <WorkflowCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
