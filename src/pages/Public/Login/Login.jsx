import { useContext, useRef, useState } from "react";
import { Input } from "../../../components/General/Input";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { tokenContext } from "../../../context/tokenContext";
import { useNavigate } from "react-router-dom";
import { meContext } from "../../../context/meContext";
import { notificationContext } from "../../../context/notificationContext";
export const Login = () => {
    const iconStyles = "w-[25px] h-[25px] absolute right-4 top-[50%] translate-y-[-50%]";
    const emailRef = useRef();
    const passwordRef = useRef();
    const [err, setErr] = useState("");
    const {setMe} = useContext(meContext);
    const {setToken} = useContext(tokenContext);
    const navigate = useNavigate();
    const {setMsg} = useContext(notificationContext);
    function handleSubmit(e) {
        e.preventDefault();
        
            axios.post('http://localhost:3000/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })  
            .then(res => {
                setErr("");
                if(!err) {
                  if(res.status === 200) {
                    if(res?.data?.accessToken) {
                        console.log(res); 
                        localStorage.setItem('token', res.data.accessToken);
                        setToken(res.data.accessToken);
                        setMe(JSON.stringify(res.data.user));
                        localStorage.setItem('me', JSON.stringify(res.data.user));
                        setMsg(`Welcome back ${res.data.user?.firstname || 'user'} ${res.data.user?.lastname || ''} !`);
                        navigate('/');
                    }
                  }
                }
            })
            .catch(err => {
              console.log(err);
                if(err?.response?.data) {
                    setErr(err.response.data);
                    return;
                }
            });
    }
    return (
      <div className="container mx-auto px-3 flex flex-col items-center">
          <h1 className="text-4xl my-8">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center lg:w-1/3 sm:w-full bg-red">
            <span className="flex justify-center text-red-400">{err ? err + ' !' : ''}</span>
            <Input type={"email"} name={"Email"} ref={emailRef} icon={<MdOutlineAttachEmail className={iconStyles} />} />
            <Input type={"password"} name={"Password"} ref={passwordRef} icon={<RiLockPasswordLine className={iconStyles} />} />

            <button className="flex items-center justify-center w-full mt-3 p-4 rounded-md bg-teal-400 text-white text-lg">Submit</button>
          </form>
      </div>
    )
  }
  