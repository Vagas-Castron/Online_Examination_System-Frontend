import React, { createContext, useContext, useState } from 'react';
import { redirect, Form } from 'react-router-dom';
import ExamCreatePage from '../components/exam-pages/ExamCreatePage';
import ExamPreviewPage from '../components/exam-pages/ExamPreviewPage';
import Header from "../components/Header"
import { isAdminAuthenticated } from '../utils';
import { MdCancel } from "react-icons/md"


export async function action({ request }) {
    const formData = await request.formData()
    console.log(formData.get("question-2"))
    return null
}


function ExamOption() {
    return (
        <li>
            <input 
                type="checkbox"
                name='isTrue' 
            />
            <input
                type="text"
                name="optionValue"
                placeholder="Option"
            />
        </li>
    );
}

function ExamQuestion({ questionId }) {
    const [optionCount, setOptionCount] = React.useState(1);
    const [options, setOptions] = React.useState([<ExamOption key={0} />]);

    function handleClick() {
        setOptionCount(prevCount => prevCount + 1);
        setOptions(prevOptions => [
            ...prevOptions,
            <ExamOption key={optionCount} />
        ]);
    }
    console.log(questionId)

    return (
        <>
            <textarea
                name={`question-${questionId}`}
                placeholder="Enter Question"
            />
            <ul>
                {options}
            </ul>
            <hr />
            <button onClick={handleClick}>Add option</button>
        </>
    );
}




function ExamCreateLayout({ formTrigger}) {
    const [questionCount, setQuestionCount] = React.useState(1)
    const [questions, setQuestions] = React.useState([<ExamQuestion key={0} questionId={questionCount}/>])


    function handleClick(event){
        const {name} = event.target
        if(name === "cancel-btn"){
            formTrigger(false)
        }
        else{
            setQuestionCount(count => {
                const newCount = count + 1
                if(newCount < 2){
                    setQuestions(prevQuestions => [
                    ...prevQuestions,
                        <ExamQuestion key={questionCount} questionId={newCount}/>
                    ])
                }
                return newCount
            })
            if(questionCount > 2){
                setQuestions(prevQuestions => [
                ...prevQuestions,
                    <ExamQuestion key={questionCount} questionId={questionCount}/>
                ])

            }
        }
    }

    
    return (
        <>
            <main className='questions-container'>
                {/* <div className="questions-form">
                    <ExamPreviewPage data={data} updateData={updateData}/>
                    <ExamCreatePage data={data} updateData={updateData}/>
                </div> */}
                <Form method='post'>
                    {questions}
                    <button>submit</button>
                </Form>
                <div className='btn-container'>
                        <button onClick={e => handleClick(e)} name='add'>add</button>
                        <button className='cancel-btn' onClick={e => handleClick(e)} name='cancel-btn'>
                            <MdCancel size="1.5em"/>
                        </button>
                    </div>
            </main>
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