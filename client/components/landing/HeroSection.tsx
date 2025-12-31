"use client";

import TextScramble from "@/components/landing/TextScramble";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PlayCircle, Layers, Shield, Zap } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Entrance - staggered and snappy
            gsap.from(".hero-text-anim", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2,
            });

            // 3D Dashboard Tilt Entrance
            gsap.from(".hero-dashboard", {
                y: 100,
                rotationX: 45,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.6,
            });

            // Subtle Floating Animation for Dashboard
            gsap.to(".hero-dashboard", {
                y: -15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2.1,
            });

            // Background Parallax on Mouse Move
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 20;
                const y = (clientY / window.innerHeight - 0.5) * 20;

                gsap.to(".hero-bg-grid", {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out",
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-[110vh] flex flex-col items-center justify-start overflow-hidden pt-32 pb-20"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[#020617]">
                {/* Grid Pattern */}
                <div
                    className="hero-bg-grid absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Radial Fade for Grid */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_40%,transparent,rgba(2,6,23,1))]" />

                {/* Glow Orb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
            </div>

            {/* Main Content */}
            <div ref={containerRef} className="relative z-20 max-w-5xl mx-auto px-4 text-center">

                {/* Badge */}
                <div className="hero-text-anim flex justify-center mb-8">
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer group">
                        <span className="flex h-2 w-2 rounded-full bg-accent relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        </span>
                        <span className="text-sm font-medium text-primary-foreground/80 group-hover:text-white transition-colors">
                            v2.0 is now available
                        </span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="hero-text-anim font-heading text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                    Master your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#fbbf24] to-[#F59E0B] animate-shimmer bg-[length:200%_auto]">
                        User Identity
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="hero-text-anim text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                    The <TextScramble text="ultimate platform" className="text-white font-semibold" /> for managing authentication, roles, and permissions at scale. Secure by default.
                </p>

                {/* CTAs */}
                <div className="hero-text-anim flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 mb-20">
                    <Link href="/signup">
                        <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95">
                            Start Building
                        </Button>
                    </Link>
                    <Button variant="ghost" size="lg" className="h-12 px-6 text-base text-gray-400 hover:text-white hover:bg-white/5 rounded-full">
                        <PlayCircle className="mr-2 w-5 h-5" />
                        View Demo
                    </Button>
                </div>

                {/* 3D Dashboard Mockup */}
                <div className="hero-dashboard relative mx-auto w-full max-w-4xl perspective-[2000px]">
                    <div
                        className="relative rounded-xl border border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl overflow-hidden transform rotate-x-12 translate-z-0"
                        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) scale(0.9)' }}
                    >
                        {/* Mock Header */}
                        <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>

                        {/* Mock Body */}
                        <div className="p-6 grid grid-cols-3 gap-6">
                            {/* Stats Col */}
                            <div className="col-span-1 space-y-4">
                                <div className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                    <div className="w-8 h-8 rounded bg-primary/20 mb-2 flex items-center justify-center text-primary"><Zap className="w-4 h-4" /></div>
                                    <div className="h-2 w-12 bg-white/20 rounded mb-1" />
                                    <div className="h-4 w-8 bg-white/40 rounded" />
                                </div>
                                <div className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                    <div className="w-8 h-8 rounded bg-accent/20 mb-2 flex items-center justify-center text-accent"><Shield className="w-4 h-4" /></div>
                                    <div className="h-2 w-12 bg-white/20 rounded mb-1" />
                                    <div className="h-4 w-8 bg-white/40 rounded" />
                                </div>
                            </div>

                            {/* Main Graph/Table Area */}
                            <div className="col-span-2 h-64 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
                                <div className="text-muted-foreground text-sm font-mono flex flex-col items-center">
                                    <Layers className="w-8 h-8 opacity-50 mb-2" />
                                    <span>System Architecture v2.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />
                    </div>

                    {/* Shadow Reflection */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-primary/20 blur-[50px] rounded-[100%]" />
                </div>

            </div>
        </section>
    );
}
