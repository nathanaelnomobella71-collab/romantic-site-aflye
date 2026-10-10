import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Camera, Music, Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveData } from './data';

export default function App() {
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [answeredYes, setAnsweredYes] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Calcul du compteur de temps
  useEffect(() => {
    const startTimestamp = new Date(loveData.startDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - startTimestamp;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeTogether({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Bouton "Non" qui fuit
  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 250;
    const randomY = (Math.random() - 0.5) * 120;
    setNoBtnStyle({
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(${randomX}px, ${randomY}px)`,
      transition: 'all 0.2s ease-in-out'
    });
  };

  // Action quand elle clique sur "Oui"
  const handleYesClick = () => {
    setAnsweredYes(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Tableau pour générer les cœurs flottants en arrière-plan
  const hearts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start p-4 md:p-8 selection:bg-rose-300 overflow-x-hidden">
      
      {/* Cœurs flottants en fond */}
      {hearts.map((h, i) => (
        <span
          key={i}
          className="heart-particle"
          style={{
            left: `${(i * 8.3) + Math.random() * 3}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`
          }}
        >
          ❤️
        </span>
      ))}

      {/* Titre */}
      <header className="text-center my-12 animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/60 px-4 py-1.5 rounded-full text-sm font-semibold text-deepPink mb-4 shadow-sm border border-rose-100">
          <Sparkles size={16} /> Pour {loveData.girlfriendName} <Sparkles size={16} />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-rose-900 tracking-tight mb-4 font-serif">
         AFLYE
        </h1>
        <p className="text-lg text-rose-700/80 max-w-xl mx-auto italic">
          "{loveData.messages[0]}"
        </p>
      </header>

      {/* Lecteur YouTube avec Lancement Automatique */}
      <section className="bg-white/70 backdrop-blur-md border border-rose-200 shadow-xl rounded-3xl p-6 md:p-8 max-w-xl w-full text-center mb-12 relative z-10">
        <h3 className="text-xl font-bold text-rose-800 mb-4 flex items-center justify-center gap-2">
          <Music className="text-deepPink" />  Amour Sincère - Yitou
        </h3>
        <div className="w-full rounded-2xl overflow-hidden shadow-md bg-rose-50">
          <iframe
            className="w-full h-56 rounded-xl"
            src="https://www.youtube.com/embed/cJXLYddpJfY?autoplay=1"
            title="Yitou - Amour Sincère"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Compteur d'amour */}
      <section className="bg-white/70 backdrop-blur-md border border-rose-200 shadow-xl rounded-3xl p-6 md:p-8 max-w-2xl w-full text-center mb-12 relative z-10">
        <h3 className="text-xl font-bold text-rose-800 mb-6 flex items-center justify-center gap-2">
          <Calendar className="text-deepPink" /> Ensemble depuis...
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100">
            <span className="block text-3xl font-black text-rose-900">{timeTogether.days}</span>
            <span className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Jours</span>
          </div>
          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100">
            <span className="block text-3xl font-black text-rose-900">{timeTogether.hours}</span>
            <span className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Heures</span>
          </div>
          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100">
            <span className="block text-3xl font-black text-rose-900">{timeTogether.minutes}</span>
            <span className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Minutes</span>
          </div>
          <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-100">
            <span className="block text-3xl font-black text-rose-900">{timeTogether.seconds}</span>
            <span className="text-xs uppercase tracking-wider text-rose-600 font-semibold">Secondes</span>
          </div>
        </div>
      </section>

      {/* Générateur de Billets Doux / Lettres d'amour */}
      {loveData.letters && (
        <section className="max-w-3xl w-full mb-12 relative z-10">
          <h2 className="text-xl md:text-3xl font-bold text-center text-rose-900 mb-6 font-serif flex items-center justify-center gap-2">
            <Mail className="text-deepPink" /> Petites Lettres Pour Toi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            {loveData.letters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => setSelectedLetter(letter)}
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-rose-200 shadow-md hover:shadow-xl hover:scale-105 transition-all text-left flex items-center gap-4 group cursor-pointer"
              >
                <div className="p-3 bg-rose-100 rounded-xl text-deepPink group-hover:bg-deepPink group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-rose-900 text-sm md:text-base">{letter.title}</h4>
                  <p className="text-xs text-rose-600 mt-1">Clique pour lire 💌</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Modal d'affichage de la Lettre sélectionnée */}
      {selectedLetter && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-rose-200 relative text-center">
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-deepPink">
              <Heart size={24} className="fill-deepPink" />
            </div>
            <h3 className="text-xl font-bold text-rose-900 mb-4 font-serif">{selectedLetter.title}</h3>
            <p className="text-rose-800 leading-relaxed text-sm md:text-base mb-6 bg-rose-50/50 p-4 rounded-2xl border border-rose-100 italic">
              "{selectedLetter.content}"
            </p>
            <button
              onClick={() => setSelectedLetter(null)}
              className="bg-deepPink text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:bg-rose-600 transition-all text-sm cursor-pointer"
            >
              Fermer la lettre 💕
            </button>
          </div>
        </div>
      )}

      {/* Galerie Photos Polaroid */}
      <section className="max-w-5xl w-full mb-16 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-rose-900 mb-8 font-serif flex items-center justify-center gap-2">
          <Camera className="text-deepPink" /> MADAME MA FEMME
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {loveData.photos.map((photo) => (
            <div key={photo.id} className="bg-white p-4 pb-6 rounded shadow-lg transform rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300 border border-rose-100">
              <div className="overflow-hidden h-64 rounded bg-rose-50 mb-4">
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
              </div>
              <p className="text-center font-medium text-rose-900 text-sm">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Raisons */}
      <section className="bg-white/60 backdrop-blur-md border border-rose-200 rounded-3xl p-8 max-w-3xl w-full mb-16 shadow-lg relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-rose-900 mb-8 font-serif flex items-center justify-center gap-2">
          <Heart className="text-deepPink fill-deepPink" /> Pourquoi je t'aime
        </h2>
        <div className="space-y-4">
          {loveData.reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-rose-100 shadow-sm">
              <span className="bg-deepPink text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-rose-900 font-medium">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Question Interactive */}
      <section className="bg-white/80 backdrop-blur-md border border-rose-200 rounded-3xl p-8 max-w-xl w-full text-center mb-20 shadow-xl relative overflow-hidden z-10">
        {!answeredYes ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-rose-900 mb-6 font-serif">
              M'aimeras-tu pour toujours ? 💍
            </h2>
            <div className="flex items-center justify-center gap-6 relative min-h-[120px]">
              <button
                onClick={handleYesClick}
                className="bg-deepPink hover:bg-rose-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all z-10 cursor-pointer"
              >
                Oui, pour la vie ! 💕
              </button>
              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={noBtnStyle}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-full transition-all cursor-pointer"
              >
                Non 🙈
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-in py-4">
            <h2 className="text-3xl font-extrabold text-deepPink mb-4 font-serif">
              TU AVAIS LE CHOIX?! 🎉💖
            </h2>
            <p className="text-rose-800 text-lg font-bold">
              YOUR MY WIFEY
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-rose-600 text-sm mb-6 flex items-center gap-1 font-medium relative z-10">
        Fait avec amour par NB 💻❤️
      </footer>
    </div>
  );
}