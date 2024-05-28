import React from "react"
import { redirect } from "react-router-dom"
import UserForm from "./UserForm"
import { retrieveData } from "../utils"



export async function action({ request }){
    const token = retrieveData()?.token
    const headers = {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
    }
    const formData = await request.formData()
    const userData = {
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        status: formData.get("status"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password")
    }
    try{
        const response = fetch("http://localhost:8000/api/users/create-user", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        console.log("creation successfully")
        return redirect("/user-management")
    }catch(error){
        return error.message
    }
}


export default function UserCreation({ formTrigger }) {
    
    return(
        <UserForm formTrigger={formTrigger} />
    )
}