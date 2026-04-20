import { useNavigate } from "react-router-dom";

const ModeCard = ({ icon, title, description, accentColor, onClick }) => {
    const colorVariants = {
        blue: "hover:border-blue-400 hover:bg-blue-50/50 text-blue-600",
        purple: "hover:border-purple-400 hover:bg-purple-50/50 text-purple-600",
        emerald: "hover:border-emerald-400 hover:bg-emerald-50/50 text-emerald-600",
    };

    const glowVariants = {
        blue: "drop-shadow-[0_5px_10px_rgba(59,130,246,0.3)]",
        purple: "drop-shadow-[0_5px_10px_rgba(168,85,247,0.3)]",
        emerald: "drop-shadow-[0_5px_10px_rgba(16,185,129,0.3)]",
    };

    return (
        <div
            onClick={onClick}
            className={`flex-1 bg-white border border-slate-200 p-10 rounded-3xl text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${colorVariants[accentColor]}`}
        >
            <div className={`text-5xl mb-6 transition-transform group-hover:scale-110 ${glowVariants[accentColor]}`}>
                {icon}
            </div>
            <h2 className="text-slate-900 text-2xl font-bold mb-3">{title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default function ChooseMode() {
    const navigate = useNavigate()

    const modes = [
        {
            id: 'commuter',
            icon: '🚗',
            title: 'Plan my Journey',
            accentColor: 'blue',
            description: <>Check real-time <span className="font-semibold text-blue-600">risk levels</span> for your transit lines based on live weather and social data.</>
        },
        {
            id: 'researcher',
            icon: '📊',
            title: 'Explore Data',
            accentColor: 'purple',
            description: <>Analyze the <span className="font-semibold text-purple-600">correlation statistics</span> and historical evidence behind our transit predictions.</>
        },
        {
            id: 'developer',
            icon: '🛠️',
            title: 'Developer',
            accentColor: 'emerald',
            description: <>Access our raw <span className="font-semibold text-emerald-600">Weather & Twitter APIs</span> to integrate ClearPath data into your own platforms.</>
        }
    ];

    return (
        <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="text-center mb-12">
                <h1 className="text-4xl text-slate-900 mb-4 tracking-tight">
                    How will you use ClearPath?
                </h1>
                <p className="text-slate-500 max-w-lg mx-auto text-lg">
                    Select a persona to access tailored tools, from daily transit risks to professional API integration.
                </p>
            </div>

            <section className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
                {modes.map((mode) => (
                    <ModeCard
                        key={mode.id}
                        {...mode}
                        onClick={() => {
                            if (mode.id === 'commuter') {
                                navigate('/dashboard/plan-your-journey'); 
                            } else if (mode.id === 'researcher') {
                                navigate('/dashboard/analytics'); 
                            } 
                            else if (mode.id === 'developer') {
                                navigate('/api-doc'); 
                        }
                    }}
                    />
                ))}
            </section>
        </main>
    );
}