"use client";
import { motion } from "framer-motion";

export default function About() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
        }),
    };

    return (
        <section className="w-full py-6">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-start gap-3">

                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    custom={0}
                >
                    About{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2dd4bf] via-[#0891b2] to-[#9333ea]">
                        Me.
                    </span>
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-300 leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    custom={1}
                >
                    I’m{" "}
                    <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#2dd4bf] via-[#0891b2] to-[#9333ea]">
                        Yatharth Rathi
                    </span>
                    , a passionate{" "}
                    <span className="font-semibold text-white">Frontend Developer</span>{" "}
                    dedicated to crafting visually stunning, high-performance, and user-friendly web experiences.
                    With strong expertise in{" "}
                    <span className="font-semibold text-white">
                        JavaScript, React.js, HTML5, CSS3, and Tailwind CSS
                    </span>
                    , I specialize in building{" "}
                    <span className="font-semibold text-white">
                        responsive, interactive, and accessible interfaces
                    </span>{" "}
                    that work flawlessly across all devices.
                </motion.p>

                <motion.p
                    className="text-lg text-gray-300 leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    custom={2}
                >
                    Currently, I’m expanding my expertise in{" "}
                    <span className="font-semibold text-white">Next.js</span> and{" "}
                    <span className="font-semibold text-white">TypeScript</span>{" "}
                    to build{" "}
                    <span className="font-semibold text-white">
                        scalable, SEO-friendly, and high-performance applications
                    </span>
                    . My goal is to stay aligned with{" "}
                    <span className="font-semibold text-white">
                        modern UI/UX practices
                    </span>{" "}
                    and industry trends, ensuring every project I create meets{" "}
                    <span className="font-semibold text-white">
                        top-level performance and user satisfaction
                    </span>.
                </motion.p>

                <motion.p
                    className="text-lg text-gray-300 leading-relaxed"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                    custom={3}
                >
                    I have a strong understanding of{" "}
                    <span className="font-semibold text-white">UI/UX principles</span>{" "}
                    and{" "}
                    <span className="font-semibold text-white">performance optimization</span>,
                    creating{" "}
                    <span className="font-semibold text-white">pixel-perfect designs</span>{" "}
                    and implementing{" "}
                    <span className="font-semibold text-white">interactive animations</span>{" "}
                    to make web experiences both visually appealing and functional.
                    Every project I work on merges{" "}
                    <span className="font-semibold text-white">creativity</span> with{" "}
                    <span className="font-semibold text-white">functionality</span>,
                    leaving a lasting impression.
                </motion.p>
            </div>
        </section>
    );
}
