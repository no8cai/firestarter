import React from "react"
import PledgeDetails from "../PledgeDetail"
import { useParams } from "react-router-dom"

const EditPledge=()=>{

    const { pledgeId,projectId } = useParams()

    return(
        <PledgeDetails type="Edit Pledge" pledgeId={pledgeId} projectId={projectId}/>
    )
}

export default EditPledge
