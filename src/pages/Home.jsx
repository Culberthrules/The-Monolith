import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="bg-dark min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
