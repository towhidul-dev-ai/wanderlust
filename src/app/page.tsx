import { Banner } from "@/components/banner";
import { CallToAction } from "@/components/call-to-action";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
