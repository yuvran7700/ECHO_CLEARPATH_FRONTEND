// import { useMemo, useState } from "react";
// import ForecastContext from "./ForecastContext";
// import { useForecastData } from "../hooks/useForecastData";
// import { useAnalyticsData } from "../hooks/useAnalyticsData";

// export default function ForecastProvider({ children }) {
//     const {
//         data,
//         loading: forecastLoading,
//         error: forecastError,
//     } = useForecastData();

//     const {
//         analytics,
//         loading: analyticsLoading,
//         error: analyticsError,
//     } = useAnalyticsData();

//     const [selectedLineId, setSelectedLineId] = useState("T1");
//     const [selectedDayIndex, setSelectedDayIndex] = useState(0);

//     const selectedDay = data?.days?.[selectedDayIndex] ?? null;

//     const value = useMemo(
//         () => ({
//             data,
//             forecastLoading,
//             forecastError,
//             analytics,
//             analyticsLoading,
//             analyticsError,
//             selectedLineId,
//             setSelectedLineId,
//             selectedDayIndex,
//             setSelectedDayIndex,
//             selectedDay,
//         }),
//         [
//             data,
//             forecastLoading,
//             forecastError,
//             analytics,
//             analyticsLoading,
//             analyticsError,
//             selectedLineId,
//             selectedDayIndex,
//             selectedDay,
//         ]
//     );

//     return (
//         <ForecastContext.Provider value={value}>
//             {children}
//         </ForecastContext.Provider>
//     );
// }

import { useMemo, useState } from "react";
import ForecastContext from "./ForecastContext";
import { useForecastData } from "../hooks/useForecastData";
import { useAnalyticsData } from "../hooks/useAnalyticsData";

const SUPPORTED_LINES = ["T1"];

export default function ForecastProvider({ children }) {
  const {
    data,
    loading: forecastLoading,
    error: forecastError,
  } = useForecastData();

  const {
    analytics,
    loading: analyticsLoading,
    error: analyticsError,
  } = useAnalyticsData();

  const [selectedLineId, setSelectedLineId] = useState("T1");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [lineNotice, setLineNotice] = useState("");

  const selectedDay = data?.days?.[selectedDayIndex] ?? null;

  function handleLineSelect(lineId) {
    if (SUPPORTED_LINES.includes(lineId)) {
      setSelectedLineId(lineId);
      setSelectedDayIndex(0);
      setLineNotice("");
      return;
    }

    setLineNotice(`${lineId} is not added yet — coming soon!`);
  }

  function clearLineNotice() {
    setLineNotice("");
  }

  const value = useMemo(
    () => ({
      data,
      forecastLoading,
      forecastError,
      analytics,
      analyticsLoading,
      analyticsError,
      selectedLineId,
      setSelectedLineId,
      selectedDayIndex,
      setSelectedDayIndex,
      selectedDay,
      lineNotice,
      handleLineSelect,
      clearLineNotice,
    }),
    [
      data,
      forecastLoading,
      forecastError,
      analytics,
      analyticsLoading,
      analyticsError,
      selectedLineId,
      selectedDayIndex,
      selectedDay,
      lineNotice,
    ]
  );

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}