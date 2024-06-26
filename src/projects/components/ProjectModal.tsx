import { Backdrop, Button, Modal } from "@mui/material"
import ProjectData from "../../data/ProjectData"
import Badges from "../../data/badges.json"
import Dictionary from "../../data/Dictionary.tsx"

const ProjectModal = ({isOpen, handleClose, project, imgRoot}
    : {isOpen: boolean, handleClose: {(): void}, project: ProjectData, imgRoot: string}
) => {
    const {badges}: {badges: Dictionary} = Badges;
    return (
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    }
                }}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(5px)' }}
                > 
                        <div className="modal-body z-50 rounded-2xl bg-bg-dark border-2 border-highlight-blue overflow-auto w-[50%] h-[85%]">
                            <div className="modal-header flex flex-col items-center">
                                <div className="w-full px-3 h-[40%] pt-3 flex justify-center">
                                    <img className="h-[40%] max-h-[300px] rounded-lg" src={imgRoot + project.img} alt={`Project showcase image for ${project.title}`} />
                                </div>
                                <div className="flex flex-col items-center gap-2 pt-1">
                                    <h4 className="text-highlight-teal font-bold text-3xl">{project.title}</h4>
                                    <ul className="flex gap-2 justify-center">
                                        {
                                            project.badges.map((badge) => <li><img src={badges[badge]} alt="" /></li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-body flex pt-2 px-[5%]">
                                <p className="text-[1.1rem] text-highlight-blue text-justify">{project.description_long}</p>
                            </div>
                            {
                                project.source ? 
                                <div className="flex justify-center pt-5 gap-4">
                                    <Button variant="contained" href={project.source} target="_blank">
                                        View Source Code
                                    </Button>
                                    {
                                        project.demo ?
                                        <Button href={project.demo} target="_blank" variant="contained">
                                            Try project demo
                                        </Button>
                                        : ''
                                    }
                                </div>
                                : <p className="text-highlight-teal text-center pt-6">This project has a private repository. Contact me if you wish to view the project source.</p>
                            }
                        </div>
                    
            </Modal>
    )
}

export default ProjectModal