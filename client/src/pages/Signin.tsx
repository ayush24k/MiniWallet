import { useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WarningBottom } from "../components/WarningBottom";

export function Signin () {
    const [password , setPassword] = useState("");
    const [username , setUserName] = useState("");
    const navigate = useNavigate();

    return(
        <div className= "flex justify-center mt-[100px] mb-[100px]">
            <div className="flex flex-col justify-center">
                <div className="bg-slate-200 rounded-md w-80 text-center p-2 h-max px-3 shadow-sm pb-6">
                    <Heading label={"Sign In"} />
                    <SubHeading label={"Enter your account details to access your account."} />
                    <InputBox label={"Email"} placeholder={"cloud@gmail.com"} onChange={(e:any) => {setUserName(e.target.value);}} />
                    <InputBox label={"Password"} placeholder={"******"} onChange={(e:any) => {setPassword(e.target.value);}} />

                    <Button 
                    label={"sign in"} 
                    onClick={async () => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username: username,
                            password: password
                        });
                        const token = res.data.token;
                        localStorage.setItem("token", token);
                        navigate('/dashboard')
                    }}/>

                    <WarningBottom label={"don't have an account?"} to={'/signup'} buttonText={"Sign Up"} />
                </div>
            </div>
        </div>
    )
}