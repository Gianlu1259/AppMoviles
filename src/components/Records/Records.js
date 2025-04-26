export function CreateRecord (id) {
    const record = JSON.parse(localStorage.getItem('recordedProducts')) || [];

    const index = viewed.indexOf(id);
    if (index !== -1) viewed.splice(index, 1);
    viewed.unshift(id);
    const limited = viewed.slice(0, 5);
    localStorage.setItem('viewedProducts', JSON.stringify(limited));
}