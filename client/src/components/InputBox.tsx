export function InputBox({ label, placeholder, onChange }: any) {
    return (
        <div>
            <div className="text-slate-800 font-medium text-left px-[2px] py-2">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder}  className="px-1 w-full py-1 rounded-md border border-slate-200 shadow-sm"/>
        </div>
    )
}