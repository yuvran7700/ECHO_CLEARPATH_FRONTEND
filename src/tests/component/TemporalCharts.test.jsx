import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TemporalPatternsPanel from "@/components/AnalyticsDashboardComponents/TemporalCharts";
import analyticsStub from "@/mocks/analyticsStub";

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Bar: () => null,
    Line: () => null,
    XAxis: () => null,
    YAxis: () => null,
    Tooltip: () => null,
    CartesianGrid: () => null,
}));

describe("TemporalPatternsPanel", () => {
    it("renders without crashing", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
    });

    it("renders the day of week view by default", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        expect(screen.getByText("Day of week")).toBeDefined();
    });

    it("renders the best and worst day stat cards", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        expect(screen.getByText("Saturday")).toBeDefined();
        expect(screen.getByText(/Tuesday/i)).toBeDefined();
    });

    it("renders the bar chart in days view", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        expect(screen.getByTestId("bar-chart")).toBeDefined();
    });

    it("switches to monthly view when Months tab is clicked", async () => {
        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("Months"));
        expect(screen.getByText("Monthly seasonality")).toBeDefined();
        expect(screen.getByTestId("line-chart")).toBeDefined();
    });

    it("renders the best and worst month after switching to monthly view", async () => {
        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("Months"));
        expect(screen.getByText("May")).toBeDefined();
        expect(screen.getByText("February")).toBeDefined();
    });

    it("switches period to 2024 when 2024 tab is clicked", async () => {
        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("2024"));
        expect(screen.getByText("Weekly disruption pattern for 2024")).toBeDefined();
    });

    it("switches period to 2025 when 2025 tab is clicked", async () => {
        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("2025"));
        expect(screen.getByText("Weekly disruption pattern for 2025")).toBeDefined();
    });

    it("switches period to 2026 when 2026 tab is clicked", async () => {
        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("2026"));
        expect(screen.getByText("Weekly disruption pattern for 2026")).toBeDefined();
    });

    it("renders the sample size stat card", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        expect(screen.getByText("Sample size")).toBeDefined();
    });

    it("renders no data message when data is null", () => {
        render(<TemporalPatternsPanel data={null} />);
        expect(screen.getByText("No temporal pattern data available.")).toBeDefined();
    });
});