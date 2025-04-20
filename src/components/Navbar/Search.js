import { GetProducts } from "../../Services/Fake_Store";

export async function FilterByName(query) {
    const products = await GetProducts();
    return products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
}