"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HeroSection() {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="px-6 max-w-6xl mx-auto min-h-screen flex flex-col justify-center gap-10 text-left">
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="iconGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#0891b2" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                </defs>
            </svg>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <div className="leading-tight">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-2xl md:text-4xl tracking-tighter font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-600 to-purple-600">
                            Hey there! I&#39;m -
                        </h2>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h1 className="text-6xl md:text-9xl font-extrabold text-white tracking-tighter ">
                            Yatharth Rathi.
                        </h1>
                    </motion.div>
                </div>

                <motion.p
                    variants={itemVariants}
                    className="max-w-xl mx-auto md:mx-0 text-gray-400 text-lg md:text-xl leading-normal pt-3"
                >
                    <span className="text-white font-bold">Front-End Developer</span> & Self-Taught
                    Coder passionate about crafting clean, performant, and user-friendly web
                    applications. Interested in{" "}
                    <span className="font-semibold text-white">JavaScript, React, Next.js,</span> and{" "}
                    <span className="font-semibold text-white">Computer Science fundamentals.</span>
                </motion.p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-start md:justify-start gap-2 md:gap-6"
            >
                <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -3 }}
                    href="https://github.com/yatharthrathii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-white hover:bg-gray-800 transition-all duration-300 text-xs md:text-base"
                >
                    <Github style={{ stroke: "url(#iconGradient)" }} />
                    <span>GitHub</span>
                </motion.a>

                <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -3 }}
                    href="https://www.linkedin.com/in/yatharthrathii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-white hover:bg-gray-800 transition-all duration-300 text-xs md:text-base"
                >
                    <Linkedin style={{ stroke: "url(#iconGradient)" }} />
                    <span>LinkedIn</span>
                </motion.a>

                <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, y: -3 }}
                    href={`mailto:yatharthmaheshwari01@gmail.com?subject=Opportunity%20or%20Suggestion&body=Hi%20Yatharth,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20projects.%20I%20have%20a%20job%20or%20project%20opportunity%20that%20might%20interest%20you.%0D%0A%0D%0AAlso,%20if%20I%20have%20any%20suggestions%20or%20feedback%20for%20your%20work,%20I%20will%20share%20them%20below:%0D%0A%0D%0A[Write%20your%20suggestions%20or%20feedback%20here]%0D%0A%0D%0ARegards,%0D%0A[Your%20Name]%0D%0A[Your%20Company]%0D%0A[Contact%20Details]`}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-white hover:bg-gray-800 transition-all duration-300 text-xs md:text-base"
                >
                    <Mail style={{ stroke: "url(#iconGradient)" }} />
                    <span>Email</span>
                </motion.a>

            </motion.div>
        </section>
    );
}
