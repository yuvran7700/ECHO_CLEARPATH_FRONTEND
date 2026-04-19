const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchForecastData() {
    const response = await fetch(`${API_URL}/transport/disruption-forecast/`);

    if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
    }

    return response.json();
}