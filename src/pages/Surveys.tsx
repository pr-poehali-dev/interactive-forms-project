import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function Surveys() {
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState([50]);
  const [frequency, setFrequency] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = [
    { id: 'tech', label: 'Технологии', emoji: '💻' },
    { id: 'sport', label: 'Спорт', emoji: '⚽' },
    { id: 'art', label: 'Искусство', emoji: '🎨' },
    { id: 'music', label: 'Музыка', emoji: '🎵' },
    { id: 'travel', label: 'Путешествия', emoji: '✈️' },
    { id: 'food', label: 'Кулинария', emoji: '🍳' }
  ];

  const handleInterestToggle = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!frequency || interests.length === 0) {
      toast.error('Пожалуйста, ответьте на все вопросы');
      return;
    }

    toast.success('Спасибо за участие в опросе!');
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen gradient-purple-blue py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/20 mb-8"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <Card className="p-8 rounded-3xl shadow-2xl border-0 animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-4xl font-bold gradient-text mb-3">
              Опрос о ваших предпочтениях
            </h1>
            <p className="text-muted-foreground text-lg">
              Помогите нам узнать вас лучше
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <Label className="text-xl font-semibold">
                1. Насколько вы удовлетворены своей жизнью?
              </Label>
              <div className="pt-4">
                <Slider
                  value={satisfaction}
                  onValueChange={setSatisfaction}
                  max={100}
                  step={1}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Совсем не удовлетворён</span>
                  <span className="text-2xl font-bold gradient-text">
                    {satisfaction[0]}%
                  </span>
                  <span>Полностью удовлетворён</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xl font-semibold">
                2. Как часто вы занимаетесь саморазвитием?
              </Label>
              <RadioGroup value={frequency} onValueChange={setFrequency}>
                <div className="space-y-3">
                  {[
                    { value: 'daily', label: 'Каждый день', emoji: '🌟' },
                    { value: 'weekly', label: 'Несколько раз в неделю', emoji: '📅' },
                    { value: 'monthly', label: 'Раз в месяц', emoji: '📆' },
                    { value: 'rarely', label: 'Очень редко', emoji: '🤔' }
                  ].map(option => (
                    <div
                      key={option.value}
                      className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50 ${
                        frequency === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      onClick={() => setFrequency(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <span className="text-2xl">{option.emoji}</span>
                        <span className="text-lg">{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-xl font-semibold">
                3. Выберите ваши интересы
                <span className="text-sm text-muted-foreground ml-2">
                  (можно выбрать несколько)
                </span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map(option => (
                  <div
                    key={option.id}
                    onClick={() => handleInterestToggle(option.id)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50 ${
                      interests.includes(option.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <Checkbox
                      id={option.id}
                      checked={interests.includes(option.id)}
                      onCheckedChange={() => handleInterestToggle(option.id)}
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span>{option.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-10 h-14 text-lg rounded-xl gradient-purple-blue hover:opacity-90"
          >
            <Icon name="Send" size={20} className="mr-2" />
            Отправить ответы
          </Button>
        </Card>
      </div>
    </div>
  );
}
