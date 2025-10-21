import React from 'react';
import { FLOATING_IMAGES } from './constants';

const AnimatedBackground: React.FC = () => {
    const positions = [
        { top: '10%', left: '5%', animation: 'animate-float1' },
        { top: '20%', left: '80%', animation: 'animate-float2' },
        { top: '60%', left: '90%', animation: 'animate-float3' },
        { top: '70%', left: '10%', animation: 'animate-float1' },
        { top: '90%', left: '50%', animation: 'animate-float2' },
        { top: '40%', left: '40%', animation: 'animate-float3' },
    ];
    
    // This is a bit of a hack for Tailwind JIT, which can't see dynamic class names.
    // In a real build setup, these would be in a CSS file or safelisted in tailwind.config.js
    const keyframes = `
        @keyframes float1 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float2 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(-5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float3 {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div className="absolute inset-0 z-0 opacity-10">
                {positions.map((pos, index) => (
                    <img
                        key={index}
                        src={FLOATING_IMAGES[index % FLOATING_IMAGES.length]}
                        alt=""
                        className={`absolute w-24 h-24 object-contain ${pos.animation}`}
                        style={{ top: pos.top, left: pos.left }}
                    />
                ))}
            </div>
        </>
    );
};

export default AnimatedBackground;