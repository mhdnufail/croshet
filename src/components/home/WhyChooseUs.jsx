import Container from "../Container";

const features = [
  {
    number: "01",
    title: "Handcrafted",
    description:
      "Every piece is carefully crocheted by hand with patience and attention to detail.",
  },
  {
    number: "02",
    title: "Made With Love",
    description:
      "Thoughtfully created pieces with warmth, personality, and a handmade touch.",
  },
  {
    number: "03",
    title: "Quality First",
    description:
      "From the yarn to the final stitch, we focus on quality that lasts.",
  },
  {
    number: "04",
    title: "Uniquely Yours",
    description:
      "Small handmade variations make every piece one of a kind.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <Container>

        {/* Header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            The Crochet Difference
          </p>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text mt-4 leading-[1.05]">
            Made with care.
            <br />
            <span className="italic">Made to be loved.</span>
          </h2>

          <p className="text-muted max-w-xl mt-6 text-base md:text-lg leading-relaxed">
            Every piece has a story behind it. We create slowly, thoughtfully,
            and by hand — so what you receive feels truly special.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="
                group
                bg-background
                border
                border-text/10
                p-7
                md:p-8
                min-h-[280px]
                flex
                flex-col
                justify-between
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/40
              "
            >
              <div>
                <span className="text-primary text-xs font-semibold tracking-[0.2em]">
                  {feature.number}
                </span>

                <div className="w-8 h-px bg-primary/50 mt-6 mb-6" />

                <h3
                  className="
                    font-serif
                    text-2xl
                    md:text-3xl
                    text-text
                    group-hover:text-primary
                    transition
                  "
                >
                  {feature.title}
                </h3>
              </div>

              <p className="text-muted text-sm leading-relaxed mt-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-14 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="h-px bg-text/15 flex-1 hidden md:block" />

          <p className="font-serif italic text-xl md:text-2xl text-text text-center px-6">
            "Handmade feels different."
          </p>

          <div className="h-px bg-text/15 flex-1 hidden md:block" />
        </div>

      </Container>
    </section>
  );
}

export default WhyChooseUs;