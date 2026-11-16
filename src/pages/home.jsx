import CTA from "../components/home/CTA";
import FeaturedCategories from "../components/home/featuredCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero  from "../components/home/hero";
import WhyChooseUs from "../components/home/WhyUhooseUs";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories/>
      <FeaturedProducts/>
      <WhyChooseUs/>
      <CTA/>
    </>
  );
}

export default Home;