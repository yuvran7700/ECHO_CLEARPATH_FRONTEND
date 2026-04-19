import { useEffect, useState } from "react";
import { fetchForecastData } from "../services/dashboardApi";

export function useForecastData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                const result = await fetchForecastData();

                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
}