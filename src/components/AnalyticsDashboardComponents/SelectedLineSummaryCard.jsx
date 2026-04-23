import { MapPin, CalendarRange, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

function formatLocation(location) {
    if (!location) return "Unknown location";
    return location.charAt(0).toUpperCase() + location.slice(1);
}

function formatDateRange(from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const fromLabel = fromDate.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const toLabel = toDate.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return `${fromLabel} – ${toLabel}`;
}

function InfoPill({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/35 px-4 py-3">
            <div className="rounded-xl bg-background p-2 shadow-sm">
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {label}
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}

function SelectedLineSummaryCard({ selectedLineId = "T1", data }) {
    const lineName = LINE_META[selectedLineId] ?? "Unknown line";
    const location = formatLocation(data?.location);
    const dateRange = formatDateRange(
        data?.overall?.data_from,
        data?.overall?.data_to
    );
    const totalDays = data?.overall?.total_days ?? 0;

    return (
        <Card className="rounded-[32px] border border-border/70 bg-card shadow-sm">
            <CardContent className="p-5 md:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    {/* Left: selected line */}
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-orange-400 text-lg font-semibold text-white shadow-sm">
                            {selectedLineId}
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                                Selected line
                            </p>
                            <h2 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                                {lineName}
                            </h2>
                        </div>
                    </div>

                    {/* Right: context pills */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:min-w-[720px]">
                        <InfoPill
                            icon={MapPin}
                            label="Location"
                            value={location}
                        />
                        <InfoPill
                            icon={CalendarRange}
                            label="Coverage"
                            value={dateRange}
                        />
                        <InfoPill
                            icon={Database}
                            label="Observed days"
                            value={`${totalDays} days`}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SelectedLineSummaryCard;