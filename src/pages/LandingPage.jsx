import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroStorm from "../components/LandingComponents/HeroStorm";
import Navbar from "../components/LandingComponents/NavBar";
import HeroPrediction from "../components/LandingComponents/HeroPredict";

const STAGE_STORM = 0;
const STAGE_PREDICT = 1;
const STAGE_CLEARPATH = 2;

const LandingPage = () => {
    const [stage, setStage] = useState(STAGE_STORM);
    const isAnimatingRef = useRef(false);

    const handleSeeSolution = useCallback(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        // Stage 1 → 2 (storm → predict)
        setStage(STAGE_PREDICT);

        // Stage 2 → 3 after delay (predict → clearpath)
        setTimeout(() => {
            setStage(STAGE_CLEARPATH);
            setTimeout(() => {
                isAnimatingRef.current = false;
            }, 900);
        }, 2800);
    }, []);

    const handleReset = useCallback(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setStage(STAGE_STORM);
        setTimeout(() => {
            isAnimatingRef.current = false;
        }, 900);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Persistent Navbar above everything */}
            <Navbar stage={stage} />

            {/* Hero states — AnimatePresence handles enter/exit */}
            <AnimatePresence mode="wait">
                {stage === STAGE_STORM && (
                    <HeroStorm key="storm" onSeeSolution={handleSeeSolution} />
                )}
                {stage === STAGE_PREDICT && <HeroPrediction key="predict" />}
                {stage === STAGE_CLEARPATH && (
                    <HeroClearPath key="clearpath" onReset={handleReset} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandingPage;
