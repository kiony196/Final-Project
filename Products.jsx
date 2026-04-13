import ProductCard from "./productCard";

const products = [
  { id: 1, name: "Punding", price: 1500, image: "/1.jpg" },
  { id: 2, name: "Tiramissu", price: 1720, image: "/10.jpg" },
  { id: 3, name: "BigCake", price: 4500, image: "/34.jpeg" }
];

export default function Products() {
  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
