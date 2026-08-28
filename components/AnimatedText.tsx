"use client";

import { CSSProperties, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const glyph = char === " " ? " " : char;
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{glyph}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {glyph}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const total = text.length;
  const words = text.split(" ");
  let running = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => {
        const startIdx = running;
        running += word.length + 1; // +1 accounts for the following space
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((c, ci) => (
                <Char
                  key={ci}
                  char={c}
                  index={startIdx + ci}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
