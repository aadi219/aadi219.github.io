import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { AnimatePresence, motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { RESUME_URL } from "../../data/constants";
import ExperienceData from "../../data/ExperienceData";

const Experience = ({
    experience,
    variants
}: {
    experience: ExperienceData;
    variants: any;
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setIsDesktop(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    return (
        <motion.div
            variants={variants}
            onMouseEnter={() => isDesktop && setExpanded(true)}
            onMouseLeave={() => isDesktop && setExpanded(false)}
            style={{
                background: "rgba(255,255,255,0.01)",
                borderRadius: "1rem",
                border: "1px solid var(--bg-med)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "0.8rem 0.75rem",
                marginBottom: "1.5rem"
            }}
        >
            <button
                type="button"
                onClick={() => !isDesktop && setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className={`w-full text-left ${isDesktop ? "cursor-default" : "cursor-pointer"}`}
            >
                <div className="flex justify-between items-baseline gap-2">
                    <h4 className="font-extrabold text-md lg:text-lg text-highlight-teal font-main">
                        {experience.role}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="font-main text-xs lg:text-sm text-highlight-blue whitespace-nowrap">
                            {experience.startDate} — {experience.endDate}
                        </span>
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex text-highlight-blue"
                        >
                            <ExpandMoreRoundedIcon fontSize="small" />
                        </motion.span>
                    </div>
                </div>
                <p className="font-main text-sm lg:text-md italic text-highlight-blue">
                    {experience.company}
                </p>
                {experience.description && (
                    <p className="font-main text-sm lg:text-md text-highlight-blue">
                        {experience.description}
                    </p>
                )}
            </button>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <ul className="list-disc list-outside pl-5 pt-2 flex flex-col gap-1">
                            {experience.details.map((point, idx) => (
                                <li
                                    key={idx}
                                    className="font-main text-sm lg:text-md text-highlight-blue"
                                >
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ExperienceList = ({ experience }: { experience: ExperienceData[] }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    const createVariants = (delay: number) => ({
        hidden: {
            opacity: 0,
            x: -150,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
                x: { duration: 0.6, delay },
                opacity: { duration: 1, delay },
                filter: { duration: 0.4, delay },
                ease: "easeOut"
            }
        }
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            className="flex flex-col mt-2 mb-4"
        >
            {experience.map((item, idx) => (
                <Experience
                    variants={createVariants(idx * 0.2)}
                    key={idx}
                    experience={item}
                />
            ))}
            <div className="lg:flex justify-start hidden">
                <a href={RESUME_URL} target="_blank" rel="noreferrer">
                    <div
                        id="experience-button"
                        className="w-fit gap-2 bg-bg-med transition-colors duration-300 rounded-md items-center py-2 px-4 flex justify-between"
                    >
                        <p>See the rest on my resume</p>
                        <ArrowOutwardRoundedIcon />
                    </div>
                </a>
            </div>
        </motion.div>
    );
};

export default ExperienceList;
