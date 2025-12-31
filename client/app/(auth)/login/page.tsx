"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import api from "@/lib/api";
import { toast } from "sonner";

export default function LoginPage() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        // GSAP Entrance with Context for Cleanup
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError("");
        try {
            const response = await api.post("/auth/login", data);
            toast.success("Successfully logged in", {
                description: "Welcome back to the dashboard!",
            });
            login(response.data.token, response.data.user);
        } catch (err: any) {
            console.error("Login Error:", err);
            // Fallback removed
            if (data.email.includes("admin")) {
                console.error("Admin login failed. Ensure database is seeded.");
            }
            const errorMessage = err.response?.data?.message || "Invalid email or password";
            setError(errorMessage);
            toast.error("Login Failed", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = () => {
        onSubmit({
            email: "admin@example.com",
            password: "Password123#",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div
                ref={containerRef}
                className="w-full max-w-md space-y-8 bg-surface/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
                        Welcome to ACCESS
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to enter the system.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-sm text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="email"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
                                onClick={(e) => e.preventDefault()} // Placeholder implementation
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            error={errors.password?.message}
                            {...register("password")}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base bg-primary hover:bg-primary-dark text-black font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                                Signing in...
                            </span>
                        ) : (
                            "Sign in"
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-11 text-base border-white/10 hover:bg-white/5"
                        onClick={handleDemoLogin}
                    >
                        Demo Login (Admin)
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
                    <Link href="/signup" className="font-medium text-white hover:text-primary transition-colors">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
