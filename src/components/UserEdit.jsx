import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import UserForm from "./UserForm"
import { retrieveData } from "../utils"




export default function UserEdit({ formTrigger, userData }) {
    const navigate = useNavigate()
    const [userInfo, setUserInfo ] = React.useState({
        username: userData[0].username,
        first_name: userData[0].first_name,
        last_name: userData[0].last_name,
        password: "",
        confirm_password: "",
        status: userData[0].status
    })

    function handleChange(event){
        const { name, value } = event.target
        setUserInfo(prevInfo => {
            return {
                ...prevInfo,
                [name]: value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(userInfo)
        const token = retrieveData().token
        fetch('http://localhost:8000/api/users/update-user', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(userInfo)
        })
        .then(data => navigate("/user-management"))
        .catch(error = console.log(error.message))
    }
    
    function handleDelete(event){
        event.preventDefault()
        const token = retrieveData().token
        const username = retrieveData().username

        if(userInfo.username !== username){
            fetch('http://localhost:8000/api/users/update-user', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify(userInfo)
            })
            .then(data => navigate("/user-management"))
            .catch(error = console.log(error.message))
        }
    }

    return (
        <UserForm 
            formTrigger={formTrigger} 
            userInfo={userInfo} 
            setChanges={handleChange} 
            submit={handleSubmit}
            handleDelete={handleDelete}
        />
    )
}