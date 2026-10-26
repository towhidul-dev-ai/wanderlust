import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-6 py-20 text-center md:min-h-[480px] md:py-28">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/40" />

      <div className="relative">
        <h2 className="font-heading text-3xl text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/90 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div className="mt-10 flex justify-center">
          <Button className="h-11 rounded-none bg-white px-7 text-sm font-medium tracking-wide text-foreground hover:bg-white/90 hover:text-foreground">
            BOOK YOUR TRIP TODAY
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
