import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import WeatherThresholdPanel from "@/components/AnalyticsDashboardComponents/WeatherChart";
import analyticsStub from "@/mocks/analyticsStub";

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => null,
    XAxis: () => null,
    YAxis: () => null,
    Tooltip: () => null,
    CartesianGrid: () => null,
    Legend: () => null,
    ReferenceLine: () => null,
}));

vi.mock("framer-motion", () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

describe("WeatherThresholdPanel", () => {
    it("renders without crashing", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
    });

    it("renders the Temperature tab by default", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
        expect(screen.getAllByText("Temperature").length).toBeGreaterThan(0);
    });

    it("renders the metric unit pill for temperature (°C)", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
        expect(screen.getByText("°C")).toBeDefined();
    });

    it("renders peak and average stat cards", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
        expect(screen.getByText("Peak")).toBeDefined();
        expect(screen.getByText("Average")).toBeDefined();
    });

    it("switches to Wind tab when Wind is clicked", async () => {
        const user = userEvent.setup();
        render(<WeatherThresholdPanel data={analyticsStub} />);
        await user.click(screen.getAllByText("Wind")[0]);
        expect(screen.getByText("km/h")).toBeDefined();
    });

    it("switches to Rainfall tab when Rainfall is clicked", async () => {
        const user = userEvent.setup();
        render(<WeatherThresholdPanel data={analyticsStub} />);
        await user.click(screen.getAllByText("Rainfall")[0]);
        expect(screen.getByText("mm")).toBeDefined();
    });

    it("renders the correct number of data points for temperature", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
        const tempPoints = analyticsStub.weather_threshold_analysis.temperature.length;
        expect(screen.getByText(`${tempPoints}`)).toBeDefined();
    });

    it("renders the correct number of data points for rainfall after switching", async () => {
        const user = userEvent.setup();
        render(<WeatherThresholdPanel data={analyticsStub} />);
        await user.click(screen.getAllByText("Rainfall")[0]);
        const rainPoints = analyticsStub.weather_threshold_analysis.rainfall.length;
        expect(screen.getByText(`${rainPoints}`)).toBeDefined();
    });

    it("renders the line chart", () => {
        render(<WeatherThresholdPanel data={analyticsStub} />);
        expect(screen.getByTestId("line-chart")).toBeDefined();
    });
});