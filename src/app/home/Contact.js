"use client";
import {
    Linkedin,
    Twitter,
    Instagram,
    Github,
    Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
    const iconLinks = [
        { href: "https://www.linkedin.com/in/yatharthrathii", label: "LinkedIn", Icon: Linkedin },
        { href: "https://x.com/yatharthrathiii", label: "Twitter", Icon: Twitter },
        { href: "mailto:yatharthmaheshwari01@gmail.com", label: "Email", Icon: Mail },
        { href: "https://www.instagram.com/yatharthrathii", label: "Instagram", Icon: Instagram },
    ];

    return (
        <section
            id="contact"
            className="min-h-screen flex flex-col items-center justify-center px-6 py-6"
        >
            <div className="max-w-3xl w-full text-center">

                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    Let’s Connect.
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: false, amount: 0.3 }}
                >
                    I’m always open to discussing new projects, creative ideas, or
                    opportunities to be part of your vision.
                    Feel free to reach out through any of the platforms below!
                </motion.p>

                <svg width="0" height="0">
                    <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#0891b2" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </svg>

                <motion.div
                    className="flex flex-wrap justify-center gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                >
                    {iconLinks.map(({ href, label, Icon }, i) => (
                        <motion.a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center space-y-1 transition-transform"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <Icon size={26} stroke="url(#iconGradient)" />
                            <span className="text-sm">{label}</span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
