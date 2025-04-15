import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent, collabText } from "../constants";
import Section from "./Sections";
import Heading from "./Heading";

const Collaboration = () => {
  return (
    <Section id="integration">
      <div className="container">
      <Heading
        className="mx-auto text-center md:max-w-md lg:max-w-2xl"
          title="Integration"
         text="API-first architecture for embedding mental health predictions into any system."
        />

        <div className="relative flex flex-col lg:flex-row items-center justify-between border border-n-1/10 rounded-3xl p-8 lg:p-10">
          {/* Left: Integration Features */}
          <ul className="mb-8">
            {collabContent.map((item) => (
              <li className="mb-6" key={item.id}>
                <div className="flex items-start gap-5">
                  <img src={check} width={24} height={24} alt="check" className="mt-1" />
                  <div className="text-left lg:text-justify">
                    <h6 className="body-2 font-bold mb-1">{item.title}</h6>
                    {item.text && (
                      <p className="body-2 text-n-4 leading-relaxed">{item.text}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Right: Image with radial layout */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative flex w-[22rem] aspect-square border border-n-6 rounded-full scale-100">
              <div className="flex w-[14rem] aspect-square m-auto border border-n-6 rounded-full">
                <div className="w-[5.5rem] aspect-square m-auto p-[0.25rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    <img
                      src={brainwaveSymbol}
                      width={280}
                      height={280}
                      alt="brainwave"
                    />
                  </div>
                </div>
              </div>

              {/* Rotating App Icons */}
              <ul>
                {collabApps.map((app, index) => (
                  <li
                    key={app.id}
                    className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${index * 45}`}
                  >
                    <div
                      className={`relative -top-[1.6rem] flex w-[3.4rem] h-[3.4rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                        index * 45
                      }`}
                    >
                      <img
                        className="m-auto"
                        width={app.width}
                        height={app.height}
                        alt={app.title}
                        src={app.icon}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;