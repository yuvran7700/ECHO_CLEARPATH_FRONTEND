// src/tests/integration/AnalyticsDashboardPage.integration.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AnalyticsDashboardPage from "@/pages/AnalyticsDashboardPage";
import analyticsStub from "@/mocks/analyticsStub";

vi.mock("@/components/AnalyticsDashboardComponents/WeatherChart", () => ({
    default: () => <div>WeatherThresholdPanel</div>,
}));
vi.mock("@/components/AnalyticsDashboardComponents/TemporalCharts", () => ({
    default: () => <div>TemporalPatternsPanel</div>,
}));
vi.mock("@/components/AnalyticsDashboardComponents/SelectedLineSummaryCard", () => ({
    default: () => <div>SelectedLineSummaryCard</div>,
}));
vi.mock("@/components/AnalyticsDashboardComponents/AnalyticsDashboardSkeleton", () => ({
    default: () => <div>Analytics Loading...</div>,
}));
vi.mock("@/components/ApiComponents/ApiDocButton", () => ({
    default: () => <div>ApiDocButton</div>,
}));

const mockUseAnalyticsData = vi.fn();
vi.mock("@/hooks/useAnalyticsData", () => ({
    useAnalyticsData: () => mockUseAnalyticsData(),
}));

function renderPage() {
    return render(<MemoryRouter><AnalyticsDashboardPage /></MemoryRouter>);
}

describe("AnalyticsDashboardPage (integration)", () => {
    beforeEach(() => vi.clearAllMocks());

    it("renders the skeleton while loading", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: null, analyticsLoading: true, analyticsError: null });
        renderPage();
        expect(screen.getByText("Analytics Loading...")).toBeDefined();
    });

    it("renders the error message when fetch fails", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: null, analyticsLoading: false, analyticsError: "Something went wrong" });
        renderPage();
        expect(screen.getByText("Something went wrong")).toBeDefined();
    });

    it("renders no data message when analytics is null", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: null, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("No analytics data found.")).toBeDefined();
    });

    it("renders the overall disruption rate from the stub", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("43.8%")).toBeDefined();
    });

    it("renders the safest day from the stub", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("Saturday")).toBeDefined();
    });

    it("renders the worst month from the stub", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("February")).toBeDefined();
    });

    it("renders the strongest weather signal from the stub", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        const matches = screen.getAllByText("Rainfall");
        expect(matches.length).toBeGreaterThan(0);
    });

    it("renders all six dashboard sections", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("Analytics scope")).toBeDefined();
        expect(screen.getByText("Key reliability signals")).toBeDefined();
        expect(screen.getByText("What stands out")).toBeDefined();
        expect(screen.getByText("Temporal patterns")).toBeDefined();
        expect(screen.getByText("Weather threshold analysis")).toBeDefined();
        expect(screen.getByText("Analyst interpretation")).toBeDefined();
    });

    it("renders the analyst summary items", () => {
        mockUseAnalyticsData.mockReturnValue({ analytics: analyticsStub, analyticsLoading: false, analyticsError: null });
        renderPage();
        expect(screen.getByText("Overall network profile")).toBeDefined();
        expect(screen.getByText("Most reliable day")).toBeDefined();
        expect(screen.getByText("Weakest month")).toBeDefined();
        expect(screen.getByText("Rain sensitivity")).toBeDefined();
    });
});