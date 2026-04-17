import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HeroStorm from "../components/LandingComponents/HeroStorm";
import Navbar from "../components/LandingComponents/NavBar";
import HeroPrediction from "../components/LandingComponents/HeroPredict";
import HeroClearPath from "../components/LandingComponents/HeroClearPath";

const STAGE_STORM = 0;
const STAGE_PREDICT = 1;
const STAGE_CLEARPATH = 2;

const LandingPage = () => {
    const [stage, setStage] = useState(STAGE_STORM);
    const isAnimatingRef = useRef(false);

    const handleSeeSolution = useCallback(() => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        setStage(STAGE_PREDICT);

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

    const wrapperClass =
        stage === STAGE_CLEARPATH
            ? "relative w-full min-h-screen"
            : "relative w-full h-screen overflow-hidden";

    return (
        <div className={wrapperClass}>
            <Navbar stage={stage} />

            <AnimatePresence mode="wait">
                {stage === STAGE_STORM && (
                    <HeroStorm key="storm" onSeeSolution={handleSeeSolution} />
                )}

                {stage === STAGE_PREDICT && (
                    <HeroPrediction key="predict" />
                )}

                {stage === STAGE_CLEARPATH && (
                    <HeroClearPath key="clearpath" />
                )}
            </AnimatePresence>
        </div>
    );
};

export default LandingPage;