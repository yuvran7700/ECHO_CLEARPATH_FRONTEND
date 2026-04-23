import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SelectedLineSummaryCard from "@/components/AnalyticsDashboardComponents/SelectedLineSummaryCard";
import analyticsStub from "@/mocks/analyticsStub";

describe("SelectedLineSummaryCard", () => {
    it("renders without crashing", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
    });

    it("renders the selected line ID", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getAllByText("T1").length).toBeGreaterThan(0);
    });

    it("renders the correct line name for T1", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getByText("North Shore & Western Line")).toBeDefined();
    });

    it("renders the correct line name for T4", () => {
        render(<SelectedLineSummaryCard selectedLineId="T4" data={analyticsStub} />);
        expect(screen.getByText("Eastern Suburbs & Illawarra Line")).toBeDefined();
    });

    it("renders Unknown line for an unrecognised line ID", () => {
        render(<SelectedLineSummaryCard selectedLineId="X9" data={analyticsStub} />);
        expect(screen.getByText("Unknown line")).toBeDefined();
    });

    it("renders the formatted location from stub", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getByText("Parramatta")).toBeDefined();
    });

    it("renders Unknown location when location is missing", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={{ overall: analyticsStub.overall }} />);
        expect(screen.getByText("Unknown location")).toBeDefined();
    });

    it("renders the total observed days from stub", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getByText("840 days")).toBeDefined();
    });

    it("renders 0 days when overall data is missing", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={{}} />);
        expect(screen.getByText("0 days")).toBeDefined();
    });

    it("renders the date range from stub", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getByText(/2024/)).toBeDefined();
        expect(screen.getByText(/2026/)).toBeDefined();
    });

    it("renders the Location, Coverage and Observed days labels", () => {
        render(<SelectedLineSummaryCard selectedLineId="T1" data={analyticsStub} />);
        expect(screen.getByText("Location")).toBeDefined();
        expect(screen.getByText("Coverage")).toBeDefined();
        expect(screen.getByText("Observed days")).toBeDefined();
    });
});
