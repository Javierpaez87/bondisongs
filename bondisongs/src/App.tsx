import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Occasions from './components/Occasions';
import Features from './components/Features';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FormWizard from './components/form/FormWizard';
import SuccessScreen from './components/SuccessScreen';

type AppState = 'landing' | 'form' | 'success';

export default function App() {
  const [state, setState] = useState<AppState>('landing');

  const openForm = () => setState('form');
  const closeForm = () => setState('landing');
  const showSuccess = () => setState('success');
  const backToLanding = () => setState('landing');

  return (
    <>
      {state === 'landing' && (
        <div className="min-h-screen bg-brand-bg">
          <Header />
          <Hero onCTAClick={openForm} />
          <HowItWorks />
          <Occasions onCTAClick={openForm} />
          <Features />
          <CTASection onCTAClick={openForm} />
          <Footer />

          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-5 md:hidden">
            <button
              onClick={openForm}
              className="w-full bg-gradient-warm text-white font-semibold rounded-xl py-3 text-sm
                shadow-warm-lg hover:shadow-warm active:scale-[0.97] transition-all duration-200
                flex items-center justify-center gap-2"
            >
              <span>🎵</span>
              Crear mi canción
            </button>
          </div>
        </div>
      )}

      {state === 'form' && (
        <FormWizard onClose={closeForm} onSuccess={showSuccess} />
      )}

      {state === 'success' && (
        <SuccessScreen onClose={backToLanding} />
      )}
    </>
  );
}
