"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useScroll, useTransform, motion } from "framer-motion";
import { UserPlus, Settings, BarChart, CheckCircle2 } from "lucide-react";

import Image from "next/image";

// Data
const STEPS = [
    {
        id: 1,
        title: "Register & Onboard",
        description: "Your journey starts with a secure, 1-click registration process. We handle the encryption, you handle the growth.",
        icon: UserPlus,
        color: "bg-blue-500",
        stats: ["99.9% Uptime", "AES-256 Auth"],
        image: "auth_screen.png"
    },
    {
        id: 2,
        title: "Manage Roles",
        description: "Assign granular permissions with our visual RBAC editor. Drag, drop, and secure your organization structure.",
        icon: Settings,
        color: "bg-primary", // Amber
        stats: ["Admin Controls", "Audit Logs"],
        image: "dashboard_ui.png"
    },
    {
        id: 3,
        title: "Analyze Growth",
        description: "Real-time analytics dashboard to track user engagement, retention, and system health metrics instantly.",
        icon: BarChart,
        color: "bg-emerald-500",
        stats: ["Live Real-time", "Export PDF"],
        image: "analytics_graph.png"
    },
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="bg-[#020617] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-[40vh]">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                        How it <span className="text-primary italic">works</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Three simple steps to mastery. Scalable, secure, and built for speed.
                    </p>
                </div>

                {/* Sticky Scroll Container */}
                <div className="relative space-y-32">
                    {STEPS.map((step, index) => (
                        <Card
                            key={step.id}
                            step={step}
                            index={index}
                            progress={scrollYProgress}
                            total={STEPS.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Individual Card Component
function Card({ step, index, progress, total }: any) {
    return (
        <div className="sticky top-32 flex flex-col md:flex-row items-center justify-center min-h-[60vh] py-10">
            <div
                className={cn(
                    "relative w-full max-w-5xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-500",
                    "bg-[#0f172a]/90" // Base color
                )}
                style={{
                    // Creates a "Stack" visual offset
                    top: `calc(10vh + ${index * 20}px)`,
                }}
            >
                {/* Visual Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Text Side */}
                    <div className="space-y-8 z-10">
                        <div className={cn("inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-inner", step.color + "/20")}>
                            <step.icon className={cn("w-8 h-8", step.color.replace('bg-', 'text-'))} />
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-muted-foreground">STEP 0{step.id}</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                {step.title}
                            </h3>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {step.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {step.stats.map((stat: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                    <CheckCircle2 className={cn("w-4 h-4", step.color.replace('bg-', 'text-'))} />
                                    {stat}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image/Graphic Side (3D Perspective) */}
                    <div className="relative h-full min-h-[300px] flex items-center justify-center perspective-1000">
                        <div className="relative w-full aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/5 p-2 transform rotate-y-12 rotate-x-6 hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out shadow-2xl overflow-hidden group">
                            {/* Real Image Asset with Lazy Loading */}
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/50">
                                <Image
                                    src={`/images/how-it-works/${step.image}`}
                                    alt={step.title}
                                    fill
                                    className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Decorative background glow per card */}
                <div className={cn("absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none", step.color)} />
            </div>
        </div>
    );
}
