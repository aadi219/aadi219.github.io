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
    const paneRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToIndex = (index: number) => {
        const section = sectionRefs.current[index];
        const pane = paneRef.current;
        if (section && pane) {
            pane.scrollTo({ top: section.offsetTop, behavior: "smooth" });
        }
    };

    useEffect(() => {
        setScrollToIndex(() => scrollToIndex);
    }, [setScrollToIndex]);

    return (
        <div
            ref={paneRef}
            id="rightPane"
            className="relative w-full h-full lg:pr-10 overflow-y-auto hide-scroll"
        >
            {children.map((child, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        sectionRefs.current[index] = el;
                    }}
                    className="text-start"
                >
                    {child}
                </div>
            ))}
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
            <div className="relative w-full h-full overflow-hidden">
                {/* Background layer */}
                <div className="absolute overflow-hidden inset-0 z-0">
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
                            <h2 className="lg:pt-4">Bio</h2>
                            <p className="lg:w-[86%] text-start text-[0.9em] sm:text-[1em] text-highlight-blue">
                                I am a Software Engineer passionate about Machine Learning & Data Science.
                                With a strong foundation in a variety of development stacks and design paradigms,
                                I specialize in desigining and developing scalable, high-performance applications.
                                <br className="mb-3" />
								Currently, I'm working as a <b className="text-highlight-teal">Software Developer</b> at Antek Logistics, contributing to the
								development of Automation Workflows to streamline daily operations, replacing manual processes with efficient, event-driven systems.
                                <br className="mb-3" />
                                I'm also working as a <b className="text-highlight-teal">Research Assistant</b>, under the Office of Research & Innovation
                                at George Brown College, researching the industry applications of Deep Learning in
                                Computer Vision and contributing to the design and development of a robust AI-powered system that will
                                enhance Quality Assurance and improve efficiency in the manufacturing pipeline.
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
                <Contacts className="lg:flex gap-4 z-10 hidden fixed bottom-[4%] left-[4%]" />
            </div>
        </ScrollContext.Provider>
    );
};

export default Main;
