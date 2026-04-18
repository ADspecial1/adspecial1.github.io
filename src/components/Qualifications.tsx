import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Award, BookOpen, Hexagon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
    {
        id: 1,
        title: "B.Sc. in Information Technology",
        institution: "Thakur Ramnarayan College of Arts & Commerce",
        year: "Completed",
        description: "Graduated with a CGPA of 8.2, building a strong foundation in software development, databases, and computer networks.",
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        id: 2,
        title: "M.Sc. in Information Technology",
        institution: "Mumbai University",
        year: "Pursuing",
        description: "Currently pursuing post-graduation with a focus on advanced computing, AI, and modern software engineering practices.",
        icon: <Hexagon className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Introduction to CUDA",
        institution: "NVIDIA",
        year: "2026",
        description: "Completed NVIDIA's official CUDA programming course, covering GPU architecture, parallel computing, and accelerated application development.",
        icon: <Award className="w-6 h-6" />
    }
];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
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

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#050505] text-white w-full relative z-30">
            <div className="text-center mb-16 md:mb-24 qual-header">
                <p className="text-[#FF7F3E] uppercase tracking-widest text-sm mb-4 font-semibold">Education & Certifications</p>
                <h2 className="text-5xl md:text-6xl font-bold font-serif italic text-white">Qualifications</h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualifications.map((item) => (
                    <div
                        key={item.id}
                        className="interactable bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-[#FF7F3E]/50 transition-colors duration-500 group relative overflow-hidden"
                    >
                        {/* Subtle gradient glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7F3E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="w-14 h-14 bg-[#FF7F3E]/10 rounded-full flex items-center justify-center mb-6 text-[#FF7F3E] group-hover:bg-[#FF7F3E] group-hover:text-black transition-all duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic">
                            <span className="text-gray-400">{item.institution}</span>
                            <span className="text-gray-500">{item.year}</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
