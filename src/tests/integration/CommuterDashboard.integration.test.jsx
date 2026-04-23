// src/tests/integration/CommuterDashboard.integration.test.jsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ForecastContext from "@/context/ForecastContext";
import CommuterDashboard from "@/pages/CommuterDashboard";
import forecastStub from "@/mocks/forecastStub";

vi.mock("@/components/CommuterDashboardComponents/WeekRiskInteractiveCard", () => ({
    default: ({ onDayChange }) => (
        <div>
            <div>WeeklyRiskCard</div>
            <button onClick={() => onDayChange(1)}>Select Day 2</button>
        </div>
    ),
}));

vi.mock("@/components/CommuterDashboardComponents/CommuterDashboardSkeleton", () => ({
    default: () => <div>Loading...</div>,
}));

function renderWithContext(contextValue) {
    return render(
        <MemoryRouter>
            <ForecastContext.Provider value={contextValue}>
                <CommuterDashboard />
            </ForecastContext.Provider>
        </MemoryRouter>
    );
}

const baseContext = {
    data: forecastStub,
    forecastLoading: false,
    forecastError: null,
    selectedLineId: "T1",
    setSelectedLineId: vi.fn(),
    selectedDayIndex: 0,
    setSelectedDayIndex: vi.fn(),
    selectedDay: forecastStub.days[0],
    lineNotice: "",
    handleLineSelect: vi.fn(),
    clearLineNotice: vi.fn(),
};

describe("CommuterDashboard (integration)", () => {
    beforeEach(() => vi.clearAllMocks());

    it("renders the skeleton when loading", () => {
        renderWithContext({ ...baseContext, forecastLoading: true, data: null, selectedDay: null });
        expect(screen.getByText("Loading...")).toBeDefined();
    });

    it("renders the error message when fetch fails", () => {
        renderWithContext({ ...baseContext, forecastError: "Failed to load", data: null, selectedDay: null });
        expect(screen.getByText("Failed to load")).toBeDefined();
    });

    it("renders no data message when data is null", () => {
        renderWithContext({ ...baseContext, data: null, selectedDay: null });
        expect(screen.getByText("No forecast data available.")).toBeDefined();
    });

    it("renders the selected line name for T1", () => {
        renderWithContext(baseContext);
        expect(screen.getByText("North Shore & Western Line")).toBeDefined();
    });

    it("renders the selected day message from the forecast stub", () => {
        renderWithContext(baseContext);
        expect(screen.getByText(forecastStub.days[0].message)).toBeDefined();
    });

    it("renders the correct line ID in the outlook description", () => {
        renderWithContext(baseContext);
        expect(screen.getByText(/Tomorrow's Outlook — T1/i)).toBeDefined();
    });

    it("calls setSelectedDayIndex when a day is selected", () => {
        const setSelectedDayIndex = vi.fn();
        renderWithContext({ ...baseContext, setSelectedDayIndex });
        fireEvent.click(screen.getByText("Select Day 2"));
        expect(setSelectedDayIndex).toHaveBeenCalledWith(1);
    });
});