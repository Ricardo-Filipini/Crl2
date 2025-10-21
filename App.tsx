
import React from 'react';
import Header from './components/Header';
import NicknameGenerator from './components/NicknameGenerator';
import MemeGenerator from './components/MemeGenerator';
import SwimmingGame from './components/SwimmingGame';
import Quiz from './components/Quiz';
import Guestbook from './components/Guestbook';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <main className="container mx-auto p-4 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 xl:col-span-1">
                           <NicknameGenerator />
                        </div>
                        <div className="lg:col-span-2">
                           <MemeGenerator />
                        </div>
                        <div className="xl:col-span-3">
                           <SwimmingGame />
                        </div>
                        <div className="lg:col-span-2 xl:col-span-2">
                           <Quiz />
                        </div>
                        <div className="xl:col-span-1">
                           <Guestbook />
                        </div>
                        <div className="xl:col-span-3">
                            <Gallery />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
