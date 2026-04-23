// src/tests/smoke/DashboardPage.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import DashboardLayout from "@/pages/DashboardPage";

vi.mock("@/components/SharedComponents/DashboardNavBar", () => ({
    default: () => <nav>DashboardNav</nav>,
}));
vi.mock("@/components/SharedComponents/DashboardHeader", () => ({
    default: () => <header>DashboardHeader</header>,
}));

describe("DashboardLayout (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <DashboardLayout />
            </MemoryRouter>
        );
    });

    it("renders the nav and header", () => {
        render(
            <MemoryRouter>
                <DashboardLayout />
            </MemoryRouter>
        );
        expect(screen.getByText("DashboardNav")).toBeDefined();
        expect(screen.getByText("DashboardHeader")).toBeDefined();
    });
});