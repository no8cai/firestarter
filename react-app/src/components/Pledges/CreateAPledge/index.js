import React from "react"
import PledgeDetails from "../PledgeDetail"
import { useParams } from "react-router-dom"

const CreateAPledge=()=>{

    const {projectId} = useParams()

    const pledgeId=0;

    return(

        <PledgeDetails type="Create Pledge" projectId={projectId} pledgeId={pledgeId}/>
    )
}

export default CreateAPledge
