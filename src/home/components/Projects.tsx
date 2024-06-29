import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Button } from '@mui/material';
import ProjectData from '../../data/ProjectData';
import { Link } from 'react-router-dom';


const Project = ({project}: {project: ProjectData}) => {
    return (
        <div className='bg-col-dark border-2 border-bg-med rounded-md p-3 mb-3'>
            <h4 className='font-bold text-lg text-highlight-teal'>{project.title}</h4>
            <p className='text-highlight-blue'>{project.description_short}</p>
        </div>
    )
}


const Projects = ({projects} : {projects: ProjectData[]}) => {
  return (
    <div className='flex flex-col mt-2 mb-6'>
        {projects.map((project) => <Project project={project} />)}
        <div className='flex justify-end'>
            <Link to="/projects" className='w-[100%]'>
                <Button 
                    id="projects-button" className='w-[50%] rounded-full align-middle' variant='contained' href='/projects' sx={{bgcolor: '#4AFEBD'}}>
                    <p className='text-col-dark transition-colors duration-200'>See the rest of my projects <ArrowOutwardIcon/></p>
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Projects