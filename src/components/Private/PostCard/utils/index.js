export function refineTimestamp(timestamp) {
    const date = new Date();
    const diff = Number(date.getTime()) - Number(timestamp);
    let hours = 0;
    let minutes = 0;

    if(diff > 3600000) {
        hours = parseInt(diff - diff / 3600000)
        minutes = parseInt((diff - diff / 3600000) / 60000)
        
    }else {
        if(diff > 60000) {
            minutes = parseInt((diff - diff / 3600000) / 60000)
        }
    }

    console.log(diff)
    if(hours && minutes) {
         return `${hours}h ${minutes}m ago`
    }else if(minutes) {
        return `${minutes}m ago`
    }else {
        return `recently`
    }

}
import * as Yup from 'yup';
export const userCommentSchema = Yup.object({
    user_comment: Yup.string().required("Comment is required !")
})