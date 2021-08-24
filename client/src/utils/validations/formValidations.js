export function minLengthValidation(inputData, minLength){

    const {value} = inputData;
    removeClassErrorSuccess(inputData)

    if(value.length >= minLength){
        // inputData.error(true);
        return true;
    }else{
        // inputData.error(false);
        return false;
    }

}

export function passwordValidation(inputData){
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

    const {value} = inputData;
    removeClassErrorSuccess(inputData)
    const resultValidation = passwordValid.test(value)


    if(resultValidation){
        // inputData.error(true);
        return true;

    }
    else{
        // inputData.error(false);
        return false;
    }
}


export function emailValidation(inputData){
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const {value} = inputData;
    removeClassErrorSuccess(inputData)

    const resultValidation = emailValid.test(value)

    if(resultValidation){
        // inputData.classList.add('success')
        return true;

    }
    else{
        // inputData.classList.add('error')
        return false;
    }
}
function removeClassErrorSuccess(inputData){
    inputData.classList.remove('success')
    inputData.classList.remove('error')

}