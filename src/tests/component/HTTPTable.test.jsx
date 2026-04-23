// src/tests/components/HTTPTable.test.jsx

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HTTPTable from "@/components/HTTPTable";

describe("HTTPTable", () => {
    it("renders without crashing", () => {
        render(<HTTPTable />);
    });

    it("renders the section heading", () => {
        render(<HTTPTable />);
        expect(screen.getByText("HTTP Status Codes")).toBeDefined();
    });

    it("renders the table header", () => {
        render(<HTTPTable />);
        expect(screen.getByText("HTTP Response Codes")).toBeDefined();
    });

    it("renders all four status code rows", () => {
        render(<HTTPTable />);
        expect(screen.getByText("200")).toBeDefined();
        expect(screen.getByText("400")).toBeDefined();
        expect(screen.getByText("404")).toBeDefined();
        expect(screen.getByText("500")).toBeDefined();
    });

    it("renders all status code names", () => {
        render(<HTTPTable />);
        expect(screen.getByText("OK")).toBeDefined();
        expect(screen.getByText("Bad Request")).toBeDefined();
        expect(screen.getByText("Not Found")).toBeDefined();
        expect(screen.getByText("Server Errors")).toBeDefined();
    });

    it("renders all status code descriptions", () => {
        render(<HTTPTable />);
        expect(screen.getByText("Works as expected")).toBeDefined();
        expect(screen.getByText("Request data had some issue")).toBeDefined();
        expect(screen.getByText("Requested data does not exist")).toBeDefined();
        expect(screen.getByText("Error occurred on ClearPath end")).toBeDefined();
    });

    it("renders the descriptive paragraph", () => {
        render(<HTTPTable />);
        expect(screen.getByText(/ClearPath uses standard HTTP response codes/i)).toBeDefined();
    });
});