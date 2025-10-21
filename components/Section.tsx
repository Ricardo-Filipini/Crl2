
import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
    return (
        <section className={`bg-black bg-opacity-40 border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 rounded-lg p-6 backdrop-blur-sm ${className}`}>
            <h2 className="font-press-start text-xl md:text-2xl text-cyan-400 mb-6 text-center tracking-tighter">{title}</h2>
            {children}
        </section>
    );
};

export default Section;
