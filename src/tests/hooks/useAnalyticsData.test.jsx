// src/tests/hooks/useAnalyticsData.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// Mock the API service — not the stub
vi.mock("@/services/dashboardApi", () => ({
  fetchAnalyticsData: vi.fn(),
}));

// Mock the stub to prevent it loading real data
vi.mock("@/mocks/analyticsStub", () => ({
  default: null,
}));

import { fetchAnalyticsData } from "@/services/dashboardApi";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";

const mockAnalytics = { delays: 3, cancellations: 1 };

beforeEach(() => {
  vi.clearAllMocks();
  fetchAnalyticsData.mockResolvedValue(mockAnalytics);
});

describe("useAnalyticsData", () => {

  // --- INITIAL STATE ---
  it("starts with loading true and no data", () => {
    const { result } = renderHook(() => useAnalyticsData());

    expect(result.current.analyticsLoading).toBe(true);
    expect(result.current.analytics).toBeNull();
    expect(result.current.analyticsError).toBe("");
  });

  // --- HAPPY PATH ---
  it("loads analytics data successfully", async () => {
    const { result } = renderHook(() => useAnalyticsData());

    await waitFor(() => expect(result.current.analyticsLoading).toBe(false));

    expect(result.current.analytics).toEqual(mockAnalytics);
    expect(result.current.analyticsError).toBe("");
  });

  it("sets loading to false after successful load", async () => {
    const { result } = renderHook(() => useAnalyticsData());

    await waitFor(() => expect(result.current.analyticsLoading).toBe(false));
  });

  // --- ERROR PATH ---
  it("sets error when fetch fails", async () => {
    fetchAnalyticsData.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAnalyticsData());

    await waitFor(() => expect(result.current.analyticsLoading).toBe(false));

    expect(result.current.analyticsError).toBe("Network error");
    expect(result.current.analytics).toBeNull();
  });

  it("sets loading false even when fetch fails", async () => {
    fetchAnalyticsData.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAnalyticsData());

    await waitFor(() => expect(result.current.analyticsLoading).toBe(false));
  });

  it("uses fallback error message when error has no message", async () => {
    fetchAnalyticsData.mockRejectedValue({});

    const { result } = renderHook(() => useAnalyticsData());

    await waitFor(() => expect(result.current.analyticsLoading).toBe(false));

    expect(result.current.analyticsError).toBe("Failed to load analytics");
  });

});