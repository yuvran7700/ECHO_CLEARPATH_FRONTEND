import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CommuterDashboardSkeleton from "@/components/CommuterDashboardComponents/CommuterDashboardSkeleton";

describe("CommuterDashboardSkeleton", () => {
    it("renders without crashing", () => {
        render(<CommuterDashboardSkeleton />);
    });

    it("renders a section element", () => {
        const { container } = render(<CommuterDashboardSkeleton />);
        expect(container.querySelector("section")).toBeDefined();
    });
});
