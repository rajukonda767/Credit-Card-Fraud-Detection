import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-36 h-10 bg-muted rounded-full cursor-pointer select-none"
    >
      {/* Slider */}
      <div
        className={`absolute top-1 left-1 h-8 w-16 rounded-full bg-background shadow transition-transform duration-300 ${
          isDark ? "translate-x-16" : "translate-x-0"
        }`}
      />

      {/* Light */}
      <div className="flex items-center justify-center w-16 z-10 gap-1 text-xs font-medium">
        <Sun className="w-4 h-4" />
        Light
      </div>

      {/* Dark */}
      <div className="flex items-center justify-center w-16 z-10 gap-1 text-xs font-medium">
        <Moon className="w-4 h-4" />
        Dark
      </div>
    </div>
  );
};

export default ThemeToggle;
