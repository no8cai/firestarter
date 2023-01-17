import { useParams } from "react-router-dom";
import ProjectForm from "../ProjectForm";
import { useSelector } from "react-redux";

const EditProject=()=>{

    const {projectId}=useParams();

    const tempproject = useSelector(state=>state.projects)
    
    const project={
    //     // creatorId:tempproject.creatorId,
    //     category:tempproject.category,
    //     city:tempproject.city,
    //     state:tempproject.state,
    //     country:tempproject.country,
    //     title:tempproject.title,
    //     imageUrl:tempproject.imageUrl,
    //     videoUrl:tempproject.videoUrl,
    //     fundingGoal:tempproject.fundingGoal,
    //     startDate:tempproject.startDate,
    //     endDate:tempproject.endDate,
    //     description:tempproject.description,
    //     risks:tempproject.risks,
    }

    return (
        <ProjectForm project={project} formType="Edit Project"/>
    )
}

export default EditProject