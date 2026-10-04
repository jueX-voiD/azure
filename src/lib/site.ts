// Hosted on the WordPress site for now (57 MB); compress and move it to a CDN before launch.
export const HERO_VIDEO_SRC =
  "https://azureproperties.ae/wp-content/uploads/2025/11/Video-Option-1.mp4";
export const HERO_VIDEO_POSTER = "/images/video-poster.webp";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26368.983151112752!2d55.213080147224225!3d25.168142265499515!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69b1a91067bb%3A0x3e59eb92cdc5e20d!2sAl%20Ferdous%204%20(%20Dubai%20Real%20Estate%20Centre)!5e0!3m2!1sen!2snp!4v1764039207627!5m2!1sen!2snp";

export const SOCIALS = {
  instagram:
    "https://www.instagram.com/azure.properties?utm_source=qr&igsh=MWYweTh1NjQ3ZDVtOA==",
  linkedin: "https://www.linkedin.com/company/azure-properties-ae/",
};

export const HEADER_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

export const FEATURES = [
  {
    title: "Modern Living",
    body: "Smart design meets comfort. Every space is built to make everyday life easier and more enjoyable.",
    // The live site renders this one paragraph in the system font (inline span in Elementor).
    systemFont: true,
  },
  {
    title: "Spacious Design",
    body: "More room to move, live, and grow. Our layouts are crafted for families and real life.",
  },
  {
    title: "Connected Locations",
    body: "Close to what matters from schools and shops to parks and transport.",
  },
];

export const FEATURED_PROJECTS = [
  {
    title: "Al Jaddaf Building A",
    image: "/images/project-1.webp",
    href: "/projects#residential",
    imagePosition: "50% 100%",
    body: [
      "A modern address shaped for flexible urban living and working. The building brings together 318 residences, a full office floor and street-level retail, creating a complete environment designed with clarity, circulation and comfort in mind.",
      "Set in the vibrant Al Jaddaf district, it offers seamless access across Dubai, 420 parking spaces and a structure that supports both professional and residential life with ease.",
    ],
  },
  {
    title: "Umm Suqeim Villas",
    image: "/images/project-2.webp",
    href: "/projects#villa",
    imagePosition: "50% 50%",
    body: [
      "Located in the sought-after Umm Suqeim neighborhood, this development introduces a collection of 36 villas designed for modern family living.",
      "Each villa is planned with comfort and practicality in mind, offering residents a welcoming place to call home in a well-connected part of Dubai.",
    ],
  },
  {
    title: "Al Barsha South B",
    image: "/images/project-3.webp",
    href: "/projects#residential",
    imagePosition: "50% 50%",
    body: [
      "A new urban address combining clean architecture with mixed-use purpose. Residences, office levels and commercial spaces integrate to support a lifestyle that balances home, work and the rhythm of city life.",
      "With metro access just minutes away, Al Barsha South B offers connectivity, convenience and a practical base for modern living.",
    ],
  },
];

export const PROJECT_OPTIONS = [
  "Oud Metha Building",
  "Al Jaddaf Building A",
  "Al Jaddaf Building B",
  "Al Barsha South A",
  "Al Barsha South B",
  "Al Nahda Tower",
  "Dubai Water Canal Villa",
  "Umm Suqeim Villas",
  "Lamcy by Azure",
];

export const ROLE_OPTIONS = [
  "Agent",
  "Vendor",
  "Purchaser",
  "Interested to rent",
  "Other, specify",
];
