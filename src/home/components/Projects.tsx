import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProjectData from "../../data/ProjectData";

const Project = ({
    project,
    variants
}: {
    project: ProjectData;
    variants: any;
}) => {
    return (
        <motion.div
            variants={variants}
            className="bg-col-dark border-2 border-bg-med rounded-md py-2 px-3 mb-3"
        >
            <h4 className="font-extrabold text-lg text-highlight-teal font-main">
                {project.title}
            </h4>
            <p className="font-main text-highlight-blue">
                {project.description_short}
            </p>
        </motion.div>
    );
};

const Projects = ({ projects }: { projects: ProjectData[] }) => {
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
            {projects.map((project, idx) => (
                <Project
                    variants={createVariants(idx * 0.2)}
                    key={idx}
                    project={project}
                />
            ))}
            <div className="flex justify-start">
                <Link to="/projects">
                    <div
                        id="projects-button"
                        className="w-fit gap-2 bg-bg-med transition-colors duration-300 rounded-md items-center py-2 px-4 flex justify-between"
                    >
                        <p>See the rest of my projects</p>
                        <ArrowOutwardRoundedIcon />
                    </div>
                </Link>
            </div>
        </motion.div>
    );
};

export default Projects;
