import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-[19rem] max-lg:w-full h-full px-6 py-10 bg-n-8 border border-n-6 rounded-[2rem] text-center flex flex-col"
        >
          <h4 className="h4 mb-4 text-white">{item.title}</h4>

          <p className="body-2 min-h-[4rem] mb-6 text-n-3">
            {item.description}
          </p>

          {item.price && (
            <div className="flex justify-center items-baseline gap-2 text-white mb-6">
              <div className="h3 text-lg font-light">$</div>
              <div className="text-[3.5rem] leading-none font-bold">
                {item.price}
              </div>
            </div>
          )}

<Button
  className="w-full mb-6 text-white bg-black transition"
  href="mailto:veith.weilnhammer@gmail.com"
  white
>
  Get in touch
</Button>

          <ul className="mt-auto">
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-4 border-t border-n-6 text-left"
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p className="body-2 ml-4 text-n-3">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;