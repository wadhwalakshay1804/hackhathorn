import React from 'react';
import { Droplets, Bug, Wheat, Leaf } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  icon: React.ReactNode;
}

const Products: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Organic Fertilizer",
      category: "Fertilizers",
      description: "High-quality organic fertilizer that improves soil health and crop yield naturally.",
      price: "$45.99",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Leaf className="text-green-600" size={24} />
    },
    {
      id: 2,
      name: "Bio-Pesticide Solution",
      category: "Pest Control",
      description: "Environmentally safe pesticide that effectively controls pests without harming beneficial insects.",
      price: "$32.50",
      image: "https://images.pexels.com/photos/1595105/pexels-photo-1595105.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Bug className="text-red-600" size={24} />
    },
    {
      id: 3,
      name: "Drought-Resistant Seeds",
      category: "Seeds",
      description: "High-yield seeds engineered to thrive in low-water conditions while maintaining quality.",
      price: "$28.75",
      image: "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Wheat className="text-yellow-600" size={24} />
    },
    {
      id: 4,
      name: "Smart Irrigation System",
      category: "Equipment",
      description: "Automated irrigation system with moisture sensors for optimal water management.",
      price: "$199.99",
      image: "https://images.pexels.com/photos/1595101/pexels-photo-1595101.jpeg?auto=compress&cs=tinysrgb&w=400",
      icon: <Droplets className="text-blue-600" size={24} />
    }
  ];

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of high-quality agricultural products designed to enhance your farming success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                  {product.icon}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-600 font-medium">{product.category}</span>
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;