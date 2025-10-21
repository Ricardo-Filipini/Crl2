import React from 'react';
import Section from './Section';
import { GALLERY_IMAGES } from './constants';

const Gallery: React.FC = () => {
    return (
        <Section title="Galeria de Clássicos">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {GALLERY_IMAGES.map((src, index) => (
                    <div key={index} className="aspect-square bg-black bg-opacity-50 p-2 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:-rotate-3">
                        <img 
                            src={src} 
                            alt={`CRL Clássico ${index + 1}`} 
                            className="w-full h-full object-contain rounded-md"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default Gallery;