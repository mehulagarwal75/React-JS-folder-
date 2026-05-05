import Card from "./components/Card";
import Slider from "./components/Slider";

// 1. Move static data outside the component to prevent re-creation on every render
const cardViewData = [
  {
    title: "Get Access to 100+ Subjects",
    description: "Like Computer, accounting, finance, english, politics and many more."
  },
  {
    title: "Request Preview Notes",
    description: "A brief notes available to read online"
  },
  {
    title: "Ask Professors to Join Free",
    description: "Share jump2learn to your professors & circles."
  },
  {
    title: "Read Subjects Online",
    description: "View notes & reading material to read online."
  }
];

export default function Home() {
  return (
    <>
      <Slider />

      {/* 2. Wrap in a max-width container and use CSS Grid for a perfect responsive layout */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardViewData.map((cardData, index) => (
            <Card 
              key={index} 
              title={cardData.title} 
              description={cardData.description} 
            />
          ))}
        </div>
      </div>
    </>
  );
}