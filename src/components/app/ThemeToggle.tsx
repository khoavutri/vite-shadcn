import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
    const getInitialTheme = () => {
        if (typeof window === "undefined") return "light";
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "light";
    };

    const [theme, setTheme] = useState(getInitialTheme());

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <Button onClick={toggleTheme} className="mt-4">
            {theme === "dark" ? "Chuyển sang sáng" : "Chuyển sang tối"}
        </Button>
    );
}
