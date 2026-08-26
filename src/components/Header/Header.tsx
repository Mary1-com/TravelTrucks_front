"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navigation = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
];

export default function Header() {
    const pathname = usePathname();

    const isActiveLink = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link
                    className={styles.logo}
                    href="/"
                    aria-label="TravelTrucks home"
                >
                    Travel<span className={styles.logoAccent}>Trucks</span>
                </Link>

                <nav aria-label="Main navigation">
                    <ul className={styles.navigation}>
                        {navigation.map(({ href, label }) => {
                            const isActive = isActiveLink(href);

                            return (
                                <li key={href}>
                                    <Link
                                        className={`${styles.navigationLink} ${
                                            isActive ? styles.active : ""
                                            }`}
                                        href={href}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div aria-hidden="true" />
            </div>
        </header>
    );
}