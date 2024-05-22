import React from "react"
import { Form, useLoaderData, useParams } from "react-router-dom"
import { retrieveData } from "../utils"


export async function examfetcher(examId){
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch(`http://localhost:8000/api/exam/${examId}`,
       {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json()
    return data
}

export default function ExamEditContainer(){
    const { id } = useParams()
    const [data, setData] = React.useState()
    console.log(data)
    console.log(id)
    React.useEffect(() => {
        const exam = examfetcher(id)
        console.log(exam)
    },[])
    return (
        <h2>Exam editing page</h2>
    )
}