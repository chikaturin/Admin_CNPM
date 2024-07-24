import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditDetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Thay thế useNavigation bằng useNavigate
  const [formData, setFormData] = useState({
    TenChuSoHuu: "",
    BienSoXe: "",
    SDT_TaiXe: "",
    SoTien_1km: 0,
    Image: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailCar = async () => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDetailCarID/${id}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setFormData({
        TenChuSoHuu: result.TenChuSoHuu,
        BienSoXe: result.BienSoXe,
        SDT_TaiXe: result.SDT_TaiXe,
        SoTien_1km: result.SoTien_1km,
        Image: result.Image,
      });
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCar();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/UpdateDetailCar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        alert("Cập nhật thành công");
        navigate("/ListDetailCar"); // Sử dụng navigate để điều hướng
      } else {
        const { message } = await res.json();
        alert(`Cập nhật thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error updating detail car:", error);
      alert("Đã xảy ra lỗi khi cập nhật phương tiện");
    }
  };

  if (isLoading)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );

  return (
    <div className="w-1/2 translate-x-1/2 h-full bg-white p-4">
      <h1 className="text-black text-4xl mb-4">Chỉnh sửa chi tiết xe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên chủ sở hữu
          </label>
          <input
            type="text"
            name="TenChuSoHuu"
            value={formData.TenChuSoHuu}
            onChange={handleInputChange}
            maxLength="100"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Biển số xe
          </label>
          <input
            type="text"
            name="BienSoXe"
            value={formData.BienSoXe}
            onChange={handleInputChange}
            maxLength="10"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Số điện thoại tài xế
          </label>
          <input
            type="text"
            name="SDT_TaiXe"
            value={formData.SDT_TaiXe}
            onChange={handleInputChange}
            maxLength="10"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Số tiền 1 km
          </label>
          <input
            type="number"
            name="SoTien_1km"
            value={formData.SoTien_1km}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hình ảnh
          </label>
          <input
            type="text"
            name="Image"
            value={formData.Image}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Lưu thay đổi
          </button>
          <Link className=" -translate-x-1 " to={`/ListDetailCar`}>
            <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditDetailCar;
