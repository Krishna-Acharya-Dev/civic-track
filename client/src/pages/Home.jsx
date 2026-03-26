import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;
