import { motion } from "framer-motion";
import Footer from './Footer';

const sectionReveal = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

const featureCards = [
    {
        tag: "For commuters",
        title: "Plan your journey",
        description:
            "Check disruption risk before you travel and understand what it means for your route.",
        items: [
            "Line-based disruption predictions (T1, etc.)",
            "Tomorrow’s delay risk with % confidence",
            "Clear commuter guidance",
            "Alternative route planning",
            "Interactive network map",
        ],
        button: "Plan your journey",
    },
    {
        tag: "For researchers & developers",
        title: "Explore disruption data",
        description:
            "Analyse disruption patterns, environmental impact, and integrate predictions into your tools.",
        items: [
            "Real-time disruption risk scoring",
            "Rainfall impact & environmental metrics",
            "Disruption trends & summaries",
            "Rainfall vs disruption visualisation",
            "API documentation & integration",
        ],
        button: "Explore data",
    },
];

const steps = [
    {
        step: "01",
        title: "Collect source data",
        cards: [
            {
                title: "Weather signals",
                text: "Historical and real-time weather data from BOM including rainfall and environmental conditions.",
            },
            {
                title: "Transport alerts",
                text: "Disruption data from transport feeds capturing delays, cancellations, and interruptions.",
            },
        ],
        dark: false,
    },
    {
        step: "02",
        title: "Standardise and store",
        cards: [
            {
                title: "ADAGE modelling",
                text: "Inputs are transformed into structured ADAGE 3.0 JSON objects for interoperability.",
            },
            {
                title: "Historical dataset",
                text: "Normalised records are stored for long-term transport and weather intelligence.",
            },
        ],
        dark: false,
    },
    {
        step: "03",
        title: "Correlate and predict",
        cards: [
            {
                title: "Pattern analysis",
                text: "Find relationships between weather conditions and disruption events across lines.",
            },
            {
                title: "Risk scoring",
                text: "Combine real-time weather with historical patterns to generate disruption probabilities.",
            },
        ],
        dark: false,
    },
    {
        step: "04",
        title: "Deliver insights",
        dark: true,
        cards: [
            {
                title: "Commuters",
                text: "Plan alternative routes before delays begin using predictive disruption insights.",
            },
            {
                title: "Transport teams",
                text: "Improve staffing and operational decisions with predictive visibility.",
            },
            {
                title: "External systems",
                text: "Access structured data via APIs and integrations.",
            },
        ],
    },
];

// -----------------------------
// COMPONENTS
// -----------------------------
function FeatureCard({ feature }) {
    return (
        <motion.div
            variants={cardReveal}
            whileHover={{ y: -6 }}
            className="rounded-[40px] border border-neutral-200 bg-neutral-50 p-10 min-h-[380px] hover:bg-neutral-100 transition-colors flex flex-col justify-between"
        >
            <div>
                <p className="text-xs uppercase tracking-[0.25em] text-sky-700 mb-3">
                    {feature.tag}
                </p>

                <h3 className="text-3xl font-semibold mb-4">
                    {feature.title}
                </h3>

                <p className="text-neutral-600 text-lg mb-6">
                    {feature.description}
                </p>

                <ul className="space-y-3 text-neutral-700">
                    {feature.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </div>

            <button className="mt-8 self-start rounded-full bg-slate-950 text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                {feature.button}
            </button>
        </motion.div>
    );
}

function Step({ step }) {
    return (
        <motion.div variants={cardReveal}>
            <div
                className={`rounded-[36px] border p-8 md:p-10 ${
                    step.dark
                        ? "bg-slate-950 text-white border-slate-900"
                        : "bg-neutral-50 border-neutral-200"
                }`}
            >
                <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    <div className="md:max-w-xs">
                        <p
                            className={`text-xs uppercase tracking-[0.22em] mb-3 ${
                                step.dark ? "text-sky-300" : "text-sky-700"
                            }`}
                        >
                            Step {step.step}
                        </p>

                        <h3 className="text-3xl font-semibold tracking-tight">
                            {step.title}
                        </h3>
                    </div>

                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                        {step.cards.map((card, i) => (
                            <div
                                key={i}
                                className={`rounded-3xl border p-6 ${
                                    step.dark
                                        ? "bg-white/5 border-white/10"
                                        : "bg-white border-neutral-200"
                                }`}
                            >
                                <h4 className="text-lg font-semibold mb-2">
                                    {card.title}
                                </h4>
                                <p
                                    className={
                                        step.dark
                                            ? "text-white/70 leading-7"
                                            : "text-neutral-600 leading-7"
                                    }
                                >
                                    {card.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function FeatureSection() {
    return (
        <section id="feature-section" className="relative z-30 bg-white text-black px-8 py-32 rounded-t-[60px] -mt-40">
            <div className="max-w-6xl mx-auto">

                <motion.h2
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-5xl font-bold tracking-tight mb-12"
                >
                    Everything you need <br /> to stay on track.
                </motion.h2>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {featureCards.map((feature, i) => (
                        <FeatureCard key={i} feature={feature} />
                    ))}
                </motion.div>

                <motion.div
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                    className="mt-32 max-w-3xl mb-16"
                >
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-700 mb-4">
                        Data Flow
                    </p>

                    <h2 className="text-5xl font-bold tracking-tight mb-6">
                        From raw signals to actionable predictions.
                    </h2>

                    <p className="text-lg text-neutral-600 leading-8">
                        ClearPath transforms transport and weather data into structured predictive intelligence.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6"
                >
                    {steps.map((step, i) => (
                        <Step key={i} step={step} />
                    ))}
                </motion.div>
            </div>
            <Footer />
        </section>
        
    );
}