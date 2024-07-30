import { SubHeading } from "../components/SubHeading";

export default function Logout() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-100 px-4  py-3 rounded-lg">
                <SubHeading label={"Successfully Logged out!"} />
            </div>
        </div>
    )
}