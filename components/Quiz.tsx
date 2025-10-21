import React, { useState, useEffect } from 'react';
import Section from './Section';
import { QUIZ_QUESTIONS } from './constants';
import { QuizQuestion } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setQuestions(shuffleArray(QUIZ_QUESTIONS));
    }, []);

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return;

        setSelectedAnswer(answer);
        const correct = questions[currentQuestionIndex].correctAnswer === answer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex < questions.length) {
                setCurrentQuestionIndex(nextQuestionIndex);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const getResultTitle = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage < 30) return "Amador de CRL";
        if (percentage < 60) return "Conhecido de Barco";
        if (percentage < 90) return "Amigo Íntimo";
        return "Doutor em CRL-ologia";
    };

    const resetQuiz = () => {
        setQuestions(shuffleArray(QUIZ_QUESTIONS));
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    if (questions.length === 0) return <Section title="Quiz do CRL"><p>Carregando...</p></Section>;

    return (
        <Section title="Quiz do CRL">
            {!showResult ? (
                <div>
                    <h3 className="text-lg text-center mb-6 h-16">{questions[currentQuestionIndex].question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions[currentQuestionIndex].options.map(option => {
                            const isSelected = selectedAnswer === option;
                            const isTheCorrectAnswer = questions[currentQuestionIndex].correctAnswer === option;
                            
                            let buttonClass = 'bg-blue-600 hover:bg-blue-700';
                            if (isSelected) {
                                buttonClass = isCorrect ? 'bg-green-600 animate-pulse' : 'bg-red-600 animate-pulse';
                            } else if (selectedAnswer && isTheCorrectAnswer) {
                                buttonClass = 'bg-green-600';
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={!!selectedAnswer}
                                    className={`p-4 rounded-md text-white text-sm transition-all duration-300 ${buttonClass}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-center mt-6 font-press-start text-sm">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
                </div>
            ) : (
                <div className="text-center">
                    <h3 className="font-press-start text-2xl text-yellow-400">Resultado Final!</h3>
                    <p className="text-xl mt-4">Você acertou {score} de {questions.length} perguntas.</p>
                    <p className="font-press-start text-lg mt-4 text-cyan-300">{getResultTitle()}</p>
                    <button
                        onClick={resetQuiz}
                        className="mt-8 font-press-start bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-all"
                    >
                        Jogar Novamente
                    </button>
                </div>
            )}
        </Section>
    );
};

export default Quiz;