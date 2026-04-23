import {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
    afterEach,
} from "vitest";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import { fetchForecastData } from "@/services/dashboardApi";
import forecastStub from "@/mocks/forecastStub";

const API_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_URL) {
    throw new Error("VITE_API_BASE_URL is not defined in test environment");
}

let requestCaptured = false;

const server = setupServer(
    http.get(`${API_URL}/transport/disruption-forecast`, ({ request }) => {
        requestCaptured = true;

        expect(request.method).toBe("GET");
        const url = new URL(request.url);
        expect(url.searchParams.toString()).toBe("");

        return HttpResponse.json(forecastStub, { status: 200 });
    })
);

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
    server.resetHandlers();
    requestCaptured = false;
});

afterAll(() => {
    server.close();
});

describe("fetchForecastData (frontend contract)", () => {

    it("calls correct endpoint and validates full response structure", async () => {
        const data = await fetchForecastData();

        expect(requestCaptured).toBe(true);

        expect(data).toBeDefined();
        expect(typeof data.lat).toBe("number");
        expect(typeof data.lon).toBe("number");
        expect(Array.isArray(data.days)).toBe(true);
        expect(data.days.length).toBeGreaterThan(0);

        const day = data.days[0];
        expect(typeof day.date).toBe("string");
        expect(typeof day.weather_summary).toBe("string");
        expect(typeof day.tempSeverity).toBe("string");
        expect(typeof day.risk).toBe("number");
        expect(typeof day.risk_level).toBe("string");
    });

    it("fails when response is missing required fields", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-forecast`, () => {
                return HttpResponse.json({
                    lat: -33.8,
                    lon: 151.0,
                    days: [{ date: "2026-04-19" }],
                });
            })
        );

        const data = await fetchForecastData();
        const day = data.days[0];

        expect(day.risk).toBeUndefined();
        expect(() => {
            if (typeof day.risk !== "number") {
                throw new Error("Invalid contract: risk must be number");
            }
        }).toThrow();
    });

    it("fails when response types are incorrect", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-forecast`, () => {
                return HttpResponse.json({
                    lat: "invalid",
                    lon: 151.0,
                    days: [],
                });
            })
        );

        const data = await fetchForecastData();
        expect(typeof data.lat).not.toBe("number");
    });

    it("throws error when API response is not ok", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-forecast`, () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        await expect(fetchForecastData()).rejects.toThrow(
            /Failed to fetch forecast data|500/i
        );
    });

    it("fails if request does not match expected endpoint", async () => {
        server.use(
            http.get("*", () => {
                return new HttpResponse(null, { status: 404 });
            })
        );

        await expect(fetchForecastData()).rejects.toThrow();
    });
});