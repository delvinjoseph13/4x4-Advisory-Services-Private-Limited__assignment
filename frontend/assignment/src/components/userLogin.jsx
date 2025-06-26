import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import API from "../api";
import { setUserSession } from "../auth";

function UserLogin(){
    const [userDetails,setUserDetails]=useState({
        email:"",
        password:""

    })

    const navigate=useNavigate()

    const [error,setError]=useState({});
    const [success,setSuccess]=useState(null)
    const [loading,setLoading]=useState(false)

    const handleChanges =(e)=>{
        const {name,value}=e.target;
        setUserDetails(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newError={};
        if(!userDetails.email){
            newError.email="Email is required"
        }
        if(!userDetails.password){
            newError.password="Password is required"
        }

        if(Object.keys(newError).length > 0){
            setError(newError);
            return;
        }
        setLoading(true)
        try {
           const res = await API.post('/auth/login', userDetails);
           setUserSession(res.data.token, res.data.user);
           navigate(res.data.user.role === 'manager' ? '/manager' : '/associate');

                       
        } catch (error) {
            alert("User login error" || error)
           
        }finally { 
            setLoading(false)
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <form onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md max-w-sm"
            >
                <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
                <label className="font-semibold">User Email</label>
                <input 
                type="text"
                placeholder="Enter Email"
                className="w-full p-2 rounded border mb-4"
                name="email" 
                value={userDetails.email}
                onChange={handleChanges}
                />

                {error.email && <p className="text-sm text-red-500">{error.email}</p>}

                <label className="font-semibold">User Password</label>
                <input 
                type="password" 
                name="password" 
                placeholder="Enter Password"
                className="w-full p-2 rounded border mb-4"
                value={userDetails.password}
                onChange={handleChanges}
                 />

                 {error.password && <p className="text-sm text-red-500">{error.password}</p>}

                 <button
                 type="submit"
                 className="w-full bg-blue-400 p-3 mt-5 font-semibold text-center text-lg rounded-2xl "
                 >
                    {loading ? "Loading.." : "Login"}
                 </button>

                 <p>No Account Go to <Link to="/register" className="text-blue-500">Register</Link></p>

            </form>
        </div>
    )
}

export default UserLogin;