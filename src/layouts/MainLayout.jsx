import AmbientLight from "../components/ui/AmbientLight";
import GrainOverlay from "../components/ui/GrainOverlay";

export default function MainLayout({ children }) {
  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      <AmbientLight />
      <GrainOverlay />

      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}