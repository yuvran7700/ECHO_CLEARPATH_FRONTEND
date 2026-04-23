// src/tests/components/APICards.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import APICards from "@/components/APICards";

vi.mock("@/assets/weather_icon.png", () => ({ default: "weather_icon.png" }));
vi.mock("@/assets/twitter_icon.png", () => ({ default: "twitter_icon.png" }));
vi.mock("@/assets/analytics_icon.png", () => ({ default: "analytics_icon.png" }));

describe("APICards", () => {
    it("renders without crashing", () => {
        render(<APICards />);
    });

    it("renders all three card titles", () => {
        render(<APICards />);
        expect(screen.getByText("Weather")).toBeDefined();
        expect(screen.getByText("Twitter")).toBeDefined();
        expect(screen.getByText("Analytics")).toBeDefined();
    });

    it("renders all three card descriptions", () => {
        render(<APICards />);
        expect(screen.getByText(/14 months of granular weather data/i)).toBeDefined();
        expect(screen.getByText(/Keyword-driven ingestion of public posts/i)).toBeDefined();
        expect(screen.getByText(/7-day predictive model for train disruptions/i)).toBeDefined();
    });

    it("renders all three card images with correct alt text", () => {
        render(<APICards />);
        expect(screen.getByAltText("Weather")).toBeDefined();
        expect(screen.getByAltText("Twitter")).toBeDefined();
        expect(screen.getByAltText("Analytics")).toBeDefined();
    });
});