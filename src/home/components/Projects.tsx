import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link } from "react-router-dom";
import ProjectData from "../../data/ProjectData";

const Project = ({ project }: { project: ProjectData }) => {
    return (
        <div className="bg-col-dark border-2 border-bg-med rounded-md py-2 px-3 mb-3">
            <h4 className="font-extrabold text-lg text-highlight-teal font-main">
                {project.title}
            </h4>
            <p className="font-main text-highlight-blue">
                {project.description_short}
            </p>
        </div>
    );
};

const Projects = ({ projects }: { projects: ProjectData[] }) => {
    return (
        <div className="flex flex-col mt-2 mb-4">
            {projects.map((project, idx) => (
                <Project key={idx} project={project} />
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
        </div>
    );
};

export default Projects;
