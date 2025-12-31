"use client";

import { cn } from "@/lib/utils";
import { Shield, Zap, Users, Lock, BarChart3, Globe } from "lucide-react";
import { useRef } from "react";

const FEATURES = [
    {
        title: "Role-Based Access",
        description: "Granular control over specific user permissions.",
        icon: Lock,
        className: "md:col-span-2",
    },
    {
        title: "Real-time Analytics",
        description: "Monitor user activity as it happens.",
        icon: BarChart3,
        className: "md:col-span-1",
    },
    {
        title: "Global Scale",
        description: "Deploy and manage users across any region.",
        icon: Globe,
        className: "md:col-span-1",
    },
    {
        title: "Secure Authentication",
        description: "Enterprise-grade encryption and token management.",
        icon: Shield,
        className: "md:col-span-2",
    },
    {
        title: "Lightning Fast",
        description: "Optimized for speed and efficiency.",
        icon: Zap,
        className: "md:col-span-3",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                        Everything you need. <br />
                        <span className="text-muted-foreground">Nothing you don&apos;t.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        A comprehensive suite of tools designed to make user management effortless and secure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <BentoCard key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function BentoCard({ title, description, icon: Icon, className }: any) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        cardRef.current.style.setProperty("--x", `${x * 100}%`);
        cardRef.current.style.setProperty("--y", `${y * 100}%`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-8 hover:border-white/20 transition-colors",
                className
            )}
        >
            {/* Radial Gradient Follower */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: "radial-gradient(600px circle at var(--x) var(--y), rgba(245, 158, 11, 0.1), transparent 40%)",
                }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-8 p-3 w-fit rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}
