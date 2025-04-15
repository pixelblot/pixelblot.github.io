import { useState } from "react";
import Section from "./Sections";
import Heading from "./Heading";
import Arrow from "../assets/svg/Arrow";
import { brainwaveServices } from "../constants";
import { Gradient } from "./design/Services";

const Services = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = brainwaveServices[activeStep];

  const next = () => {
    setActiveStep((prev) => (prev + 1) % brainwaveServices.length);
  };

  const prev = () => {
    setActiveStep((prev) =>
      prev === 0 ? brainwaveServices.length - 1 : prev - 1
    );
  };

  return (
    <Section id="technology">
      <div className="container">
        <Heading
          className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="Technology"
          text="Pixedlblot powers scalable mental health assessments & support."
        />

      <div className="relative flex flex-col items-center justify-center border border-n-1/10 rounded-3xl p-4 pt-10 lg:pt-12">

          {/* Step headline buttons */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {brainwaveServices.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`text-sm font-bold px-3 py-1 border-b-2 ${
                  index === activeStep
                    ? "border-purple-500 text-white"
                    : "border-transparent text-n-4"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Carousel with arrows + content */}
          <div className="flex items-center justify-center gap-6 w-full max-w-6xl">
            <button
              onClick={prev}
              className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
            >
              ←
            </button>

            <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center text-center md:text-left">
              <div className="flex justify-center items-center w-full md:w-1/2">
                <div className="aspect-square w-64 md:w-72">
                  {current.animation ? (
                    <current.animation />
                  ) : current.imageUrl && (
                    <img
                      src={current.imageUrl}
                      alt={current.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 max-w-xl">
                <h5 className="text-2xl font-bold text-white mb-2">
                  {current.title}
                </h5>
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

          {/* Optional Learn More */}
          {/* <div className="mt-8 text-center">
            <a
              href="https://veithweilnhammer.github.io/"
              className="inline-flex items-center gap-2 font-code text-xs font-bold text-n-1 uppercase tracking-wider hover:underline"
            >
              Learn more
              <Arrow />
            </a>
          </div> */}
        </div>

        <Gradient />
      </div>
    </Section>
  );
};

export default Services;