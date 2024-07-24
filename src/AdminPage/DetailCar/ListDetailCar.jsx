import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  faTrash,
  faEdit,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

const ListDetailCar = () => {
  const [detailCar, setDetailCar] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetailCar = async () => {
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDetailCar"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      console.log("API Response:", result); // Debugging statement
      setDetailCar(result.chiTietXeOto || []); // Updated to match API response structure
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailCar();
  }, []);

  const handleDeleteDetailCar = async (_id) => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/DeleteDetailCar/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Xóa thành công");
        fetchDetailCar();
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
    <div className="w-auto h-full bg-white">
      <div className="flex w-auto">
        <h1 className="text-black w-1/2 p-4 text-4xl">Danh sách phương tiện</h1>
        <div className="flex w-1/2 mr-2 justify-end">
          <button className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded">
            <a className="no-underline text-white" href="/CreateDetailCar">
              Thêm phương tiện
            </a>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Mã Xe</th>
              <th className="border px-4 py-2">Hình</th>
              <th className="border px-4 py-2">Tên hãng xe</th>
              <th className="border px-4 py-2">Tên chủ sở hữu</th>
              <th className="border px-4 py-2">Biển số xe</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {detailCar.length > 0
              ? detailCar.map((detail) => (
                  <tr key={detail._id} className="text-black">
                    <td className="border px-4 py-2">{detail.MaDetailCar}</td>
                    <td className="border px-4 py-2">
                      <img
                        className="w-auto h-10"
                        src={detail.Image}
                        alt="Car"
                      />
                    </td>
                    <td className="border px-4 py-2">{detail.TenHangXe}</td>
                    <td className="border px-4 py-2">{detail.TenChuSoHuu}</td>
                    <td className="border px-4 py-2">{detail.BienSoXe}</td>
                    <td className="border px-4 py-2 flex justify-center space-x-2">
                      <button
                        className="bg-green-500 px-4 py-2 hover:bg-green-700 text-white font-bold rounded"
                        onClick={() => detail._id}
                      >
                        <Link to={`/GetDetailCar/${detail._id}`}>
                          <FontAwesomeIcon icon={faCircleInfo} />
                        </Link>
                      </button>

                      <button className="bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white font-bold rounded">
                        <Link to={`/EditDetailCar/${detail._id}`}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </button>
                      <button
                        className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded"
                        onClick={() => handleDeleteDetailCar(detail._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDetailCar;
