import About from './components/About.jsx';
import AppBlock from './components/AppBlock.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ReviewsSlider from './components/Reviews/Reviews.jsx';
import Roadmap from './components/RoadMap/RoadMap.jsx';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <ReviewsSlider />
      <AppBlock />
      <Roadmap />
      <Footer />
    </>
  )
}

export default App
