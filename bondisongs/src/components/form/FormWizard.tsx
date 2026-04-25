import { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ArrowRight, Loader as Loader2 } from 'lucide-react';
import {
  SongCategory,
  SongRequestForm,
  defaultFormData,
  UnifiedFormData,
  defaultUnifiedFormData,
  EducationFields,
  ParentingFields,
  FriendsFields,
  OtherFields,
  StylePromptFields,
} from '../../lib/types';
import { generateLyricsPrompt, generateStylePrompt } from '../../lib/promptGenerator';
import ProgressBar from './ProgressBar';
import CategorySelector from './CategorySelector';
import StepRecipient from './steps/StepRecipient';
import StepOccasion from './steps/StepOccasion';
import StepInterests from './steps/StepInterests';
import StepMemory from './steps/StepMemory';
import StepPeople from './steps/StepPeople';
import StepStyle from './steps/StepStyle';
import StepContact from './steps/StepContact';
import StepEducationContent from './steps/StepEducationContent';
import StepParentingContent from './steps/StepParentingContent';
import StepFriendsContent from './steps/StepFriendsContent';
import StepOtherContent from './steps/StepOtherContent';
import StepStylePrompt from './steps/StepStylePrompt';
import StepAvoidAndDuration from './steps/StepAvoidAndDuration';
import StepConfirmationUnified from './steps/StepConfirmationUnified';

// Step identifiers for each category flow
type StepId =
  | 'category'
  // birthday
  | 'b-recipient' | 'b-occasion' | 'b-interests' | 'b-memory' | 'b-people' | 'b-style'
  // education
  | 'ed-content'
  // parenting
  | 'pa-content'
  // friends
  | 'fr-content'
  // other
  | 'ot-content'
  // shared
  | 'style' | 'style-prompt' | 'avoid-duration' | 'contact' | 'confirmation';

function getSteps(category: SongCategory | null): StepId[] {
  if (!category) return ['category'];

  const shared: StepId[] = ['style', 'style-prompt', 'avoid-duration', 'contact', 'confirmation'];

  switch (category) {
    case 'birthday':
      return ['b-recipient', 'b-occasion', 'b-interests', 'b-memory', 'b-people', ...shared];
    case 'education':
      return ['ed-content', ...shared];
    case 'parenting':
      return ['pa-content', ...shared];
    case 'friends':
      return ['fr-content', ...shared];
    case 'other':
      return ['ot-content', ...shared];
  }
}

interface FormWizardProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormWizard({ onClose, onSuccess }: FormWizardProps) {
  const [unified, setUnified] = useState<UnifiedFormData>({ ...defaultUnifiedFormData });
  const [selectedCategory, setSelectedCategory] = useState<SongCategory | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const steps = useMemo(() => getSteps(selectedCategory), [selectedCategory]);
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const isCategoryStep = currentStep === 'category';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Birthday form convenience accessors
  const birthdayData = unified.birthday;
  const updateBirthday = (updates: Partial<SongRequestForm>) => {
    setUnified(prev => ({ ...prev, birthday: { ...prev.birthday, ...updates } }));
  };
  const updateEducation = (updates: Partial<EducationFields>) => {
    setUnified(prev => ({ ...prev, education: { ...prev.education, ...updates } }));
  };
  const updateParenting = (updates: Partial<ParentingFields>) => {
    setUnified(prev => ({ ...prev, parenting: { ...prev.parenting, ...updates } }));
  };
  const updateFriends = (updates: Partial<FriendsFields>) => {
    setUnified(prev => ({ ...prev, friends: { ...prev.friends, ...updates } }));
  };
  const updateOther = (updates: Partial<OtherFields>) => {
    setUnified(prev => ({ ...prev, other: { ...prev.other, ...updates } }));
  };
  const updateStylePrompt = (updates: Partial<StylePromptFields>) => {
    setUnified(prev => ({ ...prev, stylePrompt: { ...prev.stylePrompt, ...updates } }));
  };
  const updateSharedStyle = (updates: Partial<Pick<UnifiedFormData, 'musicStyle' | 'instruments'>>) => {
    setUnified(prev => ({ ...prev, ...updates }));
  };
  const updateContact = (updates: Partial<Pick<UnifiedFormData, 'adultName' | 'whatsapp' | 'email'>>) => {
    setUnified(prev => ({ ...prev, ...updates }));
  };

  // Adapt birthday StepStyle and StepContact to use unified data
  const sharedStyleData: SongRequestForm = {
    ...defaultFormData,
    musicStyle: unified.musicStyle,
    instruments: unified.instruments,
  };

  const sharedContactData: SongRequestForm = {
    ...defaultFormData,
    adultName: unified.adultName,
    whatsapp: unified.whatsapp,
    email: unified.email,
  };

  const isValidWhatsApp = (raw: string) => raw.replace(/\D/g, '').length >= 8;

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'category':
        return false;
      case 'b-occasion':
        return birthdayData.occasion.length > 0;
      case 'style':
        return unified.musicStyle.length > 0;
      case 'style-prompt':
        return unified.stylePrompt.energy.length > 0 &&
               unified.stylePrompt.voice.length > 0 &&
               unified.stylePrompt.mood.length > 0 &&
               unified.stylePrompt.tempo.length > 0;
      case 'contact':
        return unified.adultName.trim().length > 0 && isValidWhatsApp(unified.whatsapp);
      case 'ed-content':
        return unified.education.educationLevel.length > 0 &&
               unified.education.topic.trim().length > 0 &&
               unified.education.objective.length > 0 &&
               unified.education.tone.length > 0;
      case 'pa-content':
        return unified.parenting.parentingObjective.length > 0 &&
               unified.parenting.tone.length > 0;
      case 'fr-content':
        return unified.friends.groupName.trim().length > 0 &&
               unified.friends.friendsSongType.length > 0 &&
               unified.friends.tone.length > 0;
      case 'ot-content':
        return unified.other.songType.trim().length > 0 &&
               unified.other.songTarget.trim().length > 0;
      default:
        return true;
    }
  };

  const handleCategorySelect = (category: SongCategory) => {
    setSelectedCategory(category);
    setUnified(prev => ({ ...prev, category }));
    setStepIndex(0);
    setError('');
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(s => s + 1);
      setError('');
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(s => s - 1);
    } else {
      setSelectedCategory(null);
      setStepIndex(0);
    }
  };

  const getWordsToAvoid = (): string => {
    switch (unified.category) {
      case 'education': return unified.education.wordsToAvoid;
      case 'parenting': return unified.parenting.wordsToAvoid;
      case 'friends': return unified.friends.wordsToAvoid;
      case 'other': return unified.other.wordsToAvoid;
      default: return '';
    }
  };

  const getDesiredDuration = (): string => {
    switch (unified.category) {
      case 'education': return unified.education.desiredDuration;
      case 'parenting': return unified.parenting.desiredDuration;
      case 'friends': return unified.friends.desiredDuration;
      case 'other': return unified.other.desiredDuration;
      default: return '';
    }
  };

  const setWordsToAvoid = (val: string) => {
    switch (unified.category) {
      case 'education': updateEducation({ wordsToAvoid: val }); break;
      case 'parenting': updateParenting({ wordsToAvoid: val }); break;
      case 'friends': updateFriends({ wordsToAvoid: val }); break;
      case 'other': updateOther({ wordsToAvoid: val }); break;
    }
  };

  const setDesiredDuration = (val: string) => {
    switch (unified.category) {
      case 'education': updateEducation({ desiredDuration: val }); break;
      case 'parenting': updateParenting({ desiredDuration: val }); break;
      case 'friends': updateFriends({ desiredDuration: val }); break;
      case 'other': updateOther({ desiredDuration: val }); break;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      console.log("SUBMIT FLOW: using edge function submit-song-request");
      const lyricsPrompt = generateLyricsPrompt(unified);
      const stylePromptText = generateStylePrompt(unified);

      const bd = unified.birthday;
      const payload: Record<string, unknown> = {
        category: unified.category,
        child_name: (unified.category === 'birthday' ? bd.childName :
                    unified.category === 'parenting' ? unified.parenting.childNameParenting :
                    unified.category === 'friends' ? unified.friends.groupName :
                    unified.category === 'other' ? unified.other.songTarget :
                    unified.education.topic) || '',
        nickname: unified.category === 'birthday' ? bd.nickname : '',
        age_or_birthday: unified.category === 'birthday' ? bd.ageOrBirthday :
                         unified.category === 'parenting' ? unified.parenting.childAge : '',
        name_in_song: unified.category === 'birthday' ? bd.nameInSong : true,
        occasion: unified.category === 'birthday'
          ? (bd.occasion === 'other' && bd.occasionOther ? bd.occasionOther : bd.occasion)
          : unified.category,
        interests: unified.category === 'birthday' ? bd.interests : [],
        memory_text: unified.category === 'birthday' ? bd.memoryText : '',
        important_people: unified.category === 'birthday' ? bd.importantPeople : '',
        music_style: unified.musicStyle,
        instruments: unified.instruments,
        adult_name: unified.adultName,
        whatsapp: unified.whatsapp,
        email: unified.email,
        status: 'pending',
        education_data: unified.category === 'education' ? unified.education : {},
        parenting_data: unified.category === 'parenting' ? unified.parenting : {},
        friends_data: unified.category === 'friends' ? unified.friends : {},
        other_data: unified.category === 'other' ? unified.other : {},
        style_prompt_data: unified.stylePrompt,
        lyrics_prompt: lyricsPrompt,
        style_prompt: stylePromptText,
        words_to_avoid: getWordsToAvoid(),
        desired_duration: getDesiredDuration(),
      };

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/submit-song-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Error ${res.status}`);
      }

      onSuccess();
    } catch (err) {
      const msg = err && typeof err === 'object' && 'message' in err ? (err as { message: string }).message : '';
      setError('Hubo un problema al enviar tu pedido. Por favor intentá de nuevo.' + (msg ? ` (${msg})` : ''));
    } finally {
      setSubmitting(false);
    }
  };

  const STEP_MICROCOPY: Record<string, string> = {
    'category': 'Te va a llevar menos de 3 minutos',
    'b-recipient': 'Te va a llevar menos de 3 minutos',
    'b-occasion': 'Solo una pregunta, prometido',
    'b-interests': 'No hace falta elegir mucho',
    'b-memory': 'Cualquier cosita vale',
    'b-people': 'Esto es opcional',
    'ed-content': 'Contanos todo lo que puedas',
    'pa-content': 'Contanos sobre la rutina',
    'fr-content': 'Contanos sobre el grupo',
    'ot-content': 'Escribí lo que se te ocurra',
    'style': 'Elegí el que más te guste',
    'style-prompt': 'Ajustes para el sonido',
    'avoid-duration': 'Últimos detalles',
    'contact': 'Solo para enviarte la canción',
    'confirmation': 'Ya casi terminamos',
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'category':
        return <CategorySelector onSelect={handleCategorySelect} />;
      case 'b-recipient':
        return <StepRecipient data={birthdayData} onChange={updateBirthday} />;
      case 'b-occasion':
        return <StepOccasion data={birthdayData} onChange={updateBirthday} />;
      case 'b-interests':
        return <StepInterests data={birthdayData} onChange={updateBirthday} />;
      case 'b-memory':
        return <StepMemory data={birthdayData} onChange={updateBirthday} />;
      case 'b-people':
        return <StepPeople data={birthdayData} onChange={updateBirthday} />;
      case 'ed-content':
        return <StepEducationContent data={unified.education} onChange={updateEducation} />;
      case 'pa-content':
        return <StepParentingContent data={unified.parenting} onChange={updateParenting} />;
      case 'fr-content':
        return <StepFriendsContent data={unified.friends} onChange={updateFriends} />;
      case 'ot-content':
        return <StepOtherContent data={unified.other} onChange={updateOther} />;
      case 'style':
        return <StepStyle data={sharedStyleData} onChange={(u) => updateSharedStyle({ musicStyle: u.musicStyle ?? unified.musicStyle, instruments: u.instruments ?? unified.instruments })} />;
      case 'style-prompt':
        return <StepStylePrompt data={unified.stylePrompt} onChange={updateStylePrompt} />;
      case 'avoid-duration':
        return (
          <StepAvoidAndDuration
            wordsToAvoid={getWordsToAvoid()}
            desiredDuration={getDesiredDuration()}
            onChange={(u) => {
              if (u.wordsToAvoid !== undefined) setWordsToAvoid(u.wordsToAvoid);
              if (u.desiredDuration !== undefined) setDesiredDuration(u.desiredDuration);
            }}
          />
        );
      case 'contact':
        return <StepContact data={sharedContactData} onChange={(u) => updateContact({ adultName: u.adultName ?? unified.adultName, whatsapp: u.whatsapp ?? unified.whatsapp, email: u.email ?? unified.email })} />;
      case 'confirmation':
        return <StepConfirmationUnified data={unified} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-brand-bg">
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-brand-border/60 flex-shrink-0">
        <button
          onClick={isCategoryStep ? onClose : handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-brand-surface transition-colors text-brand-muted"
          aria-label="Atrás"
        >
          {isCategoryStep ? <X size={20} /> : <ChevronLeft size={22} />}
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

      {!isCategoryStep && (
        <div className="flex-shrink-0">
          <ProgressBar current={stepIndex + 1} total={totalSteps} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="max-w-lg mx-auto px-5 py-6">
          {renderStep()}
        </div>
      </div>

      {!isCategoryStep && (
        <div className="flex-shrink-0 bg-white border-t border-brand-border/60 px-5 py-4 safe-area-pb">
          <div className="max-w-lg mx-auto">
            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <p className="text-center text-xs text-brand-muted mb-3">
              {STEP_MICROCOPY[currentStep] ?? ''}
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
                  Solicitar mi canción
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
      )}
    </div>
  );
}
