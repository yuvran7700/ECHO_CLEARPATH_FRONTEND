import { motion } from 'framer-motion'
import TryClearPathButton from './TryClearPathButton'
// import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = ['About', 'Features', 'View API Docs']

export default function Navbar({ stage, onJump }) {


const handleNavClick = (item) => {
    if (item === 'About') {
      if (stage !== 2) {
        onJump();
      } else {
        const element = document.getElementById('about-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    if (item === 'Features') {
      if (stage !== 2) {
        onJump();
      } else {
        const element = document.getElementById('feature-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (item === 'Intergate our API') {
      window.open('https://yuvran7700.github.io/clearpath-docs/', '_blank');
    }
  };


  // Stage 0 (storm) = dark bg → light text. Stages 1 & 2 = light/teal bg → dark text
  const isDark = stage === 0 || stage === 2

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-5 md:pt-7">
      <motion.div
        className="flex items-center gap-0.5 px-2 py-2 rounded-full"
        style={{
          background: isDark
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.07)',
          border: isDark
            ? '1px solid rgba(255,255,255,0.15)'
            : '1px solid rgba(0,0,0,0.1)',
          backdropFilter: 'blur(12px)',
        }}
        animate={{
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item}
            onClick={() => handleNavClick(item)} 
            className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
            style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)' }}
            whileHover={{
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            }}
          >
            {item}
          </motion.button>
        ))}
        <TryClearPathButton isDark={isDark} />
      </motion.div>
    </nav>
  )
}
