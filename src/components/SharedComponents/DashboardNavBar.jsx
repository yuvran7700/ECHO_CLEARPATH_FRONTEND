import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, Cloud } from 'lucide-react';

const DashboardNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isPlan = location.pathname === '/dashboard/plan-your-journey';
    const isAnalytics = location.pathname === '/dashboard/analytics';

    return (
        <div className="sticky top-0 z-50 w-full px-4 py-5">
            <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-2 
                            bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
                            rounded-full">
                
                <div 
                    className="flex items-center gap-2 cursor-pointer group" 
                    onClick={() => navigate('/')}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:scale-110">
                        <Cloud size={18} fill="currentColor" />
                    </div>
                    <span className="text-[16px] font-bold tracking-tight text-black font-sans">
                        ClearPath
                    </span>
                </div>

                <div className="flex items-center bg-gray-100 p-1 rounded-full border border-black/5">
                    <button
                        onClick={() => navigate('/dashboard/plan-your-journey')}
                        className={`px-5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-300 ${
                            isPlan
                                ? 'bg-black text-white shadow-lg'
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        Plan your Journey
                    </button>
                    <button
                        onClick={() => navigate('/dashboard/analytics')}
                        className={`px-5 py-1.5 rounded-full text-[12px] font-bold transition-all duration-300 ${
                            isAnalytics
                                ? 'bg-black text-white shadow-lg'
                                : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        Explore Data
                    </button>
                </div>

                <button 
                    onClick={() => navigate('/')} 
                    className="group flex items-center gap-2 pl-4 pr-2 py-1 text-[12px] font-bold text-black border-l border-gray-200 transition-all hover:opacity-70"
                >
                    Home
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                        <ArrowUpRight size={14} strokeWidth={3} />
                    </div>
                </button>
            </nav>
        </div>
    );
};

export default DashboardNav;