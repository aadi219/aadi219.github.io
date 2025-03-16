import { AnimatePresence, motion, useScroll } from "motion/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import projectData from "../../../src/data/projects.json";
import Contacts from "../../components/Contacts.tsx";
import { ScrollContext } from "../context/ScrollContext.ts";
import Projects from "./Projects.tsx";
import Section from "./Section.tsx";
import Skills from "./Skills.tsx";
import SubNav from "./SubNav.tsx";
import WavyBackground from "./WavyBackground.tsx";
import TypingAnimation from "./TypingAnimation.tsx";

export const LeftPane = ({ children }: { children: ReactElement[] }) => {
    return (
        <aside className="flex mb-10 flex-col pane gap-3s pl-4 lg:pl-24">
            {children}
        </aside>
    );
};

interface RightPaneProps {
    children: ReactElement[];
    setScrollToIndex: (handler: (index: number) => void) => void;
}

export const RightPane = ({ children, setScrollToIndex }: RightPaneProps) => {
    const paneRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: paneRef,
        offset: ["start start", "end end"]
    });
    const [visibleIndex, setVisibleIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (paneRef.current) {
            const pane = paneRef.current as HTMLElement;
            const scrollHeight = pane.scrollHeight - pane.clientHeight;
            const targetScroll = (index / (children.length - 1)) * scrollHeight;
            pane.scrollTo({
                top: targetScroll,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        setScrollToIndex(() => scrollToIndex);
        const handleScroll = () => {
            const index = Math.round(
                scrollYProgress.get() * (children.length - 1)
            );
            setVisibleIndex(index);
        };
        const unsubscribe = scrollYProgress.on("change", handleScroll);
        return () => unsubscribe();
    }, [setScrollToIndex, scrollYProgress.get(), children.length]);

    return (
        <div
            ref={paneRef}
            id="rightPane"
            className="relative w-full h-screen lg:pr-10 overflow-y-auto"
        >
            <div className="min-h-[300vh]">
                <AnimatePresence mode="wait">
                    {children.map(
                        (child, index) =>
                            index === visibleIndex && (
                                <motion.div
                                    key={index}
                                    className="sticky top-0 h-screen text-start"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -50 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {child}
                                </motion.div>
                            )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Main = (): ReactElement => {
    let { projects } = projectData;
    projects = projects.slice(0, 4);
    const [scrollToIndex, setScrollToIndex] = useState<(index: number) => void>(
        () => () => {}
    );
    return (
        <ScrollContext.Provider value={{ scrollToIndex }}>
            <div className="relative w-full h-screen overflow-hidden">
                {/* Background layer */}
                <div className="absolute inset-0 z-0">
                    <WavyBackground />
                </div>

                {/* Content layer */}
                <div className="relative z-10 grid gap-3 grid-cols-1 lg:grid-cols-2 w-full h-full">
                    <LeftPane>
                        <h1 className="text-5xl font-bold heading text-highlight-blue text-nowrap font-heading">
                            Aadi Badola
                        </h1>
                        <TypingAnimation values={["Software Engineer", "Full-Stack Developer",  "Data Scientist"]} />
                            <Contacts className="pt-5 flex gap-4 lg:hidden" />
                        <SubNav />
                    </LeftPane>
                    <RightPane setScrollToIndex={setScrollToIndex}>
                        <Section id="Bio">
                            <h2 className="pl-4 lg:pt-4">Bio</h2>
                            <p className="lg:w-[86%] text-start text-highlight-blue">
                                Born in 2004 in India, I was introduced to
                                programming early in High School. Gradually
                                developing and discovering increasingly
                                complicated yet elegant solutions for different
                                problems, I realised that programming perfectly
                                encapsulated my love for problem-solving and my
                                constant desire to innovate and improve upon my
                                projects. <br />
                                Since then, I have been hooked on Software
                                Development, on a journey of steady improvement
                                and constant discovery.
                                <br />
                                And during this journey I have amassed an
                                extensive and thorough skillset covering fields
                                such as: <br />
                                <span className="font-semibold">
                                    Full-Stack Development, Machine Learning &
                                    Data Science, Database & Backend
                                    Technologies, Project Management and more...
                                </span>
                            </p>
                        </Section>
                        <Section id="Skills">
                            <h2 className="pl-2">Skills & Technologies</h2>
                            <Skills />
                        </Section>
                        <Section id="Projects">
                            <h2 className="pl-2">Projects</h2>
                            <Projects projects={projects} />
                        </Section>
                    </RightPane>
                </div>
                <Contacts className="lg:flex gap-4 hidden fixed bottom-[4%] left-[4%]" />
            </div>
        </ScrollContext.Provider>
    );
};

export default Main;
