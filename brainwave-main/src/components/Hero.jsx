import { curve, heroBackground, robot, gradient } from "../assets";
import smallImage from "../assets/hero/small.png";
import Button from "./Button";
import Section from "./Sections";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses4
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >

<div className="container relative" ref={parallaxRef}>
  
  {/* Background animation behind image */}
  <BackgroundCircles />
  <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
          &nbsp;pixelblot&nbsp;{` `}
          </h1>    
  {/* Centered image */}
  <div className="relative z-10 max-w-[30rem] mx-auto mb-8">
    <img
      src={smallImage}
      alt="Pixelblot Hero"
      className="w-full rounded-2xl"
    />
  </div>

  {/* Text below image */}
  <div className="relative z-20 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
    <p className="body-1 max-w-3xl mx-auto text-n-2 lg:mb-8">
      rethinking mental health
    </p>
    {/* <Button href="/pricing" white>Get in touch</Button> */}
  </div>
  </div> 
  {/* add companies that we are endorsed by ... <CompanyLogos className="hidden relative z-10 mt-20 lg:block" /> */}
</div>
  

      <BottomLine />
    </Section>
  );
};

export default Hero;
