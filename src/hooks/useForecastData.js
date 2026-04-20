import { useEffect, useState } from "react";
import { fetchForecastData } from "../services/dashboardApi";
import forecastStub from "../mocks/forecastStub";

export function useForecastData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);

                // const result = await fetchForecastData();
                const result = forecastStub;

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

//MOCK DATA TO SAVE API RATE LIMITS 

// import { useEffect, useState } from "react";
// import forecastStub from "../mocks/forecastStub";

// export function useForecastData() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [selectedLineId, setSelectedLineId] = useState("T1");
//   const [selectedDayIndex, setSelectedDayIndex] = useState(0);

//   useEffect(() => {
//     try {
//       // pretend this came from the API
//       setData(forecastStub);
//     } catch (err) {
//       setError("Failed to load forecast");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const selectedDay = data?.days?.[selectedDayIndex] ?? null;

//   return {
//     data,
//     loading,
//     error,
//     selectedLineId,
//     setSelectedLineId,
//     selectedDayIndex,
//     setSelectedDayIndex,
//     selectedDay,
//   };
// }

