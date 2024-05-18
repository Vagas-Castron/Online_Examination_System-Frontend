import React from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { retrieveData } from '../utils'

export async function loader(){
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    const response = await fetch('http://localhost:8000/api/exam/all',
       {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json()
    return data
}

export default function AllExamcontainer(){
    const data = useLoaderData()
    const list = data.map((d)=> (<div>{d.create}</div>))
    return (
        <div>
            {console.log(data)}
            <table className='listing-table'>
                <thead>
                    <tr>
                        <th>Exam Title</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d) => (
                        <tr>
                            <td>
                                <Link to="" className='row-link'>
                                    {d.exam_title}
                                </Link>
                            </td>
                            <td>{d.created}</td>
                        </tr>                   
                    ))}
                </tbody>
            </table>
        </div>
    )
}