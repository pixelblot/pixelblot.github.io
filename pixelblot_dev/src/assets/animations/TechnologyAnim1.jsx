import { useEffect, useRef } from "react";
import { createTimeline, stagger, utils } from "animejs";

const GaussianAnim = () => {
  const root = useRef(null);

  useEffect(() => {
    const count = 500;
    const duration = 5000;

    const radius = Symbol();
    const theta = Symbol();
    const phi = Symbol();
    const depth = Symbol();

    const width = root.current.offsetWidth;
    const height = root.current.offsetHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxR = width * 0.45;
    const target = { r: maxR };

    const particles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.classList.add("mental-particle");
      el.style.position = "absolute";
      el.style.borderRadius = "50%";

      const rad = target.r * Math.cbrt(Math.random());
      const angle = Math.random() * Math.PI * 2;
      const vertical = Math.acos(2 * Math.random() - 1);

      el[radius] = rad;
      el[theta] = angle;
      el[phi] = vertical;

      const z = rad * Math.cos(vertical);
      el[depth] = z;

      const normalizedZ = (z + target.r) / (2 * target.r);
      const size = 3 + 3 * normalizedZ;

      el.dataset.originalSize = size;
      el.dataset.theta = angle;
      el.dataset.rad = rad;

      el.style.background = "white";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = 0.9;

      root.current.appendChild(el);
      particles.push(el);
    }

    const tl = createTimeline({
      defaults: {
        loop: true,
        ease: "inOut(1.3)",
        onLoop: (self) => self.refresh(),
      },
    });

    tl.add(
      particles,
      {
        x: (el) => centerX + el[radius] * Math.sin(el[phi]) * Math.cos(el[theta]),
        y: (el) => centerY + el[radius] * Math.sin(el[phi]) * Math.sin(el[theta]),
        duration: () => duration + utils.random(-200, 200),
        easing: "inOut(2)",
        onLoop: (self) => {
          const el = self.targets[0];
          const rad = target.r * Math.cbrt(Math.random());
          const angle = Math.random() * Math.PI * 2;
          const vertical = Math.acos(2 * Math.random() - 1);

          el[radius] = rad;
          el[theta] = angle;
          el[phi] = vertical;

          const z = rad * Math.cos(vertical);
          el[depth] = z;

          const normalizedZ = (z + target.r) / (2 * target.r);
          const size = 1 + 3 * normalizedZ;

          el.dataset.originalSize = size;
          el.dataset.theta = angle;
          el.dataset.rad = rad;

          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          self.refresh();
        },
      },
      stagger((duration / count) * 1.1)
    );

    const fadeIn = (p, color) => {
      const size = parseFloat(p.dataset.originalSize);
      p.animate(
        [
          { background: "white", width: `${size}px`, height: `${size}px` },
          { background: color, width: `${size}px`, height: `${size}px` },
        ],
        { duration: 800, fill: "forwards", easing: "ease-in-out" }
      );
    };

    const fadeReset = (p, size, delay = 0) => {
      const currentColor = getComputedStyle(p).backgroundColor;
      p.animate(
        [
          { backgroundColor: currentColor, width: p.style.width, height: p.style.height },
          { backgroundColor: "white", width: `${size}px`, height: `${size}px` },
        ],
        {
          duration: 1000,
          delay,
          fill: "forwards",
          easing: "ease-in-out",
        }
      );
    };

    const sequence = async () => {
      while (true) {
        // RED SCREENING
        const redDots = [...particles].sort((a, b) => b[radius] - a[radius]).slice(0, count / 8);
        redDots.forEach((p) => fadeIn(p, "#ff0044"));
        await new Promise((res) => setTimeout(res, 10000));
        redDots.forEach((p, i) => {
          const size = parseFloat(p.dataset.originalSize);
          fadeReset(p, size, i * 2); // gentle fade back
        });
        await new Promise((res) => setTimeout(res, 3000));

        // ANGLE-BASED COLORBURST
        particles.forEach((p, i) => {
          const theta = parseFloat(p.dataset.theta);
          const hue = Math.floor((theta / (2 * Math.PI)) * 360);
          const color = `hsl(${hue}, 90%, 65%)`;
          fadeIn(p, color);
        });

        await new Promise((res) => setTimeout(res, 10000));

        particles.forEach((p, i) => {
          const size = parseFloat(p.dataset.originalSize);
          fadeReset(p, size, i * 2);
        });

        await new Promise((res) => setTimeout(res, 3000));
      }
    };

    const seqTimeout = setTimeout(sequence, 10000);

    return () => {
      clearTimeout(seqTimeout);
      tl.pause();
      particles.forEach((p) => root.current.removeChild(p));
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