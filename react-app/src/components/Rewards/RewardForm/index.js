import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateReward, fetchUpdateReward } from "../../../store/reward";
import './RewardForm.css'

////MEEEEEEEEEEEE

const RewardForm=({reward,formType,projectId})=>{

    let initDescription,initEstimatedDelivery,initPrice,initTitle
    const history=useHistory()
    const dispatch = useDispatch();

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
        else if(description.length>=200){errors.push("reward's title must be less than 200 characters")}
        if(isNaN(price)){errors.push("reward's price must be a number");}
        else if(price<=0){errors.push("reward's price must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(price))){errors.push("reward's price must be within 2 decimal places");}
        if(estimatedDelivery.length<=0){errors.push("reward's estimated delivery is required");}
        else if(estimatedDelivery.length>=50){errors.push("reward's estimated delivery must be less than 50 characters")}

        setValidationErrors(errors);

      }, [title,description,price,estimatedDelivery]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const tempReward = { ...reward, title, description, price, estimatedDelivery};
        const errors=[]

        if(formType==="Create Reward"){
            console.log('fetch, project', tempReward, projectId)
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

    return (
        <div className="reward-form-container">
        <div>navbar</div>
        <div className='reward-form-title'><h2>{formType}</h2></div>
        <form className='reward-form-form' onSubmit={handleSubmit}>

            <div className='reward-form-list-item'>

                <label>
                Title
                </label>
                <input
                className='input'
                placeholder='Aloe Bud:Self-care pocket companion for iOS'
                type="text"
                name="title"
                // minLength={1} //not working
                // maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                value={title}/>
            </div>

            <div className='reward-form-list-item'>
                <label>
                Estimated Delivery
                </label>
                <input
                name='Estimated Delivery'
                type="date"
                id="start"
                min="2023-02"
                onChange={(e) => setEstimatedDelivery(e.target.value)}
                value={estimatedDelivery}/>
            </div>

            <div className='reward-form-list-item'>
                <label>
                Description
                </label>
                <textarea
                className='input'
                placeholder='Description here'
                type="text"
                name="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}/>
            </div>

            <div className='reward-form-list-item'>
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

             <input type="submit" value={formType} className="reward-button" disabled={!!validationErrors.length}/>
            </form>


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

        </div>
    )
}


export default RewardForm;
