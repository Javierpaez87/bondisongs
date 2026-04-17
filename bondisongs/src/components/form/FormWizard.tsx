import { useState, useEffect } from 'react';
import { X, ChevronLeft, ArrowRight, Loader as Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { SongRequestForm, defaultFormData } from '../../lib/types';
import ProgressBar from './ProgressBar';
import StepRecipient from './steps/StepRecipient';
import StepOccasion from './steps/StepOccasion';
import StepInterests from './steps/StepInterests';
import StepMemory from './steps/StepMemory';
import StepPeople from './steps/StepPeople';
import StepStyle from './steps/StepStyle';
import StepContact from './steps/StepContact';
import StepConfirmation from './steps/StepConfirmation';

const TOTAL_STEPS = 8;

interface FormWizardProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormWizard({ onClose, onSuccess }: FormWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SongRequestForm>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const update = (updates: Partial<SongRequestForm>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const isValidWhatsApp = (raw: string) => raw.replace(/\D/g, '').length >= 8;

  const canProceed = (): boolean => {
    if (step === 2) return data.occasion.length > 0;
    if (step === 6) return data.musicStyle.length > 0;
    if (step === 7) return data.adultName.trim().length > 0 && isValidWhatsApp(data.whatsapp);
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
      setError('');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const { error: dbError } = await supabase.from('song_requests').insert({
        child_name: data.childName,
        nickname: data.nickname,
        age_or_birthday: data.ageOrBirthday,
        name_in_song: data.nameInSong,
        occasion: data.occasion === 'other' && data.occasionOther ? data.occasionOther : data.occasion,
        interests: data.interests,
        memory_text: data.memoryText,
        important_people: data.importantPeople,
        music_style: data.musicStyle,
        instruments: data.instruments,
        adult_name: data.adultName,
        whatsapp: data.whatsapp,
        email: data.email,
        status: 'pending',
      });
      if (dbError) throw dbError;
      onSuccess();
    } catch {
      setError('Hubo un problema al enviar tu pedido. Por favor intentá de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const STEP_MICROCOPY: Record<number, string> = {
    1: 'Te va a llevar menos de 3 minutos',
    2: 'Solo una pregunta, prometido',
    3: 'No hace falta elegir mucho',
    4: 'Cualquier cosita vale',
    5: 'Esto es opcional',
    6: 'Elegí el que más te guste',
    7: 'Solo para enviarte la canción',
    8: 'Ya casi terminamos 🎵',
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepRecipient data={data} onChange={update} />;
      case 2: return <StepOccasion data={data} onChange={update} />;
      case 3: return <StepInterests data={data} onChange={update} />;
      case 4: return <StepMemory data={data} onChange={update} />;
      case 5: return <StepPeople data={data} onChange={update} />;
      case 6: return <StepStyle data={data} onChange={update} />;
      case 7: return <StepContact data={data} onChange={update} />;
      case 8: return <StepConfirmation data={data} />;
      default: return null;
    }
  };

  const isLastStep = step === TOTAL_STEPS;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-bg">
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-brand-border/60 flex-shrink-0">
        <button
          onClick={step === 1 ? onClose : handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-surface transition-colors text-brand-muted"
          aria-label="Atrás"
        >
          {step === 1 ? <X size={20} /> : <ChevronLeft size={22} />}
        </button>

        <div className="text-sm font-semibold text-brand-text">
          Bondi<span className="text-brand-primary">Songs</span>
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-surface transition-colors text-brand-muted"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-shrink-0">
        <ProgressBar current={step} total={TOTAL_STEPS} />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-lg mx-auto px-5 py-6">
          {renderStep()}
        </div>
      </div>

      <div className="flex-shrink-0 bg-white border-t border-brand-border/60 px-5 py-4 safe-area-pb">
        <div className="max-w-lg mx-auto">
          {error && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium">
              {error}
            </div>
          )}

          <p className="text-center text-xs text-brand-muted mb-3">
            {STEP_MICROCOPY[step]}
          </p>

          <button
            onClick={isLastStep ? handleSubmit : handleNext}
            disabled={!canProceed() || submitting}
            className={`w-full flex items-center justify-center gap-3 rounded-2xl py-4.5 text-base font-bold
              transition-all duration-200 active:scale-[0.98]
              ${canProceed() && !submitting
                ? isLastStep
                  ? 'bg-gradient-warm text-white shadow-warm-lg hover:shadow-warm'
                  : 'bg-brand-primary text-white shadow-warm hover:bg-brand-primary-dark'
                : 'bg-brand-border text-brand-muted cursor-not-allowed'
              }`}
            style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
          >
            {submitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Enviando tu pedido...
              </>
            ) : isLastStep ? (
              <>
                Solicitar mi canción ✨
              </>
            ) : (
              <>
                Continuar
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
