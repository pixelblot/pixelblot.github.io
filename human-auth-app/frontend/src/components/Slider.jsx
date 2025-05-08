import { useState, useEffect } from "react";
import SignatureCanvas from "./SignatureCanvas";
import QRResults from "./QRResults";
import QRCodeCanvas from "./QRCodeCanvas";

const slides = [
  { title: "Sign", component: <SignatureCanvas /> },
  { title: "Compute", component: <QRResults /> },
  { title: "Pixelblot", component: <QRCodeCanvas /> },
];

const Slider = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides[active].title === "Compute") {
      const event = new Event("cursor-export");
      window.dispatchEvent(event);
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-3xl px-4">
      <div className="relative transition-all duration-500 ease-in-out">
        {slides[active].component}
        <div className="absolute top-0 left-0 w-[30px] h-[2px] bg-white transition-all" />
        <div className="absolute top-0 left-0 w-[2px] h-[30px] bg-white transition-all" />
        <div className="absolute bottom-0 right-0 w-[30px] h-[2px] bg-white transition-all" />
        <div className="absolute bottom-0 right-0 w-[2px] h-[30px] bg-white transition-all" />
      </div>

      <div className="flex gap-6 justify-center">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-36 text-center py-3 px-6 border-t-2 transition-all ${
              index === active
                ? "border-purple-500 text-white"
                : "border-gray-600 text-gray-400"
            }`}
          >
            <h4 className="text-lg font-bold">{slide.title}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;