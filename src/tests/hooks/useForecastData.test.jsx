// src/tests/hooks/useForecastData.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// Mock the API service — not the stub
vi.mock("@/services/dashboardApi", () => ({
    fetchForecastData: vi.fn(),
}));

// Mock the stub to prevent it loading real data
vi.mock("@/mocks/forecastStub", () => ({
    default: null,
}));

import { fetchForecastData } from "@/services/dashboardApi";
import { useForecastData } from "@/hooks/useForecastData";

const mockForecast = {
    days: [
        { date: "2024-01-01", risk: "low", message: "Low risk today." },
        { date: "2024-01-02", risk: "high", message: "High risk today." },
    ],
};

beforeEach(() => {
    vi.clearAllMocks();
    fetchForecastData.mockResolvedValue(mockForecast);
});

describe("useForecastData", () => {

    // --- INITIAL STATE ---
    it("starts with loading true and no data", () => {
        const { result } = renderHook(() => useForecastData());

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe("");
    });

    // --- HAPPY PATH ---
    it("loads forecast data successfully", async () => {
        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(mockForecast);
        expect(result.current.error).toBe("");
    });

    it("sets loading to false after successful load", async () => {
        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it("data contains a days array", async () => {
        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(Array.isArray(result.current.data.days)).toBe(true);
    });

    it("days array has correct length", async () => {
        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data.days).toHaveLength(2);
    });

    // --- ERROR PATH ---
    it("sets error when fetch fails", async () => {
        fetchForecastData.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Network error");
        expect(result.current.data).toBeNull();
    });

    it("sets loading false even when fetch fails", async () => {
        fetchForecastData.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it("uses fallback error message when error has no message", async () => {
        fetchForecastData.mockRejectedValue({});

        const { result } = renderHook(() => useForecastData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Something went wrong");
    });

});