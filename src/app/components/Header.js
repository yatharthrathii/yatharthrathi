"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full max-w-full z-50 bg-transparent backdrop-blur-md"
                style={{ WebkitBackdropFilter: "blur(12px)" }}
            >
                <div className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto text-white font-medium text-lg border-b-1 border-gray-800">
                    <motion.div
                        whileHover={{ rotate: -2 }}
                        className="text-xl font-bold tracking-wide text-shadow-white"
                    >
                        <span className="lg:text-2xl sm:text-xl">&lt;&gt;</span> Yatharth.Dev
                    </motion.div>

                    <nav className="hidden md:flex gap-8" aria-label="Primary navigation">
                        {menuItems.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -2, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link href={item.href} className="relative group">
                                    <span className="text-gray-200 group-hover:text-teal-300 transition-colors duration-300">
                                        {item.name}
                                    </span>
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-teal-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col gap-1.5 group"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <span
                            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""
                                }`}
                        ></span>
                        <span
                            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`block h-[2px] w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                }`}
                        ></span>
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            onClick={closeMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 backdrop-blur-md bg-black/40"
                            aria-hidden="true"
                        />

                        <motion.nav
                            id="mobile-menu"
                            ref={menuRef}
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.4 }}
                            className="fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-xl z-50 p-6 flex flex-col gap-8 text-white shadow-lg overflow-y-auto"
                            aria-label="Mobile menu"
                        >
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-purple-400">
                                Menu
                            </h2>
                            <nav className="flex flex-col gap-6 mt-4">
                                {menuItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 5, scale: 1.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={closeMenu}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
