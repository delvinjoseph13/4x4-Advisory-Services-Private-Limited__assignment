import { useState } from "react";
import axios from "axios";
import { Link,Navigate } from "react-router-dom";

function UserRegister(){
    const [userRegister,setUserRegister]=useState({
        userName:"",
        email:"",
        password:""
    })

    const [error,setError]=useState({})

    const handleChanges=(e)=>{
        const {name,value}=e.target;
        setUserRegister(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newError={}
        if(!userRegister.userName){
            newError.userName="Please enter your name"
        }
        if(!userRegister.email){
            newError.email="Please enter your email"
        } 
        if(!userRegister.password){
            newError.password="Please enter the password"
        }

        if(Object.keys(newError.length > 0)){
            setError(newError);
            return;
        }

        try {
            const registerApi=await axios.post(`http://localhost:5000`,userRegister,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(registerApi.data);
        } catch (error) {
            console.log(error);
            alert("Error While Registering" || error)
            
        }
    }
    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md max-w-sm ">
                <h2 className="text-xl font-semibold text-center mb-4">User Register</h2>

                <label className="block font-semibold mb-2">UserName</label>
                <input 
                type="text" 
                name="userName"
                className="w-full border p-2 rounded"
                value={userRegister.userName} 
                onChange={handleChanges}/>

                {error.userName && <p className="text-sm text-red-500">{error.userName}</p>}

                <label className="block font-semibold mb-2">Email</label>
                <input 
                type="email" 
                name="email"
                className="w-full border p-2 rounded"
                value={userRegister.email} 
                onChange={handleChanges}
                />

                {error.email && <p className="text-sm text-red-500">{error.email}</p>}

                <label className="font-semibold mb-2">Password</label>
                <input 
                type="password" 
                name="password"
                className="w-full border p-2 rounded"
                value={userRegister.password} 
                onChange={handleChanges}
                />

                {error.password && <p className="text-sm text-red-500">{error.password}</p>}

                <button
                type="submit"
                className="w-full p-3 bg-blue-400 font-semibold text-center text-lg mt-2 rounded-2xl mb-2">
                    Register
                </button>
                <p>Already Registed go to span <Link to="/" className="text-blue-500">Login</Link></p>

            </form>
        </div>
    )
}

export default UserRegister;