import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ApiDocButton from "@/components/ApiComponents/ApiDocButton";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

describe("ApiDocButton", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        vi.stubGlobal("open", vi.fn());
    });

    it("renders without crashing", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
    });

    it("renders the Developer access heading", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
        expect(screen.getByText("Developer access")).toBeDefined();
    });

    it("renders both item titles", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
        expect(screen.getByText("API documentation")).toBeDefined();
        expect(screen.getByText("Integration guide")).toBeDefined();
    });

    it("renders both buttons", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
        expect(screen.getByText("Open docs")).toBeDefined();
        expect(screen.getByText("View guide")).toBeDefined();
    });

    it("navigates to /api-doc when Open docs is clicked", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
        fireEvent.click(screen.getByText("Open docs"));
        expect(mockNavigate).toHaveBeenCalledWith("/api-doc");
    });

    it("opens the external URL in a new tab when View guide is clicked", () => {
        render(<MemoryRouter><ApiDocButton /></MemoryRouter>);
        fireEvent.click(screen.getByText("View guide"));
        expect(window.open).toHaveBeenCalledWith(
            "https://yuvran7700.github.io/clearpath-docs/",
            "_blank"
        );
    });
});
