import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const getBadgeVariant = (level) => {
    switch (level) {
        case "Low":
            return "default";
        case "Moderate":
            return "secondary";
        case "High":
            return "destructive";
        default:
            return "outline";
    }
};

const getRiskBarColor = (level) => {
    switch (level) {
        case "Low":
            return "bg-green-500";
        case "Moderate":
            return "bg-yellow-500";
        case "High":
            return "bg-red-500";
        default:
            return "bg-gray-400";
    }
};

const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-AU", {
        weekday: "short",
        day: "numeric",
        month: "short",
    });

export default function WeeklyRisk({ forecast }) {
    const days = forecast?.days ?? [];

    if (!days.length) {
        return (
            <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
                No forecast available.
            </div>
        );
    }

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Weekly Risk Forecast
                </h2>
                <p className="text-sm text-muted-foreground">
                    {days.length} days available
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {days.map((day, index) => {
                    const riskPercent = Math.round((day.risk ?? 0) * 100);

                    return (
                        <motion.div
                            key={day.date}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Card className="h-full rounded-2xl border shadow-sm transition hover:shadow-md">
                                <CardContent className="space-y-4 p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-base font-medium">
                                                {formatDate(day.date)}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {day.weather_summary}
                                            </p>
                                        </div>

                                        <Badge variant={getBadgeVariant(day.risk_level)}>
                                            {day.risk_level}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Disruption Risk
                                            </span>
                                            <span className="font-medium">
                                                {riskPercent}%
                                            </span>
                                        </div>

                                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                            <div
                                                className={`h-full rounded-full transition-all ${getRiskBarColor(
                                                    day.risk_level
                                                )}`}
                                                style={{ width: `${riskPercent}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                        <div className="rounded-xl bg-muted/50 p-2">
                                            <span className="block font-medium text-foreground">
                                                Temp
                                            </span>
                                            {day.tempSeverity}
                                        </div>
                                        <div className="rounded-xl bg-muted/50 p-2">
                                            <span className="block font-medium text-foreground">
                                                Rain
                                            </span>
                                            {day.rainSeverity}
                                        </div>
                                        <div className="rounded-xl bg-muted/50 p-2">
                                            <span className="block font-medium text-foreground">
                                                Wind
                                            </span>
                                            {day.windSeverity}
                                        </div>
                                        <div className="rounded-xl bg-muted/50 p-2">
                                            <span className="block font-medium text-foreground">
                                                Humidity
                                            </span>
                                            {day.humiditySeverity}
                                        </div>
                                    </div>

                                    <div className="rounded-xl border bg-background p-3">
                                        <p className="text-xs leading-relaxed text-muted-foreground">
                                            {day.message}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}