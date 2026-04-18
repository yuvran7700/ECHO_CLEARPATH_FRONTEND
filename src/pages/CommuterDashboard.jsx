import { useMemo, useState } from "react";
import RiskCard from "../components/CommuterDashboardComponents/RiskCardComponent";
import NSWInteractiveRailMap from "../components/CommuterDashboardComponents/NSWTrainLineMap";
import RoutePlannerCard from "../components/CommuterDashboardComponents/RoutePlannerCard";
import CurrentTime from "../components/CommuterDashboardComponents/CurrentTime";

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
        <main className="min-h-screen bg-[#F6F8FB] px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Commuter dashboard
                            </p>

                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                                Plan ahead with disruption insight
                            </h1>

                            <p className="mt-3 text-base leading-7 text-slate-600">
                                View tomorrow’s disruption risk for your selected line and use
                                the network map to explore exposure across Sydney rail services.
                            </p>
                        </div>

                        <CurrentTime />
                    </div>
                </header>

                <section
                    aria-label="Commuter dashboard overview"
                    className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]"
                >
                    <section aria-label="Prediction panel">
                        <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                            <div className="p-6 md:p-8">
                                <div className="space-y-6">
                                    <header>
                                        <h2 className="text-xl font-semibold text-slate-900">
                                            Tomorrow’s line outlook
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Prediction summary for {selectedLineId} — {selectedLineName}
                                        </p>
                                    </header>

                                    <section aria-label="Risk prediction card">
                                        <RiskCard lineId={selectedLineId} score={risk} />
                                    </section>

                                    <hr className="border-slate-200" />

                                    <section className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_1fr]">
                                        <article>
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                Journey recommendation
                                            </h3>
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

                                        <article>
                                            <h3 className="text-sm font-semibold text-slate-900">
                                                Demo controls
                                            </h3>

                                            <div
                                                className="mt-3 flex flex-wrap gap-2"
                                                role="group"
                                                aria-label="Risk simulation controls"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setRisk(10)}
                                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${risk === 10
                                                        ? "bg-slate-900 text-white"
                                                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    Low
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setRisk(45)}
                                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${risk === 45
                                                        ? "bg-slate-900 text-white"
                                                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    Medium
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setRisk(90)}
                                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${risk === 90
                                                        ? "bg-slate-900 text-white"
                                                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    High
                                                </button>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </div>
                        </article>
                    </section>

                    <aside aria-label="Supporting commuter information" className="space-y-6">
                        <section aria-label="Network map panel">
                            <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                                <div className="p-6 md:p-7">
                                    <header className="mb-5">
                                        <h2 className="text-lg font-semibold text-slate-900">
                                            Network map
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Select a line to compare tomorrow’s risk with the wider
                                            network.
                                        </p>
                                    </header>

                                    <section aria-label="Interactive network map">
                                        <NSWInteractiveRailMap
                                            selectedLineId={selectedLineId}
                                            onLineChange={setSelectedLineId}
                                        />
                                    </section>
                                </div>
                            </article>
                        </section>

                        <section aria-label="Quick summary panel">
                            <article className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                                <div className="p-6">
                                    <header>
                                        <h2 className="text-base font-semibold text-slate-900">
                                            Quick summary
                                        </h2>
                                    </header>

                                    <div className="mt-5 space-y-4">
                                        <section>
                                            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Selected line
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-800">
                                                {selectedLineId} — {selectedLineName}
                                            </p>
                                        </section>

                                        <hr className="border-slate-200" />

                                        <section>
                                            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Predicted risk
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-800">
                                                {risk}% • {riskMeta.label}
                                            </p>
                                        </section>

                                        <hr className="border-slate-200" />

                                        <section>
                                            <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                                Suggested commuter action
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {risk >= 70
                                                    ? "Review alternative routes, leave earlier, and monitor service updates."
                                                    : risk >= 30
                                                        ? "Keep a small time buffer in your schedule."
                                                        : "Travel as usual, with low expected disruption pressure."}
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </aside>
                </section>
            </div>
        </main>
    );
}