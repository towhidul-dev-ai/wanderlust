import { Banner } from "@/components/home/banner";
import { CallToAction } from "@/components/home/call-to-action";
import Featured from "@/components/home/featured";

import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <main>
      
      <Banner />
      <Featured></Featured>
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      
    </main>
  );
}
