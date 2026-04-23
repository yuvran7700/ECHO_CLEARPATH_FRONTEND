import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import APINav from "@/components/ApiComponents/ApiNavBar";

const mockNavigate = vi.fn();
let mockPathname = "/api-doc";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: mockPathname }),
    };
});

describe("APINav", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockPathname = "/api-doc";
        vi.stubGlobal("open", vi.fn());
    });

    it("renders without crashing", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
    });

    it("renders the ClearPath brand name", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        expect(screen.getByText("ClearPath")).toBeDefined();
    });

    it("renders the Overview and Swagger buttons", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        expect(screen.getByText("Overview")).toBeDefined();
        expect(screen.getByText("Swagger")).toBeDefined();
    });

    it("renders the Dashboard button", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        expect(screen.getByText("Dashboard")).toBeDefined();
    });

    it("navigates to / when the logo is clicked", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        fireEvent.click(screen.getByText("ClearPath"));
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("navigates to /api-doc when Overview is clicked", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        fireEvent.click(screen.getByText("Overview"));
        expect(mockNavigate).toHaveBeenCalledWith("/api-doc");
    });

    it("navigates to /dashboard/plan-your-journey when Dashboard is clicked", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        fireEvent.click(screen.getByText("Dashboard"));
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/plan-your-journey");
    });

    it("opens the Swagger URL in a new tab when Swagger is clicked", () => {
        render(<MemoryRouter><APINav /></MemoryRouter>);
        fireEvent.click(screen.getByText("Swagger"));
        expect(window.open).toHaveBeenCalledWith(
            "https://yuvran7700.github.io/clearpath-docs/",
            "_blank",
            "noopener,noreferrer"
        );
    });

    it("applies active styles to Overview when on /api-doc", () => {
        mockPathname = "/api-doc";
        const { container } = render(<MemoryRouter><APINav /></MemoryRouter>);
        const overviewBtn = screen.getByText("Overview");
        expect(overviewBtn.className).toContain("bg-white");
    });

    it("applies inactive styles to Overview when not on /api-doc", () => {
        mockPathname = "/api-doc/collected";
        render(<MemoryRouter><APINav /></MemoryRouter>);
        const overviewBtn = screen.getByText("Overview");
        expect(overviewBtn.className).toContain("text-zinc-400");
    });
});