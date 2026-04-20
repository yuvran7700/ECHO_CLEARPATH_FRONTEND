import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChooseMode from "@/pages/ChooseMode";

// mock navigation
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("ChooseMode", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("renders the page heading", () => {
        render(<ChooseMode />);

        expect(
            screen.getByRole("heading", { name: /how will you use clearpath/i })
        ).toBeInTheDocument();
    });

    it("renders all mode cards", () => {
        render(<ChooseMode />);

        expect(screen.getByText(/plan my journey/i)).toBeInTheDocument();
        expect(screen.getByText(/explore data/i)).toBeInTheDocument();
        expect(screen.getByText(/^developer$/i)).toBeInTheDocument();
    });

    it("navigates to commuter dashboard when clicking Plan my Journey", async () => {
        const user = userEvent.setup();
        render(<ChooseMode />);

        await user.click(screen.getByText(/plan my journey/i));

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/plan-your-journey");
    });

    it("navigates to analytics dashboard when clicking Explore Data", async () => {
        const user = userEvent.setup();
        render(<ChooseMode />);

        await user.click(screen.getByText(/explore data/i));

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard/analytics");
    });

    it("navigates to API docs when clicking Developer", async () => {
        const user = userEvent.setup();
        render(<ChooseMode />);

        await user.click(screen.getByText(/^developer$/i));

        expect(mockNavigate).toHaveBeenCalledWith("/api-doc");
    });
});