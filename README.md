# ClearPath — Frontend Interface

> **A data-driven intelligence dashboard for Sydney train disruption forecasting.**
>
> **Live Platform:** [clearpath.vercel.app](https://echo-clearpath-frontend.vercel.app/)
> **Backend Architecture:** [clearpath-backend](https://github.com/yuvran7700/ECHO_CLEARPATH/tree/main)

**Core Tech Stack:** React 18 · Vite · TypeScript · Tailwind CSS · Shadcn UI · TanStack Query · Recharts

-----

## 🚀 Engineering Highlights

  * **Type-Safe Data Orchestration:** Fully implemented TypeScript interfaces to mirror the **ADAGE-compliant JSON** spec from the AWS backend, ensuring 100% type safety from the API layer to the UI components.
  * **Predictive UX:** Built a dynamic forecasting dashboard that translates raw risk scores into intuitive visual indicators, helping commuters interpret ML-driven predictions for 5-day disruption outlooks.
  * **Asynchronous State Management:** Leveraged **TanStack Query** for efficient data fetching, caching, and synchronization, significantly reducing unnecessary API overhead and improving perceived performance.
  * **Complex Data Visualization:** Designed interactive analytical views using **Recharts** to correlate multi-dimensional data (e.g., weather severity vs. disruption frequency) into digestible insights for users.
  * **Modern Component Architecture:** Built with a "Clean Code" approach using **Shadcn UI** (Radix UI primitives) and Tailwind CSS, prioritizing accessibility, responsiveness, and modularity.

-----

## 🛠️ The Architecture

While the backend handles the event-driven microservices and ML classification, this frontend acts as the **Intelligence Layer**. It aggregates data from three distinct AWS microservices to provide a unified user experience.

### Key Views

1.  **5-Day Disruption Forecast:** Consumes the `/transport/disruption-forecast` endpoint to render a "Risk Meter." This maps numerical risk probabilities to visual urgency levels (Low, Moderate, High).
2.  **Historical Performance Analytics:** An interactive deep-dive using the `/transport/disruption-analytics` endpoint. Users can filter by train line and year to visualize how weather patterns historically impact transit reliability.
3.  **Real-Time Alerts:** A live feed of classified disruption events (Cancelled, Delayed, Unknown) parsed from the Twitter/X scraper microservice.

-----

## 📂 Project Structure

```text
.
├── src/
│   ├── components/    # Atomic UI components (Shadcn + custom primitives)
│   ├── pages/         # High-level route views (Forecast, Analytics, etc.)
│   ├── context/       # Global state management using React Context
│   ├── hooks/         # Custom logic (e.g., useForecast, useWeather)
│   ├── services/      # API client definitions (ADAGE-compliant fetchers)
│   ├── mocks/         # Mock data for local development and testing
│   ├── tests/         # Unit and integration test suites
│   ├── lib/           # Shared utility functions and formatting
│   └── styles/        # Global CSS and Tailwind configurations
├── coverage/          # Automated test coverage reports
├── public/            # Static assets and SVG icon sets
└── vite.config.js     # Optimized build and dev server configuration
```

-----

## ⚙️ Development Setup

### Prerequisites

  - Node.js (v18+)
  - npm or pnpm

### Quick Start

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yuvran7700/ECHO_CLEARPATH_FRONTEND.git
    cd ECHO_CLEARPATH_FRONTEND
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file:

    ```env
    VITE_API_BASE_URL=your_aws_api_gateway_endpoint
    ```

4.  **Launch the development server**

    ```bash
    npm run dev
    ```

-----

## 🌐 Deployment & CI/CD

This frontend is continuously deployed via **Vercel**, integrated directly with GitHub:

  * **Feature Branches:** Automated Preview Deployments for every PR.
  * **Production:** Automated deployment on merge to `main` with optimized build assets and edge-network distribution.

-----

## 🔗 Related Repositories

  * **[ClearPath Backend](https://www.google.com/search?q=https://github.com/yuvran7700/ECHO_CLEARPATH_BACKEND):** Event-driven Python microservices on AWS (Lambda, DynamoDB, S3).
  * **Documentation:** Full API schema and ADAGE data specification details are available in the backend repository.
