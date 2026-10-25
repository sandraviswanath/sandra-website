export const profile = {
  name: "Sandra",
  role: "Full Stack Developer",
  location: "Ponnani, Malappuram, Kerala",
  email: "sandraviswanath2@gmail.com",
  phone: "+91 9496050858",
  linkedin: "https://linkedin.com/in/sandra-viswanath-9852212344",
  summary:
    "I build fast, accessible web applications with Next.js and React, and I have hands-on experience shipping mobile features with React Native. Over 2+ years I've turned designs into clean, scalable interfaces and delivered production features on schedule.",
};

export type Job = { title: string; company: string; period: string; points: string[] };

export const jobs: Job[] = [
  {
    title: "Software Developer",
    company: "Signature Software Lab",
    period: "Oct 2024 – Present",
    points: [
      "Build responsive Next.js applications with server-side rendered and statically generated pages for better speed and SEO.",
      "Create reusable, accessible React components and connect them to RESTful APIs for data-driven interfaces.",
      "Work with designers and backend engineers to deliver pixel-accurate UIs, tuned for performance and every major browser.",
      "Take part in code reviews, debugging and Git-based deployment in an Agile team.",
    ],
  },
  {
    title: "React Native Intern",
    company: "Atees Industrial Training Pvt. Ltd",
    period: "Mar 2026 – Jun 2026",
    points: ["Built mobile app features and integrated APIs with React Native alongside the development team."],
  },
  {
    title: "MERN Stack Developer Intern",
    company: "Futura Labs",
    period: "Aug 2023 – Mar 2024",
    points: [
      "Built end-to-end features with MongoDB, Express.js, React.js and Node.js.",
      "Learned how front-end and back-end components work together across full projects.",
    ],
  },
  {
    title: "Web Developer",
    company: "UP2 Tech Pvt. Ltd",
    period: "Sep 2022 – Aug 2023",
    points: [
      "Supported senior developers and project managers with code and feature design.",
      "Designed custom WordPress sites: theme customization, HTML, CSS, plugins, Avada Builder and WP forms.",
    ],
  },
];

export type Project = { slug: string; name: string; kind: string; description: string; stack: string[]; features: string[]; href?: string };

export const projects: Project[] = [
  {
    slug: "alyzkart",
    name: "Alyzkart",
    features: ["Product catalog and shopping cart", "Checkout and order management", "Return management", "Admin panel"],
    kind: "E-commerce",
    description: "Full e-commerce platform with product catalog, cart, checkout, order and return management, and an admin panel.",
    stack: ["Next.js", "React", "CodeIgniter", "PHP"],
    href: "https://alyzkart.com",
  },
  {
    slug: "mtcart",
    name: "MTCart",
    features: ["Online shopping", "Referral network", "Commission tracking", "Member dashboard"],
    kind: "E-commerce + referral network",
    description: "Online shopping combined with a referral network, commissions and a member dashboard.",
    stack: ["Next.js"],
    href: "https://mtcart.com",
  },
  {
    slug: "facility-management",
    name: "Facility Management Platform",
    features: ["Maintenance ticketing", "Real-time technician dispatch", "Admin controls", "Arabic and right-to-left interface support"],
    kind: "Mobile + web",
    description: "Uber-style maintenance ticketing with real-time technician dispatch, full admin control, and Arabic/RTL support.",
    stack: ["React Native", "Odoo"],
  },
  {
    slug: "gora",
    name: "GORA",
    features: ["BNB Smart Chain integration", "Wallet connectivity", "USDT mechanics", "Liquidity-pool functionality"],
    kind: "DeFi / Web3",
    description: "Decentralized finance platform on BNB Smart Chain with wallet integration, USDT and liquidity-pool mechanics.",
    stack: ["Next.js", "Solidity", "Ethers.js"],
  },
  {
    slug: "karumura-supermarket",
    name: "Karumura Supermarket",
    features: ["Supermarket shopping", "Restaurant discovery", "Food ordering", "Mobile-first progressive web app"],
    kind: "Progressive web app",
    description: "Mobile-first app that combines supermarket shopping with restaurant discovery and food ordering.",
    stack: ["Next.js", "CodeIgniter", "PHP"],
  },
  {
    slug: "tournament-player-auction",
    name: "Tournament & Live Player Auction",
    features: ["Tournament management", "Live player auctions"],
    kind: "Web platform",
    description: "Manage tournaments and run live player auctions from one platform.",
    stack: ["Next.js"],
  },
  {
    slug: "shaniba-driving-school",
    name: "Shaniba Driving School",
    features: ["Driving school website", "Driving school management platform"],
    kind: "Management website",
    description: "Website and management platform for a driving school.",
    stack: ["Next.js"],
  },
  {
    slug: "chilanka-jewellery-rental",
    name: "Chilanka Jewellery Rental",
    features: ["Jewellery rental management"],
    kind: "Rental management",
    description: "Rental management system for a jewellery business.",
    stack: ["Next.js"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Frameworks & libraries", items: ["Next.js", "React.js", "React Native", "Node.js", "Express.js", "Bootstrap"] },
  { group: "Languages", items: ["TypeScript", "JavaScript", "HTML5", "CSS"] },
  { group: "Data & backend", items: ["MongoDB", "Odoo"] },
  { group: "Tools", items: ["Git / GitHub", "WordPress", "Microsoft tools"] },
];

export const education = [
  { title: "B.Tech, Electronics and Communication Engineering", place: "Royal College of Engineering & Technology, Thrissur", period: "2018 – 2022" },
  { title: "Higher Secondary, Biology Science", place: "S.S.M.V.H.S.S Edakazhiyur", period: "2016 – 2018" },
];
