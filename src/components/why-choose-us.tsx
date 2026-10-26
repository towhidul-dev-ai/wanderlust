import type { LucideIcon } from "lucide-react";
import { Headset, Map, ShieldCheck } from "lucide-react";

const features: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e7fafc] px-6 py-20 md:py-24">
      <h2 className="text-center font-heading text-3xl text-foreground md:text-5xl">
        Why Choose Wanderlust
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground md:text-base">
        Your trusted partner for exceptional travel experiences
      </p>

      <div className="mx-auto mt-12 grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-sm bg-white p-8 shadow-[0_1px_3px_rgb(11_60_68/0.06)]"
          >
            <feature.icon
              className="size-9 text-brand"
              strokeWidth={1.8}
              aria-hidden
            />
            <h3 className="mt-8 font-heading text-xl text-foreground">
              {feature.title}
            </h3>
            <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
