import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import SmokeFadeIn from "@/components/SmokeFadeIn";
import Image from "next/image";

export default async function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="flex-grow">
        <SmokeFadeIn>
          <Image
            src="/SepySits.jpg"
            alt="Sepy Directing"
            width={600}
            height={400}
            className="mx-auto p-5 m-20 "
          />
        </SmokeFadeIn>
        <Contact />
      </div>
    </div>
  );
}
