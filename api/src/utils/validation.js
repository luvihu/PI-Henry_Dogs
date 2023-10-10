

function validationParamt ({ image, name, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan}) {

  if (
    !image ||
    !name ||
    !minHeight ||
    !maxHeight ||
    !minWeight ||
    !maxWeight ||
    !minLifeSpan ||
    !maxLifeSpan 
    
  ) {
    throw new Error('Debes completar la información requerida');
   
  } else  if (
      minHeight <= 0 ||
      maxHeight <= 0 ||
      minWeight <= 0 ||
      maxWeight <= 0 ||
      minLifeSpan <= 0 ||
      maxLifeSpan <= 0
    ) {
      throw new Error("El valor de altura, peso o esperanza de vida no pueden ser negativo ó cero");

    } else if (minHeight > maxHeight) {
      throw new Error(
        'La altura mínima debe ser menor o igual a la altura máxima, por favor verifique los datos'
      );
    } else if (minWeight > maxWeight) {
      throw new Error(
        'El peso mínimo debe ser menor o igual al peso máximo, por favor verifique los datos'
      );
    } else if (minLifeSpan > maxLifeSpan) {
      throw new Error(
        'La esperanza de vida mínima debe ser menor o igual al máximo, por favor verifique los datos'
      );
    }

}

module.exports = validationParamt;