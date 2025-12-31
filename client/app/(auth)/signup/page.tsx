"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/validations/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import api from "@/lib/api";

export default function SignupPage() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    useEffect(() => {
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

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError("");
        try {
            // Exclude confirmPassword from payload
            const { confirmPassword, ...payload } = data;
            const response = await api.post("/auth/signup", payload);
            login(response.data.token, response.data.user);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create account");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
            <div
                ref={containerRef}
                className="w-full max-w-md space-y-8 bg-surface/50 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
            >
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-white tracking-tight">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Get started with your 14-day free trial
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {error && (
                        <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-sm text-red-500 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...register("name")}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mq8#kL9@"
                            error={errors.password?.message}
                            {...register("password")}
                        />
                        <p className="text-xs text-muted-foreground">
                            Must be at least 8 chars, include uppercase, lowercase, and number.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
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
                                Creating account...
                            </span>
                        ) : (
                            "Sign up"
                        )}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Link href="/login" className="font-medium text-white hover:text-primary transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
