import React from "react"
import PledgeDetails2 from "../PledgeDetail/PledgeDetail2"
import { useParams } from "react-router-dom"

const CreateAPledge=()=>{

    const {projectId} = useParams()

    const pledgeId=0;

    return(

        <PledgeDetails2 type="Create Pledge" projectId={projectId} pledgeId={pledgeId}/>
    )
}

export default CreateAPledge
