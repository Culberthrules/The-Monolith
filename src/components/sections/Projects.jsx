import useScrollReveal from '../../hooks/useScrollReveal';

const Projects = () => {
  const containerRef = useScrollReveal();

  const projects = [
    {
      id: 1,
      title: 'The Meridian',
      category: 'Residential',
      location: 'Kyoto, Japan',
      image: '/project_residential.png',
      span: 'md:col-span-8 md:row-span-2', // Large landscape
    },
    {
      id: 2,
      title: 'Horizon Tower',
      category: 'Commercial',
      location: 'New York, USA',
      image: '/project_commercial.png',
      span: 'md:col-span-4 md:row-span-3', // Tall portrait
    },
    {
      id: 3,
      title: 'Zenith Pavilion',
      category: 'Cultural',
      location: 'Oslo, Norway',
      image: '/project_cultural.png',
      span: 'md:col-span-8 md:row-span-1', // Wide banner
    },
  ];

  return (
    <section id="projects" className="py-section px-4 md:px-6 bg-dark relative" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <span className="text-label block mb-4">Selected Work</span>
            <h2 className="text-editorial text-4xl md:text-5xl lg:text-6xl text-white">
              Featured <span className="text-accent italic font-light">Projects.</span>
            </h2>
          </div>
          <button className="text-text-secondary hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 text-sm tracking-widest uppercase font-medium self-start md:self-end">
            View All Projects
          </button>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-4 md:gap-6">
          {projects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-2xl bg-dark-card cursor-pointer reveal reveal-delay-${(idx % 3) + 1} ${project.span}`}
            >
              {/* Image with Parallax/Scale on Hover */}
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-105">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold tracking-widest uppercase text-accent bg-dark/50 backdrop-blur-md px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-text-muted uppercase tracking-wider">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-2">{project.title}</h3>
                  <div className="w-0 h-[1px] bg-accent transition-all duration-500 ease-out group-hover:w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
