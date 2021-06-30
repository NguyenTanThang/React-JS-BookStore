import createNotification from "./createNotification";

export const validatePassword = password => {
    var minNumberofChars = 8;
    
    if(password.length < minNumberofChars){
        createNotification("A password must be at least 8 characters in length", "error");
        return false;
    }

    let patt = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    let res = patt.test(password);

    if (!res) {
        createNotification(`A password must have minimum eight characters, at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9) and one special character (@, $, !, %, *, ?, &)`, "error");

        return false;
    }
    
    return true;
}