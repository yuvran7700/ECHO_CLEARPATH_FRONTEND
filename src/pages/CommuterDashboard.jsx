import useForecast from "../hooks/useForecast";
import { 
    CalendarDays, 
    TrainFront, 
    Info, 
    Map as MapIcon, 
    LayoutDashboard 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyInteractiveRiskCard from "../components/CommuterDashboardComponents/WeekRiskInteractiveCard";
import CommuterDashboardSkeleton from "@/components/CommuterDashboardComponents/CommuterDashboardSkeleton";
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

// --- Reusable UI Components from Analytics Reference ---

function SectionCard({ className = "", children }) {
    return (
        <Card className={`rounded-3xl border shadow-sm ${className}`}>
            {children}
        </Card>
    );
}

function DashboardSection({ icon: Icon, eyebrow, title, description, children }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="rounded-full border bg-muted/50 p-2">
                        <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.2em]">
                        {eyebrow}
                    </span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}

export default function CommuterDashboard() {
    const {
    data,
    forecastLoading,
    forecastError,
    selectedLineId,
    setSelectedLineId,
    selectedDayIndex,
    setSelectedDayIndex,
    selectedDay,
    } = useForecast();

    if (forecastLoading) return <CommuterDashboardSkeleton />;
    if (forecastError) return <div className="p-8 text-destructive">{forecastError}</div>;
    if (!data || !selectedDay) return <div className="p-8">No forecast data available.</div>;

    const selectedLineName = LINE_META[selectedLineId] || "NSW Rail Line";

    return (
        <section className="w-full">
            <div className="mx-auto flex w-full flex-col gap-10 px-4 py-8 md:px-6">
                
                {/* Section 1: Weekly Outlook */}
                <DashboardSection
                    icon={CalendarDays}
                    eyebrow="5-Day Forecast"
                    title="Commuter Risk Outlook"
                    description="Interactive daily breakdown of predicted disruptions based on weather and historical patterns."
                >
                    <WeeklyInteractiveRiskCard
                        lineId={selectedLineId}
                        forecast={data}
                        selectedDayIndex={selectedDayIndex}
                        onDayChange={setSelectedDayIndex}
                    />
                </DashboardSection>

                {/* Section 2: Detailed Interpretation */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <DashboardSection
                            icon={Info}
                            eyebrow="Analysis"
                            title="Line Insight"
                            description={`Specific conditions expected for the ${selectedLineId}.`}
                        >
                            <SectionCard className="border-none bg-[#2A2B2A] text-white">
                                <CardHeader>
                                    <CardDescription className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                                        Tomorrow's Outlook — {selectedLineId}
                                    </CardDescription>
                                    <CardTitle className="mt-2 text-2xl font-semibold tracking-tight text-white">
                                        {selectedLineName}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg leading-relaxed text-white/90">
                                        {selectedDay.message}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-xs font-medium text-white/50 uppercase tracking-wider">
                                            Live Prediction Engine Active
                                        </span>
                                    </div>
                                </CardContent>
                            </SectionCard>
                        </DashboardSection>
                    </div>

                    {/* <div className="lg:col-span-1">
                        <DashboardSection
                            icon={MapIcon}
                            eyebrow="Context"
                            title="Network Map"
                            description="Select a different line to view its specific risk profile."
                        >
                            <SectionCard className="overflow-hidden h-[300px] lg:h-full min-h-[300px]">
                                <NSWInteractiveRailMap 
                                    selectedLineId={selectedLineId} 
                                    onLineSelect={setSelectedLineId} 
                                />
                            </SectionCard>
                        </DashboardSection>
                    </div> */}
                </div>

                {/* Section 3: Summary or Action Items could go here, similar to InsightStrip */}
            </div>
        </section>
    );
}