import Image from "next/image";
import portrait from "@/content/assets/portrait.jpg";

/** fills its (positioned) parent with the portrait, cropped from the top so the face stays in frame */
export function Portrait({ sizes, priority }: { sizes: string; priority?: boolean }) {
  return <Image src={portrait} alt="Stephen Ntale" fill sizes={sizes} priority={priority} className="object-cover object-top" />;
}
