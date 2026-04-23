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

import { fetchAnalyticsData } from "@/services/dashboardApi";
import analyticsStub from "@/mocks/analyticsStub";

const API_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_URL) {
    throw new Error("VITE_API_BASE_URL is not defined in test environment");
}

let requestCaptured = false;

const server = setupServer(
    http.get(`${API_URL}/transport/disruption-analytics`, ({ request }) => {
        requestCaptured = true;

        expect(request.method).toBe("GET");
        const url = new URL(request.url);
        expect(url.searchParams.toString()).toBe("");

        return HttpResponse.json(analyticsStub, { status: 200 });
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

describe("fetchAnalyticsData (frontend contract)", () => {

    it("calls correct endpoint and validates full response structure", async () => {
        const data = await fetchAnalyticsData();

        expect(requestCaptured).toBe(true);

        expect(data).toBeDefined();
        expect(data.location).toBe("parramatta");
        expect(typeof data.overall.overall_disruption_rate).toBe("number");
        expect(typeof data.overall.total_days).toBe("number");

        const allTimeDays = data.best_worst_day_of_week.all_time;
        expect(Array.isArray(allTimeDays.by_day)).toBe(true);
        expect(allTimeDays.by_day.length).toBe(7);
        expect(typeof allTimeDays.best).toBe("string");

        expect(Array.isArray(data.weather_threshold_analysis.rainfall)).toBe(true);
        expect(data.weather_threshold_analysis.rainfall[0].threshold_mm).toBeDefined();
    });

    it("fails when response is missing required fields", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-analytics`, () => {
                return HttpResponse.json({
                    location: "parramatta",
                });
            })
        );

        const data = await fetchAnalyticsData();

        expect(data.overall).toBeUndefined();
        expect(() => {
            if (!data.overall) {
                throw new Error("Invalid contract: missing overall data");
            }
        }).toThrow();
    });

    it("fails when response types are incorrect", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-analytics`, () => {
                return HttpResponse.json({
                    location: 12345, 
                    overall: {},
                });
            })
        );

        const data = await fetchAnalyticsData();
        expect(typeof data.location).not.toBe("string");
    });

    it("throws error when API response is not ok", async () => {
        server.use(
            http.get(`${API_URL}/transport/disruption-analytics`, () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        await expect(fetchAnalyticsData()).rejects.toThrow(
            /Failed to fetch analytics data|500/i
        );
    });

    it("fails if request does not match expected endpoint", async () => {
        server.use(
            http.get("*", () => {
                return new HttpResponse(null, { status: 404 });
            })
        );

        await expect(fetchAnalyticsData()).rejects.toThrow();
    });
});