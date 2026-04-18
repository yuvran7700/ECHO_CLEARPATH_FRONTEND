import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import CloudBackground from './CloudBackground'
import { ContainerScroll } from '../ui/container-scroll-animation';
import BrowserFrame from './BrowserFrame';
import FeatureSection from './FeatureSection';


function HeroSection() {
    const itemVariants = {
        initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
        animate: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.85, ease: [0.2, 0.8, 0.2, 1] },
        },
    }

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center z-20 pointer-events-none text-center">

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 text-white/90 text-sm md:text-base font-light tracking-wide max-w-md"
            >
                See delay risk up to 24 hours before your journey
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.4 }}
                className="mt-3 text-xs uppercase tracking-[0.25em] text-white/90"
            >
                Weather · Network stress · Live conditions
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/60"
            >
                Scroll to Explore
            </motion.div>

        </section>
    )
}
export default function HeroClearPath() {
    const [activeView, setActiveView] = useState("commuter");
    const containerRef = useRef(null);

    const viewImages = {
        commuter: "https://images.unsplash.com/photo-1741806914412-340ca16e9175?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        research: "https://images.unsplash.com/photo-1675937338222-b834fce80ba5?q=80&w=1056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    return (
        <main id="about-section" ref={containerRef} className="relative w-full bg-[#07111f] text-white">
            <div className="fixed inset-0 z-0">
                <CloudBackground stage={2} />
            </div>

            <HeroSection />

            <section className="relative z-10 -mt-[20vh]">
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center gap-6 mb-10">
                            <div className="flex p-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl gap-1 mt-4">
                                {["commuter", "research"].map(view => (
                                    <button
                                        key={view}
                                        onClick={() => setActiveView(view)}
                                        className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeView === view
                                                ? "bg-white text-black shadow-lg"
                                                : "text-white/50 hover:text-white"
                                            }`}
                                    >
                                        {view}
                                    </button>
                                ))}
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-white leading-none tracking-tight font-serif text-[clamp(3rem,8vw,6rem)] text-center"
                            >
                                Dual Modes. <br />
                                <span className="text-white/40 italic">One Platform.</span>
                            </motion.h2>
                        </div>
                    }
                >
                    <BrowserFrame url={`clearpath.app/${activeView}`}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeView}
                                src={viewImages[activeView]}
                                alt={`${activeView} dashboard`}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        </AnimatePresence>
                    </BrowserFrame>
                </ContainerScroll>
            </section>

            <FeatureSection />

        </main>
    )
}