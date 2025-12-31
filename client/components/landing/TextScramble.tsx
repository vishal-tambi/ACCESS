"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function TextScramble({
    text,
    className,
    duration = 1000,
    speed = 50,
    characterSet = CHARS,
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let start = 0;
        const length = text.length;
        let frame = 0;
        const totalFrames = duration / speed;

        setIsAnimating(true);

        intervalRef.current = setInterval(() => {
            let scrambled = "";
            const progress = frame / totalFrames;

            for (let i = 0; i < length; i++) {
                if (i < Math.floor(progress * length)) {
                    scrambled += text[i];
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(scrambled);
            frame++;

            if (frame > totalFrames) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setDisplayText(text);
                setIsAnimating(false);
            }
        }, speed);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, duration, speed, characterSet]);

    return <span className={cn("inline-block font-mono", className)}>{displayText}</span>;
}
