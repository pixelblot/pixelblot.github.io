import { useState } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Sections";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Benefits = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = benefits[activeStep];
  const AnimationComponent = current?.animation;

  const next = () => {
    setActiveStep((prev) => (prev + 1) % benefits.length);
  };

  const prev = () => {
    setActiveStep((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
  };

  return (
    <Section id="features">
      <div className="container relative z-2 overflow-hidden">
        {/* Header */}
        <Heading
          className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="Rethinking mental health"
          text="We believe mental health care should be accessible to all."
        />

        {/* Main content */}
        <div className="mt-12 flex items-center justify-center gap-4">
          {/* ← Arrow */}
          <button
            onClick={prev}
            className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
          >
            ←
          </button>

          {/* Content (Image or Animation + Text) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-6xl">
            {/* Animation or Fallback Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              {AnimationComponent ? (
                <AnimationComponent />
              ) : (
                current.imageUrl && (
                  <img
                    src={current.imageUrl}
                    alt={current.title}
                    className="w-full max-w-xs md:max-w-sm"
                  />
                )
              )}
            </div>

            {/* Text */}
            <div className="w-full md:w-1/2 max-w-xl text-center md:text-left">
              <p className="text-xs uppercase tracking-wide text-n-3 mb-2"></p>
              <h3 className="text-3xl font-bold text-white mb-4">{current.title}</h3>
              <p className="text-n-3 mb-6">{current.text}</p>
            </div>
          </div>

          {/* → Arrow */}
          <button
            onClick={next}
            className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
          >
            →
          </button>
        </div>

        {/* Step headlines row — only on md+ screens */}
        <div className="mt-16 hidden md:flex gap-6 justify-center">
          {benefits.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-[16rem] text-left py-4 border-t-2 transition-all ${
                index === activeStep
                  ? "border-purple-500 text-white"
                  : "border-n-6 text-n-4"
              }`}
            >
              <h4 className="text-lg font-bold">{step.title}</h4>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
