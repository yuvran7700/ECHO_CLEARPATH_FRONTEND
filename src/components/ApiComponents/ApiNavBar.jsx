import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, Cloud } from "lucide-react";

const SWAGGER_URL = "https://yuvran7700.github.io/clearpath-docs/";

const APINav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isOverview = location.pathname === "/api-doc";

    return (
        <div className="sticky top-0 z-50 w-full px-4 py-5">
            <nav
                className="mx-auto max-w-5xl flex items-center justify-between rounded-full border border-white/10 bg-[#18181B]/90 px-6 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
                <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => navigate("/")}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-110">
                        <Cloud size={18} fill="currentColor" />
                    </div>
                    <span className="text-[16px] font-bold tracking-tight text-white font-sans">
                        ClearPath
                    </span>
                </div>

                <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                    <button
                        onClick={() => navigate("/api-doc")}
                        className={`px-5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-300 ${isOverview
                                ? "bg-white text-black shadow-lg"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Overview
                    </button>

                    <button
                        onClick={() =>
                            window.open(SWAGGER_URL, "_blank", "noopener,noreferrer")
                        }
                        className="flex items-center gap-1 px-5 py-1.5 rounded-full text-[12px] font-bold text-zinc-400 transition-all duration-300 hover:text-white"
                    >
                        Swagger
                        <ArrowUpRight size={12} className="opacity-80" />
                    </button>
                </div>

                <button
                    onClick={() => navigate("/dashboard/plan-your-journey")}
                    className="group flex items-center gap-2 border-l border-white/10 pl-4 pr-2 py-1 text-[12px] font-bold text-white transition-all hover:opacity-70"
                >
                    Dashboard
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                        <ArrowUpRight size={14} strokeWidth={3} />
                    </div>
                </button>
            </nav>
        </div>
    );
};

export default APINav;