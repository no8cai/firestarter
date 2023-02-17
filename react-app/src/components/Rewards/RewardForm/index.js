import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReward, fetchUpdateReward, fetchDeleteReward } from "../../../store/reward";
import { fetchOneProject } from "../../../store/project";
import './RewardForm.css'

////MEEEEEEEEEEEE

const RewardForm=({reward,formType,projectId})=>{
  //import associated project by project id, which I have
  //view the project end date
  //check the project id date is earlier than the start date of the estimated delivery

    let initDescription,initEstimatedDelivery,initPrice,initTitle
    const history=useHistory()
    const dispatch = useDispatch();

    const findProjectTest = async () => {
      const returnProject = await dispatch(fetchOneProject(projectId))
    }

    useEffect(() => {
      findProjectTest()
   }, [dispatch])

    const oneProject = useSelector(state => {return state.projects[projectId]})

    if (oneProject) {
      // console.log('what is one project', oneProject.endDate)


    }



    if(formType==="Edit Reward"){
        initDescription=reward.description;
        initEstimatedDelivery=reward.estimatedDelivery;
        initPrice = reward.price;
        initTitle=reward.title;
    }
    else{
        initDescription='';
        initEstimatedDelivery="2023-10-01";
        initPrice=0;
        initTitle='';
    }

    const [description, setDescription] = useState(initDescription);
    const [estimatedDelivery, setEstimatedDelivery] = useState(initEstimatedDelivery);
    const [price, setPrice] = useState(initPrice);
    const [title, setTitle] = useState(initTitle);


    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        if (!title&&!estimatedDelivery&&!price&&!description) {
          setValidationErrors([]);
          return;
        }

        const errors =[];
        if(title.length<=0){errors.push("reward's title field is required");}
        else if(title.length>=50){errors.push("reward's title must be less than 50 characters")}
        if(description.length<=0){errors.push("reward's description field is required");}
        else if(description.length>=200){errors.push("reward's description must be less than 200 characters")}
        if(isNaN(price)){errors.push("reward's price must be a number");}
        else if(price<=0){errors.push("reward's price must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(price))){errors.push("reward's price must be within 2 decimal places");}
        if(estimatedDelivery.length<=0){errors.push("reward's estimated delivery is required");}
        else if(estimatedDelivery.length>=50){errors.push("reward's estimated delivery must be less than 50 characters")}
        if(oneProject && oneProject.endDate && oneProject.endDate > estimatedDelivery ) {errors.push(`
        Your current estimated delivery date in this form is ${estimatedDelivery} and it needs to be updated to be after the associated project's campaign end date of ${oneProject.endDate}.`)}
        if(formType=="Edit Reward" && price > initPrice){errors.push(`Once a reward is active on the site,
        the creator of the project cannot change the price of the reward to be greater than it's original price, which was ${initPrice}`)}

        setValidationErrors(errors);

      }, [title,description,price,estimatedDelivery]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const tempReward = { ...reward, title, description, price, estimatedDelivery};
        const errors=[]

        if(formType==="Create Reward"){
            // console.log('fetch, project', tempReward, projectId)
            dispatch(fetchCreateReward(tempReward, projectId))
            .then(()=>{history.push(`/profile`)})
            .catch(async (err)=>{
              const errobj=await err.json();
              errors.push(errobj.message)
              setValidationErrors(errors)
            });
            }
        else if(formType==="Edit Reward"){
                dispatch(fetchUpdateReward(tempReward))
                .then(history.push('/profile'))
                .catch(async (err)=>{
                  const errobj=await err.json();
                  errors.push(errobj.message)
                  setValidationErrors(errors)
                });
            }
    }

    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteReward(id))
        .then(history.push('/profile'))
        .catch(async (err)=>{
          const errobj=await err;
          errors.push(errobj.message)
          setValidationErrors(errors)

        });
        }

    return (
      // <div className="reward-main-container">

        <div className="reward-form-container">
        <div className="reward-form-title-sec">
        {/* <div className='projectform-title1'>{formType}</div> */}
        <div className='reward-form-title2'>Start with the basics</div>
        <div className="reward-form-title3">Make it easy for people to learn about your reward</div>
        </div>
        <div className='reward-form-title'><h2>{formType}</h2></div>
        <form className='reward-form-form' onSubmit={handleSubmit}>
{/* // */}
            <div className='reward-form-list-item'>
                <div className="title-context context">
              <div className="reward-form-subtitle">Reward Title</div>
              <div className="reward-form-subtext">Write a clear, brief title and subtitle to help people quickly understand your reward. Both will appear on your project's reward page.</div>
            </div>
                <div>
                <label>
                Title
                </label>
                <input
                className='input'
                placeholder='Aloe Bud:Self-care pocket companion for iOS'
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}/>
                </div>
            </div>
{/* // */}
            <div className='reward-form-list-item'>
            <div className="title-context context">
              <div className="reward-form-subtitle">Estimated Delivery Date</div>
              <div className="reward-form-subtext">For packages being mailed to your backers, please enter an estimated delivery date. You can update this as needed.
              This needs to be after the end date of your funding campaign. </div>
            </div>
                <div>
                <label>
                Estimated Delivery
                </label>
                <input
                name='Estimated Delivery'
                type="date"
                id="start"
                min="2023-01-01"
                onChange={(e) => setEstimatedDelivery(e.target.value)}
                value={estimatedDelivery}/>
                </div>
            </div>
{/* // */}
            <div className='reward-form-list-item'>
            <div className="title-context context">
              <div className="reward-form-subtitle">Detailed Description</div>
              <div className="reward-form-subtext">Please describe the reward in detail including all items included in the reward.</div>
            </div>
                <div>
                <label>
                Description
                </label>
                <textarea
                // className='input'
                className='reward-form-textarea'
                placeholder='Description here'
                type="text"
                name="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}/>
                </div>
            </div>
{/* // */}
            <div className='reward-form-list-item'>
            <div className="title-context context">
              <div className="reward-form-subtitle">Price</div>
              <div className="reward-form-subtext">This is the amount of money your backers will be funding you in expectation of receiving the reward listed above you are committing to send them.</div>
            </div>
            <div>
                <label>
                Price
                </label>
                <input
                className='input'
                placeholder='price'
                type="number"
                name="price"
                min='1'
                onChange={(e) => setPrice(e.target.value)}
                value={price}/>
                </div>
            </div>
            <div className='reward-form-error-sec'>
            <div className='error-title'>
            <h4>Validation Checking List</h4>
            </div>
            {!!validationErrors.length && (
            <div className='reward-form-error-table'>
            <div className='reward-form-error'>
             {validationErrors.map((error) => (
            <div key={error} className="reward-form-error-text">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>
{/* // */}
            <div className="reward-form-button">
             <input type="submit" value={formType} className="reward-button" disabled={!!validationErrors.length}/>
             </div>
            </form>
            {formType==="Edit Reward" &&(
                <div className="projectform-button">
              <button onClick={()=>deleteEvents(reward.id)} className="reward-form-delete-button">Delete Reward</button>
              </div>
                )}




        </div>
        // </div>
    )
}


export default RewardForm;
