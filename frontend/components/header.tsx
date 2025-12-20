import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import LinkWithLoader from "./link-with-loader";

export default function Header() {
    return(
        <header className="p-1 rounded-sm shadow-2xl top-0 sticky z-50 bg-background">
            <div className="flex p-2  justify-between items-center">
                <ModeToggle/>
                <Link href="/">
                    <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance px-2 text-center">
                        Recipes Online
                    </h1>
                </Link>
                <div className="flex flex-wrap items-end flex-col">
                    <Button className="m-1 p-3">Register</Button>
                    <LinkWithLoader href="/login">
                        <Button variant="outline" className="m-1 p-3">Log in</Button>
                    </LinkWithLoader>
                </div>
            </div>
        </header>
    )
}