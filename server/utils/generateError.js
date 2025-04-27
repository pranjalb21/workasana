const generateError = (error) => {
    let errorList = [];
    // console.log(error);
    error.errors.forEach((element) => {
        errorList.push(element.message);
    });
    // console.log(errorList);
    return errorList
};
export default generateError;
