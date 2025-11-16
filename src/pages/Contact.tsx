import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen gradient-purple-blue py-12 px-4">
      <Navigation />
      <div className="max-w-4xl mx-auto pt-24">

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 rounded-3xl shadow-2xl border-0 animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📬</div>
              <h1 className="text-3xl font-bold gradient-text mb-3">
                Свяжитесь с нами
              </h1>
              <p className="text-muted-foreground">
                Мы всегда рады вашим вопросам и предложениям
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg">
                  Имя
                </Label>
                <Input
                  id="name"
                  placeholder="Как вас зовут?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 rounded-xl border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 rounded-xl border-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg">
                  Сообщение
                </Label>
                <Textarea
                  id="message"
                  placeholder="Расскажите нам о вашем вопросе или предложении..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[150px] rounded-xl border-2 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg rounded-xl gradient-purple-blue hover:opacity-90"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Отправить сообщение
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 rounded-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl gradient-purple-blue">
                  <Icon name="Mail" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@example.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl gradient-purple-blue">
                  <Icon name="Phone" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl gradient-purple-blue">
                  <Icon name="MapPin" size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Примерная, д. 1
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-2xl border-0 bg-white/90 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-lg mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                {['MessageCircle', 'Send', 'Instagram', 'Youtube'].map((icon, index) => (
                  <button
                    key={icon}
                    className="p-3 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-110"
                  >
                    <Icon name={icon as any} size={24} className="text-primary" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}