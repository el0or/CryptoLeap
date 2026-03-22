import About from "../components/About.jsx";
import AppBlock from "../components/AppBlock.jsx";
import Hero from "../components/Hero.jsx";
import ReviewsSlider from "../components/Reviews/Reviews.jsx";
import Roadmap from "../components/RoadMap/RoadMap.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ReviewsSlider />
      <AppBlock />
      <Roadmap />
    </>
  );
}