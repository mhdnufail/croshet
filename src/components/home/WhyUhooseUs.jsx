import Container from "../Container";

const benefits = [
  {
    id: 1,
    icon: "🧶",
    title: "Handmade",
    description:
      "Every product is carefully handmade with creativity and attention to detail.",
  },
  {
    id: 2,
    icon: "💎",
    title: "Quality Products",
    description:
      "We focus on quality materials and careful craftsmanship for every product.",
  },
  {
    id: 3,
    icon: "❤️",
    title: "Made With Care",
    description:
      "Each crochet piece is created with passion, patience, and love.",
  },
  {
    id: 4,
    icon: "🚚",
    title: "Reliable Delivery",
    description:
      "We carefully pack your order and make sure it reaches you safely.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-16">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-primary font-semibold">
            WHY US
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Why Choose Crochet Store?
          </h2>

          <p className="text-muted mt-4">
            We believe every handmade product should feel
            special, personal, and worth keeping.
          </p>

        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md transition duration-300"
            >

              <div className="text-5xl">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-semibold mt-4">
                {benefit.title}
              </h3>

              <p className="text-muted mt-3">
                {benefit.description}
              </p>

            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default WhyChooseUs;