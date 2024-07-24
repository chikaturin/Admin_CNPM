import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";

const ListDetailCar = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchDetailCar = async () => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDetailCarID/${id}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setDetail(result);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCar();
  }, [id]);

  const handleDeleteDetailCar = async () => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/DeleteDetailCar/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Xóa thành công");
        navigate("/ListDetailCar");
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting detail car:", error);
      alert("Đã xảy ra lỗi khi xóa phương tiện");
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
    <div className="w-auto h-full bg-white p-4">
      <h1 className="text-black text-4xl mb-4">Chi tiết phương tiện</h1>
      <div className="flex mb-4">
        <img
          className="w-1/4 h-auto object-cover"
          src={detail.Image}
          alt="Car"
        />
        <div className="flex-grow ml-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-400">
                <th className="border px-4 py-2">Mã Xe</th>
                <th className="border px-4 py-2">Tên hãng xe</th>
                <th className="border px-4 py-2">Tên chủ sở hữu</th>
                <th className="border px-4 py-2">Biển số xe</th>
                <th className="border px-4 py-2">Số hành lý tối đa</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-black">
                <td className="border px-4 py-2">{detail.MaDetailCar}</td>
                <td className="border px-4 py-2">{detail.TenHangXe}</td>
                <td className="border px-4 py-2">{detail.TenChuSoHuu}</td>
                <td className="border px-4 py-2">{detail.BienSoXe}</td>
                <td className="border px-4 py-2">{detail.SoHanhLyToiDa}</td>
              </tr>
            </tbody>
            <thead>
              <tr className="bg-green-400">
                <th className="border px-4 py-2">Công ty</th>
                <th className="border px-4 py-2">Số ghế tối đa</th>
                <th className="border px-4 py-2">Số tiền/km</th>
                <th className="border px-4 py-2">Mã Sân Bay</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-black">
                <td className="border px-4 py-2">{detail.CongTy}</td>
                <td className="border px-4 py-2">{detail.SoGheToiDa}</td>
                <td className="border px-4 py-2">{detail.SoTien_1km}</td>
                <td className="border px-4 py-2">{detail.MaSB}</td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full translate-x-1/2 space-x-4">
        <Link to={`/EditDetailCar/${id}`}>
          <button className="bg-yellow-500 px-4 py-2 hover:bg-yellow-700 text-white font-bold rounded">
            <FontAwesomeIcon icon={faEdit} /> Sửa
          </button>
        </Link>
        <button
          className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded"
          onClick={handleDeleteDetailCar}
        >
          <FontAwesomeIcon icon={faTrash} /> Xóa
        </button>
        <Link to={`/ListDetailCar`}>
          <button className="bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white font-bold rounded">
            <FontAwesomeIcon icon={faXmark} /> Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListDetailCar;
