import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchCreateProject,fetchUpdateProject,fetchDeleteProject } from "../../../store/project";
import './ProjectForm.css'

const ProjectForm=({project,formType})=>{

    let initTitle,initCategory,initCity,initState,initCountry,initImageUrl,initFundingGoal,initStartDate,initEndDate,initDescription,initRisks
    const history=useHistory()
    const dispatch = useDispatch();
    const todayDate = new Date()
    const todayDateStr = todayDate.toJSON().slice(0,10)

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
        initCategory='Art';
        initCity='';
        initState='Alabama';
        initCountry='USA';
        initImageUrl='https://zacjohnson.com/wp-content/uploads/2020/03/2020-03-30_15-46-11-768x363.png';
        initFundingGoal=0;
        initStartDate=todayDateStr;
        initEndDate=todayDateStr;
        initDescription='';
        initRisks='';
    }
    const allStates =
    ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
    "D. C.","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
    "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri",
    "Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota",
    ,"Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina",
    "South Dakota","Tennessee","Texas", "U.S. Territories","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming", "International"]

    const allCategories = [ 'Art', 'Comics & Illustration',  'Design & Tech',  'Film',  'Food & Craft',  'Games']


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
        else if(title.length>=255){errors.push("Project's title must be less than 255 characters")}
        if(category.length<=0){errors.push("Project's category field is required");}
        else if(category.length>=255){errors.push("Project's category must be less than 255 characters")}
        if(city.length<=0){errors.push("Project's city field is required");}
        else if(city.length>=255){errors.push("Project's city must be less than 255 characters")}
        if(state.length<=0){errors.push("Project's state field is required");}
        else if(state.length>=255){errors.push("Project's state must be less than 255 characters")}
        if(country.length<=0){errors.push("Project's country field is required");}
        else if(country.length>=255){errors.push("Project's country must be less than 255 characters")}
        if(imageUrl.length<=0){errors.push("Project's image link field is required");}
        else if (!imageUrl.includes("http")){errors.push("Project's image link must be a valid website link");}
        if(isNaN(fundingGoal)){errors.push("Project's funding goal must be a real number");}
        else if(fundingGoal<=0){errors.push("Project's funding goal must be greater than 0");}
        else if(!(/^\d+(\.\d{1,2})?$/.test(fundingGoal))){errors.push("Project's funding goal must be within 2 decimal places");}
        if(startDate.length<=0){errors.push("Project's start date field is required");}
        if(todayDate - (new Date(startDate)) > 0) {errors.push(`The start date of your project needs to be after tomorrow's date. If you are editing a project you will need to update the start date and end date`)}
        //can't do the validation below because there is also validation on the backend for start date can't be before current date
      //  if(formType=="Edit Project" && startDate !== initStartDate && todayDate - (new Date(startDate)) > 0) {errors.push(`The start date of your project needs to be after tomorrow's date. If you are editing a project and your start date was in the past that can stay the same`)}
        else if(endDate.length<=0){errors.push("Project's end date field is required");}
        else if(endDate<=startDate){errors.push("Project's end date field need to be after start date");}
        if(description.length<=0){errors.push("Project's description field is required");}
        else if(description.length>=4000){errors.push("Project's description must be less than 4000 characters")}
        if(risks.length<=0){errors.push("Project's risk field is required");}
        else if(risks.length>=4000){errors.push("Project's risk must be less than 4000 characters")}

        setValidationErrors(errors);

      }, [title,category,city,state,country,imageUrl,fundingGoal,startDate,endDate,description,risks]);



    const handleSubmit = async (e)=>{
        e.preventDefault();
        const tempProject = { ...project, title, category,city,state,country,imageUrl,fundingGoal,startDate,endDate,description,risks};
        const errors=[]

        if(formType==="Create Project"){
               dispatch(fetchCreateProject(tempProject))
               .then(()=>{history.push(`/profile`)})
               .catch(async (err)=>{
                const errobj=await err.json();
                errors.push(errobj.message)
                setValidationErrors(errors)
            });
            }
        else if(formType==="Edit Project"){
                dispatch(fetchUpdateProject(tempProject))
                .then(()=>history.push('/profile'))
                .catch(async (err)=>{
                  const errobj=await err.json();
                  errors.push(errobj.message)
                  setValidationErrors(errors)

                });
            }
    }

    const deleteEvents= (id)=>{
        const errors=[]
        dispatch(fetchDeleteProject(id))
        .then(()=>history.push('/profile'))
        .catch(async (err)=>{
          const errobj=await err.json();
          errors.push(errobj.message)
          setValidationErrors(errors)
        });
        }

    return (
        <div className="projectfrom-container">
        <div className="projectform-titlesec">
        <div className='projectform-title2'>Start with the basics</div>
        <div className="projectform-title3">Make it easy for people to learn about your project</div>
        <div className='reward-form-title'><h2>{formType}</h2></div>
        </div>
        <form className='projectform-form' onSubmit={handleSubmit}>

            <div className='projectform-listitem'>
            <div className="title-context context">
              <div className="projectform-subtitle">Project title</div>
              <div className="projectform-subtext">Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on your project and pre-launch pages.</div>
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
              value={title}/></div>
              </div>

            <div className='projectform-listitem'>
            <div className="context">
              <div className="projectform-subtitle">Project category</div>
              <div className="projectform-subtext">Choose a category to help backers find your project.You can change these anytime before and during your campaign.</div>
            </div>
            <div>
            <label>
             Category
             </label>
                        <select
                        placeholder='Category'
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        >
                            {allCategories.map(category => (
                                <option key={category} value={category}> {category}</option>
                            ))}
                        </select>
              </div>
              </div>

             <div className="projectform-listitem">
              <div className="context">
                <div className="projectform-subtitle">Project location</div>
                <div className="projectform-subtext">Enter the location that best describes where your project is based.</div>
              </div>
            <div>

             <div className='projectform-locationlist'>
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

             <div className='projectform-locationlist'>
             <label>
             State
             </label>
             <select
                        placeholder='State'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        >
                            {allStates.map(state => (
                                <option key={state} value={state}> {state}</option>
                            ))}
                        </select>
              </div>

             {/* <div className='projectform-locationlist'>
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
               */}
              </div>
             </div>

             <div className='projectform-listitem' >
              <div className="context">
                <div className="projectform-subtitle">Project image</div>
                <div className="projectform-subtext">Add an image that clearly represents your project. Choose one that looks good at different sizes—it'll appear on your project page, across the Fire Starter website and mobile apps, and (when shared) on social channels. A suggested image url is included for you, but you can add any image url you chose.</div>
              </div>
             <div >
             <label>
             Image Url
             </label>
             <input
              className='input'
              placeholder='input imageUrl'
              type="text"
              name="ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}/></div>
              </div>

             <div className='projectform-listitem'>
             <div className="context">
              <div className="projectform-subtitle">Target launch date</div>
              <div className="projectform-subtext">We'll provide you with recommendations on when to complete steps that may take a few days to process. You can edit this date later but has to change the start date if the start date is in the past, which must always be done manually.</div>
             </div>
             <div>
             <label>
             Start date
             </label>
             <input
              className='input'
              placeholder='type your startDate'
              type="date"
              name="startDate"
              min={todayDateStr}
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}/></div>
              </div>

             <div className='projectform-listitem'>
              <div className="context">
                <div className="projectform-subtitle">Campaign end date</div>
                <div className="projectform-subtext">Set a time limit for your campaign. You will be able to change this after you launch.</div>
              </div>
             <div >
             <label>
             End date
             </label>
             <input
              className='input'
              placeholder='type your end date'
              type="date"
              name="endDate"
              min={todayDateStr}
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}/></div>
              </div>

             <div className='projectform-listitem'>
              <div className="context">
                <div className="projectform-subtitle">Project description</div>
                <div className="projectform-subtext">Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are. Your description should tell backers everything they need to know. If possible, include images to show them what your project is all about and what rewards look like</div>
              </div>
             <div>
             <label>
             Description
             </label>
             <textarea
              className='projectform-textarea'
              placeholder='Write about your project like you`re explaining it to a friend...'
              type="text"
              name="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}/></div>
              </div>

             <div className='projectform-listitem'>
              <div className="context">
                <div className="projectform-subtitle">Risks and challenges</div>
                <div className="projectform-subtext">Be honest about the potential risks and challenges of this project and how you plan to overcome them to complete it.</div>
              </div>
             <div>
             <label>
             Risks and challenges
             </label>
             <textarea
              className='projectform-textarea'
              placeholder='Common risks and challenges you may want to address include budgeting, timelines for rewards and the project itself, the size of your audience...'
              type="text"
              name="city"
              onChange={(e) => setRisks(e.target.value)}
              value={risks}/></div>
              </div>

             <div className='projectform-listitem'>
              <div className="context">
                <div className="projectform-subtitle">Funding goal</div>
                <div className="projectform-subtext">Set an achievable goal that covers what you need to complete your project.Funding is all-or-nothing. If you don’t meet your goal, you won’t receive any money.</div>
              </div>
             <div>
             <label>
             Funding Goal
             </label>
             <input
              className='input'
              placeholder='lets calculate funding goal'
              type="text"
              name="fundingGoal"
              onChange={(e) => setFundingGoal(e.target.value)}
              value={fundingGoal}/></div>
             </div>
             <div className="projectform-button">
             <input type="submit" value={formType} className="projectbutton" disabled={!!validationErrors.length}/>
             </div>
            </form>
            {formType==="Edit Project" &&(
              <div className="projectform-button">
              <button onClick={()=>deleteEvents(project.id)} className="projectform-delebutton">Delete project</button>
              </div>
                )}
            <div className='projectform-errorsec'>
            <div className='error-title'>
            <i className="fa-solid fa-circle-exclamation ertlbu" />
            <h4 className="projectform-errtitletext">Validation Checking List</h4>
            </div>
            {!!validationErrors.length && (
            <div className='projectform-errortable'>
            <div className='projectform-error'>
             {validationErrors.map((error) => (
            <div key={error} className="projectform-errortext">{error}</div>
                       ))}
            </div>
            </div>
             )}
            </div>

        </div>
    )
}


export default ProjectForm;
