import { motion, useAnimate, useAnimation, useInView } from "motion/react";
import { i } from "motion/react-client";
import { useEffect, useRef } from "react";

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
            icon: <i className="devicon-apachekafka-original-wordmark text-6xl"></i>
        },
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
    },  [controls, isInView]);

    const createVariants = (delay: Number) => ({
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
                opacity: {duration: 1, delay },
                filter: { duration: 0.4, delay },
                ease: "easeOut"
        }}
    });

    return (
        <div ref={ref} id="skills">
            <Skill 
                title="Some of my frequently used languages are"
                items={skills.languages}
                controls={controls}
                variants={createVariants(0)}
            />
            <Skill 
                title="I am also proficient in the following web technologies"
                items={skills.web}
                controls={controls}
                variants={createVariants(0.2)}
            />
            <Skill 
                title="My projects in Machine Learning and Data Analysis make use of the following"
                items={skills.machineLearning}
                controls={controls}
                variants={createVariants(0.4)}
            />
            <Skill 
                title="Additionally, many of my projects utilize the following DevOps technologies"
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
    return (
        <motion.div initial="hidden" animate={controls} variants={variants}>
            <p className="text-md mb-1">{title}</p>
            <ul>
                {items.map((item, idx) => (
                    <li key={idx} className="text-highlight-blue skill-icon">
                        {item.icon}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default Skills;
