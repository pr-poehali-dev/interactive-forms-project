import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

interface ResultType {
  title: string;
  description: string;
  icon: string;
  color: string;
  recommendations: string[];
}

const resultTypes: { [key: string]: ResultType } = {
  high: {
    title: 'Активный исследователь',
    description: 'Вы — энергичная личность, стремящаяся к новым впечатлениям и саморазвитию. Вы не боитесь вызовов и всегда готовы к приключениям!',
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
    recommendations: [
      'Попробуйте новое хобби каждый месяц',
      'Запланируйте путешествие в место, где вы никогда не были',
      'Присоединитесь к сообществу единомышленников',
      'Начните вести дневник достижений'
    ]
  },
  medium: {
    title: 'Сбалансированная личность',
    description: 'Вы умеете находить гармонию между активностью и отдыхом, работой и личной жизнью. Ваш подход к жизни — разумный и взвешенный.',
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-500',
    recommendations: [
      'Уделяйте время как социальной жизни, так и одиночеству',
      'Составьте список долгосрочных целей',
      'Практикуйте медитацию или йогу',
      'Развивайте навыки тайм-менеджмента'
    ]
  },
  low: {
    title: 'Созерцатель',
    description: 'Вы цените спокойствие, глубину и стабильность. Ваша сила в способности к рефлексии и вдумчивому подходу к жизни.',
    icon: '🧘',
    color: 'from-green-500 to-emerald-500',
    recommendations: [
      'Создайте уютное пространство для творчества',
      'Займитесь чтением или писательством',
      'Найдите хобби, требующее терпения и концентрации',
      'Общайтесь с близкими людьми в малых группах'
    ]
  }
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, answers } = location.state || { score: 0, answers: [] };
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    const saveTestResult = async () => {
      const resultType = score >= 40 ? 'high' : score >= 30 ? 'medium' : 'low';
      const userSession = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      try {
        await fetch('https://functions.poehali.dev/d96a0c4d-166a-456c-8931-51da3944a570', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score,
            resultType,
            answers,
            userSession
          })
        });
      } catch (error) {
        console.error('Failed to save test result:', error);
      }
    };

    saveTestResult();

    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, answers, navigate, location.state]);

  const getResultType = (totalScore: number): ResultType => {
    if (totalScore >= 40) return resultTypes.high;
    if (totalScore >= 30) return resultTypes.medium;
    return resultTypes.low;
  };

  const result = getResultType(score);
  const maxScore = 50;
  const percentage = (score / maxScore) * 100;

  return (
    <div className="min-h-screen gradient-purple-blue py-12 px-4">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-24">

        <Card className="p-8 md:p-12 rounded-3xl shadow-2xl border-0 animate-fade-in">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6 animate-scale-in">{result.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {result.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Ваш результат</span>
              <span className="text-2xl font-bold gradient-text">
                {animatedScore} / {maxScore}
              </span>
            </div>
            <Progress value={percentage} className="h-4 mb-2" />
            <p className="text-sm text-muted-foreground text-right">
              {Math.round(percentage)}% от максимума
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-2 border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Icon name="BarChart3" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Всего вопросов</h3>
                  <p className="text-3xl font-bold gradient-text">{answers.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-secondary/20 bg-secondary/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <Icon name="TrendingUp" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Средний балл</h3>
                  <p className="text-3xl font-bold gradient-text">
                    {(score / answers.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Lightbulb" size={28} className="text-primary" />
              Персональные рекомендации
            </h2>
            <ul className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-1.5 rounded-full bg-primary/20 mt-1">
                    <Icon name="Check" size={16} className="text-primary" />
                  </div>
                  <span className="text-lg">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/tests')}
              className="flex-1 h-14 text-lg rounded-xl gradient-purple-blue hover:opacity-90"
            >
              <Icon name="RotateCcw" size={20} className="mr-2" />
              Пройти тест снова
            </Button>
            <Button
              onClick={() => navigate('/surveys')}
              variant="outline"
              className="flex-1 h-14 text-lg rounded-xl border-2"
            >
              <Icon name="FileText" size={20} className="mr-2" />
              Опросы
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}