import { useEffect, useState } from "react";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import axios from "axios";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    async function getUserDetails() {
        const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
        const userDetails = res.data.user;
        setUsers(userDetails);
    }

    useEffect(() => {
        getUserDetails();
    }, [filter])

    return (
        <div className="bg-slate-50 px-6 py-3">
            <div className="font-bold text-2xl">
                Users
            </div>

            <div>
                <InputBox label={"search user"} placeholder={"cloud"} onChange={(e: any) => { setFilter(e.target.value) }} />
            </div>

            <div className="flex flex-col gap-2 p-3">
                {users.map((user) => <UserCard user={user} />)}
            </div>
        </div>
    )
}


function UserCard({ user }: any) {
    return (
        <div className="border-2 p-2 flex justify-between items-center align-middle gap-1">
            <div>
                {user.firstname} {user.lastname}
            </div>
            <div className="">
                <Button label={"send money"}/>
            </div>
        </div>
    )
}