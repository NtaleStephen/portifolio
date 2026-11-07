export type ExperienceEntry = {
  when: string;
  role: string;
  org: string;
  where: string;
  logo: string;
  text: string;
};

export const experience: ExperienceEntry[] = [
  { when: "20XX — Present", role: "Founder & Lead Engineer", org: "Soko", where: "Kampala · Remote", logo: "SK",
    text: "Building a marketplace platform that helps African SMEs sell online. Replace this with your scope, your stack, and one number that shows impact." },
  { when: "20XX — Present", role: "Founder", org: "Qiora", where: "Kampala", logo: "QI",
    text: "Turning a coaching tool into a course marketplace for Uganda. Describe the decisions you made and what you shipped." },
  { when: "20XX — 20XX", role: "Freelance Developer", org: "Independent", where: "Remote", logo: "FR",
    text: "Websites and internal tools for local businesses. List two clients or projects and the result for each." },
  { when: "20XX — Aug 2027", role: "B.Sc. Computer Science", org: "Kampala International University", where: "Kampala", logo: "KIU",
    text: "Databases, networking, OOP, simulation and modelling. Mention a capstone or award here." },
];
