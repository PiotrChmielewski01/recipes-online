"use client"

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

interface LinkWithLoaderProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
}

export default function LinkWithLoader({
    children,
    className = "",
    ...props
}: LinkWithLoaderProps) {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) setLoading(false);
    }, [pathname]);

    const handleClick = () => setLoading(true);

    return (
        <div className="inline-block relative">
            <Link {...props} onClick={handleClick} className={className}>
                {children}
            </Link>
            {loading && (
                <span className="fixed flex items-center justify-center inset-0">
                    <Spinner/>
                </span>
            )}
        </div>
    )
}