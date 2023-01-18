import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProject,fetchUpdateProject,fetchDeleteProject } from "../../../store/project";
import './ProjectForm.css'

const ProjectForm=({project,formType})=>{

    let initTitle,initCategory,initCity,initState,initCountry,initImageUrl,initFundingGoal,initStartDate,initEndDate,initDescription,initRisks
    const history=useHistory()
    const dispatch = useDispatch();
 
    console.log(project.id)
    if(formType==="Edit Project"){
        initTitle=project.title;
        initCategory=project.category;
        initCity=project.city;
        initState=project.state;
        initCountry=project.country;
        initImageUrl=project.imageUrl;
        initFundingGoal=project.fundingGoal;
        initStartDate=project.startDate;
        initEndDate=project.endDate;
        initDescription=project.description;
        initRisks=project.risks;
    }
    else{
        initTitle='';
        initCategory='';
        initCity='';
        initState='';
        initCountry='';
        initImageUrl='';
        initFundingGoal=0;
        initStartDate='';
        initEndDate='';
        initDescription='';
        initRisks='';
    }


    const [title, setTitle] = useState(initTitle);
    const [category, setCategory] = useState(initCategory);
    const [city, setCity] = useState(initCity);
    const [state, setState] = useState(initState);
    const [country, setCountry] = useState(initCountry);
    const [imageUrl, setImageUrl] = useState(initImageUrl);
    const [fundingGoal, setFundingGoal] = useState(initFundingGoal);
    const [startDate, setStartDate] = useState(initStartDate);
    const [endDate, setEndDate] = useState(initEndDate);
    const [description, setDescription] = useState(initDescription);
    const [risks, setRisks] = useState(initRisks);

    const [validationErrors, setValidationErrors] = useState([]);


    useEffect(() => {
        if (!title&&!category&&!city&&!state&&!country&&!imageUrl&&!fundingGoal&&!startDate&&!endDate&&!description&&!risks) {
          setValidationErrors([]);
          return;
        }

        const errors =[];
        if(title.length<=0){errors.push("Project's title field is required");}
        else if(title.length>=50){errors.push("Project's title must be less than 50 characters")}
        if(category.length<=0){errors.push("Project's category field is required");}
        if(city.length<=0){errors.push("Project's city field is required");}
        if(state.length<=0){errors.push("Project's state field is required");}
        if(country.length<=0){errors.push("Project's country field is required");}
        if(imageUrl.length<=0){errors.push("Project's imageUrl field is required");}
        if(isNaN(fundingGoal)){errors.push("Project's funding goal must be a number");}
        else if(fundingGoal<=0){errors.push("Project's funding goal must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(fundingGoal))){errors.push("Project's funding goal must be within 2 decimal places");}
        if(startDate.length<=0){errors.push("Project's start date field is required");}
        if(endDate.length<=0){errors.push("Project's end date field is required");}
        if(description.length<=0){errors.push("Project's description field is required");}
        if(risks.length<=0){errors.push("Project's risk field is required");}

        setValidationErrors(errors);

      }, [title,category,city,state,country,imageUrl,fundingGoal,startDate,endDate,description,risks]);





    const handleSubmit = (e)=>{
        e.preventDefault();
        const tempProject = { ...project, title, category,city,state,country,imageUrl,fundingGoal,startDate,endDate,description,risks};
        const errors=[]

        if(formType==="Create Project"){
            dispatch(fetchCreateProject(tempProject))
            .then(()=>{history.push(`/profile`)})
            .catch(async (err)=>{
              const errobj=await err;
              errors.push(errobj.message)
              setValidationErrors(errors)

            });
            }
        else if(formType==="Edit Project"){
                dispatch(fetchUpdateProject(tempProject))
                .then(history.push('/profile'))
                .catch(async (err)=>{
                  const errobj=await err;
                  errors.push(errobj.message)
                  setValidationErrors(errors)
                  
                });
            }
    }

    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteProject(id))
        .then(history.push('/profile'))
        .catch(async (err)=>{
          const errobj=await err;
          errors.push(errobj.message)
          setValidationErrors(errors)
          
        });
        }

    return (
        <div className="projectfrom-container">
        <div>navbar</div>
        <div className='projectform-title'><h2>{formType}</h2></div>
        <form className='projectform-form' onSubmit={handleSubmit}>

            <div className='projectform-listitem'>

            <label>
             Title
             </label>
             <input
              className='input'
              placeholder='Aloe Bud:Self-care pocket companion for iOS'
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}/></div>

            <div className='projectform-listitem'>

            <label>
             Category
             </label>
             <input
              className='input'
              placeholder='Art Comics&illustration Design&Tech Film Food&Craft Games'
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}/></div>

             <div className='projectform-listitem'>
             <label>
             City
             </label>
             <input
              className='input'
              placeholder='Start typing your city'
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}/></div>

             <div className='projectform-listitem'>
             <label>
             State
             </label>
             <input
              className='input'
              placeholder='Start typing your state'
              type="text"
              name="state"
              onChange={(e) => setState(e.target.value)}
              value={state}/></div>

             <div className='projectform-listitem'>
             <label>
             Country
             </label>
             <input
              className='input'
              placeholder='Start typing your country'
              type="text"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}/></div>

             <div className='projectform-listitem'>
             <label>
             ImageUrl
             </label>
             <input
              className='input'
              placeholder='input imageUrl'
              type="text"
              name="ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}/></div>

             <div className='projectform-listitem'>
             <label>
             startDate
             </label>
             <input
              className='input'
              placeholder='type your startDate'
              type="text"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}/></div>

             <div className='projectform-listitem'>
             <label>
             endDate
             </label>
             <input
              className='input'
              placeholder='type your end date'
              type="text"
              name="endDate"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}/></div>

             <div className='projectform-listitem'>
             <label>
             Description
             </label>
             <textarea
              className='input'
              placeholder='Description here'
              type="text"
              name="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}/></div>

             <div className='projectform-listitem'>
             <label>
             Risks
             </label>
             <textarea
              className='input'
              placeholder='Risk here'
              type="text"
              name="city"
              onChange={(e) => setRisks(e.target.value)}
              value={risks}/></div>

             <div className='projectform-listitem'>
             <label>
             FundingGoal
             </label>
             <input
              className='input'
              placeholder='lets calculate funding goal'
              type="text"
              name="fundingGoal"
              onChange={(e) => setFundingGoal(e.target.value)}
              value={fundingGoal}/></div>

             <input type="submit" value={formType} className="projectbutton" disabled={!!validationErrors.length}/>

            </form>

            {formType==="Edit Project" &&(
                <button onClick={()=>deleteEvents(project.id)}>delete</button>
                )}
            <div className='projectform-errorsec'>
            <div className='error-title'>
            {/* <i className="fa-solid fa-circle-exclamation ertlbu" /> */}
            <h4>Validation Checking List</h4>
            </div>
            {!!validationErrors.length && (
            <div className='projectform-errortable'>
            <div className='projectform-error'>
             {validationErrors.map((error) => (
            <div key={error} className="spotform-errortext">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>

        </div>
    )
}


export default ProjectForm;
