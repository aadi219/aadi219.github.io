import { Card } from "@mui/joy"
import { Button } from "@mui/material";
import ProjectData from "../../data/ProjectData"

const imgRoot : string = "/assets/img/projects/";

const Tag = ({name}:{name: string}) => {
    return (
        <button className="bg-transparent border border-highlight-teal transition-colors duration-[400ms] text-highlight-blue hover:bg-highlight-blue hover:text-white font-bold py-2 px-4 rounded-full text-sm">
           {name}
        </button>
    )
}

const ProjectCard = ({project}: {project: ProjectData}) => {
    // const description = project.description_long;
    return (
        <div className="">
            <Card 
            sx={{
                height: 400,
                backgroundColor: 'var(--col-dark)',
                padding: '0',
                overflow: "hidden"
            }}
            > 
                <div>
                    <div className="flex justify-center border-b-2">
                        {project.img ?
                        <img src={imgRoot + project.img} className="h-[230px]" /> : '' }
                        
                    </div>
                    <p className="text-3xl py-3 text-highlight-teal font-semibold">{project.title}</p>
                    <ul className="flex flex-wrap justify-center gap-1">
                        {project.tags.map(tag => <li><Tag name={tag} /></li>)}
                    </ul>    
                </div>
                <div>
                    <Button variant="contained">
                        View Details
                    </Button>
                </div>
            </Card>
        </div>
  )
}

export default ProjectCard