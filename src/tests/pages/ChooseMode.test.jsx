import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChooseMode from "@/pages/ChooseMode";

describe("ChooseMode", () => {
  it("renders the page", () => {
    render(
      <MemoryRouter>
        <ChooseMode />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /how will you use clearpath/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/plan my journey/i)).toBeInTheDocument();
    expect(screen.getByText(/explore data/i)).toBeInTheDocument();
    expect(screen.getByText(/developer/i)).toBeInTheDocument();
  });
});