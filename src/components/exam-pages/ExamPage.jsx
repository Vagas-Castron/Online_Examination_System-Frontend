import React, {createContext} from "react"
import { useLoaderData, useNavigate, redirect, Form } from "react-router-dom"
import Information from "../Information"
import examination from "../../assets/examination.json"
import Timer from "../Timer"
import Header from "../Header"
import Question from "../Question"
import { examSubmit, isAuthenticated } from "../../utils"
import { retrieveData } from '../../utils'

export async function loader() {
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        // 'Content-Type': 'application/json'
    }
    const response = await fetch('http://localhost:8000/api/exam/14',
       {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json()
    return data
}


function ExamOption({ questionId, optionId, removeOption }) {
    function optionLetter(optionId){
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return letters[optionId]
    }
    console.log(questionId, optionId)

    function handleChange(event){
        const { name } = event.target
        console.log(name)
    }

    function handleClick(event){
        event.preventDefault()
        removeOption(optionId)
    }


    return (
        <li>
            <input 
                type="checkbox"
                name={`selector-${questionId}${optionLetter(optionId - 1)}`} 
            />
            <input
                type="text"
                name={`option-${questionId}${optionLetter(optionId - 1)}`}
                placeholder={`Option ${optionId}`}
                onChange={e => handleChange(e)}
            />
            <div
                className='option-rem'
                onClick={e => handleClick(e)}
            >
                <MdOutlineCancel size="1.5em"/>
            </div>
        </li>
    );
}

function ExamQuestion({ questionId, removeQuestion }) {
    const [optionCount, setOptionCount] = React.useState(0);
    const [options, setOptions] = React.useState([{id: 1}]);

    function handleClick(event) {
        event.preventDefault()
        const targetDiv = event.target.closest("div[data-name]")
        const name = targetDiv? targetDiv.getAttribute('data-name'): null
        console.log(name)
        if(name === "question-del"){
            removeQuestion(questionId)
        }else{
            setOptionCount(prevCount => prevCount + 1)
            setOptions(prevOptions => {
                const optionId = options.length + 1
                return [
                    ...prevOptions,
                    {id: optionId},
                ]
            });
        }
    }

    function removeOption(optionId){
        setOptions(prevOptions => {
            // console.log("deleting...", optionId)
            if(prevOptions.length > 0){
                const newOptions = prevOptions.filter(option => option.id !== optionId - 1)
                // setOptionCount(prevCount => prevCount - 1)
                const sortedOptions = newOptions.map((option, index) => {
                    return {id: index + 1}
                })
                console.log(sortedOptions)
                return sortedOptions
            }else{
                return prevOptions
            }
        })
    }

    return (
        <div className='question-container'>
            <div className='question'>
                <textarea
                    name={`question-${questionId}`}
                    rows={1}
                />
                <div
                    data-name="question-del"
                    className='action-btn cancel-btn qn-rem'
                    onClick={e => handleClick(e)}
                >
                    <TbTrashXFilled size="1.5em" name="trash"/>
                </div>
            </div>
            <ul>
                {options.map(
                    option => <ExamOption 
                                    key={option.id} 
                                    questionId={questionId} 
                                    optionId={option.id} 
                                    removeOption={() => removeOption(option.id)}
                                />
                            )
                }
            </ul>
            <div className='option-add' onClick={handleClick}>Add option</div>
        </div>
    );
}

function ExamPage(){
    const data = useLoaderData()
    const array = [...data]
    console.log(array)
    return(
        <>
            <h2>exam page</h2>
            <Form>
                <div className="form-content">

                </div>
            </Form>
        </>
    )
}

export default ExamPage