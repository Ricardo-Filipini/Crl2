
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center py-10 px-4">
            <h1 className="font-press-start text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-pulse">
                Aniversário Lendário
            </h1>
            <p className="font-press-start text-2xl md:text-4xl text-yellow-300 mt-4 animate-bounce">
                do CRL!
            </p>
        </header>
    );
};

export default Header;
