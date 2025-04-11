import { useEffect, useRef } from "react";
import gsap from "gsap";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  const buttonRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const buttonEl = buttonRef.current;

    // Span animation on hover
    const tl = gsap.timeline({ paused: true });
    tl.to(spanRef.current, { duration: 0.2, yPercent: -150, ease: "power2.in" });
    tl.set(spanRef.current, { yPercent: 150 });
    tl.to(spanRef.current, { duration: 0.2, yPercent: 0 });

    const handleEnter = () => tl.play(0);

    // 3D hover effect
    const handleMove = (e) => {
      const rect = buttonEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      gsap.to(buttonEl, {
        rotateX: deltaY * -10,
        rotateY: deltaX * 10,
        scale: 1.05,
        transformPerspective: 600,
        transformOrigin: "center",
        ease: "power2.out",
        duration: 0.3,
      });
    };

    const handleLeave = () => {
      gsap.to(buttonEl, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    buttonEl.addEventListener("mouseenter", handleEnter);
    buttonEl.addEventListener("mousemove", handleMove);
    buttonEl.addEventListener("mouseleave", handleLeave);

    return () => {
      buttonEl.removeEventListener("mouseenter", handleEnter);
      buttonEl.removeEventListener("mousemove", handleMove);
      buttonEl.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <button
      id={id}
      ref={buttonRef}
      className={`inline-grid group z-10 w-fit cursor-pointer overflow-hidden rounded-full
        bg-violet-50 px-7 py-3 text-black ${containerClass}`}
      style={{ transformStyle: "preserve-3d" }} // Required for 3D
    >
      {leftIcon}
      <span
        ref={spanRef}
        className="relative inline-flex overflow-hidden font-general text-xs uppercase"
      >
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
