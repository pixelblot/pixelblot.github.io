import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage1,
  benefitImage2,
  benefitImage3,
  teamImage1,
  teamImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  github,
  linkedin,
  email,
  clinicians, 
  scientist, 
  protectors, 
  policy, 
  IT, 
  app, 
  browser
} from "../../src/assets";

export const navigation = [
  {
    id: "0",
    title: "What we do",
    url: "#features",
  },
  {
    id: "1",
    title: "Technology",
    url: "#technology",
  },
  {
    id: "2",
    title: "Integration",
    url: "#integration",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Team",
    url: "#team",
  },
  // {
  //   id: "4",
  //   title: "New account",
  //   url: "#signup",
  //   onlyMobile: true,
  // },
  // {
  //   id: "5",
  //   title: "Sign in",
  //   url: "#login",
  //   onlyMobile: true,
  // },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Screening",
  "Realtime monitoring",
  "Public mental health",
  "Precision medicine",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const benefits = [
  {
    id: "0",
    title: "A global challenge",
    text: "Mental health is the leading cause of disability worldwide. One in three people will suffer from mental illness at some point in their life. Yet, mental health challenges often take years to diagnose, leaving many without timely care.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    // imageUrl: benefitImage1,
    link: "#technology",
    light: true,
  },
  {
    id: "1",
    title: "A vision for the future",
    text: "Pixelblot wants to make state-of-the art mental health care accessible to everyone, everywhere, & all at once. We are building AI to enable early detection, real-time monitoring, & targeted strategies for public mental health and precision medicine.",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    // imageUrl: benefitImage2,
    link: "#integration",
    light: true,
  },
  {
    id: "2",
    title: "Digital mental health",
    text: "Our technology transforms digital footprints into actionable mental health predictions that protect user privacy. We interface with adaptive digital interventions to deliver timely and personalized support at scale - online or in real life.",
    backgroundUrl: "assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    // imageUrl: benefitImage3,
    link: "#roadmap",
    light: true,
  },
];

export const roadmap = [
  {
    id: "0",
    title: "Mental health prediction",
    text: "We developed a machine learning pipeline that translates digital behavior into accurate, real-time mental health predictions for individuals and populations.",
    date: "January 2025",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "API",
    text: "We enabled seamless API with digital platforms, making it easy to embed our mental health signals into third-party products and services.",
    date: "March 2025",
    status: "done",
    imageUrl: roadmap2,
    colorful: true,
  },
  {
    id: "2",
    title: "Closed-loop interventions",
    text: "We are developing closed-loop systems that personalize digital interventions in real time based on mental state predictions and user behavior.",
    date: "September 2025",
    status: "progress",
    imageUrl: roadmap3,
    colorful: false,
  }
];

export const collabText =
  "Pixelblot integrates with digital systems to deliver real-time mental health predictions from passive data.";

export const collabContent = [
  {
    id: "0",
    title: "API",
    text: "Embed Pixelblot into any app or platform with minimal setup.",
  },
  {
    id: "1",
    title: "Automation",
    text: "Trigger interventions based on digital phenotypes.",
  },
  {
    id: "2",
    title: "Secure & Compliant",
    text: "Built for clinical standards and with medical-grade encryption.",
  },
  {
    id: "3",
    title: "Human in the Loop",
    text: "Supports professionals with explainable, actionable data.",
  },
];

export const collabApps = [
  // {
  //   id: "0",
  //   title: "Clinicians",
  //   icon: clinicians,
  //   width: 80,
  //   height: 80,
  // },
  // {
  //   id: "1",
  //   title: "Scientists",
  //   icon: notion,
  //   width: 34,
  //   height: 36,
  // },
  // {
  //   id: "2",
  //   title: "Users",
  //   icon: discord,
  //   width: 36,
  //   height: 28,
  // },
  // {
  //   id: "3",
  //   title: "Public health systems",
  //   icon: slack,
  //   width: 34,
  //   height: 35,
  // },
  // {
  //   id: "4",
  //   title: "Digital Platforms",
  //   icon: photoshop,
  //   width: 34,
  //   height: 34,
  // },
  // {
  //   id: "5",
  //   title: "Health apps",
  //   icon: protopie,
  //   width: 34,
  //   height: 34,
  // },
  // {
  //   id: "6",
  //   title: "Framer",
  //   icon: framer,
  //   width: 26,
  //   height: 34,
  // },
  // {
  //   id: "7",
  //   title: "Raindrop",
  //   icon: raindrop,
  //   width: 38,
  //   height: 32,
  // },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const team = [
  {
    id: "0",
    title: "Veith Weilnhammer",
    text: "Veith is a neuroscientist, psychiatrist, and psychotherapist. He specializes in human-computer interactions, digital biomarkers, and AI-driven mental health solutions.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: teamImage1,
    link: "https://veithweilnhammer.github.io",
    light: true,
  },
  {
    id: "1",
    title: "David Whitney",
    text: "David is a cognitive neuroscientist. His work transforms experimental psychology into innovative tools for decision making in medicine and economics.",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: teamImage2,
    link: "https://cogsci.berkeley.edu/people/faculty-director",
    light: true,
  },
];

export const socials = [
  {
    id: "0",
    title: "Email",
    iconUrl: email,
    url: "https://veithweilnhammer.github.io/",
  },
  {
    id: "1",
    title: "Github",
    iconUrl: github,
    url: "https://github.com/veithweilnhammer",
  },
  {
    id: "2",
    title: "linkedin",
    iconUrl: linkedin,
    url: "https://www.linkedin.com/in/veith-weilnhammer-742b41282/",
  },
];
