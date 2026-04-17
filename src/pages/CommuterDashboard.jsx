import { useState } from "react";
import RiskCard from "../components/CommuterDashboardComponents/RiskCardComponent";

const PredictionCard = () => (
  <div className="border border-slate-200 rounded-3xl p-5 md:p-8 shadow-sm bg-white">
    <h2 className="text-xl md:text-2xl font-bold mb-2">Predictions</h2>
    <p className="text-slate-500 mb-6 text-sm md:text-base">
      Fast links for engineers integrating predictions into apps.
    </p>

    {/* The Internal Risk Score Card */}
    <div className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-6">
      <div className="flex justify-between items-center mb-6 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-[#EE854B] text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs">T1</div>
          <span className="font-bold text-slate-700 text-sm md:text-base">Western Line</span>
        </div>
        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#EE854B]">Tomorrow's Risk</span>
      </div>

      {/* Numerical Score Section - Stacked on Mobile */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-2 md:gap-6 mb-6">
        <span className="text-5xl md:text-7xl font-bold tracking-tighter">85%</span>
        <p className="text-slate-500 text-xs md:text-sm italic leading-snug">
          High probability of signaling failure<br className="hidden sm:block" /> due to storm fronts.
        </p>
      </div>

      <div className="relative w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-[#EE854B] w-[85%]" />
      </div>
    </div>

    {/* Bottom CTA Section */}
    <div className="border border-slate-100 rounded-xl p-5 bg-white">
      <h3 className="font-bold text-base md:text-lg mb-1">What it means for commuters</h3>
      <p className="text-slate-400 text-[10px] md:text-xs mb-3 italic">Allow extra time or plan alternative route.</p>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-xs">
          Rainfall and recent service instability suggest a moderate chance of disruption.
        </p>
        <button className="w-full sm:w-auto bg-[#4E9BC6] text-white px-4 py-2.5 rounded-lg text-sm font-semibold">
          Plan Alternative Route
        </button>
      </div>
    </div>
  </div>
);

export default function CommuterDashboard() {
    const [risk, setRisk] = useState(85);

    return (
         <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
            <header className="mb-12">
                <h1 className="text-5xl font-bold tracking-tight mb-6">Plan your journey</h1>
                <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                    Check current disruption risk for a line a whole 24 hours before. 
                </p>
            </header>
            <p>Nothing here</p>
            <RiskCard lineId="T1" score={risk} />
            <button onClick={() => setRisk(10)}>Set Low</button>
            <button onClick={() => setRisk(45)}>Set Medium</button>
            <button onClick={() => setRisk(90)}>Set High</button>
            
         </main>
    )
}