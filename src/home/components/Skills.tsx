import { motion, useAnimation, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";

const skills = {
    languages: [
        {
            title: "Python",
            icon: <i className="devicon-python-plain-wordmark"></i>
        },
        {
            title: "Javascript",
            icon: <i className="devicon-javascript-plain"></i>
        },
        {
            title: "Typescript",
            icon: <i className="devicon-typescript-plain"></i>
        },
        {
            title: "Java",
            icon: <i className="devicon-java-plain-wordmark"></i>
        },
        {
            title: "C#",
            icon: <i className="devicon-csharp-plain-wordmark"></i>
        },
        {
            title: "PHP",
            icon: <i className="devicon-php-plain"></i>
        },
        {
            title: "Bash",
            icon: <i className="devicon-bash-plain"></i>
        }
    ],
    web: [
        {
            title: "NodeJs",
            icon: <i className="devicon-nodejs-plain-wordmark"></i>
        },
        {
            title: "Express",
            icon: <i className="devicon-express-original"></i>
        },
        {
            title: "React",
            icon: <i className="devicon-react-original-wordmark"></i>
        },
        {
            title: "Postgres",
            icon: <i className="devicon-postgresql-plain"></i>
        },
        {
            title: "MySQL",
            icon: <i className="devicon-mysql-plain-wordmark"></i>
        },
        {
            title: "MongoDB",
            icon: <i className="devicon-mongodb-plain-wordmark"></i>
        },
        {
            title: "Kafka",
            icon: (
                <i className="devicon-apachekafka-original-wordmark text-6xl"></i>
            )
        }
        // {
        //     title: "Azure",
        //     icon: <i className="devicon-azure-plain"></i>
        // },
        // {
        //     title: "Tailwind",
        //     icon: <i className="devicon-tailwindcss-original"></i>
        // }
    ],
    machineLearning: [
        {
            title: "PyTorch",
            icon: <i className="devicon-pytorch-original"></i>
        },
        {
            title: "Tensorflow",
            icon: <i className="devicon-tensorflow-original"></i>
        },
        {
            title: "SciKit-Learn",
            icon: <i className="devicon-scikitlearn-plain"></i>
        },
        {
            title: "OpenCV",
            icon: <i className="devicon-opencv-plain"></i>
        },
        {
            title: "MatplotLib",
            icon: <i className="devicon-matplotlib-plain"></i>
        }
    ],
    devops: [
        {
            title: "Git",
            icon: <i className="devicon-git-plain"></i>
        },
        {
            title: "Docker",
            icon: <i className="devicon-docker-plain"></i>
        },
        {
            title: "Jenkins",
            icon: <i className="devicon-jenkins-plain"></i>
        }
    ]
};

const Skills = () => {
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
        <div ref={ref} id="skills">
            <Skill
                title="Languages"
                items={skills.languages}
                controls={controls}
                variants={createVariants(0)}
            />
            <Skill
                title="Web Technologies"
                items={skills.web}
                controls={controls}
                variants={createVariants(0.2)}
            />
            <Skill
                title="Machine Learning & Data Analysis"
                items={skills.machineLearning}
                controls={controls}
                variants={createVariants(0.4)}
            />
            <Skill
                title="DevOps"
                items={skills.devops}
                controls={controls}
                variants={createVariants(0.6)}
            />
        </div>
    );
};

interface SkillProps {
    title: string;
    items: Array<{
        title: string;
        icon: JSX.Element;
    }>;
    controls: any;
    variants: any;
}

const Skill = ({ title, items, controls, variants }: SkillProps) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setIsOverflowing(container.scrollWidth > container.clientWidth);
        }
    }, [items]);

    return (
        <motion.div 
        initial="hidden" 
        animate={controls}
        variants={variants}
        style={{
            background: "rgba(255,255,255,0.01)",
            borderRadius: "1rem",
            border: "1px solid #0d90bb",
            boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(8px)",
            paddingTop: "0.8rem",
            marginBottom: "1.5rem"
        }}
        >
            <p className="text-lg text-highlight-teal font-bold font-heading mb-1">{title}</p>
            <div
                ref={containerRef}
                className={`overflow-x-auto hide-scroll ${isOverflowing ? "scrolling-touch" : ""}`}
                style={{ whiteSpace: isOverflowing ? "nowrap" : "normal" }}
            >
                <ul className="flex space-x-4 md:space-x-6">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-highlight-blue skill-icon">
                            {item.icon}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default Skills;
