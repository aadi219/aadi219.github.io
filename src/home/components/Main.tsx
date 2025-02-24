import { AnimatePresence, motion, MotionConfig, useScroll } from "motion/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import projectData from "../../../src/data/projects.json";
import Contacts from "../../components/Contacts.tsx";
import Projects from "./Projects.tsx";
import Section from "./Section.tsx";
import Skills from "./Skills.tsx";
import SubNav from "./SubNav.tsx";

export const LeftPane = ({ children }: { children: ReactElement[] }) => {
    return (
        <aside className="flex flex-col pane gap-3 w-[55%] pl-24">
            {children}
        </aside>
    );
};

export const RightPane = ({ children }: { children: ReactElement[] }) => {
    const paneRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: paneRef,
        offset: ["start start", "end end"]
    });
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const index = Math.round(scrollYProgress.get() * (children.length - 1));
        setVisibleIndex(index);
      }
      const unsubscribe = scrollYProgress.on("change", handleScroll);
      return () => unsubscribe();
    }, [scrollYProgress.get(), children.length]);

    return (
      <div ref={paneRef} id="rightPane" className="relative w-[45%] h-screen pr-10 overflow-y-auto">
          <div className="min-h-[300vh]">
            <AnimatePresence mode="wait">
              {children.map((child, index) => (
                index === visibleIndex && (
                  <motion.div
                    key={index}
                    className="sticky top-0 h-screen text-start"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -50}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                  >
                    {child}
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
      </div>
    );
};

const Main = (): ReactElement => {
    let { projects } = projectData;
    projects = projects.slice(0, 4);
    return (
        <>
            <LeftPane>
                <h1 className="text-5xl font-bold heading text-highlight-blue text-nowrap font-heading">
                    Aadi Badola
                </h1>
                <ul className="font-heading list-disc flex gap-5 text-highlight-teal flex-wrap">
                    <li className="list-none">Software Engineer</li>
                    <li>Full-Stack Developer</li>
                    <li>Data Scientist</li>
                </ul>
                <SubNav />
            </LeftPane>
            <RightPane>
                <Section id="Bio">
                    <h2 className=" pt-8">Bio</h2>
                    <p className="w-[86%] text-start text-highlight-blue">
                        Born in 2004 in India, I was introduced to programming
                        early in High School. Gradually developing and
                        discovering increasingly complicated yet elegant
                        solutions for different problems, I realised that
                        programming perfectly encapsulated my love for
                        problem-solving and my constant desire to innovate and
                        improve upon my projects. <br />
                        Since then, I have been hooked on Software Development,
                        on a journey of steady improvement and constant
                        discovery.
                        <br />
                        And during this journey I have amassed an extensive and
                        thorough skillset covering fields such as: <br />
                        <span className="font-semibold">
                            Full-Stack Development, Machine Learning & Data
                            Science, Database & Backend Technologies, Project
                            Management and more...
                        </span>
                    </p>
                </Section>
                <Section id="Skills">
                    <h2>Skills & Technologies</h2>
                    <Skills />
                </Section>
                <Section id="Projects">
                    <h2>Projects</h2>
                    <Projects projects={projects} />
                </Section>
            </RightPane>
            <Contacts />
        </>
    );
};

export default Main;
