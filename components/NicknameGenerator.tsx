
import React, { useState } from 'react';
import Section from './Section';
import { generateNickname } from '../services/geminiService';

const NicknameGenerator: React.FC = () => {
    const [nickname, setNickname] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setNickname('');
        try {
            const newNickname = await generateNickname();
            setNickname(newNickname);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Section title="Gerador de Apelidos">
            <div className="flex flex-col items-center space-y-6">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="font-press-start bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-all duration-300 disabled:bg-gray-500 disabled:animate-pulse"
                >
                    {isLoading ? 'Pensando...' : 'Gerar Apelido'}
                </button>
                {nickname && (
                    <div className="mt-4 p-4 bg-gray-800 border-2 border-pink-500 rounded-lg w-full text-center">
                        <p className="text-lg text-white">Seu novo apelido é:</p>
                        <p className="font-press-start text-2xl text-pink-400 mt-2 animate-pulse">{nickname}</p>
                    </div>
                )}
                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </div>
        </Section>
    );
};

export default NicknameGenerator;
