import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    TrainFront,
    BarChart3,
    Code2,
    Clock3,
    CloudRain,
    ShieldCheck,
    Smartphone,
    Activity,
    Database,
} from "lucide-react";
import Footer from "./Footer";

// --- Animation Variants ---

const reveal = {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
};

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const cardReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
};

// --- Data ---

const valuePillars = [
    {
        icon: Clock3,
        eyebrow: "Earlier visibility",
        title: "Plan before disruption starts",
        description:
            "ClearPath shifts users from reactive alerts to proactive planning by surfacing likely disruption risk before the journey begins.",
    },
    {
        icon: BarChart3,
        eyebrow: "Decision support",
        title: "Turn raw patterns into usable insight",
        description:
            "Historical trends, threshold analysis, and risk summaries help users understand not just what might happen, but why.",
    },
    {
        icon: Code2,
        eyebrow: "Platform extension",
        title: "Go beyond the dashboard",
        description:
            "Swagger, API documentation, and integration guides make ClearPath useful for teams building apps, tools, and internal workflows.",
    },
];

const surfaces = [
    {
        tag: "Commuter mode",
        title: "Trip planning with predictive risk",
        description:
            "A traveller-facing dashboard that combines 5-day forecast visibility, risk scores, weather conditions, and line selection into one clear planning flow.",
        bullets: [
            "5-day disruption risk forecast",
            "Selected train line controls",
            "Daily risk level and score",
            "Weather conditions at a glance",
            "Clear guidance for immediate action",
        ],
    },
    {
        tag: "Analytics mode",
        title: "Operational and historical insight",
        description:
            "An analytics surface that explains what stands out in the dataset, how disruption behaves over time, and which conditions are most strongly associated with issues.",
        bullets: [
            "Day-of-week and monthly charts",
            "Trend over time visualisation",
            "Weather severity comparisons",
            "Threshold-based insight cards",
            "Historical disruption rate exploration",
        ],
    },
    {
        tag: "Developer mode",
        title: "Documentation built into the product",
        description:
            "The platform includes structured API access, Swagger, and integration guides so external systems can consume and build on ClearPath outputs.",
        bullets: [
            "Endpoint documentation",
            "Swagger access",
            "Integration guides",
            "Example requests and responses",
            "Developer entry from the product nav",
        ],
    },
];

const outcomes = [
    {
        icon: TrainFront,
        title: "For commuters",
        text: "Reduce uncertainty by giving users time to adjust their plans before disruption begins.",
    },
    {
        icon: Activity,
        title: "For operators and analysts",
        text: "Expose patterns across weather and disruption history so teams can interpret risk more clearly.",
    },
    {
        icon: Code2,
        title: "For developers",
        text: "Deliver data in a form that can be integrated into dashboards, tools, and future workflows.",
    },
    {
        icon: ShieldCheck,
        title: "For trust and usability",
        text: "Support loading states, unavailable data, and unsupported features so the product remains understandable.",
    },
];

const platformDepth = [
    {
        icon: CloudRain,
        title: "Forecast depth",
        text: "Daily disruption probability, risk level, and weather conditions across a 5-day window.",
    },
    {
        icon: BarChart3,
        title: "Analytics depth",
        text: "Historical rate by weekday, month, severity, and trends over time.",
    },
    {
        icon: Database,
        title: "Documentation depth",
        text: "API references, Swagger, and integration guidance built into the same product ecosystem.",
    },
    {
        icon: Smartphone,
        title: "UX depth",
        text: "Responsive layouts, state feedback, and controlled feature availability for real-world use.",
    },
];

// --- Sub-components ---

function ValueCard({ icon: Icon, eyebrow, title, description }) {
    return (
        <motion.div
            variants={cardReveal}
            className="rounded-[32px] border border-neutral-200 bg-neutral-50 p-8"
        >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mb-3 text-xs uppercase tracking-[0.22em] text-orange-600">
                {eyebrow}
            </p>

            <h3 className="text-2xl font-semibold tracking-tight text-black">
                {title}
            </h3>

            <p className="mt-4 text-[15px] leading-7 text-neutral-600">
                {description}
            </p>
        </motion.div>
    );
}

function SurfaceCard({ tag, title, description, bullets }) {
    return (
        <motion.div
            variants={cardReveal}
            whileHover={{ y: -4 }}
            className="flex min-h-[380px] flex-col justify-between rounded-[36px] border border-neutral-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
        >
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-orange-600">
                    {tag}
                </p>

                <h3 className="text-3xl font-semibold tracking-tight text-black">
                    {title}
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-neutral-600">
                    {description}
                </p>

                <ul className="mt-6 space-y-3 text-[15px] text-neutral-700">
                    {bullets.map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>
            
        </motion.div>
    );
}

function OutcomeCard({ icon: Icon, title, text }) {
    return (
        <motion.div
            variants={cardReveal}
            className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-6"
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <Icon className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-black">
                {title}
            </h4>
            <p className="mt-3 text-sm leading-7 text-neutral-600">{text}</p>
        </motion.div>
    );
}

function DepthCard({ icon: Icon, title, text }) {
    return (
        <motion.div
            variants={cardReveal}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Icon className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-semibold tracking-tight text-white">
                {title}
            </h4>
            <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
        </motion.div>
    );
}

// --- Main Component ---

export default function PlatformValueSection() {
    return (
        <section className="relative z-30 -mt-32 rounded-t-[64px] bg-white text-black">
            <div className="mx-auto max-w-7xl px-8 py-28">
                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-120px" }}
                    className="max-w-4xl"
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-orange-600">
                        Business value
                    </p>

                    <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
                        A transport intelligence platform,
                        <br />
                        not just a forecast screen.
                    </h2>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600">
                        ClearPath creates value by helping commuters act earlier, giving
                        analysts richer disruption insight, and exposing developer-ready
                        integration surfaces — all within one connected product experience.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-14 grid gap-6 lg:grid-cols-3"
                >
                    {valuePillars.map((card) => (
                        <ValueCard key={card.title} {...card} />
                    ))}
                </motion.div>

                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-28 max-w-4xl"
                >
                    <p className="mb-4 text-xs uppercase tracking-[0.25em] text-orange-600">
                        Product surfaces
                    </p>
                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Built across commuter, analytics, and developer workflows.
                    </h2>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
                        The platform now spans the full front-end journey: landing, mode
                        selection, operational dashboards, API documentation, and
                        integration guidance.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-12 grid gap-6 xl:grid-cols-3"
                >
                    {surfaces.map((surface) => (
                        <SurfaceCard key={surface.title} {...surface} />
                    ))}
                </motion.div>

                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"
                >
                    <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-orange-600">
                            Why it matters
                        </p>
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            Designed to create practical value for every audience.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-neutral-600">
                            ClearPath is valuable because it connects predictive insight to
                            action. It helps people decide, interpret, and integrate — not
                            just observe.
                        </p>
                    </div>

                    <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
                        {outcomes.map((item) => (
                            <OutcomeCard key={item.title} {...item} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <section className="bg-[#08111d] text-white">
                <div className="mx-auto max-w-7xl px-8 py-24">
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl"
                    >
                        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-orange-400">
                            Depth of implementation
                        </p>
                        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                            Credible because it goes deeper than a simple UI.
                        </h2>
                        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
                            The value of the platform is reinforced by the depth of the
                            implementation: multi-day forecasting, historical charting,
                            developer documentation, clear system states, and responsive
                            design.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
                    >
                        {platformDepth.map((item) => (
                            <DepthCard key={item.title} {...item} />
                        ))}
                    </motion.div>

                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        className="mt-14 rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                    >
                        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div>
                                <p className="text-xs uppercase tracking-[0.25em] text-orange-400">
                                    Platform summary
                                </p>
                                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                                    ClearPath helps users plan earlier, analyse deeper, and build
                                    further.
                                </h3>
                                <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
                                    That combination is the real business value: a product that
                                    supports immediate commuter decisions, broader operational
                                    understanding, and future platform extension through APIs and
                                    documentation.
                                </p>
                            </div>

                            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90">
                                Explore ClearPath
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </section>
    );
}