import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import CloudBackground from './CloudBackground'
import { ContainerScroll } from '../ui/container-scroll-animation';
import BrowserFrame from './BrowserFrame';


export default function HeroClearPath() {
    const [activeView, setActiveView] = useState("commuter");

    const viewImages = {
        commuter: "https://images.klipfolio.com/website/public/5a275fee-d42b-4f31-91f6-8148d4d729af/executive%20dashboard.png",
        research: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    };

    return (
        <main className="relative w-full bg-[#07111f] text-white">

            <div className="fixed inset-0 z-0">
                <CloudBackground stage={2} />
            </div>

            <section className="relative z-10">
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center gap-6 mb-10">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-white leading-none tracking-tight font-serif text-[clamp(3rem,8vw,7rem)]"
                            >
                                ClearPath
                            </motion.h1>
                            
                            <p className="text-white/60 text-lg md:text-xl max-w-md mx-auto font-light">
                                Predict train delays before they happen.
                            </p>

                            <div className="flex gap-4 mt-6">
                                <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold shadow-lg hover:scale-[1.02] transition">
                                    Get Started
                                </button>
                                <button className="px-6 py-3 border border-white/20 rounded-lg text-white/70 hover:text-white">
                                    View Demo
                                </button>
                            </div>

                            {/* View Switcher Controls */}
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </AnimatePresence>
                    </BrowserFrame>
                </ContainerScroll>
            </section>

            {/* 2. CONTENT UNDER HERO */}
            <section className="relative z-30 bg-white text-black px-8 py-32 rounded-t-[60px] -mt-40">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold tracking-tight mb-8">Everything you need <br /> to stay on track.</h2>
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="rounded-[40px] border border-neutral-200 bg-neutral-50 p-10 min-h-[300px]">
                            <h3 className="text-2xl font-bold mb-4">Commuter View</h3>
                            <p className="text-neutral-500">Personalized routes and risk assessments.</p>
                        </div>
                        <div className="rounded-[40px] border border-neutral-200 bg-neutral-50 p-10 min-h-[300px]">
                            <h3 className="text-2xl font-bold mb-4">Research Data</h3>
                            <p className="text-neutral-500">Deep-dive into correlation models.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}