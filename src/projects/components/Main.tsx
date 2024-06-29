import React from 'react';
import projectData from '../../../src/data/projects.json'
import ProjectCard from './ProjectCard';

const Main = () => {
    const { projects } = projectData;

    const focusElement = (e:React.UIEvent) => {
        const selected = (e.target as HTMLElement);
        console.log((e.target as Element).id);
        let projectList = document.getElementById('projects');
        if (projectList) {
            for (let i = 0; i < projectList.children.length; i++) {
                if (i === parseInt(selected.id)){
                    continue;
                }
                (projectList.children[i] as HTMLElement).style.opacity = "30%";
            }
        }
    }
    const unfocusElement = (e:React.UIEvent) => {
        let projectList = document.getElementById('projects');
        if (projectList) {
            for (let project of projectList.children) {
                (project as HTMLElement).style.opacity = "100%";
            }
        }
    }

    return (
        <div className={`h-full px-2 relative`}>
                <ul id='projects' className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4 overflow-auto hide-scroll-complete`}>
                    {projects.map((p, idx) => {
                        return <li id={`${idx}`} onMouseEnter={focusElement} onMouseOut={unfocusElement}  className="projectCard" key={idx}><ProjectCard project={p} /></li>
                    })}
                </ul>
            </div>
    )
}

export default Main