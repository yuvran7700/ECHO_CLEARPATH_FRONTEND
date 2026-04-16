import { motion } from 'framer-motion'
import CloudBackground from './CloudBackground'

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.2, 0.8, 0.2, 1] },
  },
}

export default function HeroClearPath({ onReset }) {
  return (
    <motion.main
      className="relative w-full min-h-screen bg-[#07111f] text-white"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero section */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <CloudBackground stage={2} />
        </div>

        <div
          className="relative flex flex-col items-center justify-center min-h-screen text-center px-8 gap-5"
          style={{ zIndex: 2, paddingBottom: '10vh' }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 40px rgba(0,0,0,0.15)',
            }}
          >
            ClearPath
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
              color: 'rgba(255,255,255,0.82)',
              fontWeight: 300,
              letterSpacing: '0.01em',
              maxWidth: 420,
            }}
          >
            Predict train delays before they happen.
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={onReset}
            className="mt-2 px-8 py-3.5 rounded-full text-sm font-medium"
            style={{
              background: '#ffffff',
              color: '#1a1a1a',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Content under hero */}
      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6">This is the page under it</h2>
        <p className="text-white/70 max-w-2xl leading-7">
          Now this content appears under the final hero because HeroClearPath is behaving
          like a real landing page instead of a fullscreen overlay.
        </p>
      </section>

      <section className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6">Dashboard previews</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 min-h-[260px]">
            Commuter dashboard image here
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 min-h-[260px]">
            Researcher dashboard image here
          </div>
        </div>
      </section>
    </motion.main>
  )
}