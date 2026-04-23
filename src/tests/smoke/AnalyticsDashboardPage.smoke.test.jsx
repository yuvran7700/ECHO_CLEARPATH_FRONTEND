// src/tests/smoke/AnalyticsDashboardPage.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import AnalyticsDashboardPage from "@/pages/AnalyticsDashboardPage";

vi.mock("@/hooks/useAnalyticsData", () => ({
    useAnalyticsData: () => ({
        analytics: null,
        analyticsLoading: true,
        analyticsError: null,
    }),
}));
vi.mock("@/components/AnalyticsDashboardComponents/AnalyticsDashboardSkeleton", () => ({
    default: () => <div>Analytics Loading...</div>,
}));

describe("AnalyticsDashboardPage (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <AnalyticsDashboardPage />
            </MemoryRouter>
        );
    });

    it("renders the skeleton while loading", () => {
        render(
            <MemoryRouter>
                <AnalyticsDashboardPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Analytics Loading...")).toBeDefined();
    });
});