import Roadmap from "../components/Roadmap";

export default function HomePage() {
  return (
    <div className="relative w-full flex-1 no-scrollbar flex justify-center pb-6 md:pb-12 min-h-[80vh]">
      <div className="w-full max-w-6xl px-4 md:px-6">
        <Roadmap />
      </div>
    </div>
  );
}
