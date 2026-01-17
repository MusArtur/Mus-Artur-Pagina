
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Music, 
  Calendar, 
  Mail, 
  Settings, 
  Trash2, 
  Plus, 
  LogOut, 
  Sparkles,
  Send,
  X,
  ChevronRight,
  Disc,
  Star,
  Share2,
  Save,
  ExternalLink,
  CheckCircle,
  CloudUpload,
  Loader2,
  RefreshCcw,
  Edit3,
  Copy,
  Instagram,
  Twitter,
  Facebook,
  Image as ImageIcon,
  Upload,
  Globe,
  ShieldCheck,
  AlertCircle,
  Lock,
  KeyRound,
  Fingerprint,
  BellRing,
  Smartphone
} from 'lucide-react';
import { AppData, Song, Social, UpcomingProject, Message } from './types';

declare const emailjs: any;

const DEFAULT_LOGO = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&auto=format&fit=crop";
const DEFAULT_BANNER = "https://images.unsplash.com/photo-1514525253361-bee87184f47a?auto=format&fit=crop&q=80&w=1200";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getYTid = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem('musArturData');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Error al cargar datos:", e);
    }
    return {
      about: "Mus Artur es un proyecto musical enfocado en transmitir mensajes de fe, esperanza y amor a través de canciones originales.",
      headerLogo: DEFAULT_LOGO,
      artistCover: DEFAULT_BANNER,
      contactEmail: "vicrober0125@gmail.com",
      securityEmail: "vicrober0125@gmail.com",
      songs: [],
      socials: [
        { id: '1', name: 'Instagram', url: 'https://instagram.com/musartur' },
        { id: '2', name: 'Spotify', url: '#' },
        { id: '3', name: 'YouTube', url: '#' },
        { id: '4', name: 'TikTok', url: '#' },
        { id: '5', name: 'X', url: '#' },
        { id: '6', name: 'Snapchat', url: '#' },
        { id: '7', name: 'Facebook', url: '#' }
      ],
      upcoming: [],
      messages: []
    };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Advanced Login Flow
  const [loginStep, setLoginStep] = useState<1 | 2>(1);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [shareSong, setShareSong] = useState<Song | null>(null);

  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      localStorage.setItem('musArturData', JSON.stringify(data));
      setIsSaving(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [data]);

  const generateSecurityCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  const handleLogin = () => {
    setLoginError('');
    if (!isValidEmail(loginForm.email)) {
      setLoginError('Correo electrónico inválido.');
      return;
    }
    // Credenciales maestras
    if (loginForm.email === "vicrober0125@gmail.com" && loginForm.password === "vico0125") {
      setIsVerifying(true);
      setTimeout(() => {
        const newCode = generateSecurityCode();
        setIsVerifying(false);
        setLoginStep(2);
        // Simular envío de notificación
        setTimeout(() => setShowNotification(true), 1000);
      }, 1500);
    } else {
      setLoginError('Credenciales incorrectas.');
    }
  };

  const handleVerify2FA = () => {
    setLoginError('');
    if (twoFactorCode === generatedCode) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setIsVerifying(false);
        setShowNotification(false);
      }, 1200);
    } else {
      setLoginError('Código de seguridad inválido. Revisa tu correo.');
    }
  };

  const resendCode = () => {
    setIsVerifying(true);
    setShowNotification(false);
    setTimeout(() => {
      generateSecurityCode();
      setIsVerifying(false);
      setTimeout(() => setShowNotification(true), 500);
    }, 1500);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsPublishing(false);
    setIsAdminOpen(false);
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-4xl z-[200] border border-white/20 flex items-center gap-3 backdrop-blur-xl';
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> MUSARTUR.COM PUBLICADO EXITOSAMENTE`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#020412] text-[#f1f5f9] selection:bg-blue-600/40 relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 18, repeat: Infinity }} className="absolute -top-[15%] -left-[15%] w-[130%] h-[130%] bg-blue-900/10 blur-[200px] rounded-full" />
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }} className="absolute text-blue-500/20" style={{ left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }}>
            <Star size={Math.random() * 4 + 2} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Mock Email Notification Simulation */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[300] w-[90%] max-w-md bg-[#1e293b]/90 backdrop-blur-2xl border border-blue-500/30 p-6 rounded-[2.5rem] shadow-4xl flex items-center gap-6"
          >
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xl">
              <Mail size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Security Alert</span>
                <span className="text-[8px] opacity-40 font-mono">Just Now</span>
              </div>
              <p className="text-xs font-bold text-white mb-1">Tu código Mus Artur: <span className="text-blue-400 text-sm tracking-widest">{generatedCode}</span></p>
              <p className="text-[9px] opacity-40 font-medium">Enviado a {data.securityEmail}</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="p-2 hover:bg-white/5 rounded-full transition-all"><X size={16}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative pt-24 pb-16 px-4 text-center z-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative inline-block mb-12">
          <div className="absolute inset-0 bg-blue-600/30 rounded-full blur-[60px] animate-pulse" />
          <img src={data.headerLogo || DEFAULT_LOGO} alt="Logo" className="relative w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full border-4 border-white/5 shadow-4xl object-cover" />
        </motion.div>
        <h1 className="font-orbitron text-5xl md:text-[6.5rem] font-black blue-gradient-text tracking-tighter filter drop-shadow-2xl">Mus Artur</h1>
        <p className="mt-6 text-sm md:text-lg font-light italic text-blue-100/60 tracking-[0.5em] uppercase">Música que inspira · amor que transforma</p>
        <button onClick={() => { setIsAdminOpen(true); setLoginStep(1); setTwoFactorCode(''); setGeneratedCode(''); }} className="mt-12 px-12 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.6em] flex items-center gap-4 mx-auto shadow-4xl hover:border-blue-500/50 transition-all group">
          <Settings size={18} className="text-blue-500 group-hover:rotate-180 transition-transform duration-1000" />
          Terminal Admin
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10 space-y-40 md:space-y-60">
        <Section title="Biografía" icon={<Sparkles className="text-blue-400" />}>
           <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} className="relative w-full aspect-[2.5/1] rounded-[5rem] overflow-hidden shadow-4xl border border-white/5 mb-16 interactive-reflection">
              <img src={data.artistCover || DEFAULT_BANNER} className="w-full h-full object-cover" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020412] via-transparent to-transparent opacity-90" />
           </motion.div>
           <InteractiveCard>
              <div className="bg-white/[0.01] backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] border border-white/5 shadow-4xl floating">
                <p className="text-xl md:text-4xl leading-relaxed font-light text-blue-50/90 italic border-l-8 border-blue-600 pl-12">"{data.about}"</p>
              </div>
           </InteractiveCard>
        </Section>

        <Section title="Discografía" icon={<Disc className="text-indigo-400 animate-spin-slow" />}>
          <div className="grid gap-28">
            {data.songs.map((song) => (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={song.id} className="group relative bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-10 rounded-[6rem] shadow-4xl interactive-reflection">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12 relative z-10 px-6">
                  <h3 className="text-4xl md:text-6xl font-orbitron font-black tracking-tighter leading-none">{song.title}</h3>
                  <div className="flex gap-4">
                    <button onClick={() => setShareSong(song)} className="p-5 bg-white/5 rounded-full border border-white/5 text-blue-400 hover:bg-white/10 transition-all"><Share2 size={24} /></button>
                    {song.videoUrl && <SocialIcon type="YouTube" url={song.videoUrl} size="sm" isSongLink />}
                  </div>
                </div>
                {song.videoUrl && <VideoEmbed url={song.videoUrl} />}
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Próximos Pasos" icon={<Calendar className="text-blue-500" />}>
          <div className="grid lg:grid-cols-2 gap-14">
            {data.upcoming.map(u => (
              <div key={u.id} className="bg-white/[0.02] border border-white/10 p-12 rounded-[5rem] shadow-4xl interactive-reflection">
                <h3 className="text-2xl font-orbitron mb-8 flex items-center gap-6"><span className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />{u.title}</h3>
                {u.youtubeTrailer && <VideoEmbed url={u.youtubeTrailer} />}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Conectar" icon={<Share2 className="text-blue-400" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {data.socials.map(s => <SocialIcon key={s.id} type={s.name} url={s.url} />)}
          </div>
        </Section>

        <Section title="Canal Directo" icon={<Mail className="text-indigo-500" />}>
          <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-12 md:p-24 rounded-[6rem] max-w-5xl mx-auto shadow-4xl interactive-reflection">
            <ContactForm adminEmail={data.contactEmail} onMessageSent={(m) => setData(prev => ({...prev, messages: [m, ...prev.messages]}))} />
          </div>
        </Section>
      </main>

      <footer className="text-center py-24 opacity-30 border-t border-white/5 mt-32">
        <p className="text-[11px] font-black tracking-[0.5em] uppercase">© 2026 MUSARTUR.COM - ACCESO RESTRINGIDO</p>
      </footer>

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#020412]/99 backdrop-blur-3xl overflow-y-auto">
            <div className="sticky top-0 z-[60] bg-[#020412]/90 backdrop-blur-2xl border-b border-white/10 px-10 py-8 flex justify-between items-center shadow-4xl">
              <div className="flex items-center gap-8">
                <div className="p-4 bg-blue-600/20 rounded-2xl"><Settings size={28} className="text-blue-500" /></div>
                <div>
                  <h2 className="text-2xl font-orbitron font-black text-white tracking-widest uppercase">Seguridad Administrativa</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                    <span className="text-[9px] uppercase font-black tracking-widest opacity-60">Protección de Datos Activa</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setIsAdminOpen(false); setShowNotification(false); }} className="p-4 bg-white/5 rounded-full hover:bg-red-500/20 border border-white/10 transition-all"><X size={24} /></button>
            </div>

            <div className="max-w-7xl mx-auto p-10 md:p-24 pb-48">
              {!isLoggedIn ? (
                <div className="max-w-md mx-auto py-12 text-center space-y-16">
                   <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="w-28 h-28 bg-blue-600/10 rounded-[3rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-4xl">
                    {loginStep === 1 ? <Lock size={48} className="text-blue-500" /> : <Smartphone size={48} className="text-amber-500" />}
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {loginStep === 1 ? (
                      <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                         <div className="space-y-4">
                            <h3 className="text-3xl font-orbitron font-black uppercase tracking-widest">Identificación</h3>
                            <p className="text-[10px] uppercase font-black opacity-30 tracking-[0.3em]">Acceso Maestro Nivel 5</p>
                         </div>
                         <div className="space-y-5">
                            <input type="email" placeholder="Usuario Raíz" value={loginForm.email} onChange={e => {setLoginForm(p => ({...p, email: e.target.value})); setLoginError('');}} className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 outline-none focus:border-blue-500 transition-all text-sm" />
                            <input type="password" placeholder="Clave Maestra" value={loginForm.password} onChange={e => {setLoginForm(p => ({...p, password: e.target.value})); setLoginError('');}} className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-6 outline-none focus:border-blue-500 transition-all text-sm" />
                            {loginError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{loginError}</p>}
                            <button onClick={handleLogin} disabled={isVerifying} className="w-full bg-blue-600 py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-4xl flex items-center justify-center gap-4 hover:bg-blue-500 transition-all">
                              {isVerifying ? <Loader2 className="animate-spin" size={18}/> : <Fingerprint size={18}/>} Iniciar Fase de Validación
                            </button>
                         </div>
                      </motion.div>
                    ) : (
                      <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-10">
                        <div className="space-y-4">
                           <h3 className="text-3xl font-orbitron font-black uppercase tracking-widest text-amber-500">2-Factor Auth</h3>
                           <p className="text-[10px] uppercase font-black opacity-40 tracking-[0.2em]">Código dinámico enviado a: {data.securityEmail}</p>
                        </div>
                        <div className="space-y-8">
                           <input type="text" maxLength={6} placeholder="000000" value={twoFactorCode} onChange={e => {setTwoFactorCode(e.target.value); setLoginError('');}} className="w-full bg-white/5 border border-amber-500/30 rounded-[2.5rem] py-10 text-center text-5xl font-orbitron font-bold tracking-[0.6em] outline-none text-amber-500 focus:border-amber-500" />
                           {loginError && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{loginError}</p>}
                           <div className="flex gap-4">
                              <button onClick={() => { setLoginStep(1); setShowNotification(false); }} className="px-8 py-7 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest">Atrás</button>
                              <button onClick={handleVerify2FA} disabled={isVerifying} className="flex-1 bg-amber-500 text-black py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] shadow-4xl flex items-center justify-center gap-4">
                                {isVerifying ? <Loader2 className="animate-spin" size={18}/> : <ShieldCheck size={18}/>} Validar e Ingresar
                              </button>
                           </div>
                           <button onClick={resendCode} className="text-[9px] uppercase font-black tracking-widest opacity-30 hover:opacity-100 transition-opacity">¿No recibiste el código? Reenviar ahora</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-20">
                  <div className="grid md:grid-cols-2 gap-10">
                     <div className="bg-blue-600/10 border border-blue-500/20 rounded-[4rem] p-10 flex items-center gap-8">
                        <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center text-blue-400 shadow-2xl"><Globe size={40} /></div>
                        <div>
                          <h4 className="text-xl font-orbitron font-black uppercase tracking-widest">musartur.com</h4>
                          <div className="flex items-center gap-3 mt-1"><CheckCircle size={14} className="text-green-500"/> <span className="text-[10px] font-black opacity-60">DNS OPERATIVO</span></div>
                        </div>
                     </div>
                     <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[4rem] p-10 flex items-center gap-8">
                        <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center text-indigo-400 shadow-2xl"><ShieldCheck size={40} /></div>
                        <div>
                          <h4 className="text-xl font-orbitron font-black uppercase tracking-widest">Nivel de Seguridad</h4>
                          <div className="flex items-center gap-3 mt-1"><BellRing size={14} className="text-amber-500"/> <span className="text-[10px] font-black opacity-60">2FA DYNAMICS ACTIVE</span></div>
                        </div>
                     </div>
                  </div>

                  <AdminDashboard data={data} setData={setData} onLogout={() => { setIsLoggedIn(false); setLoginStep(1); }} onPublish={handlePublish} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareSong && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-3xl" onClick={() => setShareSong(null)} />
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[4rem] p-12 shadow-4xl text-center space-y-12">
              <div className="w-24 h-24 bg-blue-600/20 rounded-[2.5rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-2xl text-blue-500"><Share2 size={40} /></div>
              <div className="space-y-4">
                <h3 className="text-3xl font-orbitron font-black uppercase tracking-tighter">Compartir Track</h3>
                <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">{shareSong.title}</p>
              </div>
              <div className="space-y-6">
                 <div className="bg-black/40 border border-white/5 p-4 pl-10 rounded-full flex items-center justify-between">
                    <span className="text-[10px] opacity-40 font-mono truncate mr-4">musartur.com/track/{shareSong.id}</span>
                    <button onClick={() => { navigator.clipboard.writeText(`https://musartur.com/track/${shareSong.id}`); alert("Link copiado"); }} className="p-5 bg-blue-600 rounded-full shadow-2xl transition-all hover:bg-blue-500"><Copy size={20} /></button>
                 </div>
              </div>
              <button onClick={() => setShareSong(null)} className="text-[10px] uppercase font-black tracking-widest opacity-20 hover:opacity-100 transition-opacity">Cerrar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="flex flex-col md:flex-row items-center gap-8 mb-24">
      <div className="p-7 bg-blue-600/10 rounded-3xl border border-blue-500/10 shadow-4xl text-blue-500">{icon}</div>
      <h2 className="text-5xl md:text-7xl font-orbitron font-black uppercase tracking-tighter">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-blue-600/20 to-transparent ml-12 hidden md:block" />
    </div>
    {children}
  </motion.section>
);

const InteractiveCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-300, 300], [5, -5]), { stiffness: 100 });
  const ry = useSpring(useTransform(x, [-300, 300], [-5, 5]), { stiffness: 100 });
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); x.set(e.clientX - (r.left + r.width / 2)); y.set(e.clientY - (r.top + r.height / 2)); }} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
};

const VideoEmbed: React.FC<{ url: string }> = ({ url }) => {
  const id = getYTid(url);
  if (!id) return <div className="aspect-video bg-black/60 rounded-[4rem] flex items-center justify-center opacity-30 italic">Previsualización no disponible</div>;
  return (
    <div className="aspect-video w-full rounded-[4rem] overflow-hidden border border-white/10 shadow-4xl bg-black">
      <iframe src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&vq=hd1080`} className="w-full h-full border-0" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
    </div>
  );
};

const SocialIcon: React.FC<{ type: Social['name']; url: string; size?: 'sm' | 'md', isSongLink?: boolean }> = ({ type, url, size = 'md' }) => {
  const icons: any = { Instagram: Instagram, YouTube: Music, Spotify: Disc, Facebook: Facebook, TikTok: Music, X: Twitter, Snapchat: Sparkles };
  const Icon = icons[type] || Globe;
  return (
    <motion.a whileHover={{ y: -10, scale: 1.05 }} href={url} target="_blank" className={`${size === 'sm' ? 'p-5 w-16 h-16' : 'p-12 h-44'} bg-white/[0.02] border border-white/5 rounded-[3rem] flex items-center justify-center shadow-4xl transition-all hover:bg-blue-600/10 hover:border-blue-500/30 text-blue-400`}><Icon size={size === 'sm' ? 24 : 48} /></motion.a>
  );
};

const ContactForm: React.FC<{ adminEmail: string; onMessageSent: (m: Message) => void }> = ({ onMessageSent }) => {
  const [f, setF] = useState({ name: '', email: '', msg: '' });
  const [l, setL] = useState(false);
  const send = () => { if(!f.name || !f.email || !f.msg) return; setL(true); setTimeout(() => { onMessageSent({ id: Date.now().toString(), name: f.name, email: f.email, message: f.msg, date: new Date().toLocaleString() }); setF({ name: '', email: '', msg: '' }); setL(false); alert("¡Cifrado y enviado!"); }, 2000); };
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-10">
        <input placeholder="Firma" value={f.name} onChange={e => setF({...f, name: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] px-12 py-7 outline-none focus:border-blue-500 transition-all text-sm"/>
        <input placeholder="Email Retorno" value={f.email} onChange={e => setF({...f, email: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] px-12 py-7 outline-none focus:border-blue-500 transition-all text-sm"/>
      </div>
      <textarea placeholder="Frecuencia de mensaje..." rows={6} value={f.msg} onChange={e => setF({...f, msg: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-[3.5rem] px-12 py-10 outline-none focus:border-blue-500 transition-all text-sm resize-none"/>
      <button onClick={send} disabled={l} className="w-full bg-blue-600 py-8 rounded-full font-black uppercase tracking-[0.8em] text-[12px] shadow-4xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4">
        {l ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>} Transmitir Mensaje
      </button>
    </div>
  );
};

const AdminDashboard: React.FC<{ data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; onLogout: () => void; onPublish: () => void }> = ({ data, setData, onLogout, onPublish }) => {
  const [newS, setNewS] = useState({ title: '', videoUrl: '' });
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);
  const update = (f: string, v: any) => setData(p => ({...p, [f]: v}));
  const addS = () => { if(!newS.title) return; setData(p => ({...p, songs: [{id: Date.now().toString(), ...newS}, ...p.songs]})); setNewS({title:'', videoUrl:''}); };
  const del = (t: any, id: string) => setData(p => ({...p, [t]: (p[t] as any[]).filter(i => i.id !== id)}));
  const handleFile = (e: any, f: string) => { const file = e.target.files?.[0]; if(file) { const r = new FileReader(); r.onload = () => update(f, r.result); r.readAsDataURL(file); } };

  return (
    <div className="grid xl:grid-cols-2 gap-20">
      <div className="space-y-20">
        <AdminCard title="Seguridad de la Cuenta" icon={<Lock />}>
           <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-4">Email Maestro (Notificaciones 2FA)</label>
                <input value={data.securityEmail} onChange={e => update('securityEmail', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-amber-500 text-amber-500 font-bold" />
              </div>
              <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-center gap-6">
                 <ShieldCheck className="text-amber-500" size={32}/>
                 <p className="text-[10px] text-amber-200/50 leading-relaxed font-bold uppercase tracking-widest">El sistema enviará el código de verificación dinámico a este email en cada inicio de sesión administrativo.</p>
              </div>
           </div>
        </AdminCard>

        <AdminCard title="Identidad de Marca" icon={<ImageIcon />}>
           <div className="space-y-10">
              <div className="flex items-center gap-10">
                 <img src={data.headerLogo} className="w-24 h-24 rounded-full border-2 border-blue-500/30 object-cover shadow-4xl" alt="P" />
                 <button onClick={() => logoRef.current?.click()} className="flex-1 p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest"><Upload size={16} className="inline mr-3"/> Cambiar Logo</button>
                 <input type="file" ref={logoRef} hidden onChange={e => handleFile(e, 'headerLogo')} />
              </div>
              <div className="space-y-4">
                 <div className="w-full aspect-[3/1] rounded-3xl border-2 border-blue-500/20 overflow-hidden shadow-4xl bg-black">
                    <img src={data.artistCover} className="w-full h-full object-cover" alt="B" />
                 </div>
                 <button onClick={() => bannerRef.current?.click()} className="w-full p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest"><Upload size={16} className="inline mr-3"/> Cambiar Banner</button>
                 <input type="file" ref={bannerRef} hidden onChange={e => handleFile(e, 'artistCover')} />
              </div>
           </div>
        </AdminCard>
        
        <AdminCard title="Biografía Oficial" icon={<Sparkles />}>
           <textarea value={data.about} onChange={e => update('about', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 min-h-[300px] outline-none focus:border-blue-500 text-sm"/>
        </AdminCard>
      </div>

      <div className="space-y-20">
        <AdminCard title="Gestión de Tracks" icon={<Disc />}>
           <div className="space-y-8 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
              <div className="bg-blue-600/5 p-8 rounded-[3rem] border border-blue-500/10 space-y-4">
                 <input placeholder="Título del Track" value={newS.title} onChange={e => setNewS({...newS, title: e.target.value})} className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4 text-xs"/>
                 <input placeholder="URL YouTube Oficial" value={newS.videoUrl} onChange={e => setNewS({...newS, videoUrl: e.target.value})} className="w-full bg-black/30 border border-white/5 rounded-2xl px-6 py-4 text-xs"/>
                 <button onClick={addS} className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest">Añadir a Catálogo</button>
              </div>
              {data.songs.map(s => (
                <div key={s.id} className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 flex items-center justify-between">
                   <span className="text-xs font-bold">{s.title}</span>
                   <button onClick={() => del('songs', s.id)} className="p-3 text-red-500/40 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                </div>
              ))}
           </div>
        </AdminCard>

        <AdminCard title="Buzón Maestro" icon={<Mail />}>
           <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
              {data.messages.length === 0 ? <p className="text-center opacity-20 py-10 uppercase font-black text-[10px] tracking-widest italic">Terminal Limpia</p> : data.messages.map(m => (
                <div key={m.id} className="bg-black/60 p-8 rounded-3xl border border-white/5 relative group">
                   <button onClick={() => del('messages', m.id)} className="absolute top-6 right-6 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                   <div className="mb-4">
                      <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest">{m.name}</span>
                      <span className="text-[8px] opacity-20 ml-4">{m.date}</span>
                   </div>
                   <p className="text-[12px] opacity-80 mb-4 font-light italic leading-relaxed">"{m.message}"</p>
                   <span className="text-[8px] opacity-30 font-bold">{m.email}</span>
                </div>
              ))}
           </div>
        </AdminCard>

        <div className="grid grid-cols-2 gap-6">
           <button onClick={onPublish} className="bg-blue-600 py-8 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-4xl hover:bg-blue-500 transition-all">Publicar Todo</button>
           <button onClick={onLogout} className="bg-red-950/20 text-red-500 border border-red-900/30 py-8 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

const AdminCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white/[0.02] p-10 md:p-14 rounded-[5rem] border border-white/5 shadow-4xl space-y-12 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-all transform scale-150 rotate-12">
      {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 120 })}
    </div>
    <div className="flex items-center gap-6 text-blue-500 uppercase font-black tracking-[0.4em] text-[13px] relative z-10">
      <div className="p-4 bg-blue-500/10 rounded-2xl">{icon}</div>
      <span>{title}</span>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default App;
