import React, { useState } from 'react';
import Section from './Section';
import { MEME_BASE_IMAGES, MEME_PROMPTS } from './constants';
import { generateMeme } from '../services/geminiService';

const MemeGenerator: React.FC = () => {
    const [baseImage, setBaseImage] = useState<string>(MEME_BASE_IMAGES[0]);
    const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPrompt, setCurrentPrompt] = useState<string>('');

    const handleGenerateMeme = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedMeme(null);
        
        const randomPrompt = MEME_PROMPTS[Math.floor(Math.random() * MEME_PROMPTS.length)];
        setCurrentPrompt(randomPrompt);

        try {
            const newMeme = await generateMeme(baseImage, randomPrompt);
            setGeneratedMeme(newMeme);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Section title="Mural da Vergonha">
            <div className="flex flex-col items-center space-y-6">
                <p>1. Escolha a base do meme:</p>
                <div className="flex justify-center gap-4 flex-wrap">
                    {MEME_BASE_IMAGES.map((img) => (
                        <img
                            key={img}
                            src={img}
                            alt="Base para meme"
                            className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 transition-all ${baseImage === img ? 'border-pink-500 scale-110' : 'border-transparent'}`}
                            onClick={() => setBaseImage(img)}
                        />
                    ))}
                </div>
                
                <p>2. Clique para a IA fazer a mágica!</p>
                <button
                    onClick={handleGenerateMeme}
                    disabled={isLoading}
                    className="font-press-start bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-500"
                >
                    {isLoading ? 'Criando Arte...' : 'Criar Meme'}
                </button>

                {isLoading && (
                    <div className="text-center p-4 bg-gray-800 rounded-lg">
                        <p className="animate-pulse">A IA está trabalhando em:</p>
                        <p className="text-purple-300 mt-2">"{currentPrompt}"</p>
                    </div>
                )}

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
                
                {generatedMeme && (
                    <div className="mt-6 border-4 border-purple-500 p-2 rounded-lg bg-black">
                        <h3 className="font-press-start text-lg text-purple-300 mb-2 text-center">OBRA-PRIMA!</h3>
                        <img src={generatedMeme} alt="Meme Gerado" className="max-w-full h-auto rounded-md mx-auto" />
                    </div>
                )}
            </div>
        </Section>
    );
};

export default MemeGenerator;