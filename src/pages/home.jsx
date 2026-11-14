import FeaturedCategories from "../components/home/featuredCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero  from "../components/home/hero";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories/>
      <FeaturedProducts/>
    </>
  );
}

export default Home;