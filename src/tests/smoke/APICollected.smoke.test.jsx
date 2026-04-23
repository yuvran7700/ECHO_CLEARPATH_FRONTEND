// src/tests/smoke/APICollected.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import APIDocCollected from "@/pages/APICollected";

vi.mock("@/components/ApiComponents/ApiNavBar", () => ({
    default: () => <nav>APINav</nav>,
}));
vi.mock("@/components/APIScrollBar", () => ({
    default: () => <aside>Sidebar</aside>,
}));
vi.mock("@/components/Collected", () => ({
    default: () => <div>Collected</div>,
}));

describe("APIDocCollected (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <APIDocCollected />
            </MemoryRouter>
        );
    });

    it("renders the Collected component", () => {
        render(
            <MemoryRouter>
                <APIDocCollected />
            </MemoryRouter>
        );
        expect(screen.getByText("Collected")).toBeDefined();
    });
});