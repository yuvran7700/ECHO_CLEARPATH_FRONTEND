import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const getRiskColor = (level) => {
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

export default function WeeklyForecast({ data }) {
     if (!data?.days) {
        return <div className="p-4">No forecast available</div>;
    }
    
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-4">
                7-Day Disruption Forecast
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.days.map((day, index) => (
                    <motion.div
                        key={day.date}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                            <CardContent className="p-4 space-y-3">
                                {/* Date */}
                                <div className="flex justify-between items-center">
                                    <p className="font-medium">
                                        {new Date(day.date).toLocaleDateString("en-AU", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </p>
                                    <Badge variant={getBadgeVariant(day.risk_level)}>
                                        {day.risk_level}
                                    </Badge>
                                </div>

                                {/* Weather */}
                                <p className="text-sm text-muted-foreground">
                                    {day.weather_summary}
                                </p>

                                {/* Risk % */}
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Disruption Risk</span>
                                        <span>{Math.round(day.risk * 100)}%</span>
                                    </div>

                                    <Progress
                                        value={day.risk * 100}
                                        className="h-2"
                                    />
                                </div>

                                {/* Conditions */}
                                <div className="text-xs text-muted-foreground space-y-1">
                                    <p>🌡 Temp: {day.tempSeverity}</p>
                                    <p>🌧 Rain: {day.rainSeverity}</p>
                                    <p>💨 Wind: {day.windSeverity}</p>
                                    <p>💧 Humidity: {day.humiditySeverity}</p>
                                </div>

                                {/* Message */}
                                <p className="text-xs pt-2 border-t">
                                    {day.message}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}