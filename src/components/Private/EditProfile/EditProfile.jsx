import { Input } from "../../../components/General/Input";
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { validate } from "../../../lib/customFunctions";
import axios from "axios";
import { tokenContext } from "../../../context/tokenContext";
import { useNavigate } from "react-router-dom";
import { validateTypes } from "../../../lib/customFunctions";
import { meContext } from "../../../context/meContext";
import { Modal } from "../../General/Modal";
import { useContext, useRef, useState } from "react";
import { notificationContext } from "../../../context/notificationContext";
export const EditProfile = ({ setProfileEditModal }) => {
  const iconStyles =
    "w-[25px] h-[25px] absolute right-4 top-[50%] translate-y-[-50%]";
  const nameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const urlRef = useRef();
  const [nameError, setNameError] = useState("");
  const [lastNameError, setlastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [urlError, setUrlError] = useState("");
  const { setToken } = useContext(tokenContext);
  const { me, setMe } = useContext(meContext);
  const { setMsg } = useContext(notificationContext);
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(nameRef, validateTypes.empty, "First name", setNameError))
      return;
    if (
      !validate(lastNameRef, validateTypes.empty, "Last name", setlastNameError)
    )
      return;
    if (!validate(emailRef, validateTypes.empty, "Email", setEmailError))
      return;
    if (!validate(emailRef, validateTypes.email, "Email", setEmailError))
      return;
    if (
      !validate(passwordRef, validateTypes.empty, "Password", setPasswordError)
    )
      return;
    if (
      !validate(
        passwordRef,
        validateTypes.password,
        "Password",
        setPasswordError,
      )
    )
      return;
    console.log(nameError, lastNameError, emailError, passwordError);
    if (!nameError && !lastNameError && !emailError && !passwordError) {
      axios
        .put(`http://localhost:3000/users/${me?.id}`, {
          firstname: nameRef.current.value,
          lastname: lastNameRef.current.value,
          email: emailRef.current.value,
          avatar: urlRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setMe(JSON.stringify(res?.data));
            localStorage.setItem("me", JSON.stringify(res?.data));
            localStorage.setItem("msg", "updated");
            setProfileEditModal(false);
            setMsg("Your profile updated successfully!");
          }
        })
        .catch((err) => {
          if (err?.response?.data) {
            if (err.response.data.toLowerCase().includes("email")) {
              setEmailError(err?.response?.data + "!");
              return;
            }
          }
          console.log(err);
        });
    }
  }
  return (
    <Modal show={setProfileEditModal} width={"sm:w-full lg:w-7/12 mx-5"}>
      <h2 className="text-4xl text-center text-slate-600 my-8">
        Edit your profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center justify-center w-full bg-red"
      >
        <Input
          value={me?.firstname}
          name={"First name"}
          ref={nameRef}
          error={nameError}
        />
        <Input
          value={me?.lastname}
          name={"Last name"}
          ref={lastNameRef}
          error={lastNameError}
        />
        <Input
          value={me?.email}
          type={"email"}
          name={"Email"}
          ref={emailRef}
          error={emailError}
          icon={<MdOutlineAttachEmail className={iconStyles} />}
        />
        <Input
          type={"password"}
          info={
            "* Password must contain at least 8 chars with one capital letter !"
          }
          name={"Password"}
          ref={passwordRef}
          error={passwordError}
          icon={<RiLockPasswordLine className={iconStyles} />}
        />
        <Input
          value={me?.avatar}
          type={"url"}
          name={"Avatar url"}
          ref={urlRef}
          error={urlError}
          icon={<FaUserCircle className={iconStyles} />}
        />
        <button className="flex items-center justify-center w-full mt-3 p-4 rounded-md bg-teal-400 text-white text-lg">
          Submit
        </button>
      </form>
    </Modal>
  );
};
