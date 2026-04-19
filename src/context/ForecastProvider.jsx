import { useMemo, useState } from "react";
import ForecastContext from "./ForecastContext";
import { useForecastData } from "../hooks/useForecastData";

export default function ForecastProvider({ children }) {
    const { data, loading, error } = useForecastData();

    const [selectedLineId, setSelectedLineId] = useState("T1");
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);

    const selectedDay = data?.days?.[selectedDayIndex] ?? null;

    const value = useMemo(
        () => ({
            data,
            loading,
            error,
            selectedLineId,
            setSelectedLineId,
            selectedDayIndex,
            setSelectedDayIndex,
            selectedDay,
        }),
        [data, loading, error, selectedLineId, selectedDayIndex, selectedDay],
    );

    return (
        <ForecastContext.Provider value={value}>
            {children}
        </ForecastContext.Provider>
    );
}
