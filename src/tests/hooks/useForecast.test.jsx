// src/tests/hooks/useForecast.test.jsx

import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ForecastContext from "@/context/ForecastContext";
import useForecast from "@/hooks/useForecast";

const mockContext = {
    data: null,
    forecastLoading: false,
    forecastError: null,
    analytics: null,
    analyticsLoading: false,
    analyticsError: null,
    selectedLineId: "T1",
    setSelectedLineId: () => {},
    selectedDayIndex: 0,
    setSelectedDayIndex: () => {},
    selectedDay: null,
    lineNotice: "",
    handleLineSelect: () => {},
    clearLineNotice: () => {},
};

const wrapper = ({ children }) => (
    <ForecastContext.Provider value={mockContext}>
        {children}
    </ForecastContext.Provider>
);

describe("useForecast", () => {
    it("returns context values when used inside ForecastContext.Provider", () => {
        const { result } = renderHook(() => useForecast(), { wrapper });
        expect(result.current.selectedLineId).toBe("T1");
    });

    it("returns all expected context keys", () => {
        const { result } = renderHook(() => useForecast(), { wrapper });
        expect(result.current.data).toBeNull();
        expect(result.current.forecastLoading).toBe(false);
        expect(result.current.forecastError).toBeNull();
        expect(result.current.selectedDayIndex).toBe(0);
        expect(result.current.lineNotice).toBe("");
    });

    it("throws when used outside ForecastProvider", () => {
        expect(() => renderHook(() => useForecast())).toThrow(
            "useForecast must be used within ForecastProvider"
        );
    });
});