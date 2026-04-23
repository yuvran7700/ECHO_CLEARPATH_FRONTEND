import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import WeeklyInteractiveRiskCard from "@/components/CommuterDashboardComponents/WeekRiskInteractiveCard";
import forecastStub from "@/mocks/forecastStub";

const highRiskForecast = {
    days: [{ ...forecastStub.days[0], risk: 0.85, risk_level: "High" }],
};

const lowRiskForecast = {
    days: [{ ...forecastStub.days[0], risk: 0.1, risk_level: "Low" }],
};

describe("WeeklyInteractiveRiskCard", () => {
    it("renders without crashing", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
    });

    it("renders the line name for T1", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("North Shore & Western Line")).toBeDefined();
    });

    it("renders the default line name for an unknown line ID", () => {
        render(<WeeklyInteractiveRiskCard lineId="X9" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("Transit Line")).toBeDefined();
    });

    it("renders no forecast data message when days is empty", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={{ days: [] }} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("No forecast data available.")).toBeDefined();
    });

    it("renders the risk percentage for the selected day", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("32")).toBeDefined();
    });

    it("renders the risk level for the selected day", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getAllByText(/Moderate/i).length).toBeGreaterThan(0);
    });

    it("renders High risk styling and subtext", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={highRiskForecast} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getAllByText(/High/i).length).toBeGreaterThan(0);
    });

    it("renders Low risk styling and subtext", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={lowRiskForecast} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getAllByText(/Low/i).length).toBeGreaterThan(0);
    });

    it("renders the selected day message", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText(forecastStub.days[0].message)).toBeDefined();
    });

    it("renders all weather metric labels", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("Temperature")).toBeDefined();
        expect(screen.getByText("Rain")).toBeDefined();
        expect(screen.getByText("Wind")).toBeDefined();
        expect(screen.getByText("Humidity")).toBeDefined();
    });

    it("renders the weather severity values from the stub", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("Cold")).toBeDefined();
        expect(screen.getByText("No rain")).toBeDefined();
        expect(screen.getByText("Breezy")).toBeDefined();
        expect(screen.getByText("High Humidity")).toBeDefined();
    });

    it("calls onDayChange with the correct index when a day button is clicked", () => {
        const onDayChange = vi.fn();
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={onDayChange} />);
        const dayButtons = screen.getAllByRole("button");
        fireEvent.click(dayButtons[1]);
        expect(onDayChange).toHaveBeenCalledWith(1);
    });

    it("renders the 5 day forecast label", () => {
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={forecastStub} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getByText("5 day forecast")).toBeDefined();
    });

    it("renders Unknown when severity values are missing", () => {
        const noSeverityForecast = {
            days: [{
                date: "2026-04-19",
                risk: 0.3,
                risk_level: "Low",
                message: "Test message",
            }],
        };
        render(<WeeklyInteractiveRiskCard lineId="T1" forecast={noSeverityForecast} selectedDayIndex={0} onDayChange={vi.fn()} />);
        expect(screen.getAllByText("Unknown").length).toBeGreaterThan(0);
    });
});