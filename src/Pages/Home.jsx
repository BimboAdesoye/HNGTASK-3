import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Gallery />
      <Footer/>
    </div>
  );
};

export default Home;
