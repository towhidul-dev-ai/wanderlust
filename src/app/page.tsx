import { Banner } from "@/components/banner";
import { CallToAction } from "@/components/call-to-action";

import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main>
      
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      
    </main>
  );
}
