import { useMemo, useState } from "react";
import RiskCard from "../components/CommuterDashboardComponents/RiskCardComponent";
import NSWInteractiveRailMap from "../components/CommuterDashboardComponents/NSWTrainLineMap";
import RoutePlannerCard from "../components/CommuterDashboardComponents/RoutePlannerCard";
import WeeklyForecast from "../components/CommuterDashboardComponents/WeeklyRisk";
const LINE_META = {
    T1: "North Shore & Western Line",
    T2: "Leppington & Inner West Line",
    T3: "Liverpool & Inner West Line",
    T4: "Eastern Suburbs & Illawarra Line",
    T5: "Cumberland Line",
    T6: "Lidcombe & Bankstown Line",
    T7: "Olympic Park Line",
    T8: "Airport & South Line",
    T9: "Northern Line",
    M1: "Metro North West & Bankstown",
};

const mockForecast = {
  lat: -33.8688,
  lon: 151.2093,
  days: [
    {
      date: "2026-04-19",
      weather_summary: "Sunny",
      tempSeverity: "Mild",
      rainSeverity: "No rain",
      windSeverity: "Breezy",
      humiditySeverity: "High Humidity",
      risk: 0.2811,
      risk_level: "Low",
      message: "28% estimated disruption risk (Low).",
    },
    {
      date: "2026-04-19",
      weather_summary: "Sunny",
      tempSeverity: "Mild",
      rainSeverity: "No rain",
      windSeverity: "Breezy",
      humiditySeverity: "High Humidity",
      risk: 0.2811,
      risk_level: "Low",
      message: "28% estimated disruption risk (Low).",
    },
    {
      date: "2026-04-19",
      weather_summary: "Sunny",
      tempSeverity: "Mild",
      rainSeverity: "No rain",
      windSeverity: "Breezy",
      humiditySeverity: "High Humidity",
      risk: 0.2811,
      risk_level: "Low",
      message: "28% estimated disruption risk (Low).",
    }
  ],
};

function getRiskMeta(score) {
    if (score >= 70) {
        return {
            label: "High disruption risk",
            helper: "Consider an earlier departure and an alternative route.",
        };
    }
    if (score >= 30) {
        return {
            label: "Moderate disruption risk",
            helper: "Allow some buffer time for your journey.",
        };
    }
    return {
        label: "Low disruption risk",
        helper: "Current conditions suggest normal service reliability.",
    };
}

export default function CommuterDashboard() {
    const [risk, setRisk] = useState(85);
    const [selectedLineId, setSelectedLineId] = useState("T1");

    const selectedLineName = LINE_META[selectedLineId] || "NSW Rail Line";
    const riskMeta = useMemo(() => getRiskMeta(risk), [risk]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-6">
                 <WeeklyForecast data={mockForecast}/>
                <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col gap-8">
                        <header>
                            <h2 className="text-xl font-semibold text-slate-900">Tomorrow’s line outlook</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Prediction summary for {selectedLineId} — {selectedLineName}
                            </p>
                        </header>

                        <div className="w-full">
                            <RiskCard lineId={selectedLineId} score={risk} />
                        </div>

                        <hr className="border-slate-200" />

                        {/* Recommendation Flex Section */}
                        <div className="flex flex-col xl:flex-row gap-10">
                            <article className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-900">Journey recommendation</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {riskMeta.label}. {riskMeta.helper}
                                </p>
                                <div className="mt-4">
                                    <RoutePlannerCard 
                                        from="Parramatta" 
                                        to="Central" 
                                        lineId={selectedLineId} 
                                        risk={risk} 
                                    />
                                </div>
                            </article>

                            {/* Controls Flex Section */}
                            <article className="w-full xl:w-72 flex-shrink-0">
                                <h3 className="text-sm font-semibold text-slate-900">Demo controls</h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {[10, 45, 90].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setRisk(val)}
                                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                                risk === val 
                                                ? "bg-slate-900 text-white shadow-lg" 
                                                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                        >
                                            {val === 10 ? 'Low' : val === 45 ? 'Medium' : 'High'}
                                        </button>
                                    ))}
                                </div>
                            </article>
                        </div>
                    </div>
                </article>
            </div>

            {/* RIGHT COLUMN: Sidebar (Fixed Width for stability) */}
            <aside className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6 sticky top-10">
                
                {/* Network Map Card */}
                <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-6 md:p-7">
                    <header className="mb-5">
                        <h2 className="text-lg font-semibold text-slate-900">Network map</h2>
                        <p className="mt-1 text-sm text-slate-500">Select a line to compare risk levels.</p>
                    </header>
                    <div className="w-full aspect-square">
                        <NSWInteractiveRailMap 
                            selectedLineId={selectedLineId} 
                            onLineChange={setSelectedLineId} 
                        />
                    </div>
                </article>
               
                {/* Summary Card */}
                <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-7">
                    <h2 className="text-base font-semibold text-slate-900 mb-6">Quick summary</h2>
                    <div className="flex flex-col gap-5">
                        <SummaryItem label="Selected line" value={`${selectedLineId} — ${selectedLineName}`} />
                        <hr className="border-slate-200" />
                        <SummaryItem label="Predicted risk" value={`${risk}% • ${riskMeta.label}`} />
                        <hr className="border-slate-200" />
                        <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Suggested action</h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-medium">
                                {risk >= 70 
                                    ? "Review alternative routes and leave early." 
                                    : risk >= 30 
                                        ? "Allow for minor delays." 
                                        : "Normal service expected."}
                            </p>
                        </div>
                    </div>
                </article>
            </aside>
        </div>
    );
}

// Sub-component remains for clean JSX structure
const SummaryItem = ({ label, value }) => (
    <div className="flex flex-col gap-1">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</h3>
        <p className="text-sm text-slate-800 font-bold">{value}</p>
    </div>
);