import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw, Sparkles, Telescope, X } from 'lucide-react';
import { detectiveCases, EDUCATIONAL_SYNTHETIC_DATA, observerMissions } from '../education/missionData';
import { SPEX_ASSETS } from '../spex/spexAssets';

type MissionGameProps = { onExit: () => void; onStartExplore: () => void };
type Level = 'intro' | 'observer' | 'detective' | 'complete';

const levelNames = ['Briefing', 'Become the observer', 'Find what changed', 'Mission complete'];

export const MissionGame: React.FC<MissionGameProps> = ({ onExit, onStartExplore }) => {
  const [level, setLevel] = useState<Level>('intro');
  const [observerIndex, setObserverIndex] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const observerMission = observerMissions[observerIndex];
  const detectiveCase = detectiveCases[caseIndex];
  const selected = detectiveCase.choices.find((choice) => choice.id === selectedChoice);
  const progress = useMemo(() => {
    if (level === 'intro') return 0;
    if (level === 'observer') return 25 + (observerIndex / observerMissions.length) * 25;
    if (level === 'detective') return 50 + (completedCases.length / detectiveCases.length) * 45;
    return 100;
  }, [level, observerIndex, completedCases.length]);

  const nextObserver = () => {
    if (observerIndex < observerMissions.length - 1) setObserverIndex((index) => index + 1);
    else setLevel('detective');
  };
  const choose = (choiceId: string) => {
    if (selectedChoice) return;
    setSelectedChoice(choiceId);
    if (!completedCases.includes(detectiveCase.id)) setCompletedCases((items) => [...items, detectiveCase.id]);
  };
  const nextCase = () => {
    if (caseIndex < detectiveCases.length - 1) {
      setCaseIndex((index) => index + 1);
      setSelectedChoice(null);
    } else setLevel('complete');
  };
  const restart = () => {
    setLevel('intro'); setObserverIndex(0); setCaseIndex(0); setSelectedChoice(null); setCompletedCases([]);
  };

  return (
    <section className="mission-shell" aria-label="SPHEREx: The Cosmic Detective educational simulation">
      <div className="mission-topbar">
        <button className="quiet-button" onClick={onExit} type="button"><X size={16} /> Exit mission</button>
        <div className="mission-progress-wrap" aria-label={`${Math.round(progress)} percent complete`}>
          <span className="eyebrow">MISSION PROGRESS</span>
          <div className="mission-progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <span className="mono-label">EDUCATIONAL MODE</span>
      </div>

      <div className="mission-breadcrumbs" aria-label="Mission stages">
        {levelNames.map((name, index) => <span key={name} className={index <= levelNames.indexOf(level === 'intro' ? 'Briefing' : level === 'observer' ? 'Become the observer' : level === 'detective' ? 'Find what changed' : 'Mission complete') ? 'is-current' : ''}>{String(index + 1).padStart(2, '0')} {name}</span>)}
      </div>

      {level === 'intro' && <div className="mission-intro mission-grid">
        <div>
          <span className="eyebrow accent">SPEX FIELD SCHOOL / 01</span>
          <h1>SPHEREx:<br /><em>The Cosmic Detective</em></h1>
          <p className="mission-lede">Learn how the universe is observed. Discover what changes.</p>
          <p className="mission-copy">Step into a conceptual mission-control briefing, then investigate a clearly labeled synthetic sky. The real SPEX science pipeline stays separate from this learning experience.</p>
          <div className="mission-actions"><button className="primary-button" onClick={() => setLevel('observer')} type="button">Begin briefing <ArrowRight size={17} /></button><button className="secondary-button" onClick={onExit} type="button">Return to SPEX</button></div>
        </div>
        <div className="mission-hero-panel"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><img src={SPEX_ASSETS.explaining.imagePath} alt="SPEX explaining the mission" /><div className="mission-callout"><Telescope size={16} /> Mission objective: learn to ask better questions of the sky.</div></div>
      </div>}

      {level === 'observer' && <div className="mission-workspace">
        <div className="mission-heading"><div><span className="eyebrow accent">LEVEL 1 / BECOME THE OBSERVER</span><h2>Learn how SPHEREx sees the universe.</h2></div><span className="step-count">{observerIndex + 1} / {observerMissions.length}</span></div>
        <div className="mission-card mission-grid">
          <div><span className="eyebrow">{observerMission.eyebrow}</span><h3>{observerMission.title}</h3><p>{observerMission.body}</p><div className="spectral-ribbon" aria-label="Conceptual spectral visualization">{observerMission.bands.map((band) => <div key={band.label} className={`spectrum-segment ${band.tone}`}><span>{band.label}</span><small>{band.range}</small></div>)}</div></div>
          <div className="mission-note"><Sparkles size={19} /><strong>Investigator note</strong><p>Different wavelengths reveal different information. A band is a range of light, not a separate kind of object.</p></div>
        </div>
        <div className="mission-actions mission-actions-end"><button className="primary-button" onClick={nextObserver} type="button">{observerIndex === observerMissions.length - 1 ? 'Enter detective level' : 'Next mission'} <ArrowRight size={17} /></button></div>
      </div>}

      {level === 'detective' && <div className="mission-workspace">
        <div className="mission-heading"><div><span className="eyebrow accent">LEVEL 2 / FIND WHAT CHANGED</span><h2>Become an astronomical investigator.</h2><p className="mission-copy">Compare the evidence, then choose the most responsible interpretation.</p></div><span className="step-count">{caseIndex + 1} / {detectiveCases.length}</span></div>
        <div className="synthetic-banner"><span className="status-dot" /> {EDUCATIONAL_SYNTHETIC_DATA}</div>
        <div className="comparison-stage"><div className="synthetic-image epoch-one"><span>EARLIER / EPOCH A</span><i className="star star-a" /><i className="star star-b" /><i className="star star-c" /></div><div className="difference-image"><span>DIFFERENCE / LATER − EARLIER</span><i className="residual positive" /><i className="residual negative" /></div><div className="synthetic-image epoch-two"><span>LATER / EPOCH B</span><i className="star star-a" /><i className="star star-b changed" /><i className="star star-c" /></div></div>
        <div className="case-card"><span className="eyebrow">CASE FILE / {String(caseIndex + 1).padStart(2, '0')}</span><h3>{detectiveCase.label}</h3><p>{detectiveCase.description}</p><div className="choice-grid">{detectiveCase.choices.map((choice) => <button key={choice.id} className={`choice-button ${selectedChoice === choice.id ? choice.correct ? 'is-correct' : 'is-wrong' : ''}`} onClick={() => choose(choice.id)} type="button" disabled={!!selectedChoice}><span>{choice.label}</span>{selectedChoice === choice.id && (choice.correct ? <Check size={16} /> : <X size={16} />)}</button>)}</div>{selected && <div className={`feedback ${selected.correct ? 'feedback-correct' : 'feedback-wrong'}`}><strong>{selected.correct ? 'Good scientific judgment.' : 'Look again at the evidence.'}</strong><p>{selected.explanation} {detectiveCase.answer}</p><button className="text-button" onClick={nextCase} type="button">{caseIndex === detectiveCases.length - 1 ? 'Complete investigation' : 'Next case'} <ArrowRight size={15} /></button></div>}</div>
      </div>}

      {level === 'complete' && <div className="mission-complete"><div className="badge-orbit"><span>★</span></div><span className="eyebrow accent">MISSION COMPLETE</span><h2>You are a <em>Cosmic Detective.</em></h2><p className="mission-lede">You learned how SPHEREx observes the sky — and why a difference image is the start of an investigation, not the end.</p><div className="learning-summary"><div><strong>01</strong><span>Infrared observations carry information beyond visible light.</span></div><div><strong>02</strong><span>Motion and brightness variation are different phenomena.</span></div><div><strong>03</strong><span>Artifacts and missing evidence deserve an honest label.</span></div></div><div className="mission-actions"><button className="primary-button" onClick={onStartExplore} type="button">Start your first investigation <ArrowRight size={17} /></button><button className="secondary-button" onClick={restart} type="button"><RotateCcw size={16} /> Replay mission</button></div></div>}
    </section>
  );
};
