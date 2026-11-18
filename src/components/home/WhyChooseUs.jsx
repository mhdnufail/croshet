import Container from "../Container";

const features = [
  {
    number: "01",
    title: "Handcrafted",
    description:
      "Every piece is carefully crocheted by hand with patience, creativity, and attention to detail.",
  },
  {
    number: "02",
    title: "Made With Love",
    description:
      "We believe handmade products carry something special — a little more warmth and a lot more personality.",
  },
  {
    number: "03",
    title: "Quality First",
    description:
      "From the yarn we choose to the final stitch, we focus on creating pieces designed to last.",
  },
  {
    number: "04",
    title: "Uniquely Yours",
    description:
      "Small variations make every handmade piece unique, giving your product its own character.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-secondary py-24">
      <Container>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

          <div>
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              The Crochet Difference
            </p>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text mt-4 leading-tight">
              Made slowly.
              <br />
              Made beautifully.
            </h2>
          </div>

          <div>
            <p className="text-muted text-lg leading-relaxed max-w-xl">
              In a world of mass production, we choose to make things
              differently. Each crochet piece is thoughtfully created by hand,
              giving it the character that only handmade work can have.
            </p>
          </div>

        </div>

        {/* Features */}
        <div className="mt-16 border-t border-text/15">

          {features.map((feature) => (
            <div
              key={feature.number}
              className="
                group
                grid
                grid-cols-1
                md:grid-cols-[100px_1fr_1.5fr]
                gap-6
                md:gap-10
                py-8
                border-b
                border-text/15
                transition
                hover:bg-background/40
                px-2
              "
            >

              {/* Number */}
              <span
                className="
                  text-primary
                  text-sm
                  font-semibold
                  tracking-[0.15em]
                "
              >
                {feature.number}
              </span>

              {/* Title */}
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

              {/* Description */}
              <p
                className="
                  text-muted
                  leading-relaxed
                  max-w-lg
                "
              >
                {feature.description}
              </p>

            </div>
          ))}

        </div>

        {/* Bottom Statement */}
        <div className="mt-16 flex justify-center">
          <p
            className="
              font-serif
              text-2xl
              md:text-3xl
              italic
              text-text
              text-center
              max-w-3xl
            "
          >
            "Because the things you keep should feel a little more personal."
          </p>
        </div>

      </Container>
    </section>
  );
}

export default WhyChooseUs;