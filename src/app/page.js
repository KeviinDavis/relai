import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Stepper from "@/components/Stepper";
import Testimonials from "@/components/Testimonials";
import Shortcuts from "@/components/Shortcuts";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero
        title="Redefining Insurance"
        text="Korr is the first truly versatile insurance platform—streamlining claims, simplifying policy administration, and accelerating new product development. Built for the future, Korr boosts efficiency, accuracy, and innovation across the insurance value chain."
        actions={[
          { label: "See the Product", href: "/product" },
          { label: "Book a demo", href: "/book-a-demo" },
        ]}
        media={{ type: "video", src: "/video/hero.mp4" }}
      />

      <Reveal>
      <Intro
        id="why-korr"
        excerpt="Insurance has evolved. The software stayed stuck in 2003. Korr replaces outdated systems with a modern platform built for speed, flexibility, and intelligence."
        capsule="Why Korr"
        body="Korr began with a bold question: How can insurers stay ahead in a fast-moving world? The answer is a platform built for speed, flexibility, and innovation—enabling carriers to launch products faster, adapt with ease, and operate in the cloud through a modern, intuitive interface."
        links={[
          { label: "Why Korr", href: "/#why-korr" },
          { label: "Product", href: "/#product" },
        ]}
      />
      </Reveal>

      <Stepper
        capsule="Product"
        text="Legacy systems hold you back—and block the path to AI. Korr clears the way, giving you the speed, structure, and flexibility to innovate."
        steps={[
          {
            capsule: "Concept",
            image: "/images/step-concept.webp",
            alt: "Shapes connected by looping dashed lines.",
            text: "Insurance is all about expecting the unexpected. Organizations need a platform that enables them to adapt quickly to unforeseen changes, minimizing disruption and making transitions seamless. Speed and adaptability are at the heart of Korr's design.",
          },
          {
            capsule: "Adaptability",
            image: "/images/step-adaptability.webp",
            alt: "A stack of rectangles expanding upward.",
            text: "Korr is a cloud-native system designed for secure, reliable performance and streamlined management. Whether building on an existing configuration or developing a new one, Korr’s no-code rules engine enables rapid customization, supporting innovation and growth while adhering to your change management processes.",
          },
          {
            capsule: "Build",
            image: "/images/step-build.webp",
            alt: "A hierarchy of rectangles expanding downward, connected by lines.",
            text: "Korr runs on AWS, delivering the reliability and scale modern insurers expect. Our flexible data model makes it easy to migrate even the messiest legacy data—no matter how deep your history runs. We handle business continuity behind the scenes, so you can finally retire outdated systems and cut the cord on bloated tech.",
          },
          {
            capsule: "Product",
            image: "/images/step-product.webp",
            alt: "Two large rounded squares connected by cascading lines.",
            text: "Korr’s interface is fast, modern, and purpose-built for productivity. Intelligent, system-wide search puts the right data at your fingertips—no clutter, no wasted clicks, just clear answers.",
          },
        ]}
      />

      <Reveal>
      <Testimonials
        items={[
          {
            name: "Robert Pick, EVP & Chief Information Officer",
            image: "/images/carousel-tokio.webp",
            alt: "Tokio Marine",
            quote:
              "There are many venerable core system solutions on the market today. But most of them require the carrier to move into their solution ecosystem and standards for maximum value and sustainability. Korr takes a “thin core” approach which recognizes that carriers typically operate heterogenous solution environments. Through standards-based ease of integration, Korr comes to your ecosystem and integrates to it, minimizing time, risk and complexity, while not requiring replacement of otherwise valuable existing point-solutions.",
          },
          {
            name: "Chad Hersh, Global Life Insurance Industry Lead, AWS",
            image: "/images/carousel-chad.webp",
            alt: "Chad Hersh",
            quote:
              "While core insurance systems are increasingly available on the cloud, very few are truly cloud native. Being ‘cloud-enabled’ or ‘cloud optimized’ isn’t enough; being cloud-native is critical for achieving the full benefits of the cloud: agility and speed, cost savings, the ability to scale up and scale down as needed, and improved innovation. By leveraging cloud-native services on AWS, Korr can help insurers take advantage of these cloud benefits and integrate to AWS’ large ecosystem of partners.",
          },
          {
            name: "Claims Supervisor, Wellcove",
            image: "/images/carousel-wellcove.svg",
            alt: "Wellcove",
            quote:
              "I think that Korr is a beautiful system. We are loving the ease of it. We have found it to be very helpful in answering questions quickly. We went from a dinosaur to a spaceship and we appreciate the support we've had with it and everyone is just thrilled using it and the ease of it.",
          },
        ]}
      />
      </Reveal>

      <Reveal>
      <Shortcuts
        capsule="Learn More"
        text="Korr is a venture-backed insurtech, proudly supported by leading global insurers such as Tokio Marine. Founded by insurance professionals who recognized legacy software vendors were falling short, Korr was born in New York to build a truly cloud-first, cloud-native platform—one designed specifically to power the next generation of insurance."
        cards={[
          {
            image: "/images/home-about.webp",
            alt: "About us, a long table with colleagues looking at papers, computers, each other.",
            title: "Learn more",
            text: "Twenty years ago, legacy software ruled—and BlackBerry dominated cellphones. Times have changed. Shouldn’t your software evolve, too? See how Korr is modernizing insurance.",
            href: "/about",
          },
          {
            image: "/images/home-mission.webp",
            alt: "Our mission, a drawing of a globe with details pulled out, a satellite, a city, planes.",
            title: "Mission",
            text: "Empowering the insurance industry to operate at the speed of change.",
            href: "/mission",
          },
        ]}
      />
      </Reveal>
    </>
  );
}
