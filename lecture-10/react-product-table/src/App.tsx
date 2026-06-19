import { useState, useEffect } from "react";
import productsData from "./data.json";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export default function App() {
  const [products] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("deletedProductIds");
    if (saved) {
      setDeletedIds(JSON.parse(saved));
    }
  }, []);

  function handleDelete(id: number): void {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const updated = [...deletedIds, id];
    setDeletedIds(updated);
    localStorage.setItem("deletedProductIds", JSON.stringify(updated));
  }

  const visible = products
    .filter((p) => !deletedIds.includes(p.id))
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container my-4">
      <h1 className="mb-4">Products</h1>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No products found
              </td>
            </tr>
          ) : (
            visible.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {deletedIds.length > 0 && (
        <p className="text-muted">
          {deletedIds.length} product(s) deleted.
        </p>
      )}
    </div>
  );
}
