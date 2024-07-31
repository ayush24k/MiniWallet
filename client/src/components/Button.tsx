export function Button({label, onClick}: any) {
    return (
      <button className="bg-slate-900 w-full mt-2 text-white p-2 rounded-md" onClick={onClick}>
          {label}
      </button>
    )
  }