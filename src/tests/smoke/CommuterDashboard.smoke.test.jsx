// src/tests/smoke/CommuterDashboard.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ForecastContext from "@/context/ForecastContext";
import CommuterDashboard from "@/pages/CommuterDashboard";

vi.mock("@/components/CommuterDashboardComponents/CommuterDashboardSkeleton", () => ({
    default: () => <div>Loading...</div>,
}));
vi.mock("@/components/CommuterDashboardComponents/WeekRiskInteractiveCard", () => ({
    default: () => <div>WeeklyRiskCard</div>,
}));

const mockForecastContext = {
    data: null,
    forecastLoading: true,
    forecastError: null,
    selectedLineId: "T1",
    setSelectedLineId: () => {},
    selectedDayIndex: 0,
    setSelectedDayIndex: () => {},
    selectedDay: null,
};

describe("CommuterDashboard (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <ForecastContext.Provider value={mockForecastContext}>
                    <CommuterDashboard />
                </ForecastContext.Provider>
            </MemoryRouter>
        );
    });

    it("renders the skeleton while loading", () => {
        render(
            <MemoryRouter>
                <ForecastContext.Provider value={mockForecastContext}>
                    <CommuterDashboard />
                </ForecastContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText("Loading...")).toBeDefined();
    });
});