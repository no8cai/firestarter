import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react'
import { getAllPledges, getOnePledge, getAllPledgesByProjectId, createPledge, updatePledge, deletePledge } from '../store/pledge';

const Testing = () => {
    const dispatch = useDispatch()
    const findPledgesTest = async () => {
    //PL1
    const return1 = await dispatch(getAllPledges())
    //PL2
    const return2 = await dispatch()
    //PL3
    const return3 = await dispatch()
    //PL4
    const return4 = await dispatch(getOnePledge(1))
    //PL5
    const return5 = await dispatch(createPledge(pledge))
    //PL6
    const return6 = await dispatch(updatePledge(pledge))
    //PL7
    const return7 = await dispatch(updatePledge(pledgeId))
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
