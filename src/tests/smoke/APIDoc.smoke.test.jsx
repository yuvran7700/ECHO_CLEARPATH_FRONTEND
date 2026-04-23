// src/tests/smoke/APIDoc.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import APIDoc from "@/pages/APIDoc";

vi.mock("@/components/ApiComponents/ApiNavBar", () => ({
    default: () => <nav>APINav</nav>,
}));
vi.mock("@/components/APIScrollBar", () => ({
    default: () => <aside>Sidebar</aside>,
}));
vi.mock("@/components/APICards", () => ({
    default: () => <div>APICards</div>,
}));
vi.mock("@/components/HTTPTable", () => ({
    default: () => <div>HTTPTable</div>,
}));
vi.mock("@/components/ADAGE", () => ({
    default: () => <div>ADAGE</div>,
}));

describe("APIDoc (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <APIDoc />
            </MemoryRouter>
        );
    });

    it("renders the Overview heading", () => {
        render(
            <MemoryRouter>
                <APIDoc />
            </MemoryRouter>
        );
        expect(screen.getByText("Overview")).toBeDefined();
    });
});