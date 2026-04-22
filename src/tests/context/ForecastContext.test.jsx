// src/context/ForecastProvider.test.jsx

import { render, act } from "@testing-library/react";
import { useContext } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ForecastProvider from "../../context/ForecastProvider";
import ForecastContext from "../../context/ForecastContext";

vi.mock("../../hooks/useForecastData", () => ({
    useForecastData: vi.fn(),
}));

vi.mock("../../hooks/useAnalyticsData", () => ({
    useAnalyticsData: vi.fn(),
}));

import { useForecastData } from "../../hooks/useForecastData";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";


function TestConsumer({ onRender }) {
    const ctx = useContext(ForecastContext);
    onRender(ctx);
    return null;
}

function renderWithProvider(onRender) {
    return render(
        <ForecastProvider>
            <TestConsumer onRender={onRender} />
        </ForecastProvider>
    );
}

// ─── Default mock data ────────────────────────────────────────────────────────

const mockForecastData = {
    days: [
        { date: "2024-01-01", risk: "low" },
        { date: "2024-01-02", risk: "high" },
    ],
};

const mockAnalyticsData = { delays: 3, cancellations: 1 };

beforeEach(() => {
    useForecastData.mockReturnValue({
        data: mockForecastData,
        loading: false,
        error: null,
    });

    useAnalyticsData.mockReturnValue({
        analytics: mockAnalyticsData,
        loading: false,
        error: null,
    });
});

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("ForecastContext", () => {
    it("provides forecast and analytics data to consumers", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        expect(ctx.data).toEqual(mockForecastData);
        expect(ctx.analytics).toEqual(mockAnalyticsData);
    });

    it("exposes default selected line as T1 and day index as 0", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        expect(ctx.selectedLineId).toBe("T1");
        expect(ctx.selectedDayIndex).toBe(0);
    });

    it("selectedDay matches first day in data by default", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        expect(ctx.selectedDay).toEqual(mockForecastData.days[0]);
    });

    it("selectedDay is null when data has no days", () => {
        useForecastData.mockReturnValue({ data: null, loading: false, error: null });

        let ctx;
        renderWithProvider((c) => (ctx = c));

        expect(ctx.selectedDay).toBeNull();
    });

    it("handleLineSelect updates selectedLineId for supported lines", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        act(() => ctx.handleLineSelect("T1"));

        expect(ctx.selectedLineId).toBe("T1");
        expect(ctx.lineNotice).toBe("");
    });

    it("handleLineSelect sets lineNotice for unsupported lines", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        act(() => ctx.handleLineSelect("T9"));

        expect(ctx.lineNotice).toBe("T9 is not added yet — coming soon!");
    });

    it("clearLineNotice resets lineNotice to empty string", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        act(() => ctx.handleLineSelect("T9"));
        expect(ctx.lineNotice).not.toBe("");

        act(() => ctx.clearLineNotice());
        expect(ctx.lineNotice).toBe("");
    });

    it("exposes loading and error states from both hooks", () => {
        useForecastData.mockReturnValue({
            data: null,
            loading: true,
            error: "forecast error",
        });
        useAnalyticsData.mockReturnValue({
            analytics: null,
            loading: true,
            error: "analytics error",
        });

        let ctx;
        renderWithProvider((c) => (ctx = c));

        expect(ctx.forecastLoading).toBe(true);
        expect(ctx.forecastError).toBe("forecast error");
        expect(ctx.analyticsLoading).toBe(true);
        expect(ctx.analyticsError).toBe("analytics error");
    });

    it("handleLineSelect resets selectedDayIndex to 0 on valid line", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        act(() => ctx.setSelectedDayIndex(1));
        act(() => ctx.handleLineSelect("T1"));

        expect(ctx.selectedDayIndex).toBe(0);
    });

    it("handleLineSelect does not change selectedLineId for unsupported lines", () => {
        let ctx;
        renderWithProvider((c) => (ctx = c));

        act(() => ctx.handleLineSelect("T9"));

        // Should still be T1, not T9
        expect(ctx.selectedLineId).toBe("T1");
    });
});