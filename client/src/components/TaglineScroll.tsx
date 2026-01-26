// src/components/TaglineScroll.tsx

import { motion } from "framer-motion";

const TaglineScroll: React.FC = () => {
    const taglines: string[] = [
        "Clarity Before Capital",
        "Smart Finance Starts with Clear Thinking",
        "Understand Money. Build the Future.",
        "Where Financial Thinking Gets Clear",
        "Less Confusion. Better Decisions.",
        "Learn Finance the Right Way",
        "Clarity Is the New Wealth",
      ];      

  const loopedTaglines: string[] = [...taglines, ...taglines];

  return (
    <div className="relative overflow-hidden py-6 px-4 md:px-8 my-12">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-white via-white/60 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-white via-white/60 to-transparent z-10" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {loopedTaglines.map((line: string, i: number) => (
          <span
            key={i}
            className="inline-flex items-center px-4 py-2 bg-linear-to-r from-[#00FF7C]/10 to-[#007755]/10 
                       border border-[#00FF7C]/30 rounded-full text-[#007755] 
                       text-sm md:text-base font-medium backdrop-blur-sm shadow-sm"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TaglineScroll;
