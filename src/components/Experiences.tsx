import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "React Native Developer",
        company: "Sencilla Solutions",
        period: "Oct 2025 - Jan 2026",
        description: "Developed cross-platform mobile applications using React Native. Built and maintained frontend features, collaborated with design and backend teams to deliver seamless user experiences.",
    },
    {
        id: 2,
        role: "React Native Developer",
        company: "Converge Digital",
        period: "Feb 2026 - Sept 2026",
        description: "Worked on frontend mobile development using React Native, delivering high-quality features and improving app performance for clients across various industries.",
    },
    {
        id: 3,
        role: "React Native Developer",
        company: "HYNT Solutions",
        period: "Oct 2026 - Present",
        description: "Currently building and enhancing mobile applications as a React Native frontend developer, focusing on clean UI implementation and cross-platform compatibility.",
    }
];

export default function Experiences() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-header",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (listRef.current) {
                const items = listRef.current.children;
                gsap.fromTo(items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white w-full relative z-30 border-t border-gray-900">
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">

                <div className="w-full lg:w-1/3 exp-header">
                    <p className="text-[#FF7F3E] uppercase tracking-widest text-sm mb-4 font-semibold">Career</p>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif italic mb-8">Work<br />Experience</h2>
                    <p className="text-gray-400 leading-relaxed text-lg max-w-sm">
                        A timeline of my professional journey, building tools and experiences for millions of users worldwide.
                    </p>
                </div>

                <div ref={listRef} className="w-full lg:w-2/3 flex flex-col pt-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`flex flex-col md:flex-row gap-4 md:gap-12 py-10 interactable group cursor-pointer ${index !== experiences.length - 1 ? 'border-b border-gray-800' : ''}`}
                        >
                            <div className="md:w-1/4 pt-1">
                                <span className="text-gray-500 font-serif italic text-lg">{exp.period}</span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-3xl font-bold mb-2 group-hover:text-[#FF7F3E] transition-colors">{exp.role}</h3>
                                <h4 className="text-xl text-gray-400 mb-6 group-hover:text-white transition-colors">{exp.company}</h4>
                                <p className="text-gray-500 leading-relaxed max-w-2xl group-hover:text-gray-400 transition-colors">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
