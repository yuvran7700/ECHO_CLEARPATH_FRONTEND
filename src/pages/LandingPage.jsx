import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import HeroStorm from "../components/LandingComponents/HeroStorm";
import Navbar from "../components/LandingComponents/LandingNavBar";
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

    const jumpToClearPath = useCallback(() => {
        setStage(STAGE_CLEARPATH);
        
        // We wait for the next tick/render so the ID actually exists in the DOM
        setTimeout(() => {
            const element = document.getElementById('about-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); 
    }, []);


    const wrapperClass =
        stage === STAGE_CLEARPATH
            ? "relative w-full min-h-screen"
            : "relative w-full h-screen overflow-hidden";

    return (
        <div className={wrapperClass}>
            <Navbar stage={stage} onJump={jumpToClearPath}/>

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