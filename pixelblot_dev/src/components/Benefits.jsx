import { useState } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Sections";

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
      <div className="container relative z-2 overflow-hidden py-8 md:py-12">
        <Heading
          className="mx-auto text-center md:max-w-md lg:max-w-2xl mb-6"
          title="Rethinking mental health"
          text="We believe mental health care should be accessible to all."
        />

        {/* Content Block */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={prev}
            className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
          >
            ←
          </button>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-5xl mx-auto">
            {/* Image or Animation */}
            <div className="w-full md:w-[45%] flex justify-center">
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
            <div className="w-full md:w-[45%] max-w-xl text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">{current.title}</h3>
              <p className="text-n-3">{current.text}</p>
            </div>
          </div>

          <button
            onClick={next}
            className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
          >
            →
          </button>
        </div>

        {/* Step headlines */}
        <div className="mt-10 hidden md:flex gap-4 justify-center">
          {benefits.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-[12rem] text-left py-2 border-t-2 transition-all ${
                index === activeStep
                  ? "border-purple-500 text-white"
                  : "border-n-6 text-n-4"
              }`}
            >
              <h4 className="text-base font-bold">{step.title}</h4>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;