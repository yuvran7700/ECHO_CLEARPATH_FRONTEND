import { motion } from 'framer-motion'
import CloudBackground from './CloudBackground'

/**
 * State 2 — "But what if you could predict it?"
 *
 * The text uses a fading gradient effect:
 * - "But what if you" — dark, opaque
 * - "could" — medium gray
 * - "predict" — italic, slightly lighter
 * - "it?" — lightest
 *
 * Words animate in with a staggered reveal.
 */

const WORDS = [
    { text: 'But what if', style: { color: '#1a1a1a', fontWeight: 400 } },
    { text: 'you', style: { color: '#1a1a1a', fontWeight: 400 } },
    { text: 'could', style: { color: '#888888', fontWeight: 300 } },
    { text: 'predict', style: { color: '#aaaaaa', fontWeight: 400, fontStyle: 'italic' } },
    { text: 'it?', style: { color: '#cccccc', fontWeight: 300 } },
]

const containerVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.16,
        },
    },
    exit: {
        opacity: 0,
        y: -40,
        scale: 0.97,
        transition: { duration: 0.5, ease: [0.4, 0, 1, 1] },
    },
}

const wordVariants = {
    initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
    animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
    },
}

export default function HeroPrediction() {
    return (
        <motion.section
            className="absolute inset-0"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Background */}
            <CloudBackground stage={1} />

            {/* Content */}
            <div
                className="relative flex items-center justify-center h-full px-8"
                style={{ zIndex: 2 }}
            >
                <div className="max-w-5xl w-full">
                    {/* The multi-word heading — rendered as inline flow */}
                    <motion.div
                        className="flex flex-wrap gap-x-5 gap-y-2 justify-center md:justify-start"
                        variants={containerVariants}
                    >
                        {/* Line 1: "But what if you could" */}
                        <div className="w-full flex flex-wrap gap-x-5 gap-y-2 justify-center">
                            {WORDS.slice(0, 3).map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={wordVariants}
                                    style={{
                                        ...word.style,
                                        fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.025em',
                                        display: 'inline-block',
                                    }}
                                >
                                    {word.text}
                                </motion.span>
                            ))}
                        </div>

                        {/* Line 2: "predict it?" */}
                        <div className="w-full flex flex-wrap gap-x-5 gap-y-2 justify-center">
                            {WORDS.slice(3).map((word, i) => (
                                <motion.span
                                    key={i + 3}
                                    variants={wordVariants}
                                    style={{
                                        ...word.style,
                                        fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                                        lineHeight: 1.1,
                                        letterSpacing: '-0.025em',
                                        display: 'inline-block',
                                        fontFamily: i === 0 ? 'Playfair Display, Georgia, serif' : undefined,
                                    }}
                                >
                                    {word.text}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom hint — partially visible dashboard preview */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                style={{ zIndex: 3 }}
            >
                <div
                    className="rounded-t-2xl"
                    style={{
                        width: 480,
                        height: 60,
                        background: 'linear-gradient(180deg, #0f0f0f 0%, #141414 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderBottom: 'none',
                        boxShadow: '0 -8px 32px rgba(0,0,0,0.3)',
                    }}
                />
            </motion.div>
        </motion.section>
    )
}
