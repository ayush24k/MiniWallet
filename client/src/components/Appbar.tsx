import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function Appbar() {

    const [user, setUserDetails] = useState({
        name: "",
        email: ""
    });

    const redirect = useNavigate();

    function getToken() {
        const token = localStorage.getItem("token");
        return token;
    }

    async function getUserDetail() {
        const token = getToken();
        const res = await axios.get("http://localhost:3000/api/v1/user/details", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const userData = res.data;
        setUserDetails(userData);
    }

    useEffect(() => {
        getUserDetail();
    }, [])

    return (
        <div className="bg-slate-100 p-4 shadow-sm border-b-2">
            <div className="flex justify-between px-3">
                <div>MiniWallet</div>
                <div className="flex gap-3 items-center">
                    <div>
                        {user.name}
                    </div>
                    <div>
                        <button className="bg-red-300 px-2 py-1 rounded-md hover:bg-red-600"
                            onClick={() => {
                                localStorage.removeItem("token");
                                redirect('/logout');
                            }}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}