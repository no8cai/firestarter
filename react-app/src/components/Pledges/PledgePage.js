import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllPledges, deletePledge, updatePledge } from '../../store/pledge';


const PledgeDetails = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPledges())
    }, [dispatch])

    let pledges = useSelector(state => state.pledges)
    console.log('00000000pledges0000000', pledges)
    let pledgesArr = Object.values(pledges)
    console.log('--------all the pledges---------', pledgesArr)
    if(!pledgesArr) return null

    return(
        <>
            <div className='pledge-outter-container'>
            {pledgesArr.map(pledge => {
                return (
                    <h1>{pledge.backerId}</h1>
                )
            })}



            </div>
        </>
    )
}
export default PledgeDetails
