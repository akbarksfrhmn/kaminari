export const navigation = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/kaminari-flow/", label: "Kaminari Flow" },
  { href: "/contact/", label: "Contact" },
];

export const services = [
  {
    number: "01", slug: "ai-automation", title: "AI Automation", short: "Less repetition. More room to think.",
    description: "Help your business streamline repetitive processes using AI and workflow automation.",
    problem: "Your team spends time answering recurring questions and moving information between tools.",
    solution: "We map the work, identify where automation makes sense, and build systems around your business knowledge. People stay involved where judgment matters.",
    deliverables: ["Workflow discovery and mapping", "Knowledge retrieval prototypes", "AI support tools", "Automation integrations"],
    ideal: "Teams with recurring support requests, manual handoffs, or information spread across tools.",
  },
  {
    number: "02", slug: "websites-digital-products", title: "Website & Digital Products", short: "Built around what your users need.",
    description: "Thoughtful websites, landing pages, MVPs, and digital tools built for the way your business works.",
    problem: "Your website no longer reflects your business, or a useful product idea needs a first working version.",
    solution: "We turn the core user problem into a clear experience, then design and develop a focused product you can test and improve.",
    deliverables: ["Website design and development", "Campaign landing pages", "Product prototypes and MVPs", "Internal business tools"],
    ideal: "Businesses refreshing their digital presence and founders ready to test a product idea.",
  },
  {
    number: "03", slug: "creative-technology", title: "Creative Technology", short: "A distinct idea, made tangible.",
    description: "Design and technology brought together to create distinctive digital experiences.",
    problem: "Your idea needs an experience that a standard page or off-the-shelf tool cannot quite express.",
    solution: "We explore the interaction, prototype the hard parts, and develop a visual system that gives the idea a form people can use.",
    deliverables: ["Interactive web experiences", "Creative prototypes", "Custom interface systems", "Purposeful motion and interaction"],
    ideal: "Brands and teams looking for a distinctive way to explain, demonstrate, or explore an idea.",
  },
  {
    number: "04", slug: "digital-strategy", title: "Digital Strategy", short: "Know what to build. And why.",
    description: "Identify opportunities and define practical digital solutions aligned with your business goals.",
    problem: "You have several possible directions, limited resources, and no clear starting point.",
    solution: "We work through your goals and constraints, evaluate the options, and define a practical scope before you commit to a build.",
    deliverables: ["Discovery workshops", "Opportunity and workflow reviews", "Product scope and priorities", "Implementation roadmaps"],
    ideal: "Business owners and product teams deciding where design, software, or automation can help.",
  },
];

export type Project = {
  name: string; category: string; description: string; technologies: string[];
  status: string; ownership: string; href?: string; cover: "flow";
};

export const projects: Project[] = [{
  name: "Kaminari Flow", category: "AI Automation / Product Development",
  description: "An AI customer support system designed to retrieve relevant business knowledge, respond to customer inquiries, and persist conversations.",
  technologies: ["AI", "RAG", "OpenAI", "Supabase"],
  status: "In development", ownership: "Internal product", href: "/kaminari-flow/", cover: "flow",
}];

export const process = [
  { title: "Discover", description: "Understand the business, goals, and challenges." },
  { title: "Define", description: "Establish the strategy, scope, and solution." },
  { title: "Build", description: "Design and develop the digital experience or system." },
  { title: "Improve", description: "Test, evaluate, and refine the solution." },
];
