const regImage = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif)$/i;
const regName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
const regNumber = /^(?:[1-9][0-9]?|100)$/;

const validate = (initial) => {
    const errors = {};
    if (!regImage.test(initial.image)) errors.image = "Url image is not valid";
    if (!initial.image) errors.image = "Image is required";

    if (!initial.name) errors.name = "Name is required";
    if (!regName.test(initial.name)) errors.name = "Name is not valid";
    if (initial.name.length > 20) errors.name = 'The name must be less than 20 characters';
    if (initial.name.length < 4) errors.name = 'The name must be more than 3 characters';

    if  (!regNumber.test(initial.minHeight)) errors.minHeight = "Value is not valit"
    if  (!regNumber.test(initial.maxHeight)) errors.maxHeight = "Value is not valit"
    if  (!regNumber.test(initial.minWeight)) errors.minWeight = "Value is not valit"
    if  (!regNumber.test(initial.maxWeight)) errors.maxWeight = "Value is not valit"
    if  (!regNumber.test(initial.minLifeSpan)) errors.minLifeSpan = "Value is not valit"
    if  (!regNumber.test(initial.maxLifeSpan)) errors.maxLifeSpan = "Value is not valit"

    if (parseInt(initial.minHeight) >= parseInt(initial.maxHeight)) {
        errors.maxHeight = "Minimum cannot be greater than or equal to maximum";
    }
    if (!initial.minHeight && !initial.maxHeight) errors.minHeight = "Minimum height is required";
    if (!initial.maxHeight) errors.maxHeight = "Maximum height is required";

    if (parseInt(initial.minWeight) >= parseInt(initial.maxWeight)) errors.maxWeight = "Minimum cannot be greater than or equal to maximum";
    if (!initial.minWeight && !initial.maxWeight) errors.minWeight = "Minimum weight is required";
    if (!initial.maxWeight) errors.maxWeight = "Maximum weight is required";

    if (Number(initial.minLifeSpan) >= Number(initial.maxLifeSpan)) errors.maxLifeSpan = "Minimum cannot be greater than or equal to maximum";
    if (!initial.minLifeSpan && !initial.maxLifeSpan) errors.minLifeSpan = "Minimum life span is required";
    if (!initial.maxLifeSpan) errors.maxLifeSpan = "Maximum life span is required";

    
    // if (!initial.Temperaments || initial.Temperaments.length === 0) errors.Temperaments = "Min Temperaments allowed 1";
    // if (initial.Temperaments.length > 8) errors.Temperaments = "You cannot select more than 8 types of temperaments";
    return errors;
}

export default validate