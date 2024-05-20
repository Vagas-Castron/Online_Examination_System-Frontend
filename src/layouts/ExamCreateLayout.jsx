import React, { createContext, useContext, useState } from 'react';
import { redirect, Form } from 'react-router-dom';
import ExamCreatePage from '../components/exam-pages/ExamCreatePage';
import ExamPreviewPage from '../components/exam-pages/ExamPreviewPage';
import Header from "../components/Header"
import { isAdminAuthenticated } from '../utils';
import { MdCancel } from "react-icons/md"
import { IoIosAddCircleOutline } from "react-icons/io"
import { MdOutlineCancel } from "react-icons/md"

export async function action({ request }) {
    const formData = await request.formData()
    console.log(formData.get("option-1A"))
    return null
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
            <button
                name=''
                onClick={e => handleClick(e)}
            >
                <MdOutlineCancel size="1.5em"/>
            </button>
        </li>
    );
}

function ExamQuestion({ questionId }) {
    const [optionCount, setOptionCount] = React.useState(1);
    const [options, setOptions] = React.useState([{id: 1}]);

    function handleClick() {
        setOptionCount(prevCount => {
            const newCount = prevCount + 1
        });
        setOptions(prevOptions => {
            const optionId = prevOptions.length + 1
            return [
                ...prevOptions,
                {id: optionId},
            ]
        });
    }

    function removeOption(optionId){
        setOptions(prevOptions => {
            console.log("deleting...", optionId)
            if(prevOptions.length > 0){
                const newOptions = prevOptions.filter(option => option.id !== optionId - 1)
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
            <textarea
                name={`question-${questionId}`}
                rows={2}
                placeholder="Enter Question"
            />
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
            <button onClick={handleClick}>Add option</button>
        </div>
    );
}




function ExamCreateLayout({ formTrigger}) {
    const [questionCount, setQuestionCount] = React.useState(1)
    const [questions, setQuestions] = React.useState([{id: 1}])


    function handleClick(event){
        event.preventDefault()
        const { name } = event.target.closest("button")
        console.log(name)
        if(name === "add"){
            setQuestionCount(count => count + 1)
            setQuestions(prevQuestions => {
                const questionId = prevQuestions.length + 1
                return [
                    ...prevQuestions,
                    {id: questionId},
                    ]
            })
        }
        else{
            formTrigger(false)
        }
    }

    
    return (
        <>
            <div className='floating'>
                {/* <div className="questions-form">
                    <ExamPreviewPage data={data} updateData={updateData}/>
                    <ExamCreatePage data={data} updateData={updateData}/>
                </div> */}
                <div className='header-fm '>
                    <h2>Create New Exam</h2>
                    <button className='cancel-btn' onClick={handleClick}>
                        <MdCancel size="1.5em"/>
                    </button>
                </div>
                <Form method='post' className='floating-fm'>
                    <div className='form-content'>
                        {questions.map( question => <ExamQuestion key={question.id} questionId={question.id} />)}
                        <div>
                            <button 
                                name="add" 
                                className="action-btn"
                                onClick={e => handleClick(e)}
                            >
                                <IoIosAddCircleOutline size="1.5em"/>
                            </button>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button>submit</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default ExamCreateLayout
                    // const [data, setData] = React.useState([])
                    // function updateData(newData){
                    //     setData(prevData => {
                    //         if(prevData.includes(newData)){
                    //             const letters = "abcdefghijklmnopqrstuvwxyz"
                    //             const updatedQuestions = prevData.filter(data => data !== newData)
                    //             // Update the IDs of the remaining questions
                    //         const updatedQuestionsWithIDs = updatedQuestions.map((data, index) => ({
                    //             ...data,
                    //             id: index + 1
                    //         }));
                
                    //         // Update the options of the remaining questions
                    //         const updatedQuestionsWithOptions = updatedQuestionsWithIDs.map((question, index) => {
                    //             // If the question's ID is greater than the deleted question's ID,
                    //             // decrement the ID of each option
                    //             if (question.id >= newData.id) {
                    //                 const updatedOptions = question.options.map(option => ({
                    //                     ...option,
                    //                     optionId: `${question.id - 1}${letters[index].toLocaleUpperCase()}` // Decrement optionId
                    //                 }));
                    //                 return { ...question, options: updatedOptions };
                    //             }
                    //             console.log(question)
                    //             return question;
                    //         });
                
                    //         return updatedQuestionsWithOptions;
                    //     } else {
                    //         // Add the new question
                    //         const updatedData = [...prevData, newData];
                
                    //         // Update the IDs of all questions
                    //         return updatedData.map((data, index) => ({ ...data, id: index + 1 }));
                    //     }
                    //     })
                    // }