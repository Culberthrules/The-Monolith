const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-[scale-in_1.5s_ease-out_forwards]"
        style={{ backgroundImage: 'url("/hero_architecture.png")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-label mb-6 animate-[slide-up_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.2s' }}>
          The Monoliths Studio
        </span>
        
        <h1 className="text-editorial text-5xl md:text-7xl lg:text-[6.5rem] mb-8 text-white animate-[slide-up_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }}>
          Enduring <span className="text-accent italic font-light">Spaces.</span><br />
          Timeless <span className="text-accent italic font-light">Vision.</span>
        </h1>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light animate-[slide-up_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.6s' }}>
          Award-winning architecture and design studio crafting environments that inspire connection and elevate the human experience.
        </p>

        <div className="animate-[slide-up_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.8s' }}>
          <a href="#projects" className="btn-primary">
            Explore Selected Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-[fade-in_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.2s' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[slide-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;