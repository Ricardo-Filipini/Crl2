
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Section from './Section';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 400;
const PLAYER_SIZE = 50;
const ITEM_SIZE = 40;
const GAME_DURATION = 30;

type Item = { id: number; x: number; y: number; type: 'good' | 'bad' };

const SwimmingGame: React.FC = () => {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [items, setItems] = useState<Item[]>([]);
    const playerPos = useRef({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - PLAYER_SIZE - 10 });
    const gameAreaRef = useRef<HTMLDivElement>(null);
    // FIX: Initialize useRef with null to avoid potential issues with TypeScript's type inference on overloads.
    const animationFrameId = useRef<number | null>(null);

    const resetGame = () => {
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setItems([]);
        playerPos.current = { x: GAME_WIDTH / 2, y: GAME_HEIGHT - PLAYER_SIZE - 10 };
        setGameState('playing');
    };

    const gameOver = () => {
        setGameState('gameOver');
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };

    const gameLoop = useCallback(() => {
        setItems(prevItems => {
            const newItems: Item[] = [];
            for (const item of prevItems) {
                const newItem = { ...item, y: item.y + 3 };

                // Collision detection
                const playerRect = { x: playerPos.current.x, y: playerPos.current.y, width: PLAYER_SIZE, height: PLAYER_SIZE };
                const itemRect = { x: newItem.x, y: newItem.y, width: ITEM_SIZE, height: ITEM_SIZE };

                if (
                    playerRect.x < itemRect.x + itemRect.width &&
                    playerRect.x + playerRect.width > itemRect.x &&
                    playerRect.y < itemRect.y + itemRect.height &&
                    playerRect.y + playerRect.height > itemRect.y
                ) {
                    if (newItem.type === 'good') {
                        setScore(s => s + 1);
                    } else {
                        gameOver();
                    }
                } else if (newItem.y < GAME_HEIGHT) {
                    newItems.push(newItem);
                }
            }
            return newItems;
        });

        animationFrameId.current = requestAnimationFrame(gameLoop);
    }, []);

    useEffect(() => {
        if (gameState !== 'playing') return;

        animationFrameId.current = requestAnimationFrame(gameLoop);
        
        const itemInterval = setInterval(() => {
            const type = Math.random() > 0.3 ? 'good' : 'bad';
            const newItem: Item = {
                id: Date.now() + Math.random(),
                x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
                y: -ITEM_SIZE,
                type,
            };
            setItems(prev => [...prev, newItem]);
        }, 800);

        const timerInterval = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    gameOver();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            clearInterval(itemInterval);
            clearInterval(timerInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, gameLoop]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gameAreaRef.current || gameState !== 'playing') return;
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - (PLAYER_SIZE / 2);
        playerPos.current.x = Math.max(0, Math.min(x, GAME_WIDTH - PLAYER_SIZE));
        
        // Force re-render to update player position visually
        const playerEl = document.getElementById('player');
        if(playerEl) playerEl.style.left = `${playerPos.current.x}px`;
    };

    const GameOverlay = () => {
        if (gameState === 'playing') return null;
        return (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-center z-20">
                {gameState === 'idle' && (
                    <>
                        <h3 className="font-press-start text-2xl text-yellow-300">Natação Calabresal</h3>
                        <p className="mt-4 text-white">Pegue as Pecesas (👍) e desvie das Calabresas (🥩)!</p>
                        <button onClick={resetGame} className="mt-6 font-press-start bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">Iniciar Jogo</button>
                    </>
                )}
                {gameState === 'gameOver' && (
                    <>
                        <h3 className="font-press-start text-3xl text-red-500">Game Over!</h3>
                        <p className="mt-4 text-2xl text-white">Pontuação: {score}</p>
                        <button onClick={resetGame} className="mt-6 font-press-start bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Jogar Novamente</button>
                    </>
                )}
            </div>
        );
    };

    return (
        <Section title="Mini-Game">
            <div className="flex flex-col items-center">
                 <div className="flex justify-between w-full max-w-[500px] mb-2 font-press-start text-lg">
                    <span className="text-green-400">Pecesas: {score}</span>
                    <span className="text-red-400">Tempo: {timeLeft}</span>
                </div>
                <div 
                    ref={gameAreaRef}
                    onMouseMove={handleMouseMove}
                    className="relative bg-blue-900 border-4 border-yellow-400 overflow-hidden cursor-none"
                    style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
                >
                    <GameOverlay />
                    {gameState === 'playing' && (
                        <>
                            <img id="player" src="/Imagens/crl-rosto-game.png" alt="Player" className="absolute" style={{ width: PLAYER_SIZE, height: PLAYER_SIZE, top: playerPos.current.y, left: playerPos.current.x }} />
                            {items.map(item => (
                                <img key={item.id} src={item.type === 'good' ? '/Imagens/crl-joinha.png' : '/Imagens/crl-linguiça-icon.png'} alt="item" className="absolute" style={{ width: ITEM_SIZE, height: ITEM_SIZE, left: item.x, top: item.y }} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default SwimmingGame;