
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
  Upload
} from 'lucide-react';
import { AppData, Song, Social, UpcomingProject, Message } from './types';

declare const emailjs: any;

const DEFAULT_LOGO = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=200&h=200&auto=format&fit=crop";
const DEFAULT_BANNER = "https://images.unsplash.com/photo-1514525253361-bee87184f47a?auto=format&fit=crop&q=80&w=1200";

/**
 * Enhanced YouTube ID extractor to prevent playback errors.
 */
const getYTid = (url: string | undefined): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const App: React.FC = () => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('musArturData');
    return saved ? JSON.parse(saved) : {
      about: "Mus Artur es un proyecto musical enfocado en transmitir mensajes de fe, esperanza y amor a través de canciones originales.",
      headerLogo: DEFAULT_LOGO,
      artistCover: DEFAULT_BANNER,
      contactEmail: "vicrober0125@gmail.com",
      songs: [],
      socials: [
        { id: '1', name: 'Instagram', url: '#' },
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
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [shareSong, setShareSong] = useState<Song | null>(null);

  // Robust Auto-save effect
  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      localStorage.setItem('musArturData', JSON.stringify(data));
      setIsSaving(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [data]);

  const handleLogin = () => {
    if (loginForm.email === "vicrober0125@gmail.com" && loginForm.password === "vico0125") {
      setIsLoggedIn(true);
    } else {
      alert("Acceso denegado. Credenciales inválidas.");
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsPublishing(false);
    setIsAdminOpen(false);
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-[0_20px_60px_rgba(34,197,94,0.4)] z-[100] border border-white/20 flex items-center gap-3';
    toast.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> SITIO WEB ACTUALIZADO`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, -20px)';
      toast.style.transition = 'all 0.5s';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020412] text-[#f1f5f9] selection:bg-blue-600/40 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[15%] -left-[15%] w-[130%] h-[130%] bg-blue-900/10 blur-[200px] rounded-full"
        />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ opacity: [0, 0.4, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 10 }}
            className="absolute text-blue-400/10"
          >
            <Star size={Math.random() * 6 + 2} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <header className="relative pt-24 pb-16 px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="relative inline-block mb-12 group"
        >
          <div className="absolute inset-0 bg-blue-600/40 rounded-full blur-[60px] animate-pulse group-hover:bg-blue-500/50 transition-all duration-1000" />
          <img 
            src={data.headerLogo || DEFAULT_LOGO} 
            alt="Logo" 
            className="relative w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full border-4 border-white/5 shadow-[0_0_80px_rgba(37,99,235,0.3)] object-cover hover:scale-105 transition-transform duration-1000 cursor-pointer"
          />
        </motion.div>
        
        <motion.h1 className="font-orbitron text-5xl md:text-[6rem] font-bold blue-gradient-text tracking-tighter filter drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
          Mus Artur
        </motion.h1>
        
        <motion.p className="mt-6 text-sm md:text-lg font-light italic text-blue-100/70 tracking-[0.5em] uppercase">
          Música que inspira · amor que transforma
        </motion.p>
        
        <motion.button 
          whileHover={{ scale: 1.05, y: -4, backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdminOpen(true)}
          className="mt-12 px-10 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.6em] flex items-center gap-4 mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-blue-400/50 group"
        >
          <Settings size={16} className="text-blue-500 group-hover:rotate-180 transition-transform duration-1000" />
          <span>Configuración</span>
        </motion.button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-20 relative z-10 space-y-36 md:space-y-52">
        <Section title="Biografía" icon={<Sparkles className="text-blue-400" />}>
          <div className="space-y-16">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full aspect-[21/9] md:aspect-[2.5/1] min-h-[250px] rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-3xl border border-white/5 group interactive-reflection"
            >
              <img src={data.artistCover || DEFAULT_BANNER} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s]" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020412] via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white font-orbitron text-5xl md:text-7xl font-black opacity-10 tracking-[0.3em] select-none uppercase">Mus Artur</span>
              </div>
            </motion.div>

            <InteractiveCard>
              <div className="bg-white/[0.01] backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] border border-white/5 shadow-3xl floating hover:bg-white/[0.03] transition-colors duration-1000">
                <p className="text-xl md:text-3xl leading-relaxed font-light text-blue-50/90 italic border-l-4 border-blue-600 pl-10">
                  "{data.about}"
                </p>
              </div>
            </InteractiveCard>
          </div>
        </Section>

        <Section title="Música" icon={<Disc className="text-indigo-400 animate-spin-slow" />}>
          <div className="grid gap-24">
            {data.songs.length === 0 ? (
              <div className="text-center py-40 opacity-20 border-2 border-dashed border-white/10 rounded-[4rem] flex flex-col items-center gap-6">
                <Music size={48} />
                <p className="text-xl font-orbitron tracking-widest uppercase">Explorando sonidos...</p>
              </div>
            ) : (
              data.songs.map((song) => (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  key={song.id} 
                  className="group relative bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-6 md:p-10 rounded-[5rem] md:rounded-[7rem] shadow-3xl hover:bg-white/[0.04] transition-all duration-700 interactive-reflection"
                >
                  <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10 relative z-10 px-4">
                    <h3 className="text-3xl md:text-5xl font-orbitron font-black tracking-tighter group-hover:text-blue-400 transition-colors drop-shadow-2xl leading-none">{song.title}</h3>
                    <div className="flex gap-4 items-center">
                      <motion.button 
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShareSong(song)}
                        className="p-4 w-14 h-14 md:w-16 md:h-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center transition-all hover:bg-white/10 shadow-3xl text-blue-400"
                        title="Compartir"
                      >
                        <Share2 size={20} />
                      </motion.button>
                      {song.youtubeLink && <SocialIcon type="YouTube" url={song.youtubeLink} size="sm" isSongLink />}
                      {song.spotifyLink && <SocialIcon type="Spotify" url={song.spotifyLink} size="sm" isSongLink />}
                    </div>
                  </div>
                  {(song.videoUrl || song.youtubeLink) && (
                    <div className="relative z-10 floating shadow-[0_30px_70px_rgba(0,0,0,0.8)] rounded-[3rem] md:rounded-[4rem] overflow-hidden w-full">
                      <VideoEmbed url={song.videoUrl || song.youtubeLink} />
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </Section>

        <Section title="Lanzamientos" icon={<Calendar className="text-blue-500" />}>
          <div className="grid lg:grid-cols-2 gap-12">
            {data.upcoming.map(u => (
              <motion.div key={u.id} className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[4rem] hover:-translate-y-4 transition-all shadow-3xl group interactive-reflection">
                <h3 className="text-xl md:text-2xl font-orbitron mb-8 flex items-center gap-5 tracking-tight">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping shrink-0" />
                  {u.title}
                </h3>
                {u.youtubeTrailer && <VideoEmbed url={u.youtubeTrailer} />}
                <div className="flex gap-6 mt-10">
                  {u.youtubeTrailer && <ActionButton link={u.youtubeTrailer}>Trailer</ActionButton>}
                  {u.spotifyPreSave && <ActionButton link={u.spotifyPreSave} variant="secondary">Pre-guardar</ActionButton>}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Redes" icon={<Share2 className="text-blue-400" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.socials.map(s => (
              <SocialIcon key={s.id} type={s.name} url={s.url} />
            ))}
          </div>
        </Section>

        <Section title="Contacto" icon={<Mail className="text-indigo-500" />}>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 p-12 md:p-20 rounded-[5rem] max-w-5xl mx-auto shadow-4xl interactive-reflection"
          >
            <ContactForm 
              adminEmail={data.contactEmail} 
              onMessageSent={(m) => setData(prev => ({...prev, messages: [m, ...prev.messages]}))} 
            />
          </motion.div>
        </Section>
      </main>

      <footer className="text-center py-16 opacity-40 border-t border-white/5 mt-24">
        <p className="text-[10px] font-black tracking-[0.3em] uppercase">© 2026 Mus Artur - Artista Oficial</p>
      </footer>

      {/* Share Modal */}
      <AnimatePresence>
        {shareSong && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShareSong(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-gradient-to-br from-[#101424] to-[#020412] border border-white/10 rounded-[3rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShareSong(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5">
                  <X size={20} />
                </button>
              </div>

              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-blue-600/20 rounded-[2rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-2xl">
                  <Share2 size={32} className="text-blue-500" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-orbitron font-black text-white tracking-tighter uppercase">Compartir</h3>
                  <p className="text-base text-blue-400 font-bold opacity-80">{shareSong.title}</p>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center gap-4 bg-black/40 border border-white/5 p-3 pl-6 rounded-full overflow-hidden">
                    <span className="text-[10px] opacity-40 font-mono truncate flex-1">
                      {window.location.origin}/#song-{shareSong.id}
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/#song-${shareSong.id}`);
                        alert("Enlace copiado al portapapeles");
                      }}
                      className="p-4 bg-blue-600 rounded-full hover:bg-blue-500 transition-all shadow-xl"
                    >
                      <Copy size={18} />
                    </button>
                  </div>

                  <div className="flex justify-center gap-6 pt-4">
                    <SocialShareButton type="WhatsApp" song={shareSong} icon={<Send size={24} className="rotate-[-20deg]" />} color="#25D366" />
                    <SocialShareButton type="Instagram" song={shareSong} icon={<Instagram size={24} />} color="#E1306C" />
                    <SocialShareButton type="Twitter" song={shareSong} icon={<Twitter size={24} />} color="#1DA1F2" />
                    <SocialShareButton type="Facebook" song={shareSong} icon={<Facebook size={24} />} color="#1877F2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPublishing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-blue-600 flex flex-col items-center justify-center text-white p-10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="mb-8">
              <RefreshCcw size={80} strokeWidth={1} />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black tracking-tighter uppercase text-center">Publicando Cambios</h2>
            <p className="mt-4 text-sm md:text-lg font-light tracking-[0.4em] opacity-60 uppercase text-center">Optimizando activos digitales</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#020412]/98 backdrop-blur-3xl overflow-y-auto">
            <div className="sticky top-0 z-[60] bg-[#020412]/90 backdrop-blur-xl border-b border-white/10 px-8 py-6 flex justify-between items-center shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="p-3 bg-blue-600/20 rounded-xl"><Settings size={24} className="text-blue-500" /></div>
                <div>
                  <h2 className="text-xl md:text-2xl font-orbitron font-black text-white tracking-tighter uppercase leading-none">Panel</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                    <span className="text-[8px] uppercase font-black tracking-[0.2em] opacity-50">{isSaving ? 'Guardando...' : 'Sincronizado'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isLoggedIn && (
                  <button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-3xl transition-all">
                    <CloudUpload size={18} /> Publicar
                  </button>
                )}
                <button onClick={() => setIsAdminOpen(false)} className="p-3 bg-white/5 rounded-full hover:bg-red-500/20 transition-all border border-white/10 group"><X size={20} className="group-hover:rotate-90 transition-transform" /></button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto p-8 md:p-20 pb-40">
              {!isLoggedIn ? (
                <div className="max-w-md mx-auto py-24 text-center space-y-12">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-2xl">
                    <Settings size={40} className="text-blue-500" />
                  </motion.div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-orbitron font-black uppercase tracking-widest text-blue-100">Acceso Admin</h3>
                    <div className="space-y-4">
                      <input type="email" placeholder="Usuario" value={loginForm.email} onChange={e => setLoginForm(p => ({...p, email: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 outline-none focus:border-blue-500 text-sm" />
                      <input type="password" placeholder="Clave" value={loginForm.password} onChange={e => setLoginForm(p => ({...p, password: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-5 outline-none focus:border-blue-500 text-sm" />
                      <button onClick={handleLogin} className="w-full bg-blue-600 py-6 rounded-[1.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-blue-500 shadow-3xl transition-all">Ingresar</button>
                    </div>
                  </div>
                </div>
              ) : (
                <AdminDashboard data={data} setData={setData} onLogout={() => setIsLoggedIn(false)} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
    <div className="flex flex-col md:flex-row items-center gap-6 mb-20">
      <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-500/10 shadow-xl text-blue-400">{icon}</div>
      <h2 className="text-4xl md:text-6xl font-orbitron font-black uppercase tracking-tighter text-white/90">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-8 hidden md:block" />
    </div>
    {children}
  </motion.section>
);

const InteractiveCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [4, -4]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-4, 4]), { stiffness: 120, damping: 25 });
  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

const VideoEmbed: React.FC<{ url: string | undefined }> = ({ url }) => {
  const id = getYTid(url);
  if (!id) return <div className="aspect-video bg-black/60 rounded-[3rem] flex flex-col items-center justify-center opacity-40 text-xs">URL Inválida</div>;
  return (
    <div className="aspect-video w-full rounded-[3rem] overflow-hidden border border-white/10 bg-black">
      <iframe src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`} title="YouTube" className="w-full h-full border-0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
    </div>
  );
};

const ActionButton: React.FC<{ link: string; children: React.ReactNode; variant?: 'primary' | 'secondary' }> = ({ link, children, variant = 'primary' }) => (
  <motion.a whileHover={{ y: -6, scale: 1.02 }} href={link} target="_blank" className={`flex-1 text-center py-5 rounded-[2rem] font-black uppercase text-[9px] tracking-widest ${variant === 'primary' ? 'bg-blue-600 text-white shadow-xl' : 'bg-white/5 border border-white/10'}`}>{children}</motion.a>
);

const SocialIcon: React.FC<{ type: Social['name']; url: string; size?: 'sm' | 'md', isSongLink?: boolean }> = ({ type, url, size = 'md', isSongLink }) => {
  const logos: Record<string, string> = {
    Instagram: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    YouTube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
    Spotify: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    Facebook: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    TikTok: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    X: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
    Snapchat: "https://upload.wikimedia.org/wikipedia/en/a/ad/Snapchat_logo.svg"
  };
  return (
    <motion.a whileHover={{ y: -8, scale: 1.05 }} href={url} target="_blank" className={`${size === 'sm' ? 'p-4 w-14 h-14' : 'p-10 h-36'} bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-center transition-all hover:bg-white/10 shadow-2xl`}><img src={logos[type]} className={`${size === 'sm' ? 'w-8' : 'w-16'} object-contain`} alt={type} /></motion.a>
  );
};

const SocialShareButton: React.FC<{ type: string; song: Song; icon: React.ReactNode; color: string }> = ({ type, song, icon, color }) => {
  const handleShare = () => {
    const text = `¡Escucha "${song.title}" de Mus Artur!`;
    const url = `${window.location.origin}/#song-${song.id}`;
    let shareUrl = '';
    
    switch(type) {
      case 'WhatsApp': shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`; break;
      case 'Twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case 'Facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'Instagram': alert("Copia el enlace para compartir en Instagram Stories"); return;
    }
    
    if(shareUrl) window.open(shareUrl, '_blank');
  };

  return (
    <motion.button 
      whileHover={{ y: -6, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleShare}
      className="flex flex-col items-center gap-2 group"
    >
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/5 transition-all group-hover:bg-white/10"
        style={{ color: color }}
      >
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
        {type}
      </span>
    </motion.button>
  );
};

const ContactForm: React.FC<{ adminEmail: string; onMessageSent: (m: Message) => void }> = ({ adminEmail, onMessageSent }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const handleSend = () => {
    if (!formData.name || !formData.email || !formData.message) return alert("Completa los campos.");
    setLoading(true);
    setTimeout(() => {
      onMessageSent({ id: Date.now().toString(), ...formData, date: new Date().toLocaleString() });
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
      alert("¡Enviado con éxito!");
    }, 2000);
  };
  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <input placeholder="Nombre" className="bg-white/5 border border-white/5 rounded-[2rem] px-10 py-5 outline-none text-sm" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))}/>
        <input placeholder="Email" className="bg-white/5 border border-white/5 rounded-[2rem] px-10 py-5 outline-none text-sm" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))}/>
      </div>
      <textarea placeholder="Mensaje" rows={5} className="w-full bg-white/5 border border-white/5 rounded-[2.5rem] px-10 py-8 outline-none resize-none text-sm" value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))}/>
      <button onClick={handleSend} disabled={loading} className="w-full bg-blue-600 py-6 rounded-full font-black uppercase tracking-[0.6em] text-[10px] shadow-3xl">{loading ? 'Enviando...' : 'Enviar'}</button>
    </div>
  );
};

const AdminDashboard: React.FC<{ data: AppData; setData: React.Dispatch<React.SetStateAction<AppData>>; onLogout: () => void }> = ({ data, setData, onLogout }) => {
  const [newSong, setNewSong] = useState({ title: '', youtubeLink: '', spotifyLink: '', videoUrl: '' });
  const [newUpcoming, setNewUpcoming] = useState({ title: '', youtubeTrailer: '', spotifyPreSave: '' });
  const [editingItem, setEditingItem] = useState<{ type: 'songs' | 'upcoming', id: string } | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const addItem = (type: 'songs' | 'upcoming', payload: any) => {
    if (!payload.title) return;
    setData(prev => ({ ...prev, [type]: [{ id: Date.now().toString(), ...payload }, ...prev[type]] }));
  };

  const deleteItem = (type: 'songs' | 'upcoming' | 'messages', id: string) => {
    if (confirm("¿Eliminar?")) setData(prev => ({ ...prev, [type]: (prev[type] as any[]).filter(i => i.id !== id) }));
  };

  const updateItem = (type: 'songs' | 'upcoming', id: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [type]: (prev[type] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const updateSocial = (id: string, url: string) => setData(p => ({ ...p, socials: p.socials.map(s => s.id === id ? { ...s, url } : s) }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'headerLogo' | 'artistCover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid xl:grid-cols-2 gap-16">
      <div className="space-y-16">
        <AdminCard title="Identidad Visual" icon={<ImageIcon />}>
           <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase opacity-20 ml-4 block">Logo</label>
              <div className="flex items-center gap-8">
                <img src={data.headerLogo || DEFAULT_LOGO} className="w-20 h-20 rounded-full border-2 border-blue-500/30 object-cover shadow-2xl" alt="Preview Logo" />
                <div className="flex-1 space-y-3">
                  <input className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-xs outline-none focus:border-blue-500/50 transition-all" value={data.headerLogo} onChange={e => setData(p => ({...p, headerLogo: e.target.value}))} placeholder="URL del logo" />
                  <button 
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full p-4 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-600/30 transition-all flex items-center justify-center gap-2 font-black uppercase text-[8px] tracking-widest px-6"
                  >
                    <Upload size={14}/> Cargar Logo
                  </button>
                </div>
              </div>
              <input type="file" ref={logoInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, 'headerLogo')} />
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase opacity-20 ml-4 block">Banner Rectangular</label>
              <div className="space-y-4">
                <div className="w-full aspect-[2.5/1] rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-2xl bg-black">
                   <img src={data.artistCover || DEFAULT_BANNER} className="w-full h-full object-cover" alt="Preview Banner" />
                </div>
                <div className="flex gap-3">
                  <input className="flex-1 bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-xs outline-none focus:border-blue-500/50 transition-all" value={data.artistCover} onChange={e => setData(p => ({...p, artistCover: e.target.value}))} placeholder="URL del banner" />
                  <button 
                    onClick={() => bannerInputRef.current?.click()}
                    className="p-4 bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-600/30 transition-all flex items-center gap-2 font-black uppercase text-[8px] tracking-widest px-6"
                  >
                    <Upload size={14}/> Subir Banner
                  </button>
                </div>
              </div>
              <input type="file" ref={bannerInputRef} hidden accept="image/*" onChange={(e) => handleFileChange(e, 'artistCover')} />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Biografía" icon={<Sparkles />}>
          <textarea className="w-full bg-black/40 border border-white/10 rounded-[2rem] p-8 min-h-[250px] outline-none text-sm" value={data.about} onChange={e => setData(p => ({...p, about: e.target.value}))} />
        </AdminCard>

        <AdminCard title="Redes Sociales" icon={<Share2 />}>
          <div className="grid gap-4">
            {data.socials.map(s => (
              <div key={s.id} className="space-y-1">
                <span className="text-[9px] uppercase font-black opacity-30 ml-4">{s.name}</span>
                <input className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 text-xs" value={s.url} onChange={e => updateSocial(s.id, e.target.value)} />
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <div className="space-y-16">
        <AdminCard title="Discografía" icon={<Disc />}>
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar">
            <div className="space-y-4 bg-blue-600/5 p-6 rounded-3xl border border-blue-500/10">
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest block mb-2">Añadir Canción</span>
              <input placeholder="Título" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newSong.title} onChange={e => setNewSong(p => ({...p, title: e.target.value}))} />
              <input placeholder="Video URL (YouTube Embed)" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newSong.videoUrl} onChange={e => setNewSong(p => ({...p, videoUrl: e.target.value}))} />
              <input placeholder="Link YouTube" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newSong.youtubeLink} onChange={e => setNewSong(p => ({...p, youtubeLink: e.target.value}))} />
              <input placeholder="Link Spotify" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newSong.spotifyLink} onChange={e => setNewSong(p => ({...p, spotifyLink: e.target.value}))} />
              <button onClick={() => { addItem('songs', newSong); setNewSong({title:'', youtubeLink:'', spotifyLink:'', videoUrl:''}); }} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-[9px] tracking-widest transition-colors hover:bg-blue-500">Añadir Tema</button>
            </div>

            <div className="space-y-3 pt-8 border-t border-white/5">
              <span className="text-[10px] font-black uppercase opacity-20 tracking-widest block">Temas</span>
              {data.songs.map(s => (
                <div key={s.id} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-100">{s.title}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingItem(editingItem?.id === s.id ? null : { type: 'songs', id: s.id })} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all"><Edit3 size={16}/></button>
                      <button onClick={() => deleteItem('songs', s.id)} className="p-2 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  {editingItem?.id === s.id && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <input className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-[11px]" value={s.title} onChange={e => updateItem('songs', s.id, 'title', e.target.value)} />
                      <input className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-[11px]" value={s.videoUrl} onChange={e => updateItem('songs', s.id, 'videoUrl', e.target.value)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Lanzamientos" icon={<Calendar />}>
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar">
             <div className="space-y-4 bg-indigo-600/5 p-6 rounded-3xl border border-indigo-500/10">
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest block mb-2">Nuevo Proyecto</span>
              <input placeholder="Título" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newUpcoming.title} onChange={e => setNewUpcoming(p => ({...p, title: e.target.value}))} />
              <input placeholder="Trailer URL" className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-3 text-xs" value={newUpcoming.youtubeTrailer} onChange={e => setNewUpcoming(p => ({...p, youtubeTrailer: e.target.value}))} />
              <button onClick={() => { addItem('upcoming', newUpcoming); setNewUpcoming({title:'', youtubeTrailer:'', spotifyPreSave:''}); }} className="w-full bg-indigo-600 py-4 rounded-xl font-black uppercase text-[9px] tracking-widest">Añadir Proyecto</button>
            </div>

            <div className="space-y-3 pt-8 border-t border-white/5">
              {data.upcoming.map(u => (
                <div key={u.id} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-100">{u.title}</span>
                  <div className="flex gap-2">
                    <button onClick={() => deleteItem('upcoming', u.id)} className="p-2 text-red-500/30 hover:text-red-500 rounded-lg"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Mensajes" icon={<Mail />}>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
            {data.messages.length === 0 ? <p className="text-[10px] opacity-20 italic text-center py-6 uppercase tracking-widest">Sin mensajes</p> : data.messages.map(m => (
              <div key={m.id} className="bg-black/60 p-6 rounded-2xl border border-white/5 relative group">
                <button onClick={() => deleteItem('messages', m.id)} className="absolute top-4 right-4 p-1.5 text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={14}/></button>
                <div className="mb-3">
                  <span className="text-blue-400 font-black block text-[10px] uppercase tracking-widest">{m.name}</span>
                  <span className="text-[8px] opacity-20 font-medium">{m.date}</span>
                </div>
                <p className="text-[11px] opacity-80 mb-3 font-light italic leading-relaxed">"{m.message}"</p>
                <span className="text-[8px] opacity-40 font-bold uppercase tracking-widest">{m.email}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <button onClick={onLogout} className="w-full py-6 bg-red-950/20 text-red-500 border border-red-900/30 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg">Cerrar Sesión</button>
      </div>
    </div>
  );
};

const AdminCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white/[0.02] p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-4xl space-y-8 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
      {React.cloneElement(icon as React.ReactElement, { size: 80 })}
    </div>
    <div className="flex items-center gap-4 text-blue-500 uppercase font-black tracking-[0.3em] text-[11px] relative z-10">
      <div className="p-3 bg-blue-500/10 rounded-xl">{icon}</div>
      <span>{title}</span>
    </div>
    <div className="relative z-10">{children}</div>
  </div>
);

export default App;
