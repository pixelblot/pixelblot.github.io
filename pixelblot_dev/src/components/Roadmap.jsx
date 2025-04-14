import Button from "./Button";
import Heading from "./Heading";
import Section from "./Sections";
import Tagline from "./Tagline";
import Arrow from "../assets/svg/Arrow";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { Gradient } from "./design/Roadmap";

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container pb-8 md:pb-12">
    <Heading
        className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="What we are working on"
          text="Our roadmap toward accessible mental health care"
        />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-6">
        {roadmap.map((item) => {
          const status = item.status === "done" ? "Done" : "In progress";

          return (
            <div
              className={`md:flex even:md:translate-y-[4rem] p-0.25 rounded-[2rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
              key={item.id}
            >
              <div className="relative p-6 bg-n-8 rounded-[1.75rem] overflow-hidden xl:p-10">
                {/* Background Grid */}
                <div className="absolute top-0 left-0 opacity-10">
                  <img
                    className="w-full max-w-[400px]"
                    src={grid}
                    alt="Grid"
                  />
                </div>

                {/* Content */}
                <div className="relative z-1">
                  <div className="flex items-center justify-between mb-6">
                    <Tagline>{item.date}</Tagline>
                    <div className="flex items-center px-3 py-0.5 bg-n-1 rounded text-n-8 text-xs font-semibold">
                      <img
                        className="mr-2"
                        src={item.status === "done" ? check2 : loading1}
                        width={14}
                        height={14}
                        alt={status}
                      />
                      {status}
                    </div>
                  </div>

                  <div className="mb-4">
                    <img
                      className="rounded-lg object-cover max-h-[200px] w-full"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </div>

                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-n-4">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}

        <Gradient />
      </div>

      {/* Optional CTA */}
      {/* <div className="flex justify-center mt-12 md:mt-15 xl:mt-20">
        <Button href="/roadmap">Our roadmap</Button>
      </div> */}
    </div>
  </Section>
);

export default Roadmap;