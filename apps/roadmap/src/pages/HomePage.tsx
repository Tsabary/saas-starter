import Roadmap from "../components/Roadmap";

export default function HomePage() {
  return (
    <div className="relative w-full flex-1 no-scrollbar flex justify-center pb-6 md:pb-12 px-4 md:px-6 min-h-[80vh] bg-gray-50 dark:bg-zinc-950">
      <div className="w-full max-w-6xl">
        <Roadmap />
      </div>
    </div>
  );
}
