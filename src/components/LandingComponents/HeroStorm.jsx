import { motion } from 'framer-motion'
import FlipBoard from './FlipBoard'
import StormScene from './StormScene'

const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.12 },
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: { duration: 0.55, ease: [0.4, 0, 1, 1] },
    },
}

const boardVariants = {
    initial: { opacity: 0, x: -60, scale: 0.96 },
    animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: {
        opacity: 0,
        x: -40,
        scale: 0.94,
        transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
    },
}

const headingVariants = {
    initial: { opacity: 0, y: 40 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
    },
}

const subtitleVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.3 },
    },
}

export default function HeroStorm({ onSeeSolution }) {
    return (
        <motion.section
            className="absolute inset-0 w-full h-full isolate overflow-hidden"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            
            <div className="absolute inset-0 z-0 pointer-events-none">
                <StormScene />
                
            </div>

            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
                    opacity: 0.4,
                }}
            />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-16 px-10 pb-16 pt-28 md:flex-row md:items-center md:justify-between md:gap-12 md:px-14 lg:px-24 xl:px-32">
                <motion.div
                    className="w-full flex-shrink-0 min-w-0"
                    variants={boardVariants}
                    style={{ maxWidth: 'min(520px, 48vw)' }}
                >
                    <FlipBoard />
                </motion.div>

                <div className="flex flex-col items-end text-right min-w-0 md:max-w-xs lg:max-w-sm xl:max-w-md">
                    <motion.h1
                        variants={headingVariants}
                        className="font-sans text-white leading-none mb-6"
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 5.5rem)',
                            fontWeight: 300,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Unpredictable
                        <br />
                        delays
                    </motion.h1>

                    <motion.div variants={subtitleVariants} className="flex flex-col items-end gap-8">
                        <p
                            className="text-sm md:text-base leading-relaxed max-w-xs text-right"
                            style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}
                        >
                            Weather makes delay boards <em style={{ color: 'rgba(255,255,255,0.85)' }}>change</em> too late.
                            ClearPath turns storm signals into earlier warnings, so <em style={{ color: 'rgba(255,255,255,0.85)' }}>you</em> can act before the status flips.
                        </p>

                        <motion.button
                            onClick={onSeeSolution}
                            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-medium"
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: 'rgba(255,255,255,0.9)',
                                backdropFilter: 'blur(8px)',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                background: 'rgba(255,255,255,0.16)',
                                scale: 1.03,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            See the solution
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}