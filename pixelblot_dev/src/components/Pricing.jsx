import { useState } from "react";
import { pricing } from "../constants";
import Section from "./Sections";
import Heading from "./Heading";
import Button from "./Button";
import { check } from "../assets";

const Pricing = () => {
  const [activeTier, setActiveTier] = useState(0);
  const current = pricing[activeTier];

  const next = () => {
    setActiveTier((prev) => (prev + 1) % pricing.length);
  };

  const prev = () => {
    setActiveTier((prev) => (prev === 0 ? pricing.length - 1 : prev - 1));
  };

  return (
    <Section id="pricing">
      <div className="container">
        <Heading
          className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="Pricing"
          text="Flexible plans for nonprofits, startups, and enterprise partners."
        />

        <div className="relative flex flex-col items-center justify-center border border-n-1/10 rounded-3xl p-4 pt-10 lg:pt-12">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {pricing.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTier(index)}
                className={`text-sm font-bold px-3 py-1 border-b-2 ${
                  index === activeTier
                    ? "border-purple-500 text-white"
                    : "border-transparent text-n-4"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Navigation and content */}
          <div className="flex items-center justify-center gap-6 w-full max-w-6xl">
            <button
              onClick={prev}
              className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
            >
              ←
            </button>

            <div className="flex flex-col md:flex-row items-center gap-10 w-full justify-center text-center md:text-left">
              <div className="w-full md:w-1/2 max-w-xl">
                <h5 className="text-2xl font-bold text-white mb-2">
                  {current.title}
                </h5>
                <p className="text-n-3 mb-4">{current.description}</p>

                {current.price && (
  <div className="flex flex-col items-center md:items-start text-white mb-4">
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-light">$</span>
      <span className="text-[3.5rem] leading-none font-bold">{current.price}</span>
    </div>
    <span className="text-sm text-n-3 mt-1">per token</span>
  </div>
)}

                {/* <Button
                  className="w-full mb-6 text-white bg-black transition"
                  href="mailto:veith.weilnhammer@gmail.com"
                  white
                >
                  Get in touch
                </Button> */}

                <ul>
                  {current.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start py-3 border-t border-n-6 text-left"
                    >
                      <img src={check} width={24} height={24} alt="Check" />
                      <p className="body-2 ml-4 text-n-3">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={next}
              className="bg-n-7 hover:bg-n-6 text-white px-3 py-2 rounded-full"
            >
              →
            </button>
          </div>
        </div>

        {/* Get in Touch button below the pricing cards */}
        <div className="mt-10 text-center">
          <Button
            className="inline-block text-white bg-black px-6 py-3 rounded-full font-bold text-sm"
            href="https://calendly.com/veith-weilnhammer/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a demo
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;