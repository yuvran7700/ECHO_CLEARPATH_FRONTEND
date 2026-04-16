import { motion } from 'framer-motion'

const STAGES = {
  storm: {
    gradient: 'linear-gradient(160deg, #111 0%, #232323 50%, #1a1a1a 100%)',
    fog: '#a19999',
  },
  predict: {
    gradient: 'linear-gradient(160deg, #d8d8d8 0%, #f0f0f0 60%, #fafafa 100%)',
    fog: '#ffffff',
  },
  clearpath: {
    gradient: 'linear-gradient(170deg, #2f7d96 0%, #62c5e0 60%, #a6e6ff 100%)',
    fog: '#ffffff',
  },
}

export default function CloudBackground({ stage = 0 }) {
  const key = ['storm', 'predict', 'clearpath'][stage] ?? 'storm'
  const config = STAGES[key]

  const clouds = Array.from({ length: 6 })

  return (
    <motion.div className="absolute inset-0 overflow-hidden">
      {/* Smooth sky gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: config.gradient }}
        transition={{ duration: 2 }}
      />

      {/* Global fog drift layer (important for realism) */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: [-20, 20] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        {clouds.map((_, i) => {
          const size = 400 + i * 120
          const top = `${10 + i * 12}%`
          const left = `${i * 15}%`
          const opacity = 0.15 + i * 0.08
          const blur = 60 + i * 20

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size * 0.6,
                top,
                left,
                background: config.fog,
                opacity,
                filter: `blur(${blur}px)`,
              }}
              animate={{
                y: [0, i % 2 === 0 ? 20 : -20],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </motion.div>
    </motion.div>
  )
}