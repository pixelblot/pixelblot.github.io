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
  browser,
  BenefitAnim1,
  TechnologyAnim1
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
    title: "Team",
    url: "#team",
  },
  {
    id: "4",
    title: "Pricing",
    url: "#pricing",
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
  {
    id: "0",
    title: "Screening",
    text: "Pixelblot identifies early signs of mental health risk based on patterns in digital behavior. This enables proactive care and timely support — before symptoms worsen or become harder to treat effectively.",
    imageUrl: benefitImage1,
    animation: TechnologyAnim1,
  },
  {
    id: "1",
    title: "Monitoring",
    text: "Our system provides dynamic predictions that capture how mental health evolves over time and in response to interventions. This enables ongoing monitoring and timely adjustments to care when needed.",
    imageUrl: benefitImage1,
    animation: TechnologyAnim1,
  },
  {
    id: "2",
    title: "Public Health",
    text: "By analyzing behavioral data across populations, we uncover trends in collective wellbeing. These insights help guide health policy, community initiatives, and rapid response during mental health crises.",
    imageUrl: benefitImage1,
    animation: TechnologyAnim1,
  },
  {
    id: "3",
    title: "Precision Medicine",
    text: "Pixelblot generates personalized predictions to guide treatment decisions. Each person’s digital signature informs tailored interventions—enhancing accuracy, efficiency, and clinical impact.",
    imageUrl: benefitImage1,
    animation: TechnologyAnim1,
  },
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
    text: "Today, one in eight people is struggling with mental illness. For one in three, it is a part of life at some point. Despite their impact, mental health challenges often go undetected for years after their onset, leaving many without timely care.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage1,
    animation: BenefitAnim1,
    link: "#challenge",
    light: true,
  },
  {
    id: "1",
    title: "A vision for the future",
    text: "At Pixelblot, we want this to change. Scalable, accurate, fair, and efficient mental health assessments will help identify those at risk, monitor progress, guide treatment, and inform public health responses that deliver care where it’s needed most.",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage1,
    animation: BenefitAnim1,
    link: "#integration",
    light: true,
  },
  {
    id: "2",
    title: "Digital phenotyping",
    text: "We developed a new way to measure mental health. We transform digital behavior into in a high-dimensional predictions that visualize risk, resilience, and changes in mental health. Our technology powers timely and personalized mental health support at scale.",
    backgroundUrl: "assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage1,
    animation: BenefitAnim1,
    link: "#technology",
    light: true,
  },
];



export const roadmap = [
  {
    id: "0",
    title: "Mental health prediction",
    text: "We developed a machine learning pipeline that translates digital behavior into accurate, real-time mental health predictions for individuals and populations.",
    date: "2024",
    status: "done",
    imageUrl: roadmap1,
    colorful: false,
  },
  {
    id: "1",
    title: "API",
    text: "We enabled seamless API with digital platforms, making it easy to embed our mental health signals into third-party products and services.",
    date: "2024",
    status: "done",
    imageUrl: roadmap2,
    colorful: false,
  },
  {
    id: "2",
    title: "Closed-loop interventions",
    text: "We are developing closed-loop systems that personalize digital interventions in real time based on mental state predictions and user behavior.",
    date: "2025",
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
      text: "Trigger personalized interventions based on real-time digital phenotypes.",
    },
    {
      id: "2",
      title: "Secure & Compliant",
      text: "Built for clinical standards and with medical-grade encryption.",
    },
    {
      id: "3",
      title: "Human in the Loop",
      text: "Empowers support systems with explainable predictions for better mental health support.",
    },
  ];

export const collabApps = [
  {
    id: "0",
    title: "Clinicians",
    icon: clinicians,
    width: 34,
    height: 36,
  },
  {
    id: "1",
    title: "Scientists",
    icon: scientist,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Public health systems",
    icon: policy,
    width: 34,
    height: 35,
  },
  {
    id: "3",
    title: "Digital Platforms",
    icon: browser,
    width: 34,
    height: 34,
  },
  {
    id: "4",
    title: "Health apps",
    icon: app,
    width: 34,
    height: 34,
  }
];

export const pricing = [
  {
    id: "0",
    title: "Non-Profit",
    description: "Free access for verified non-profit mental health organizations",
    price: "0",
    features: [
      "Unlimited AI-assisted assessments and recommendations",
      "Secure data integration with public systems",
      "Full feature access without any cost",
    ],
  },
  {
    id: "1",
    title: "Standard",
    description: "Affordable pay-as-you-go for private clinics and startups",
    price: "1",
    features: [
      "Pay-per-token pricing for predictions and analytics",
      "Self-serve dashboard",
      "Email support",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Solutions for high-impact partners",
    price: "Custom",
    features: [
      "Flexible licensing and volume-based pricing",
      "Custom integration and onboarding",
      "Dedicated support 24/7",
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
