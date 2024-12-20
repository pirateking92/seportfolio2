import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import SmokeFadeIn from "@/components/SmokeFadeIn";
import Image from "next/image";

export default async function ContactPage() {
  return (
    <div>
      <main className="flex-grow">
        <SmokeFadeIn visibleOnLoad={true}>
          <Image
            src="/SepySits.jpg"
            alt="Sepy Directing"
            width={600}
            height={400}
            className="mx-auto m-8 pt-10"
          />
        </SmokeFadeIn>
        <Contact />
      </main>
    </div>
  );
}
