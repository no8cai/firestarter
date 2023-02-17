import { useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react'
import { getAllPledges, getOnePledge, getAllPledgesByProjectId, getPledgesByCurrentUser,  createPledge, updatePledge, deletePledge } from '../store/pledge';

const Testing = () => {
    const dispatch = useDispatch()
    const findPledgesTest = async () => {
    //PL1 - DONE
    const return1 = await dispatch(getAllPledges())
    //PL2 - current user -
    // const return2 = await dispatch(getPledgesByCurrentUser())
    // //PL3 - project id - done
    // const return3 = await dispatch(getAllPledgesByProjectId(1))
    //PL4 - DONE
    // const return4 = await dispatch(getOnePledge(3))
    //PL5
    // const return5 = await dispatch(createPledge(pledge))
    // //PL6
    // const return6 = await dispatch(updatePledge(pledge))
    // //PL7
    // const return7 = await dispatch(updatePledge(pledgeId))
    }

    useEffect(() => {
        findPledgesTest()
    }, [dispatch])

    return (
        <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div>'hi'</div>

        </div>

    )
}

export default Testing
