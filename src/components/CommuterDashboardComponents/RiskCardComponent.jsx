import React from "react";

const LINE_THEMES = {
    T1: { name: "Western Line", brandColor: "#EE854B" },
    T2: { name: "Inner West Line", brandColor: "#0098CD" },
    T3: { name: "Bankstown Line", brandColor: "#F37021" },
    T4: { name: "Eastern Suburbs", brandColor: "#005AA3" },
    default: { name: "Transit Line", brandColor: "#64748b" }
};

const getRiskConfig = (score) => {
    if (score >= 70) return { label: 'High Risk', color: '#ef4444', info: 'Expect heavy delays & potential cancellations.' };
    if (score >= 30) return { label: 'Medium Risk', color: '#f59e0b', info: 'Minor disruptions possible. Allow extra time.' };
    return { label: 'Low Risk', color: '#10b981', info: 'Service running smoothly. On-time performance high.' };
};

export default function RiskCard({ lineId = "T1", score = 0 }) {
    const risk = getRiskConfig(score);
    const line = LINE_THEMES[lineId] || LINE_THEMES.default;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-[#F8F9FA] rounded-[48px] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)]">

                {/* Header: Identity & Label */}
                <div className="flex flex-row justify-between items-center mb-14">
                    <div className="flex items-center gap-5">
                        <div
                        className="w-14 h-14 flex items-center justify-center shadow-lg shrink-0 rounded-md"
                        style={{ backgroundColor: line.brandColor }}
                        >
                            <span className="text-white text-lg font-bold tracking-tight">
                                {lineId}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-slate-900 text-2xl font-bold tracking-tight leading-none">
                                {line.name}
                            </h2>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 block">
                                Live Network Status
                            </span>
                        </div>
                    </div>

                    <div className="text-right">
                        <span
                            className="text-[11px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full bg-white shadow-sm border border-slate-50"
                            style={{ color: line.brandColor }}
                        >
                            Tomorrow's Risk
                        </span>
                    </div>
                </div>

                {/* Hero Section: The Data Focal Point */}
                <div className="flex flex-col md:flex-row items-baseline md:items-end gap-8 md:gap-16 mb-12">
                    <div className="relative">
                        <span className="text-9xl font-black tracking-tighter text-slate-900 leading-none">
                            {score}%
                        </span>
                        {/* Subtle glow effect based on risk color */}
                        <div
                            className="absolute -inset-4 blur-3xl opacity-10 -z-10 rounded-full"
                            style={{ backgroundColor: risk.color }}
                        />
                    </div>

                    <div className="max-w-xs pb-3">
                        <div
                            className="text-sm font-bold uppercase tracking-wider mb-2"
                            style={{ color: risk.color }}
                        >
                            • {risk.label}
                        </div>
                        <p className="text-slate-500 text-lg italic leading-tight font-medium">
                            {risk.info}
                        </p>
                    </div>
                </div>

                {/* Interaction/Visual: The Progress Bar */}
                <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-200/50 rounded-full overflow-hidden p-1 shadow-inner">
                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                            style={{
                                width: `${score}%`,
                                backgroundColor: line.brandColor,
                                boxShadow: `0 0 20px ${line.brandColor}44`
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reliability Index</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity: High</span>
                    </div>
                </div>

            </div>
        </div>
    );
}