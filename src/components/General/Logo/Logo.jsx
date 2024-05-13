import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link className="text-2xl flex items-center" to={"/"}>
        <span className="text-teal-500">{"<"}Blog.</span><span className="text-slate-800">app{" />"}</span>
    </Link>
  )
}
