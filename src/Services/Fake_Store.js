const URL = 'https://fakestoreapi.com';

export const GetProducts = async () => {
    const response = await fetch(`${URL}/products`);
    const data = await response.json();
    return data;
}

export const GetProductById = async (id) => {
    const response = await fetch(`${URL}/product/${id}`);
    const data = await response.json();
    return data;
}

export const GetCategorys = async () => {
    const response = await fetch(`${URL}/products/categories`);
    const data = await response.json();
    return data;
}

export const GetProductsByCategory = async (category) => {
    const response = await fetch(`${URL}/products/category/${category}`);
    const data = await response.json();
    return data;
}