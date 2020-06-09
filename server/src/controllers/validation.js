const existsOrError = (value , msg) => {
    if (!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if( typeof value === 'string' && !value.trim() ) throw msg
}

const notExistsOrError = (value , msg) => {
    try{
        existsOrError(value , msg)
    } catch(msg){
        return
    }
    throw msg
}

const equalsOrError = (valueA , valueB , msg) =>{
    if(valueA !== valueB) throw msg
}

const passwordSizeOrError = (value , msg) =>{
    if(value.length < 8) throw msg
}

const passwordSecureOrError = (value,  msg) =>{
 const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[a-z]{1}))/
 if(!regex.exec(value)) throw msg
}    

const validateCnpjOrError = (value , msg) => {
  const  cnpj = value.replace(/[^\d]+/g,'');
 
    if(cnpj == '') throw msg;
     
    if (cnpj.length != 14) throw msg;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        throw msg;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
    throw msg;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2){
          pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
        throw msg;
    }
           
}


module.exports = {existsOrError , notExistsOrError , equalsOrError , passwordSizeOrError , passwordSecureOrError , validateCnpjOrError}