import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "React Native Developer",
        company: "Sencilla Solutions",
        period: "JAN 2025 - SEP 2025",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
        description: "Developed cross-platform mobile applications using React Native. Built and maintained frontend features, collaborating with design and backend teams to deliver seamless user experiences.",
    },
    // {
    //     id: 2,
    //     role: "React Native Developer",
    //     company: "Converge Digital",
    //     period: "FEB 2026 - SEPT 2026",
    //     image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2670&auto=format&fit=crop",
    //     description: "Worked on frontend mobile development using React Native, delivering high-quality features and improving app performance for clients across various industries.",
    // },
    {
        id: 3,
        role: "React Native Developer",
        company: "HYNT Solutions",
        period: "OCT 2025 - PRESENT",
        image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2670&auto=format&fit=crop",
        description: "Currently building and enhancing mobile applications as a React Native frontend developer, focusing on clean UI implementation and cross-platform compatibility.",
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
                        refreshPriority: 8,
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
                            refreshPriority: 8,
                        }
                    }
                );
            }
        });

        const timer = setTimeout(() => ScrollTrigger.refresh(), 1500);
        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#000000] text-white w-full relative z-30" style={{ marginTop: "-1px" }}>
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
