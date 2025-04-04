import { useState, useRef } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Sections";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Benefits = () => {
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef(null);

  const current = benefits[activeStep];

  return (
    <Section id="features">
      <div className="container relative z-2">

        {/* Page title */}
        <Heading
          className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="Rethinking mental health"
        />

        {/* Upper section: image + content */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-10">
          {/* Image / 3D Visual */}
          <div className="w-full md:w-1/2">
            {current.imageUrl && (
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full max-w-sm mx-auto"
              />
            )}
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 max-w-xl">
            <p className="text-xs uppercase tracking-wide text-n-3 mb-2">
              {`How it works: ${String(activeStep + 1).padStart(2, "0")}.`}
            </p>
            <h3 className="text-3xl font-bold text-white mb-4">{current.title}</h3>
            <p className="text-n-3 mb-6">{current.text}</p>
            <a
              href={current.link}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm uppercase hover:opacity-90"
            >
              Connect Now
              <Arrow />
            </a>
          </div>
        </div>

        {/* Step headlines row */}
        <div
          ref={scrollRef}
          className="mt-16 flex overflow-x-auto no-scrollbar gap-6 snap-x snap-mandatory px-4"
        >
          {benefits.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`shrink-0 snap-start w-[16rem] text-left py-4 border-t-2 transition-all ${
                index === activeStep
                  ? "border-purple-500 text-white"
                  : "border-n-6 text-n-4"
              }`}
            >
              <p className="text-sm mb-1 font-mono uppercase tracking-widest">
                {`0${index + 1}.`}
              </p>
              <h4 className="text-lg font-bold">{step.title}</h4>
              <p className="mt-1 text-sm text-n-3 line-clamp-2">{step.text}</p>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;