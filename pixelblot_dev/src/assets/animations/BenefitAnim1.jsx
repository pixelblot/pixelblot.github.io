import { useEffect, useRef } from "react";
import { createTimeline, stagger, utils } from "animejs";

const GaussianAnim = () => {
  const root = useRef(null);

  useEffect(() => {
    const count = 1000;
    const duration = 3000;
    const radius = Symbol();
    const theta = Symbol();

    const width = root.current.offsetWidth;
    const height = root.current.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const target = { x: 0, y: 0, r: width * 0.3 };

    const particles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.classList.add("mental-particle");
      el.style.position = "absolute";
      el.style.borderRadius = "50%";
      el.style.width = "4px";
      el.style.height = "4px";

      const rad = target.r * Math.sqrt(Math.random());
      const angle = Math.random() * Math.PI * 2;

      el[radius] = rad;
      el[theta] = angle;

      // Color scale: blue (center) to red (edge)
      const normalizedDist = rad / target.r;
      const r = Math.floor(255 * normalizedDist);
      const g = 50;
      const b = Math.floor(255 * (1 - normalizedDist));
      el.style.background = `rgb(${r}, ${g}, ${b})`; // ✅ fixed line
      el.style.opacity = 0.9;

      root.current.appendChild(el);
      particles.push(el);
    }

    const tl = createTimeline({
      defaults: {
        loop: true,
        ease: "inOut(1.3)",
        onLoop: self => self.refresh(),
      },
    });

    tl.add(
      particles,
      {
        x: el => centerX + el[radius] * Math.cos(el[theta]),
        y: el => centerY + el[radius] * Math.sin(el[theta]),
        duration: () => duration + utils.random(-100, 100),
        easing: "inOut(2)",
        onLoop: self => {
          const el = self.targets[0];
          el[theta] = Math.random() * Math.PI * 2;
          el[radius] = target.r * Math.sqrt(Math.random());
          self.refresh();
        },
      },
      stagger((duration / count) * 1.1)
    );

    return () => {
      tl.pause();
      particles.forEach(p => root.current.removeChild(p));
    };
  }, []);

  return (
    <div
      ref={root}
      className="relative w-full h-[400px] overflow-hidden bg-transparent rounded-lg"
    />
  );
};

export default GaussianAnim;