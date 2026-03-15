import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "Senior Frontend Engineer",
        company: "Vercel",
        period: "2023 - PRESENT",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        description: "Leading development of high-performance web interfaces and contributing to open-source ecosystem tools.",
    },
    {
        id: 2,
        role: "Creative Developer",
        company: "Studio Freight",
        period: "2021 - 2023",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop",
        description: "Crafted award-winning digital experiences focusing on WebGL, motion design, and high-end interactions.",
    },
    {
        id: 3,
        role: "UI Engineer",
        company: "Stripe",
        period: "2019 - 2021",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2670&auto=format&fit=crop",
        description: "Built scalable and accessible design system components for global payment infrastructures.",
    }
];

export default function IndustryExperience() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Cards
            if (listRef.current) {
                const cards = listRef.current.children;
                gsap.fromTo(cards,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white w-full relative z-30">
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
                <div>
                    <p className="text-[#FF7F3E] uppercase tracking-widest text-sm mb-4 font-semibold">Career Journey</p>
                    <h2 className="text-5xl md:text-7xl font-bold italic font-serif tracking-tight">Industry<br />Experience</h2>
                </div>
                <div className="hidden md:flex items-center gap-4 text-gray-500 font-serif italic text-xl">
                    <span>Engineering Growth</span>
                    <div className="w-12 h-[1px] bg-gray-700"></div>
                </div>
            </div>

            <div ref={listRef} className="flex flex-col gap-16 md:gap-32">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group interactable cursor-default`}>
                        <div className="w-full lg:w-3/5 overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 bg-gray-900 aspect-video lg:aspect-auto lg:h-[500px]">
                            <img
                                src={exp.image}
                                alt={exp.company}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            />
                        </div>
                        <div className="w-full lg:w-2/5 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[#FF7F3E] tracking-widest text-sm font-semibold">{exp.period}</span>
                                <div className="p-2 bg-gray-900/50 rounded-lg border border-gray-800">
                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                             <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-[#FF7F3E] transition-colors duration-300">{exp.role}</h3>
                             <h4 className="text-xl md:text-2xl font-serif italic text-gray-400 mb-6">{exp.company}</h4>
                             <p className="text-gray-500 leading-relaxed text-lg max-w-md group-hover:text-gray-300 transition-colors">
                                {exp.description}
                             </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
