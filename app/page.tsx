import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Desktop } from "@/components/Desktop";
import { Dock } from "@/components/Dock";
import { Engine } from "@/components/Engine";
import { ExperienceLog } from "@/components/ExperienceLog";
import { Footer } from "@/components/Footer";
import { Menubar } from "@/components/Menubar";
import { Wallpaper } from "@/components/Wallpaper";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Wallpaper />
      <Menubar />
      <main>
        <Desktop />
        <Work />
        <About />
        <ExperienceLog />
        <Contact />
      </main>
      <Footer />
      <Dock />
      {/* last, so every stage has registered its frame callback before the engine's first render */}
      <Engine />
    </>
  );
}
