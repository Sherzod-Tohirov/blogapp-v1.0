export function validate(ref, type, field, error) {
    const val = ref?.current?.value;
    if(type === "EMPTY") {
        if(!val) {
            error(`${field} is required!`);
            return;
        }
        error("");
    }

    if(type === "EMAIL") {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(val)) {
            error(`${field} is not valid!`);
            return;
        }
        error("");
    }

    if(type === "PASSWORD") {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        if(!passwordRegex.test(val)) {
            error(`${field} is not valid!`);
            return;
        }
        error("");
    }

    return true;
}
export const validateTypes = {empty: "EMPTY", email: "EMAIL", password: "PASSWORD"}



export const formatDate = () => {
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month} ${day} ${year + "y"} ${hours}:${minutes}`;
}


export function isEmptyObj(obj) {
    return Object.entries(obj).length === 0;
}