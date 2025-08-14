export default function Footer() {
    return (
        <footer className="backdrop-blur-lg bg-black/10 border-t border-white/10 rounded-t-2xl shadow-inner shadow-cyan-800/20 text-center py-6 px-4 md:px-8 text-gray-300 text-sm md:text-base select-none">
            <p className="mb-1">
                Designed and Developed by{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-purple-400 cursor-default">
                    Yatharth Rathi
                </span>.
            </p>
            <p className="mb-1">
                Built with{" "}
                <a
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 hover:text-purple-400 transition-colors"
                >
                    Next.js
                </a>
                . Hosted on{" "}
                <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 hover:text-purple-400 transition-colors"
                >
                    Vercel
                </a>
                .
            </p>
        </footer>
    );
}
