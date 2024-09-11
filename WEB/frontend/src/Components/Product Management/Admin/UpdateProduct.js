import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "./ProductAdmin.css";
import SideBar from "../../Admin/SideBar/SideBar";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    itemname: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imagePath: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { itemname, category, price, quantity, description, imagePath } =
    product;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Create a URL for the image preview
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8081/productmanagement/${id}`
      );
      setProduct({
        ...result.data,
        imagePath: `http://localhost:8081/uploads/${result.data.imagePath}`,
      });
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("itemname", itemname);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      await axios.put(
        `http://localhost:8081/productmanagement/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product updated successfully");
      navigate("/productdashboard");
    } catch (error) {
      console.error("There was an error updating the product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  return (
    <div>
      <div className="main_body_admin">
        <div className="nav_section">
          <SideBar />
        </div>
        <div className="details_body">
          <h2 className="topic_update">Update Product</h2>
          <form className="from_container" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="itemname" className="from_label">
                Item Name:
              </label>
              <input
                type="text"
                id="itemname"
                name="itemname"
                className="from_input"
                value={itemname}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="from_label">
                Category:
              </label>
              <select
                id="category"
                name="category"
                className="from_input"
                value={category}
                onChange={onInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Beauty & Personal Care">
                  Beauty & Personal Care
                </option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Books & Stationery">Books & Stationery</option>
                <option value="Health & Wellness">Health & Wellness</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price" className="from_label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="from_input"
                value={price}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity" className="from_label">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="from_input"
                value={quantity}
                onChange={onInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="from_label">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="from_input"
                value={description}
                onChange={onInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="from_label">
                Update Image:
              </label>
              <br />
              <label htmlFor="image" className="custom-file-upload">
                Select Photo
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="from_input"
                  onChange={onFileChange}
                />
              </label>
              {previewUrl && (
                <div className="image-preview">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="image_preview"
                  />
                </div>
              )}
            </div>
            <button type="submit" className="from_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
