import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Sparkles',
      title: 'Интерактивные тесты',
      description: 'Узнайте больше о себе через увлекательные тесты',
      path: '/tests',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: 'FileText',
      title: 'Опросы',
      description: 'Поделитесь своим мнением и получите персональные рекомендации',
      path: '/surveys',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: 'Mail',
      title: 'Связаться с нами',
      description: 'Есть вопросы? Мы всегда рады помочь',
      path: '/contact',
      color: 'from-pink-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen gradient-purple-blue">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="text-7xl mb-6">✨</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Узнайте себя лучше
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Интерактивная платформа с тестами и опросами для самопознания и развития
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-8 rounded-3xl shadow-2xl border-0 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(feature.path)}
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} w-fit mb-6`}>
                <Icon name={feature.icon as any} size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                {feature.description}
              </p>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-2 hover:border-primary hover:bg-primary/5"
              >
                Перейти
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-12 rounded-3xl shadow-2xl border-0 text-center max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Начните своё путешествие к самопознанию
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Пройдите тесты, получите детальные результаты и персональные рекомендации для развития
          </p>
          <Button
            onClick={() => navigate('/tests')}
            className="h-16 px-12 text-xl rounded-xl gradient-purple-blue hover:opacity-90 transition-opacity"
          >
            <Icon name="Play" size={24} className="mr-3" />
            Начать тест
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Index;