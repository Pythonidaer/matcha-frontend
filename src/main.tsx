import {useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './reset.css';
import './style.css';

const experiences = [
 {sentence:'I turn Figma designs into React components.',label:'React + TypeScript',detail:'I worked as Acronary’s Frontend Engineer. I implemented their entire Figma design in React components, gaining hands-on startup experience. I also build interfaces with TypeScript.'},
 {sentence:'I build fast, accessible interfaces.',label:'Accessibility',detail:'At Boston Children’s Hospital, I turned designs into fast, accessible interfaces. At Commonwealth Financial Network, I frequently worked with designers to turn Figma designs—and sometimes Word documents—into fully responsive, accessible websites.'},
 {sentence:'I care about getting the pixels right.',label:'Visual detail',detail:'I have a strong passion for creating pixel-right interfaces. I’ve enjoyed using visual inspection tools such as Chromium, especially the green differential view for spotting differences.'},
 {sentence:'I work with backend engineers to ship features.',label:'End to end',detail:'At Acronary, I worked directly with the CTO, who handled the backend, to ship features end to end. I connected the React interface with the backend as we brought features into the product.'},
];
const CHARACTER_INTERVAL_MS = 55;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';
const THEME_KEY = 'johnny-matcha-theme';
type Theme = 'light' | 'dark';
function ThemeToggle(){
 const [preference,setPreference]=useState<Theme|null>(()=>{try{const saved=localStorage.getItem(THEME_KEY);return saved==='dark'||saved==='light'?saved:null}catch{return null}});
 const [systemDark,setSystemDark]=useState(()=>matchMedia('(prefers-color-scheme: dark)').matches);
 const dark=preference ? preference==='dark' : systemDark;
 useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const update=()=>setSystemDark(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';try{if(preference)localStorage.setItem(THEME_KEY,preference);else localStorage.removeItem(THEME_KEY)}catch{}},[dark,preference]);
 return <div className="theme-controls"><button id="theme-toggle" type="button" role="switch" aria-checked={dark} aria-label="Dark mode" onClick={()=>setPreference(dark?'light':'dark')}><span className="theme-track" aria-hidden="true"><svg className="theme-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><svg className="theme-moon" viewBox="0 0 24 24"><path d="M20.5 14.1A8.7 8.7 0 0 1 9.9 3.5 8.7 8.7 0 1 0 20.5 14.1Z"/></svg><span className="theme-thumb"/></span></button></div>
}

function App(){
 const [index,setIndex]=useState(0);
 const [length,setLength]=useState(0);
 const [deleting,setDeleting]=useState(false);
 const [isFocused,setIsFocused]=useState(false);
 const [message,setMessage]=useState('');
 const [reducedMotion,setReducedMotion]=useState(false);
 const [showExperience,setShowExperience]=useState(false);
 const [scrollTarget,setScrollTarget]=useState<string|null>(null);
 useEffect(()=>{if(!showExperience||!scrollTarget)return;const target=document.getElementById(scrollTarget);if(target){target.focus({preventScroll:true});target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});setScrollTarget(null)}},[showExperience,scrollTarget]);
 function openExperience(target:string){setShowExperience(true);setScrollTarget(target)}
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReducedMotion(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{
  if(isFocused || message || reducedMotion)return;
  const sentence=experiences[index].sentence;
  const atEnd=length===sentence.length && !deleting;
  const atStart=length===0 && deleting;
  const timer=window.setTimeout(()=>{
   if(atEnd)setDeleting(true);
   else if(atStart){setIndex(value=>(value+1)%experiences.length);setDeleting(false)}
   else setLength(value=>value+(deleting?-1:1));
  },atEnd?1800:atStart?300:CHARACTER_INTERVAL_MS);
  return()=>clearTimeout(timer);
 },[index,length,deleting,isFocused,message,reducedMotion]);
 const current=experiences[index];
 return <div className="page"><a className="skip" href="#main">Skip to introduction</a>
 <header><a className="wordmark" href="#main"><span>Vote for </span>Johnny!</a><ThemeToggle/></header>
 <main id="main"><section className="hero" aria-labelledby="intro-heading">
 <h1 id="intro-heading">Hi Matcha, I’m Johnny.</h1>
 <p className="intro">I’m a software engineer who cares about clear interfaces.<br className="desktop-break"/> I built this introduction with React and TypeScript for Matcha.</p>
 <p className="summary"><svg className="summary-sprig" width="16" height="16" viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 21c0 0-2-3-2-8c0-4 1-7 2-9"/><path d="M7.5 12.5C6 11 4.5 10 3 10c0 0 1 3 4.5 5"/><path d="M7 16c-1.5-1-3-1.5-4-1.5c0 0 .5 2.5 4 4"/><path d="M8.5 9C7 7.5 5 6.5 3.5 6.5c0 0 .5 2.5 5 4.5"/></svg><span>Frontend engineer<span className="summary-divider"> · </span><br className="summary-break"/>Salem, Massachusetts</span><svg className="summary-sprig summary-sprig-mirrored" width="16" height="16" viewBox="0 0 12 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 21c0 0-2-3-2-8c0-4 1-7 2-9"/><path d="M7.5 12.5C6 11 4.5 10 3 10c0 0 1 3 4.5 5"/><path d="M7 16c-1.5-1-3-1.5-4-1.5c0 0 .5 2.5 4 4"/><path d="M8.5 9C7 7.5 5 6.5 3.5 6.5c0 0 .5 2.5 5 4.5"/></svg></p>
 <div className="type-panel"><div className="panel-heading"><h2>A little about what I do</h2></div>
 <div className="typing-body"><textarea aria-label="Message to Johnny" placeholder={isFocused?'Dear Johnny, I love the ambition. Do you have time this week for a 30min chat?':''} value={message} onChange={event=>setMessage(event.target.value)} onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)}/>{!isFocused&&!message&&<p className="typed" aria-hidden="true">{reducedMotion?current.sentence:current.sentence.slice(0,length)}<span className={reducedMotion?'cursor still':'cursor'}/></p>}<p className="sr-only">{experiences.map(item=>item.sentence).join(' ')}</p></div></div>
 <nav className="topics" aria-label="Experience topics">{experiences.map((item,i)=><a key={item.label} href={'#experience-'+i} onClick={event=>{event.preventDefault();openExperience('experience-'+i)}}><span className="topic-number">0{i+1}</span><span>{item.label}</span></a>)}</nav>
 <div className="actions"><button className="text-link" aria-expanded={showExperience} aria-controls="experience" onClick={()=>{if(showExperience)setShowExperience(false);else openExperience("experience")}}>{showExperience?"Hide my experience":"Read my experience"}</button>{CONTACT_EMAIL&&<a className="text-link" href={"mailto:"+CONTACT_EMAIL}>Email me</a>}</div>
 </section>
 {showExperience&&<section className="experience" tabIndex={-1} id="experience" aria-labelledby="experience-heading"><h2 id="experience-heading">My experience</h2>{experiences.map(item=><article key={item.label} id={"experience-"+experiences.indexOf(item)} tabIndex={-1}><h3>{item.sentence}</h3><p>{item.detail}</p></article>)}</section>}
 </main><footer><a className="header-link" href="https://github.com/Pythonidaer" aria-label="My GitHub profile" title="My GitHub profile"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"/></svg></a></footer></div>
}
createRoot(document.getElementById('root')!).render(<App/>);
