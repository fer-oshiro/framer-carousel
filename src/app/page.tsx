"use client";
import { Variants, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const text = [
  {
    id: 1,
    text: "asd",
  },
  {
    id: 2,
    text: "asd",
  },
  {
    id: 3,
    text: "asd",
  },
  {
    id: 4,
    text: "asd",
  },
  {
    id: 5,
    text: "asd",
  },
  {
    id: 6,
    text: "asd",
  },
  {
    id: 7,
    text: "asd",
  },
];

export default function Home() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    if (carousel.current) {
      const { offsetWidth, scrollWidth } = carousel.current;
      setWidth(scrollWidth - offsetWidth);
    }
  }, []);

  const onCurrentPosition = () => {
    const currentPosition = x.get();
    console.log("current position", currentPosition);
  };

  const onTest = () => {
    console.log("test");
    const currentPosition = x.get();
    x.set(currentPosition - 500);
  };

  return (
    <main className="max-w-4xl p-8 mx-auto">
      <p>hi</p>
      <button onClick={onCurrentPosition}>Current Position</button>
      <button onClick={onTest}>test</button>

      <motion.div ref={carousel} className="cursor-grab overflow-hidden">
        <motion.div
          drag="x"
          style={{ x }}
          dragConstraints={{ right: 0, left: -width }}
          className="flex"
          whileTap={{ cursor: "grabbing" }}
        >
          {text.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}

const cardVariants: Variants = {
  offscreen: {
    width: "80%",
    height: "70%",
    left: "50%",
    top: "20%",
    translateX: "-50%",
    fontSize: "1rem",
  },
  onscreen: {
    width: "100%",
    height: "100%",
    top: 0,
    fontSize: "1.3rem",
    transition: {
      type: "spring",
      duration: 0.8,
    },
  },
};

const Item = ({ id, text }) => {
  return (
    <motion.div
      className="min-w-[70%] h-[400px] relative"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <motion.div
        className="absolute bg-blue-50 flex p-16 flex-col justify-center items-center"
        variants={cardVariants}
      >
        <p className="font-bold text-lg mb-4">Text</p>
        <p>
          asda Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
          unde dignissimos aspernatur eligendi eveniet a quia atque possimus
          iste at voluptate explicabo praesentium vitae soluta asperiores,
          tenetur adipisci illum esse?
        </p>
      </motion.div>
    </motion.div>
  );
};
