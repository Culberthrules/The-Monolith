import { Link } from 'react-router-dom';

const AuthForm = ({ 
  title, 
  subtitle, 
  fields, 
  formState, 
  setFormState, 
  onSubmit, 
  error, 
  loading, 
  submitLabel,
  bottomText,
  bottomLinkText,
  bottomLinkTo
}) => {

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex w-full bg-dark">
      {/* Left: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 xl:p-24 relative z-10">
        
        <div className="w-full max-w-md animate-[fade-in_0.8s_ease-out_forwards]">
          <Link to="/" className="text-label inline-block mb-12 hover:text-white transition-colors">
            ← Back to Home
          </Link>
          
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-text-secondary font-light">
              {subtitle}
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label htmlFor={field.name} className="text-xs uppercase tracking-widest text-text-muted ml-1">
                  {field.placeholder}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required !== false}
                  value={formState[field.name] || ''}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.placeholder.toLowerCase()}`}
                  className="input-field"
                />
              </div>
            ))}

            {error && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 text-sm text-error/90 flex items-start gap-2 animate-[slide-up_0.3s_ease-out_forwards]">
                <span className="mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full mt-8 relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner" /> Processing...
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </form>

          <p className="text-text-muted text-center mt-8 text-sm">
            {bottomText}{' '}
            <Link to={bottomLinkTo} className="text-accent hover:text-white transition-colors font-medium">
              {bottomLinkText}
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Decorative Image Panel */}
      <div className="hidden lg:block lg:w-1/2 relative bg-dark-card overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity animate-[scale-in_20s_ease-out_forwards]"
          style={{ backgroundImage: 'url("/about_accent.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark to-transparent opacity-90" />
        <div className="absolute inset-0 grain-overlay" />
        
        <div className="absolute bottom-12 left-12 right-12 text-center border-t border-dark-border pt-8 animate-[slide-up_1s_ease-out_forwards] delay-300 opacity-0" style={{ animationDelay: '0.4s' }}>
          <p className="text-editorial text-2xl text-white/80 max-w-sm mx-auto">
            "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
          </p>
          <span className="text-label mt-4 block text-accent-muted">— Le Corbusier</span>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
