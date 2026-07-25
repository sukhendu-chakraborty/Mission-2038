"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    CheckCircle2,
    Plus,
    Video,
    MapPin,
    Users,
    Database,
    LayoutDashboard,
    Globe,
    Code
} from "lucide-react";
import { AnimatedTitle } from "./Animated-Title";
import { Iphone } from "@/components/ui/Iphone";
import { LiquidCtaButton } from "@/components/ui/LiquidButton";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
    const containerRef = useRef(null);
    const phonesRef = useRef([]);
    const [isAnnual, setIsAnnual] = useState(false);

    useGSAP(
        () => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                // Parallax effect for the middle phone vs the outer phones on desktop
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });

                // Side phones move up slower, middle phone moves up faster
                tl.to(phonesRef.current[1], { y: -80, ease: "none" }, 0);
                tl.to(phonesRef.current[0], { y: 20, ease: "none" }, 0);
                tl.to(phonesRef.current[2], { y: 20, ease: "none" }, 0);
            });

            // Entrance animation
            gsap.from(phonesRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        },
        { scope: containerRef }
    );

    const plans = [
        {
            name: "Player",
            price: "0",
            period: isAnnual ? "/year" : "/base",
            description: "Essential tools to start tracking your performance.",
            features: isAnnual ? [
                { name: "AI Performance Analysis", icon: CheckCircle2 },
                { name: "Shot Speed Detection", icon: CheckCircle2 },
                { name: "Sprint Velocity Tracking", icon: CheckCircle2 },
                { name: "Basic Match Statistics", icon: CheckCircle2 },
                { name: "AI Skill Rating", icon: CheckCircle2 },
                { name: "Priority Email Support", icon: Plus, color: "text-[#FFD54A]" },
                { name: "Advanced Export Options", icon: Plus, color: "text-[#FFD54A]" },
            ] : [
                { name: "AI Performance Analysis", icon: CheckCircle2 },
                { name: "Shot Speed Detection", icon: CheckCircle2 },
                { name: "Sprint Velocity Tracking", icon: CheckCircle2 },
                { name: "Basic Match Statistics", icon: CheckCircle2 },
                { name: "AI Skill Rating", icon: CheckCircle2 },
            ],
            buttonText: "Start Free",
            isPopular: false,
            hasToggle: true,
        },
        {
            name: "Player Pro",
            price: isAnnual ? "49.99" : "4.99",
            period: isAnnual ? "/year" : "/month",
            description: "Advanced insights to accelerate your development.",
            features: [
                { name: "Everything in Free, plus:", icon: Plus, color: "text-[#FFD54A]" },
                { name: "Gemini Tactical Breakdown", icon: Video, color: "text-[#FFD54A]" },
                { name: "Unlimited Video Analysis", icon: Video, color: "text-[#FFD54A]" },
                { name: "Personalized Training Plans", icon: MapPin, color: "text-[#FFD54A]" },
                { name: "Pro Player Comparisons", icon: Users, color: "text-[#FFD54A]" },
                { name: "PDF Scouting Reports", icon: Database, color: "text-[#FFD54A]" },
            ],
            buttonText: "Upgrade to Pro",
            isPopular: true,
            hasToggle: false,
        },
        {
            name: "Scout & Academy",
            price: isAnnual ? "1990" : "199",
            period: isAnnual ? "/year" : "/month",
            description: "Professional tools for talent identification and ranking.",
            features: [
                { name: "Scout Dashboard", icon: LayoutDashboard, color: "text-[#FF8A00]" },
                { name: "Dynamic ELO Rankings", icon: Database, color: "text-[#FF8A00]" },
                { name: "AI Verified Talent Database", icon: Database, color: "text-[#FF8A00]" },
                { name: "Region-wise Talent Discovery", icon: Globe, color: "text-[#FF8A00]" },
                { name: "Multi-Scout Collaboration", icon: Users, color: "text-[#FF8A00]" },
                { name: "API Access", icon: Code, color: "text-[#FF8A00]" },
            ],
            buttonText: "Book a Demo",
            isPopular: false,
            hasToggle: false,
        },
    ];

    return (
        <section
            ref={containerRef}
            id="pricing"
            className="relative min-h-screen w-full bg-white text-black overflow-hidden py-24 flex flex-col items-center justify-center font-sans"
        >
            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 flex flex-col items-center mt-16 md:mt-24">

                <AnimatedTitle
                    containerClass="
                mb-16
                mx-auto
                max-w-[1500px]
                text-center
                uppercase
                font-black
                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-[8rem]
                leading-[0.9]
                tracking-[-0.05em]
                text-black
            "
                >
                    {"Mission 2K38<br /> Elite Pricing"}
                </AnimatedTitle>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl items-start mt-10 pb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            ref={(el) => (phonesRef.current[index] = el)}
                            className="flex justify-center w-full"
                        >
                            <div className="w-[300px] sm:w-[320px] md:w-full max-w-[360px]">
                                <Iphone className="w-full h-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out">
                                    {/* Inside the phone content */}
                                    <div className="bg-[#050505] w-full h-full pt-14 pb-8 px-6 sm:px-8 flex flex-col relative text-white font-sans overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        <style>{`
                      .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                      }
                    `}</style>
                                        <div className="absolute inset-0 scrollbar-hide overflow-y-auto w-full h-full px-6 sm:px-7 pt-12 pb-8 flex flex-col">

                                            {plan.hasToggle && (
                                                <div className="flex flex-col items-center mb-6 shrink-0 relative z-10 pt-2">
                                                    <div className="flex bg-white/10 rounded-full p-1 mb-2">
                                                        <button
                                                            onClick={() => setIsAnnual(false)}
                                                            className={`${!isAnnual ? 'bg-[#FFD54A] text-black' : 'text-white hover:bg-white/5'} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors`}
                                                        >
                                                            Monthly
                                                        </button>
                                                        <button
                                                            onClick={() => setIsAnnual(true)}
                                                            className={`${isAnnual ? 'bg-[#FFD54A] text-black' : 'text-white hover:bg-white/5'} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors`}
                                                        >
                                                            Annual
                                                        </button>
                                                    </div>
                                                    <span className="text-[#FF8A00] text-[9px] font-bold border border-[#FF8A00]/50 rounded-full px-3 py-1 bg-[#FF8A00]/10">SAVE 20% WITH ANNUAL</span>
                                                </div>
                                            )}

                                            {!plan.hasToggle && plan.isPopular && (
                                                <div className="flex justify-center mb-6 shrink-0 relative z-10 pt-2">
                                                    <span className="bg-[#FFD54A] text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                                        Most Popular
                                                    </span>
                                                </div>
                                            )}

                                            {!plan.hasToggle && !plan.isPopular && (
                                                <div className="h-[76px] shrink-0"></div>
                                            )}

                                            <div className="mb-6 shrink-0 relative z-10 border-b border-white/10 pb-6">
                                                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                                                <div className="flex items-baseline gap-1 mb-3">
                                                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                                                        ${plan.price}
                                                    </span>
                                                    <span className="text-xs text-white/50">{plan.period}</span>
                                                </div>
                                                <p className="text-xs text-white/70 leading-relaxed h-10">{plan.description}</p>
                                            </div>

                                            <ul className="flex flex-col gap-4 mb-8 flex-grow relative z-10">
                                                {plan.features.map((feature, idx) => {
                                                    const Icon = feature.icon;
                                                    return (
                                                        <li key={idx} className="flex items-start gap-3 text-xs">
                                                            <Icon className={`w-4 h-4 shrink-0 ${feature.color || 'text-[#FFD54A]'}`} />
                                                            <span className="text-white/90 font-medium leading-tight">{feature.name}</span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>

                                            <div className="mt-auto shrink-0 relative z-10 pt-4 w-full flex justify-center">
                                                <LiquidCtaButton
                                                    className="w-full flex justify-center"
                                                    theme={plan.isPopular ? "light" : "dark"}
                                                >
                                                    {plan.buttonText}
                                                </LiquidCtaButton>
                                            </div>

                                            {/* Gradient glows behind the content for luxury feel */}
                                            <div className={`absolute inset-0 pointer-events-none opacity-[0.15] ${plan.isPopular ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFD54A] via-transparent to-transparent' :
                                                'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#FF8A00] via-transparent to-transparent'
                                                }`}></div>

                                        </div>
                                    </div>
                                </Iphone>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
