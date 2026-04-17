import React from "react"

export default function Footer() {
    return (
        <footer className="bg-white text-slate-900 px-6 py-20 border-t border-neutral-200">

            <div className="max-w-3xl mx-auto text-center">

                {/* Brand */}
                <h3
                    className="text-4xl tracking-tight"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                    ClearPath
                </h3>

                {/* Tagline */}
                <p className="mt-4 text-slate-600 text-lg">
                    Know before you go.
                </p>

                {/* Navigation */}
                <div className="mt-10 flex justify-center gap-8 text-sm text-slate-500">
                    <a href="#" className="hover:text-slate-900 transition">
                        Plan Journey
                    </a>
                    <a href="#" className="hover:text-slate-900 transition">
                        Explore Data
                    </a>
                    <a href="#" className="hover:text-slate-900 transition">
                        API
                    </a>
                    <a href="#" className="hover:text-slate-900 transition">
                        About
                    </a>
                </div>

                {/* CTA */}
                <div className="mt-10">
                    <button className="rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                        Try ClearPath
                    </button>
                </div>

            </div>

            {/* Bottom */}
            <div className="mt-16 text-center text-xs text-slate-400">
                © 2026 ClearPath
            </div>

        </footer>
    )
}