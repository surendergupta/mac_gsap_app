import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  useGSAP(
    () => {
      if (isTablet) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#showcase",
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(".mask img", {
            scale: 1.1,
          })
          .to(
            ".content",
            {
              opacity: 1,
              y: 0,
              ease: "power1.in",
            },
            "<",
          );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      }
    },
    { dependencies: [isTablet] },
  );

  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" autoPlay loop muted playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" alt="Game Logo" />
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 Powers
              </p>
              <p>It drives Apple silicon performance to new heights.</p>
              <p>It drives Apple silicon performance to new heights.</p>
              <p className="text-primary">
                Learn More About Apple Intelligence
              </p>
            </div>
          </div>
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to </p>
              <h3>4x Faster</h3>
              <p>Pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to </p>
              <h3>1.5x Faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
