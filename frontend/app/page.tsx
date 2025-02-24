import { BannerDiscount } from "@/components/banner-discount";
import BannerProduct from "@/components/banner-product";
import ChooseCategory from "@/components/choose-category";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function Home() {
  return (
    <main>
      <HeroParallax />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}

