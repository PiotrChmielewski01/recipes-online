import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Header() {
    return(
        <header className="p-1.5 rounded-sm shadow-2xl top-0 sticky z-50 bg-background">
            <div className="flex p-2  justify-between">
                <ModeToggle/>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
                    Recipes Online
                </h1>
                <div>
                    <Button className="m-1 p-3">Register</Button>
                    <Button variant="outline" className="m-1 p-3">Log in</Button>
                </div>
            </div>
        </header>
    )
}