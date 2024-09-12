import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "../../Admin/SideBar/SideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ProductDetails() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8081/productmanagement");
      setProducts(result.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/productmanagement/${id}`);
        loadProducts();
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting Product:", error);
        alert("Can't Delete This Item , This Item Coustomers are on their way to buy.");
      }
    }
  };
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Product Details", 14, 16);

    // Add table
    doc.autoTable({
      startY: 30,
      head: [
        ["ID", "Item Name", "Category", "Price", "Quantity", "Description"],
      ],
      body: products.map((product) => [
        product.id,
        product.itemname,
        product.category,
        product.price,
        product.quantity,
        product.description,
      ]),
    });

    doc.save("product-details.pdf");
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.itemname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="main_body_admin">
        <div className="nav_section">
          <SideBar />
        </div>
        <div className="details_body">
          <h1>Product List</h1>

          <div className="action_set_admin">
            <button
              className="add_btn_admin"
              onClick={() => (window.location.href = "/addproduct")}
            >
              Add Product
            </button>
            <input
              type="text"
              className="search_admin"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="add_btn_admin" onClick={handleDownloadPDF}>
              Generate Report
            </button>
          </div>
          <table className="admin_table">
            <thead className="admin_table_head">
              <tr className="admintable_tr_hd">
                <th className="admin_table_th">ID</th>
                <th className="admin_table_th">Item Name</th>
                <th className="admin_table_th">Category</th>
                <th className="admin_table_th">Price</th>
                <th className="admin_table_th">Quantity</th>
                <th className="admin_table_th">Description</th>
                <th className="admin_table_th">Image</th>
                <th className="admin_table_th">Action</th>
              </tr>
            </thead>
            <tbody className="details_body_table">
              {filteredProducts.map((product) => (
                <tr className="admintable_tr" key={product.id}>
                  <td className="admin_table_td">{product.id}</td>
                  <td className="admin_table_td">{product.itemname}</td>
                  <td className="admin_table_td">{product.category}</td>
                  <td className="admin_table_td">{product.price}</td>
                  <td className="admin_table_td">{product.quantity}</td>
                  <td className="admin_table_td dis_with">
                    {product.description}
                  </td>
                  <td className="admin_table_td img_rwo">
                    <img
                      src={`http://localhost:8081/${product.imagePath}`}// Adjust this path if needed
                      alt={product.itemname}
                      className="tble_img"
                    />
                  </td>
                  <td className="admin_table_td btn_set">
                    <Link
                      to={`/updateproduct/${product.id}`}
                      className="btn-update"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
