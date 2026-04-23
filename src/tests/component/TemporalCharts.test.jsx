import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TemporalPatternsPanel from "@/components/AnalyticsDashboardComponents/TemporalCharts";
import analyticsStub from "@/mocks/analyticsStub";

// Capture tooltip props so we can call the callbacks directly
let capturedBarTooltipProps = null;
let capturedLineTooltipProps = null;

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Bar: () => null,
    Line: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: (props) => {
        // Store props based on which chart rendered this tooltip
        // We differentiate by checking if formatter has been stored yet
        if (!capturedBarTooltipProps) {
            capturedBarTooltipProps = props;
        } else {
            capturedLineTooltipProps = props;
        }
        return null;
    },
}));

describe("TemporalPatternsPanel", () => {
    beforeEach(() => {
        capturedBarTooltipProps = null;
        capturedLineTooltipProps = null;
    });

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

    it("BarChart Tooltip formatter returns correct value and label", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        expect(capturedBarTooltipProps).not.toBeNull();

        const payload = { disruption_days: 5, sample_size: 10 };
        const result = capturedBarTooltipProps.formatter(42, "name", { payload });
        expect(result[0]).toBe("42%");
        expect(result[1]).toContain("5 disruption days");
        expect(result[1]).toContain("10 total");
    });

    it("BarChart Tooltip formatter handles missing payload gracefully", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        const result = capturedBarTooltipProps.formatter(10, "name", {});
        expect(result[0]).toBe("10%");
        expect(result[1]).toContain("0 disruption days");
    });

    it("BarChart Tooltip labelFormatter returns fullLabel when available", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        const result = capturedBarTooltipProps.labelFormatter("Mon", [
            { payload: { fullLabel: "Monday" } },
        ]);
        expect(result).toBe("Monday");
    });

    it("BarChart Tooltip labelFormatter falls back to label when payload missing", () => {
        render(<TemporalPatternsPanel data={analyticsStub} />);
        const result = capturedBarTooltipProps.labelFormatter("Mon", []);
        expect(result).toBe("Mon");
    });

    it("LineChart Tooltip formatter and labelFormatter work correctly", async () => {
        capturedBarTooltipProps = null;
        capturedLineTooltipProps = null;

        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("Months"));

        // After switching to months view, a new Tooltip is rendered for LineChart
        // capturedBarTooltipProps now holds the LineChart tooltip (first one rendered)
        const tooltipProps = capturedBarTooltipProps;
        expect(tooltipProps).not.toBeNull();

        const payload = { disruption_days: 3, sample_size: 8 };
        const result = tooltipProps.formatter(55, "name", { payload });
        expect(result[0]).toBe("55%");
        expect(result[1]).toContain("3 disruption days");

        const labelResult = tooltipProps.labelFormatter("Jan", [
            { payload: { fullLabel: "January" } },
        ]);
        expect(labelResult).toBe("January");
    });

    it("LineChart Tooltip labelFormatter falls back when no payload", async () => {
        capturedBarTooltipProps = null;
        capturedLineTooltipProps = null;

        const user = userEvent.setup();
        render(<TemporalPatternsPanel data={analyticsStub} />);
        await user.click(screen.getByText("Months"));

        const tooltipProps = capturedBarTooltipProps;
        const result = tooltipProps.labelFormatter("Jan", []);
        expect(result).toBe("Jan");
    });
});