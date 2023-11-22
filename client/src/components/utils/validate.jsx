
export default function validate(initial) {

  let validateError = {};

  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
  
  const regexNumber = /^[1-9]\d*$/;
  
  if(!initial.name) {
    validateError.name = 'Name is required';
  } else if(!regexName.test(initial.name)) {
    validateError.name = 'The name cannot have numbers or symbols';
  } else if(initial.name.length > 20){
    validateError.name = 'The name must be less than 20 characters';
  } else if(initial.name.length < 4) {
    validateError.name = 'The name must be more than 3 characters'}
    
 
  if (initial.Temperaments.length === 0){
    validateError.Temperaments = "Min Temperaments allowed 1";
  } else if (initial.Temperaments.length > 8){
    validateError.Temperaments = 'You cannot select more than 8 types of temperaments'
  }
  //

  validateError.minHeight = !initial.minHeight
   ? 'Min. height is required'
   : !regexNumber.test(initial.minHeight)
   ? 'Enter only positive numbers greater than 0'
   : parseInt(initial.minHeight) >= parseInt(initial.maxHeight)
   ? 'The minimum height cannot be greater than the maximum height'
   : parseInt(initial.minHeight) > 100
   ? 'The min. height cannot exceed 100 centimeters'
   : '';

    
//
  if(!initial.maxHeight){
    validateError.maxHeight = 'Max. height is required';
  } else if(!regexNumber.test(initial.maxHeight)){
    validateError.maxHeight = 'Enter only positive numbers greater than 0';
  } else if(parseInt(initial.maxHeightt) <= parseInt(initial.minHeight)){
    validateError.maxHeight = 'The maximum height cannot be less than or equal to the minimum height.'
  } else if(parseInt(initial.maxHeight) > 110){
    validateError.maxHeight = 'The min. height cannot exceed 110 centimeters';
  }

//
  if(!initial.minWeight){
    validateError.minWeight = 'Min. Weight is required';
  } else if(!regexNumber.test(initial.minWeight)){
    validateError.minWeight = 'Enter only positive numbers greater than 0';
  } else if(parseInt(initial.minWeight) >= parseInt(initial.maxWeight)){
    validateError.minWeight = 'The minimum weight cannot be greater than or equal to the maximum weight.'
  } else if(parseInt(initial.minWeight) > 120){
    validateError.minWeight = 'The weight cannot exceed 120 kilograms';
  }

//
  if(!initial.maxWeight){
    validateError.maxWeight = 'Max. Weight is required';
  } else if(!regexNumber.test(initial.maxWeight)){
    validateError.maxWeight = 'Enter only positive numbers greater than 0';
  } else if(parseInt(initial.maxWeight) <= parseInt(initial.minWeight)){
    validateError.maxWeight = 'The maximum weight cannot be less than or equal to the minimum weight.'
  } else if(parseInt(initial.maxWeight) > 120){
    validateError.maxWeight = 'The weight cannot exceed 120 kilograms';
  }
//

  if(!initial.minLifeSpan){
    validateError.minLifeSpan = 'Min. life span is required';
  } else if(!regexNumber.test(initial.minLifeSpan)){
    validateError.minLifeSpan = 'Enter only positive numbers greater than 0';
  } else if(parseInt(initial.minLifeSpan) >= parseInt(initial.maxLifeSpan)){
    validateError.minLifeSpan = 'The lowest life expectancy cannot be greater than or equal to the maximum.'
  } else if(parseInt(initial.minLifeSpan) > 20){
    validateError.minLifeSpan = 'The life span cannot exceed 20 years';
  }
//

  if(!initial.maxLifeSpan){
    validateError.maxLifeSpan = 'Max. life span is required';
  } else if(!regexNumber.test(initial.maxLifeSpan)){
    validateError.maxLifeSpan = 'Enter only positive numbers greater than 0';
  } else if(parseInt(initial.maxLifeSpan)<= parseInt(initial.minLifeSpan)){
    validateError.maxLifeSpan = 'The highest life expectancy cannot be less than or equal to the minimum.'
  } else if(parseInt(initial.maxLifeSpan) > 25){
    validateError.maxLifeSpan = 'The life span cannot exceed 25 years';
  }
 
return validateError;

}

 