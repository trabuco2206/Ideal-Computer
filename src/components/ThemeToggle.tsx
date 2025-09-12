import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center space-x-2"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden md:inline">Modo claro</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden md:inline">Modo escuro</span>
        </>
      )}
    </Button>
  );
}