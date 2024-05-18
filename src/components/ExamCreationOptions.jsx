import React from "react"
import { Link } from "react-router-dom"


export default function ExamCreationOptions(){
    return (
        <div className="create-options">
            <Link to="new-exam">
                <span>New Exam</span>
            </Link>
            <Link to="all-exam">
                <span>All Exams</span>
            </Link>
        </div>
    )
}