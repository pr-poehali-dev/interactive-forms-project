import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/tests', label: 'Тесты', icon: 'Sparkles' },
    { path: '/surveys', label: 'Опросы', icon: 'FileText' },
    { path: '/contact', label: 'Контакты', icon: 'Mail' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="text-3xl">✨</div>
            <span className="text-xl font-bold gradient-text">Самопознание</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                className={`h-11 px-6 rounded-xl ${
                  location.pathname === item.path
                    ? 'gradient-purple-blue text-white'
                    : 'text-foreground hover:bg-white/50'
                }`}
              >
                <Icon name={item.icon as any} size={18} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/50 rounded-xl"
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className="md:hidden border-t border-white/20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
