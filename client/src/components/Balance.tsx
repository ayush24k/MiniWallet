import axios from "axios";
import { useEffect, useState } from "react"

export default function Balance() {

    const [balance, setBalance] = useState("");

    function getToken () {
        const token = localStorage.getItem("token");
        return token;
    }

    async function getBalance() {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        const balData = res.data;

        setBalance(balData.balance);
    }

    useEffect(() => {
        getBalance();
    }, [])

    return (
        <div className="bg-slate-50">
            <div className="px-7 py-4">
                Your Balance: $ {balance}
            </div>
        </div>
    )
}