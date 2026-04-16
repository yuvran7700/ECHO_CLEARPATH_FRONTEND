import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import CloudBackground from './CloudBackground'
import { ContainerScroll } from '../ui/container-scroll-animation';
import BrowserFrame from './BrowserFrame';

export default function HeroClearPath() {
    const [activeView, setActiveView] = useState("commuter");
    const containerRef = useRef(null);
    
    // Hook to track scroll progress for the logo fade-out
    const { scrollYProgress } = useScroll();
    const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const viewImages = {
        commuter: "https://images.unsplash.com/photo-1741806914412-340ca16e9175?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        research: "https://images.unsplash.com/photo-1675937338222-b834fce80ba5?q=80&w=1056&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    return (
        <main ref={containerRef} className="relative w-full bg-[#07111f] text-white">
            <div className="fixed inset-0 z-0">
                <CloudBackground stage={3} />
            </div>

            {/* --- 1. LOGO SPLASH SECTION --- */}
            <section className="relative h-screen w-full flex items-center justify-center z-20 pointer-events-none">
                <motion.h1 
                    style={{ opacity: logoOpacity, scale: logoScale }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white leading-none tracking-tighter font-serif text-[clamp(5rem,15vw,12rem)]"
                >
                    ClearPath
                </motion.h1>
                
                {/* Optional: Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em]"
                >
                    Scroll to Explore
                </motion.div>
            </section>

            {/* --- 2. THE REVEAL (Container Scroll) --- */}
            <section className="relative z-10 -mt-[20vh]">
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center gap-6 mb-10">
                            <div className="flex p-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl gap-1 mt-4">
                                {["commuter", "research"].map(view => (
                                    <button
                                        key={view}
                                        onClick={() => setActiveView(view)}
                                        className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                                            activeView === view 
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

            {/* --- 3. CONTENT UNDER HERO --- */}
            <section className="relative z-30 bg-white text-black px-8 py-32 rounded-t-[60px] -mt-40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold tracking-tight mb-8">Everything you need <br /> to stay on track.</h2>
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="rounded-[40px] border border-neutral-200 bg-neutral-50 p-10 min-h-[300px] hover:bg-neutral-100 transition-colors">
                            <h3 className="text-2xl font-bold mb-4">Commuter View</h3>
                            <p className="text-neutral-500 text-lg">Personalized routes and risk assessments updated in real-time.</p>
                        </div>
                        <div className="rounded-[40px] border border-neutral-200 bg-neutral-50 p-10 min-h-[300px] hover:bg-neutral-100 transition-colors">
                            <h3 className="text-2xl font-bold mb-4">Research Data</h3>
                            <p className="text-neutral-500 text-lg">Deep-dive into correlation models and historical environmental data.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}