/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { fetchAnalyticsData } from "@/services/dashboardApi";
import analyticsData from "../mocks/analyticsStub";

export function useAnalyticsData() {
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState("");

useEffect(() => {
  let isMounted = true;

  async function loadAnalytics() {
    try {
      setAnalyticsLoading(true);
      setAnalyticsError("");

      // const result = await fetchAnalyticsData();
      const result = analyticsData;

      if (isMounted) {
        setAnalytics(result);
      }
    } catch (err) {
      if (isMounted) {
        setAnalyticsError(err.message || "Failed to load analytics");
      }
    } finally {
      if (isMounted) {
        setAnalyticsLoading(false);
      }
    }
  }

  loadAnalytics();

  return () => {
    isMounted = false;
  };
}, []);

  return { analytics, analyticsLoading, analyticsError };
}