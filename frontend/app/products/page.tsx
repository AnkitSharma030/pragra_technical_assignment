import ProductCard from '../../components/ProductCard';
import { fetchProducts } from '../../lib/api';

export default async function ProductsPage() {
    let products = [];
    try {
        products = await fetchProducts();
    } catch (error) {
        console.error('Failed to load products:', error);
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">Our Collection</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Curated quality products just for you.</p>
                    </div>
                    {/* Cart icon or auth can go here */}
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">No products found.</h2>
                        <p className="text-zinc-500 mt-2">The catalog is currently empty.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
