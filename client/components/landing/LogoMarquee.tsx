"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Real vector logos (simplified for code, using SVGs or colored React Icons)
// Using standard colors for "Modern" look
const LOGOS = [
    { name: "Next.js", color: "#000000", icon: (props: any) => <svg viewBox="0 0 180 180" fill="none" {...props}><mask id="m" maskContentUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5" fill="#fff" /><circle cx=".5" cy=".5" r=".5" fill="#000" /></mask><g mask="url(#m)" fill="currentColor"><circle cx="90" cy="90" r="90" fill="#fff" /><path d="M149.508 157.52L69.143 54H54v71.97h12.243V75.464l81.396 105.772a88.89 88.89 0 001.87-23.715v-6.66z" /></g></svg> },
    { name: "Vercel", color: "#000000", icon: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg> },
    { name: "Stripe", color: "#635BFF", icon: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M13.9 10.7c0 .9-.6 1.4-1.6 1.6-4.3.7-5.9.1-5.9.1l-.2 2.5s2 .5 5 .5c3.2 0 5.4-1.6 5.4-4.1 0-4.6-6-3.8-6-5.6 0-.8.6-1.1 1.6-1.1 3.5 0 5 .5 5 .5l.2-2.3S15.6 2 13.1 2C10 2 7.7 3.5 7.7 6.1c0 4.5 6 3.8 6 5.6h.2z" /></svg> },
    { name: "React", color: "#61DAFB", icon: (props: any) => <svg viewBox="-11.5 -10.232 23 20.463" fill="currentColor" {...props}><circle r="2.05" /><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> },
    { name: "Tailwind", color: "#38B2AC", icon: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" /></svg> },
    { name: "Google", color: "#4285F4", icon: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23.49 12.275c0-.848-.078-1.65-.218-2.427H12v4.577h6.463c-.279 1.489-1.118 2.748-2.378 3.593v2.983h3.847c2.25-2.068 3.548-5.112 3.548-8.726z" fill="#4285F4" /><path d="M12 24c3.233 0 5.952-1.074 7.933-2.903l-3.847-2.983c-1.077.722-2.455 1.147-4.086 1.147-3.116 0-5.756-2.106-6.702-4.938H1.32v3.132A11.996 11.996 0 0012 24z" fill="#34A853" /><path d="M5.298 14.323A7.17 7.17 0 014.934 12c0-.806.138-1.583.364-2.323V6.545H1.32A11.996 11.996 0 000 12c0 1.933.468 3.757 1.32 5.455l3.978-3.132z" fill="#FBBC05" /><path d="M12 4.773c1.758 0 3.336.604 4.582 1.795l3.447-3.448C17.949 1.17 15.23 0 12 0 7.391 0 3.321 2.66 1.32 6.545l3.978 3.132C6.244 6.879 8.884 4.773 12 4.773z" fill="#EA4335" /></svg> },
    { name: "Github", color: "#ffffff", icon: (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg> },
];

export default function LogoMarquee() {
    return (
        <section className="py-24 border-y border-white/5 bg-[#020617] overflow-hidden relative perspective-1000">
            {/* 3D Floor Reflection Effect */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/5 to-transparent z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 mb-16 text-center z-10 relative">
                <p className="text-sm font-semibold text-primary/80 uppercase tracking-[0.3em] glow-text">
                    Powering Next-Gen Companies
                </p>
            </div>

            <div className="relative flex overflow-hidden group" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                {/* Tilted Container for 3D effect */}
                <div
                    className="flex animate-scroll whitespace-nowrap space-x-16 md:space-x-32 py-8"
                >
                    {[...LOGOS, ...LOGOS, ...LOGOS].map((item, i) => (
                        <div
                            key={`${item.name}-${i}`}
                            className="group/logo relative flex flex-col items-center justify-center space-y-4 cursor-pointer grayscale hover:grayscale-0 transition-all duration-500 hover:scale-110 active:scale-95 transform-gpu"
                        >
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 shadow-lg group-hover/logo:border-primary/50 group-hover/logo:shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover/logo:bg-white/10 transition-all duration-500 backdrop-blur-md"
                            >
                                <item.icon className="w-full h-full" style={{ color: "currentColor" }} />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground group-hover/logo:text-white transition-colors opacity-0 group-hover/logo:opacity-100 absolute -bottom-8 transform translate-y-2 group-hover/logo:translate-y-0 duration-300">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0) rotateX(0deg); }
                    100% { transform: translateX(-33.33%) rotateX(0deg); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </section>
    );
}
