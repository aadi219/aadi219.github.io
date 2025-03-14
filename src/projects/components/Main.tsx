import projectData from "../../../src/data/projects.json";
import ProjectCard from "./ProjectCard";

const Main = () => {
    const { projects } = projectData;

    return (
        <div className={`h-full w-full px-2 relative`}>
            <ul
                id="projects"
                className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4 overflow-auto hide-scroll-complete`}
            >
                {projects.map((p, idx) => {
                    return (
                        <li id={`${idx}`} className="projectCard" key={idx}>
                            <ProjectCard project={p} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Main;
