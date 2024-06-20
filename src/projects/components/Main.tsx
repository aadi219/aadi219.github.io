import projectData from '../../../src/data/projects.json'
import ProjectCard from './ProjectCard';

const Main = () => {
    const { projects } = projectData;
    return (
        <div className='h-full px-2'>
            <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full gap-4 overflow-auto'>
                {projects.map((p, idx) => {
                    return <li key={idx}><ProjectCard project={p} /></li>
                })}
            </ul>
        </div>
    )
}

export default Main