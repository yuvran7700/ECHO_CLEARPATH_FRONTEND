import useForecast from "../hooks/useForecast";
import RiskCard from "../components/CommuterDashboardComponents/RiskCardComponent";
import WeeklyRisk from "../components/CommuterDashboardComponents/WeeklyRisk";
import NSWInteractiveRailMap from "../components/CommuterDashboardComponents/NSWTrainLineMap";
import WeeklyInteractiveRiskCard from "../components/CommuterDashboardComponents/WeekRiskInteractiveCard";
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

export default function CommuterDashboard() {
    const {
        data,
        loading,
        error,
        selectedLineId,
        setSelectedLineId,
        selectedDayIndex,
        setSelectedDayIndex,
        selectedDay,
    } = useForecast();

    if (loading) return <p>Loading forecast...</p>;
    if (error) return <p>{error}</p>;
    if (!data || !selectedDay) return <p>No forecast data available.</p>;

    const selectedLineName = LINE_META[selectedLineId] || "NSW Rail Line";

    return (
        <div className="flex w-full flex-col gap-8 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
                <WeeklyInteractiveRiskCard
                    lineId={selectedLineId}
                    forecast={data}
                    selectedDayIndex={selectedDayIndex}
                    onDayChange={setSelectedDayIndex}
                />

                {/* <RiskCard
                    lineId={selectedLineId}
                    forecastDay={selectedDay}
                /> */}

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Tomorrow’s line outlook
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Prediction summary for {selectedLineId} — {selectedLineName}
                    </p>
                    <p className="mt-4 text-sm text-slate-600">
                        {selectedDay.message}
                    </p>
                </div>
            </div>
            {/* <WeeklyRisk
                forecast={data}
            /> */}


            {/* <aside className="w-full lg:w-[400px]">
                <NSWInteractiveRailMap
                    selectedLineId={selectedLineId}
                    onLineChange={setSelectedLineId}
                />
            </aside> */}
        </div>
    );
}