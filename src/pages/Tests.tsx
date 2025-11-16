import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

interface Question {
  id: number;
  question: string;
  options: { text: string; value: number; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Как вы предпочитаете проводить выходные?',
    options: [
      { text: 'Активный отдых на природе', value: 10, emoji: '🏃' },
      { text: 'Уютный вечер дома с книгой', value: 5, emoji: '📚' },
      { text: 'Вечеринка с друзьями', value: 8, emoji: '🎉' },
      { text: 'Творческие хобби', value: 7, emoji: '🎨' }
    ]
  },
  {
    id: 2,
    question: 'Какой стиль работы вам ближе?',
    options: [
      { text: 'Командная работа', value: 8, emoji: '👥' },
      { text: 'Самостоятельная работа', value: 6, emoji: '💼' },
      { text: 'Творческие проекты', value: 9, emoji: '✨' },
      { text: 'Структурированные задачи', value: 7, emoji: '📊' }
    ]
  },
  {
    id: 3,
    question: 'Что для вас важнее всего?',
    options: [
      { text: 'Саморазвитие и обучение', value: 10, emoji: '🎓' },
      { text: 'Стабильность и комфорт', value: 6, emoji: '🏠' },
      { text: 'Приключения и новый опыт', value: 9, emoji: '🌍' },
      { text: 'Отношения с близкими', value: 8, emoji: '❤️' }
    ]
  },
  {
    id: 4,
    question: 'Как вы принимаете решения?',
    options: [
      { text: 'Логически, взвешивая факты', value: 8, emoji: '🧠' },
      { text: 'Интуитивно, следуя чувствам', value: 7, emoji: '💫' },
      { text: 'Советуясь с другими', value: 6, emoji: '🗣️' },
      { text: 'Импульсивно, по ситуации', value: 5, emoji: '⚡' }
    ]
  },
  {
    id: 5,
    question: 'Что вас больше всего мотивирует?',
    options: [
      { text: 'Достижение целей', value: 10, emoji: '🎯' },
      { text: 'Признание окружающих', value: 7, emoji: '🏆' },
      { text: 'Помощь другим', value: 8, emoji: '🤝' },
      { text: 'Личная свобода', value: 9, emoji: '🦅' }
    ]
  }
];

export default function Tests() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      navigate('/results', { state: { score: totalScore, answers: newAnswers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
      setSelectedOption(null);
    } else {
      navigate('/');
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen gradient-purple-blue py-12 px-4">
      <Navigation />
      <div className="max-w-3xl mx-auto pt-24">
        <div className="mb-8">
          
          <div className="glassmorphism rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-primary">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="p-8 rounded-3xl shadow-2xl border-0 animate-fade-in">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent gradient-purple-blue">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                  selectedOption === option.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border bg-white hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{option.emoji}</span>
                  <span className="text-lg font-medium">{option.text}</span>
                  {selectedOption === option.value && (
                    <Icon name="CheckCircle2" size={24} className="ml-auto text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleAnswer}
            disabled={selectedOption === null}
            className="w-full mt-8 h-14 text-lg rounded-xl gradient-purple-blue hover:opacity-90 transition-opacity"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Следующий вопрос
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </>
            ) : (
              <>
                Узнать результаты
                <Icon name="Sparkles" size={20} className="ml-2" />
              </>
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
}