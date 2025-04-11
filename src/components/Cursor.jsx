import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const handleEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 2,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    });
  };
  
  const handleLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "rgba(255, 0, 100, 0.6)",
    });
  };
  
  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", handleEnter);
      btn.addEventListener("mouseleave", handleLeave);
    });
  
    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleEnter);
        btn.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[100] pointer-events-none"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 0, 100, 0.6)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference", // makes it look cooler
      }}
    />
  );
};

export default Cursor;
