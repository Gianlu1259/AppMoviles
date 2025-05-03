export function Records(productId){
    const viewed = JSON.parse(localStorage.getItem('Records')) || [];

    const index = viewed.indexOf(productId);
    if (index !== -1) viewed.splice(index, 1); //Elimina repetidos

    viewed.unshift(productId); //Inserta al principio

    const limited = viewed.slice(0, 4); //Solo guarda 4

    localStorage.setItem('Records', JSON.stringify(limited));
}

export function GetRecords(){
    return JSON.parse(localStorage.getItem('Records')) || [];
}

export function RecordId(productId){
    Records(productId);
}