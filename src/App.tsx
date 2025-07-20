import './App.css'
import { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import logo from './assets/images/logo_for_FoxyTunes.png';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);
  const [highlight, setHighlight] = useState(false);
  const [msgCardRotation, setMsgCardRotation] = useState({ x: 0, y: 0 });
  const [aboutCardRotation, setAboutCardRotation] = useState({ x: 0, y: 0 });

  const handleNavClick = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'download') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1200);
    } else if (section === 'message') {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    setRotation: (r: {x: number, y: number}) => void
  ) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 18; // -9deg to 9deg
    const rotateX = ((0.5 - y / rect.height)) * 18; // -9deg to 9deg
    setRotation({ x: rotateX, y: rotateY });
  };
  const handleCardMouseLeave = (setRotation: (r: {x: number, y: number}) => void): void => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="main-bg">
      <div className="spline-bg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 4 }}>
          <Spline scene="https://prod.spline.design/powidsQhhyzKTzEQ/scene.splinecode" />
        </motion.div>
      </div>
      <motion.nav
        className="navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="logo-area">
          <img src={logo} alt="Logo" className="logo-icon" />
        </div>
        <ul className="nav-links">
          <li onClick={() => handleNavClick('home')}>Home</li>
          <li onClick={() => handleNavClick('download')}>Download</li>
          <li onClick={() => handleNavClick('message')}>A Message For You</li>
        </ul>
        <button className="get-started" onClick={() => handleNavClick('about')}>About the app</button>
      </motion.nav>
      <section className="hero" ref={heroRef}>
        <motion.div
          className="hero-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            className="hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h1 className="headline">
              <span>Connect</span>
              <br />
              <span>hearts with music</span>
            </h1>
            <p className="subtext">
              Welcome to Foxytunes! A space where voices meet, melodies travel, and hearts listen. Made for moments we cant put into words. Share songs, send love, and stay close, even when miles apart. This world was crafted with you in mind, Kaysha. 💜
            </p>
            <motion.button
              className={`download-btn${highlight ? ' highlight' : ''}`}
              ref={downloadBtnRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://drive.google.com/uc?export=download&id=1aSY7Zzv-rYIQY83KEg7UsxAzWFwr3jpf';
                link.target = '_blank';
                link.download = 'FoxyTunes-Setup.exe';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <span className="download-icon" /> Download for Windows
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      {/* Message For You Section */}
      <section ref={messageRef} className="section message-section">
        <motion.div
          className="gradient-card"
          style={{ perspective: 900 }}
          animate={{ rotateX: msgCardRotation.x, rotateY: msgCardRotation.y }}
          transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.7 }}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleCardMouseMove(e, setMsgCardRotation)}
          onMouseLeave={() => handleCardMouseLeave(setMsgCardRotation)}
        >
          <h2>A Message For You</h2>
          <p>Behind this button is a hidden gift, <br /> where time slows, music flows, <br /> and a birthday wish softly blooms. <br /> Tap to open it, its all for you. 🎂🌸</p>
          <a href="https://birthday-q74i.onrender.com/" target="_blank" rel="noopener noreferrer">Click me!</a>
        </motion.div>
      </section>
      {/* About the app Section */}
      <section ref={aboutRef} className="section about-section">
        <motion.div
          className="gradient-card"
          style={{ perspective: 900 }}
          animate={{ rotateX: aboutCardRotation.x, rotateY: aboutCardRotation.y }}
          transition={{ type: 'spring', stiffness: 180, damping: 18, mass: 0.7 }}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleCardMouseMove(e, setAboutCardRotation)}
          onMouseLeave={() => handleCardMouseLeave(setAboutCardRotation)}
        >
          <h2>About the app</h2>
          <p>FoxyTunes is more than an app, its a cozy space for us to share music, laugh, talk, and feel close no matter where we are. Built for connection. Designed with love. 💜 (More details coming soon!) </p>
        </motion.div>
      </section>
    </div>
  );
}

export default App;
