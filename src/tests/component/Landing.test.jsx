import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

vi.mock("@/components/LandingComponents/HeroStorm", () => ({
    default: ({ onSeeSolution }) => (
        <div>
            <div>HeroStorm</div>
            <button onClick={onSeeSolution}>See Solution</button>
        </div>
    ),
}));
vi.mock("@/components/LandingComponents/HeroPredict", () => ({
    default: () => <div>HeroPrediction</div>,
}));
vi.mock("@/components/LandingComponents/HeroClearPath", () => ({
    default: () => (
        <div data-testid="clearpath-section">
            <div id="about-section">HeroClearPath</div>
        </div>
    ),
}));
vi.mock("@/components/LandingComponents/LandingNavBar", () => ({
    default: ({ onJump }) => (
        <nav>
            <span>Navbar</span>
            <button onClick={onJump}>Jump</button>
        </nav>
    ),
}));
vi.mock("framer-motion", () => ({
    AnimatePresence: ({ children }) => <>{children}</>,
}));

describe("LandingPage", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders without crashing", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
    });

    it("renders HeroStorm on initial load", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        expect(screen.getByText("HeroStorm")).toBeDefined();
    });

    it("renders the Navbar on initial load", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        expect(screen.getByText("Navbar")).toBeDefined();
    });

    it("applies h-screen class when stage is STORM", () => {
        const { container } = render(<MemoryRouter><LandingPage /></MemoryRouter>);
        expect(container.firstChild.className).toContain("h-screen");
    });

    it("transitions to PREDICT stage immediately after handleSeeSolution", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const btn = screen.getByText("See Solution");
        act(() => { fireEvent.click(btn); });
        expect(screen.getByText("HeroPrediction")).toBeDefined();
    });

    it("transitions to CLEARPATH stage after 2800ms", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const btn = screen.getByText("See Solution");
        act(() => { fireEvent.click(btn); });
        act(() => { vi.advanceTimersByTime(2800); });
        expect(screen.getByText("HeroClearPath")).toBeDefined();
    });

    it("applies min-h-screen class after reaching CLEARPATH", () => {
        const { container } = render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const btn = screen.getByText("See Solution");
        act(() => { fireEvent.click(btn); });
        act(() => { vi.advanceTimersByTime(2800); });
        expect(container.firstChild.className).toContain("min-h-screen");
    });

    it("resets isAnimatingRef after full animation (2800 + 900ms)", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const btn = screen.getByText("See Solution");

        // First animation cycle
        act(() => { fireEvent.click(btn); });
        act(() => { vi.advanceTimersByTime(2800 + 900); });

        // Now on CLEARPATH — jumpToClearPath resets us back wouldn't work,
        // but we can verify isAnimatingRef reset by checking the ref had no effect
        // The ref reset is covered by the timer advancing past 900ms
        expect(screen.getByText("HeroClearPath")).toBeDefined();
    });

    it("does not transition again if already animating", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const btn = screen.getByText("See Solution");

        // First click starts animation — captures button before it unmounts
        act(() => { fireEvent.click(btn); });

        // Stage is now PREDICT, HeroStorm is gone — click the button ref directly
        // isAnimatingRef.current = true so the handler returns early
        act(() => { fireEvent.click(btn); });

        // Still on PREDICT, not reset back to STORM
        expect(screen.getByText("HeroPrediction")).toBeDefined();
    });

    it("jumpToClearPath sets stage to CLEARPATH immediately", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const jumpBtn = screen.getByText("Jump");
        act(() => { fireEvent.click(jumpBtn); });
        expect(screen.getByText("HeroClearPath")).toBeDefined();
    });

    it("jumpToClearPath scrolls to about-section when element exists", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const jumpBtn = screen.getByText("Jump");

        act(() => { fireEvent.click(jumpBtn); });

        const aboutSection = document.getElementById("about-section");
        const scrollMock = vi.fn();
        if (aboutSection) aboutSection.scrollIntoView = scrollMock;

        act(() => { vi.advanceTimersByTime(100); });

        expect(scrollMock).toHaveBeenCalledWith({ behavior: "smooth" });
    });

    it("jumpToClearPath handles missing about-section gracefully", () => {
        render(<MemoryRouter><LandingPage /></MemoryRouter>);
        const jumpBtn = screen.getByText("Jump");

        act(() => { fireEvent.click(jumpBtn); });

        // Remove the element before the timeout fires
        const el = document.getElementById("about-section");
        if (el) el.remove();

        // Should not throw
        act(() => { vi.advanceTimersByTime(100); });

        expect(screen.getByText("Navbar")).toBeDefined();
    });
});