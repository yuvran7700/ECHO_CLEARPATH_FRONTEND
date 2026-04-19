import { useContext } from "react";
import ForecastContext from "../context/ForecastContext";

export default function useForecast() {
  const context = useContext(ForecastContext);

  if (!context) {
    throw new Error("useForecast must be used within ForecastProvider");
  }

  return context;
}