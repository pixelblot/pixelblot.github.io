import { useState } from "react";
import { team } from "../constants";
import Heading from "./Heading";
import Section from "./Sections";

const Team = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = team[activeStep];

  const next = () => {
    setActiveStep((prev) => (prev + 1) % team.length);
  };

  const prev = () => {
    setActiveStep((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  return (
    <Section id="team">
      <div className="container relative z-2 overflow-hidden">
        <Heading
          className="text-center md:max-w-md lg:max-w-2xl mx-auto"
          title="Team"
          text="We are neuroscientists & clinicians dedicated to accessible mental health."
        />

        {/* Main content */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* ← Arrow */}
          <button
            onClick={prev}
            className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
          >
            ←
          </button>

          {/* Card */}
          <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl bg-n-8 border border-n-6 rounded-3xl p-6 md:p-10">
            {/* Image */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-40 h-40 object-cover rounded-full border border-n-6"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-3">{current.title}</h4>
              <p className="text-n-3 text-base">
                {current.text}{" "}
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 underline font-medium"
                >
                  ↗
                </a>
              </p>
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

        {/* Step buttons */}
        <div className="mt-12 hidden md:flex gap-6 justify-center">
          {team.map((member, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-[16rem] text-left py-3 border-t-2 transition-all ${
                index === activeStep
                  ? "border-purple-500 text-white"
                  : "border-n-6 text-n-4"
              }`}
            >
              <h4 className="text-lg font-bold">{member.title}</h4>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Team;