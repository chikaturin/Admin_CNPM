import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const DanhSachTuyenXe = () => {
  const [tuyenxe, setTuyenxe] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formatDateTime = (isoString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoString).toLocaleString("vi-VN", options);
  };

  const fetchTuyenXe = async () => {
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetTuyen"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTuyenxe(result.tuyen || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTuyenXe();
  }, []);

  const handleDeleteTuyenXe = async (_id) => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/DeleteTuyen/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Xóa thành công");
        // Fetch lại danh sách tuyến sau khi xóa
        fetchTuyenXe();
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Đã xảy ra lỗi khi xóa tuyến");
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
        <h1 className="text-black w-1/2 p-4 text-4xl">Danh sách tuyến</h1>
        <div className="flex w-1/2 mr-2 justify-end">
          <button className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded">
            <a className="no-underline text-white" href="/CreateTuyenXe">
              Thêm tuyến xe
            </a>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Mã tuyến xe</th>
              <th className="border px-4 py-2">Điểm khởi hành</th>
              <th className="border px-4 py-2">Điểm kết thúc</th>
              <th className="border px-4 py-2">Thời gian khởi hành</th>
              <th className="border px-4 py-2">Thời gian kết thúc</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tuyenxe.map((tuyenXe) => (
              <tr key={tuyenXe._id} className="text-black">
                <td className="border px-4 py-2">{tuyenXe.MaTuyen}</td>
                <td className="border px-4 py-2">{tuyenXe.DiemSanBay}</td>
                <td className="border px-4 py-2">{tuyenXe.DiemKetThuc}</td>
                <td className="border px-4 py-2">
                  {formatDateTime(tuyenXe.ThoiGianKhoiHanh)}
                </td>
                <td className="border px-4 py-2">
                  {formatDateTime(tuyenXe.ThoiGianKetThuc)}
                </td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    className="bg-red-500 px-4 py-2 w-fit h-fit hover:bg-red-700 text-white font-bold rounded"
                    onClick={() => handleDeleteTuyenXe(tuyenXe._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DanhSachTuyenXe;
