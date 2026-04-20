import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentTime from '../CommuterDashboardComponents/CurrentTime';
import LineSelector from './LineSelector';
const DashboardHeader = () => {
    const location = useLocation();
    const [time, setTime] = useState(new Date());

    // Keep the clock ticking
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const isPlan = location.pathname === '/dashboard/plan-your-journey';

    // Content mapping for "Apple-style" clarity
    const content = {
        title: isPlan ? "Plan ahead with disruption insight" : "Operational Network Analytics",
        eyebrow: isPlan ? "COMMUTER DASHBOARD" : "OPERATOR INSIGHTS",
        description: isPlan 
            ? "View tomorrow's disruption risk for your selected line and use the network map to explore exposure across Sydney rail services."
            : "Analyze real-time reliability metrics, weather correlations, and historical disruption streaks across the network."
    };

    return (
        <header className="w-full bg-white/80 backdrop-blur-md sticky top-[84px] z-40 border-b border-black/[0.03]">
            <div className="mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <span className="block text-[11px] font-bold tracking-[0.2em] text-black/40 uppercase mb-2">
                            {content.eyebrow}
                        </span>
                        <h1 className="text-4xl md:text-3xl font-semibold tracking-[-0.03em] text-black leading-tight">
                            {content.title}
                        </h1>
                        <p className="mt-4 text-[15px] leading-relaxed text-black/50 font-medium max-w-xl">
                            {content.description}
                        </p>
                    </div>
                    <CurrentTime />
                </div>
                <LineSelector />
            </div>
        </header>
    );
};

export default DashboardHeader;