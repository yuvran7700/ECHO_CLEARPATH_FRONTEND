import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AnalyticsDashboardSkeleton from "@/components/AnalyticsDashboardComponents/AnalyticsDashboardSkeleton";

describe("AnalyticsDashboardSkeleton", () => {
    it("renders without crashing", () => {
        render(<AnalyticsDashboardSkeleton />);
    });

    it("renders a section element", () => {
        const { container } = render(<AnalyticsDashboardSkeleton />);
        expect(container.querySelector("section")).toBeDefined();
    });
});
