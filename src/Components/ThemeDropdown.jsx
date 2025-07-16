import { useTheme } from "@/context/ShadcnThemeContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeDropdown = ({ height, width, className, dropdownSide, dropdownAlign, ...rest }) => {
    const { setTheme } = useTheme();
    return (
        <DropdownMenu {...rest}>
            <DropdownMenuTrigger asChild>
                <Button
                    className={className}
                    style={{ height, width }}
                    variant="outline"
                    size="icon"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-1000" side={dropdownSide} align={dropdownAlign}>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeDropdown;
