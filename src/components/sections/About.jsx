import useScrollReveal from '../../hooks/useScrollReveal';

const About = () => {
  const containerRef = useScrollReveal();

  const stats = [
    { label: 'Years of Excellence', value: '25+' },
    { label: 'Global Projects', value: '420' },
    { label: 'Design Awards', value: '86' },
    { label: 'Studio Locations', value: '4' },
  ];

  return (
    <section id="about" className="py-section px-6 bg-dark-light relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
          
          {/* Left: Statement */}
          <div className="col-span-1 lg:col-span-5 reveal">
            <span className="text-label block mb-6">Our Philosophy</span>
            <h2 className="text-editorial text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Where Form <br />
              Meets <span className="text-accent italic font-light">Function.</span>
            </h2>
            <div className="divider-accent" />
            <p className="text-text-secondary text-lg font-light">
              We approach every project as a unique ecosystem. Our designs don't just occupy space; they define it, converse with it, and breathe life into it.
            </p>
          </div>

          {/* Center: Image Accent */}
          <div className="col-span-1 lg:col-span-3 hidden lg:block reveal reveal-delay-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
              <img 
                src="/about_accent.png" 
                alt="Architectural detail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </div>
          </div>

          {/* Right: Detailed Copy */}
          <div className="col-span-1 lg:col-span-4 reveal reveal-delay-3">
            <p className="text-text-primary text-lg mb-6 leading-relaxed">
              Founded on the principle that architecture shapes the human experience, The Monoliths Studio has spent over two decades crafting environments that resonate.
            </p>
            <p className="text-text-secondary mb-8 font-light leading-relaxed">
              From cultural institutions to residential sanctuaries, our multidisciplinary team blends rigorous engineering with poetic design. We source sustainable materials and leverage cutting-edge technology to build structures that endure physically and aesthetically.
            </p>
            <a href="#contact" className="btn-outline">
              Discuss a Project
            </a>
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-dark-border reveal reveal-delay-2">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-4xl md:text-5xl font-serif text-white">{stat.value}</span>
              <span className="text-sm tracking-wide text-text-muted uppercase">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
