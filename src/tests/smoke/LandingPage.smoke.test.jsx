// src/tests/smoke/LandingPage.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import LandingPage from "@/pages/LandingPage";

vi.mock("@/components/LandingComponents/HeroStorm", () => ({
    default: ({ onSeeSolution }) => <div>HeroStorm <button onClick={onSeeSolution}>See Solution</button></div>,
}));
vi.mock("@/components/LandingComponents/HeroPredict", () => ({
    default: () => <div>HeroPrediction</div>,
}));
vi.mock("@/components/LandingComponents/HeroClearPath", () => ({
    default: () => <div>HeroClearPath</div>,
}));
vi.mock("@/components/LandingComponents/LandingNavBar", () => ({
    default: () => <nav>Navbar</nav>,
}));

describe("LandingPage (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
    });

    it("renders the initial hero stage", () => {
        render(
            <MemoryRouter>
                <LandingPage />
            </MemoryRouter>
        );
        expect(screen.getByText("HeroStorm")).toBeDefined();
    });
});