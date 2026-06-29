import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import api from '../../lib/api';

const PROJECT_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial',  label: 'Commercial'  },
  { value: 'cultural',    label: 'Cultural'    },
  { value: 'other',       label: 'Other'       },
];

const INITIAL_FORM = { name: '', email: '', projectType: '', message: '' };

const Contact = () => {
  const containerRef = useScrollReveal();

  const [form, setForm]         = useState(INITIAL_FORM);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState('');
  const [error, setError]       = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await api.post('/contact', form);
      setSuccess(data.message || 'Thank you! We will be in touch shortly.');
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-section px-6 bg-dark-light relative border-t border-dark-border" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Info */}
          <div className="flex flex-col justify-center reveal">
            <span className="text-label block mb-6">Get in Touch</span>
            <h2 className="text-editorial text-5xl md:text-6xl lg:text-7xl text-white mb-8">
              Let's build <br />
              the <span className="text-accent italic font-light">Future.</span>
            </h2>
            <div className="divider-accent" />
            
            <div className="mt-8 space-y-8">
              <div>
                <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">Studio Headquarters</h4>
                <p className="text-text-secondary font-light">
                  124 Architecture Blvd, Suite 400<br />
                  New York, NY 10012
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">Contact</h4>
                <p className="text-text-secondary font-light">
                  <a href="mailto:hello@themonoliths.com" className="hover:text-accent transition-colors">hello@themonoliths.com</a><br />
                  <a href="tel:+12125550198" className="hover:text-accent transition-colors">+1 (212) 555-0198</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-2">
            <div className="glass-card p-8 md:p-12">
              <h3 className="text-2xl font-serif text-white mb-8">Send an Inquiry</h3>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-[slide-up_0.5s_ease-out_forwards]">
                  <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-serif mb-2">Message Received</p>
                  <p className="text-text-secondary text-sm">{success}</p>
                  <button
                    onClick={() => setSuccess('')}
                    className="mt-8 btn-outline text-xs"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form id="contact-form" className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-text-muted">Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="input-field bg-dark/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-text-muted">Email</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="input-field bg-dark/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-projectType" className="text-xs uppercase tracking-widest text-text-muted">Project Type</label>
                    <select
                      id="contact-projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="input-field bg-dark/50 appearance-none"
                    >
                      <option value="">Select a category</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-text-muted">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="input-field bg-dark/50 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {error && (
                    <div className="bg-error/10 border border-error/20 rounded-lg p-3 text-sm text-error/90 flex items-start gap-2 animate-[slide-up_0.3s_ease-out_forwards]">
                      <span className="mt-0.5">⚠️</span>
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full mt-4"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="spinner" /> Sending...
                      </span>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
