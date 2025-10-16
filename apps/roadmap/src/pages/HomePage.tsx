import Roadmap from "../components/Roadmap";

export default function HomePage() {
  return (
    <div className="relative w-full flex-1 no-scrollbar scroll-px-12 flex justify-center pb-12 min-h-[80vh]">
      <div className="overflow-x-visible w-full max-w-6xl">
        <Roadmap />
      </div>
    </div>
  );
}
