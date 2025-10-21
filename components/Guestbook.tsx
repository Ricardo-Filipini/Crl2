
import React, { useState } from 'react';
import Section from './Section';

interface Message {
    id: number;
    text: string;
}

const Guestbook: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Parabéns, seu calabresa! Felicidades!" },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { id: Date.now(), text: newMessage.trim() }]);
            setNewMessage('');
        }
    };

    return (
        <Section title="Mural de Recados">
            <div className="flex flex-col space-y-4 h-full">
                <div className="flex-grow bg-black bg-opacity-30 p-4 rounded-md overflow-y-auto h-64">
                    {messages.map(msg => (
                        <p key={msg.id} className="border-b border-gray-700 pb-2 mb-2 text-sm">
                            {msg.text}
                        </p>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Deixe sua mensagem..."
                        className="flex-grow bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    />
                    <button type="submit" className="bg-pink-600 text-white px-4 rounded-md hover:bg-pink-700 font-press-start text-xs">
                        Enviar
                    </button>
                </form>
            </div>
        </Section>
    );
};

export default Guestbook;
