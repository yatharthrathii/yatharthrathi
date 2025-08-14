"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
    const projects = [
        {
            title: "TechKart",
            tech: ["React.js", "TailwindCSS", "Firebase"],
            desc: "Modern e-commerce store for gadgets with smooth UI and real-time Firebase sync.",
            img: "/TechKart.png",
            live: "https://tech-kart-xi.vercel.app",
            github: "https://github.com/yatharthrathii/TechKart",
        },
        {
            title: "Admin Dashboard",
            tech: ["React.js", "Firebase", "Cloudinary"],
            desc: "Powerful panel to manage products, orders, and users for TechKart.",
            img: "/TechKart-Admin.png",
            live: "https://tech-kart-admin.vercel.app",
            github: "https://github.com/yatharthrathii/TechKart-Admin",
        },
        {
            title: "SutraMail",
            tech: ["React.js", "RESTful API"],
            desc: "Gmail-like web app to send, receive, and organize emails easily.",
            img: "/SutraMail.png",
            live: "https://sutramail.vercel.app",
            github: "https://github.com/yatharthrathii/sutramail",
        },
        {
            title: "Recallify",
            tech: ["React.js", "TailwindCSS"],
            desc: "Flashcard app with smart repetition for faster learning.",
            img: "/Recallify.png",
            live: "https://recallify-ashen.vercel.app",
            github: "https://github.com/yatharthrathii/Recallify",
        },
        {
            title: "ExpenseWise",
            tech: ["React.js", "Redux", "Jest"],
            desc: "ExpenseWise – Track, manage, and plan your expenses with ease.",
            img: "/Expense-Wish.png",
            live: "https://expense-wise-three.vercel.app",
            github: "https://github.com/yatharthrathii/ExpenseWise",
        },
        {
            title: "WishBasket",
            tech: ["React.js"],
            desc: "Responsive e-commerce app with smooth checkout flow.",
            img: "/WishBasket.png",
            live: "https://wish-basket.vercel.app",
            github: "https://github.com/yatharthrathii/WishBasket",
        },
    ];

    return (
        <section className="min-h-screen w-full px-4 sm:px-6 pb-20 pt-24 bg-white text-black dark:bg-black dark:text-white">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter mb-4 text-start"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Projects.
                </motion.h2>

                <motion.p
                    className="text-start text-gray-700 dark:text-gray-300 mb-12 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    I love building projects and practicing my engineering skills. Here’s a
                    collection of work I’ve done over the years - blending creativity, code,
                    and problem-solving into interactive experiences.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="rounded-lg overflow-hidden border-b-2 border-gray-500 shadow-lg bg-black hover:shadow-2xl transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="overflow-hidden rounded-t-lg aspect-[16/9] sm:aspect-[17/8] bg-gray-200 dark:bg-gray-800">
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    width={800}
                                    height={400}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-3 sm:p-5">
                                <h3 className="text-xl sm:text-2xl md:text-2xl font-light mb-2">{project.title}</h3>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.tech.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-4">
                                    {project.desc}
                                </p>

                                <div className="flex gap-4">
                                    <Link
                                        href={project.live}
                                        target="_blank"
                                        className="flex items-center gap-2 text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-200 transition-colors text-sm"
                                    >
                                        <ExternalLink size={16} /> Live
                                    </Link>
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-sm"
                                    >
                                        <Github size={16} /> GitHub
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
