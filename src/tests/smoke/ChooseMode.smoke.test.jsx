// src/tests/smoke/ChooseMode.smoke.test.jsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ChooseMode from "@/pages/ChooseMode";

describe("ChooseMode (smoke)", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <ChooseMode />
            </MemoryRouter>
        );
    });

    it("renders the page heading", () => {
        render(
            <MemoryRouter>
                <ChooseMode />
            </MemoryRouter>
        );
        expect(screen.getByText("How will you use ClearPath?")).toBeDefined();
    });

    it("renders all three mode cards", () => {
        render(
            <MemoryRouter>
                <ChooseMode />
            </MemoryRouter>
        );
        expect(screen.getByText("Plan my Journey")).toBeDefined();
        expect(screen.getByText("Explore Data")).toBeDefined();
        expect(screen.getByText("Developer")).toBeDefined();
    });
});