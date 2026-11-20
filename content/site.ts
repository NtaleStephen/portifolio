export const site = {
  name: "Stephen Ntale",
  alias: "Code crafter",
  company: "Codevertex",
  location: "Kampala, Uganda",
  timeZone: "Africa/Kampala",
  email: "ntalestephen19@gmail.com",
  phone: "+256778087986",
  phoneDisplay: "+256 778 087 986",
  github: "https://github.com/NtaleStephen",
  linkedin: "https://www.linkedin.com/in/ntale-stephen-393511377",
};

export const whatsappUrl = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hi Stephen, I found your portfolio and wanted to say hello.")}`;
export const mailUrl = `mailto:${site.email}?subject=${encodeURIComponent("Hello from your portfolio")}`;
