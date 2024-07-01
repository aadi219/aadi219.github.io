import { Card } from "@mui/joy"
import { Button } from "@mui/material";
import ProjectData from "../../data/ProjectData"
import { useState } from "react";
import ProjectModal from "./ProjectModal";

const imgRoot : string = "/assets/img/projects/";

const Tag = ({name}:{name: string}) => {
    return (
        <button className="font-main bg-transparent border border-highlight-teal transition-colors duration-[400ms] text-highlight-blue hover:bg-bg-med hover:text-white font-bold py-2 px-4 rounded-full text-sm">
           {name}
        </button>
    )
}

const ProjectCard = ({project}: {project: ProjectData}) => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="">
            <Card 
            sx={{
                height: 400,
                backgroundColor: 'var(--col-dark)',
                padding: '0',
                overflow: "hidden",
                borderColor: 'var(--bg-med)',
                // border: 'solid 2px var(--bg-med)'
            }}
            > 
                <div>
                    <div className="flex justify-center border-b-2">
                        {project.img ?
                        <img src={imgRoot + project.img} className="h-[230px]" /> : '' }
                        
                    </div>
                    <p className="text-3xl py-3 text-highlight-teal font-semibold font-heading">{project.title}</p>
                    <ul className="flex flex-wrap justify-center gap-1">
                        {project.tags.map(tag => <li><Tag name={tag} /></li>)}
                    </ul>    
                </div>
                <div>
                    <Button variant="contained" onClick={handleOpen}
                    sx={{
                        fontFamily: "Outfit"
                    }}>
                        View Details
                    </Button>
                </div>
            </Card>
            <ProjectModal isOpen={open} handleClose={handleClose} project={project} imgRoot={imgRoot} />
        </div>
  )
}

export default ProjectCard