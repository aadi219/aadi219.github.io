import { useState, useEffect } from "react";

const TypingAnimation = ({ values }: { values: string[] }) => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorStyle, setCursorStyle] = useState("|");
  const [selecting, setSelecting] = useState(false);
  const [cursorPos, setCursorPos] = useState("end"); // 'end', 'start', 'selected'

  useEffect(() => {
    const typingSpeed = deleting ? 50 : 100;
    const delayBetweenWords = 1500;

    if (!deleting && charIndex <= values[currentIndex].length) {
      // Typing effect
      const timeout = setTimeout(() => {
        setText(values[currentIndex].slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    if (!deleting && charIndex > values[currentIndex].length) {
      setCursorStyle("█");
      setTimeout(() => {
        // **Move Cursor to Start (`^` motion)**
        setCursorPos("start");
        setTimeout(() => {
          // **Select the Text (`v$` motion)**
          setSelecting(true);
          setCursorPos("selected");
          setTimeout(() => {
            // **Delete the Entire Word (`d` motion)**
            setText("");
            setSelecting(false);
            setCursorStyle("|"); // Switch back to thin cursor
            setCursorPos("end");
            setDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % values.length);
            setCharIndex(1);
          }, 300);
        }, 300);
      }, delayBetweenWords);
    }
  }, [charIndex, deleting]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 300);
    return () => clearInterval(cursorBlink);
  }, []);
  
  return (
    <div className="h-[1ch] mb-4">
    <span className=" font-mono text-xl text-highlight-teal inline-block">
      {cursorPos === "start" && cursorVisible && <span className="text-highlight-blue font-bold">█</span>}
      <span style={{visibility: text ? "visible" : "hidden"}} className={selecting ? "bg-highlight-blue text-black px-1" : ""}>{text}</span>
      {cursorPos === "end" && cursorVisible && <span className="text-highlight-blue font-bold">{cursorStyle}</span>}
    </span>
    </div>
  );
};

export default TypingAnimation;
