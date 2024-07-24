import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const DanhSachTramDung = () => {
  const [tramDung, setTramDung] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTramDung = async () => {
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetTramDung"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTramDung(result.tramDung || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTramDung();
  }, []);

  const handleDeleteTramDung = async (_id) => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/DeleteTramDung/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Xóa thành công");
        fetchTramDung();
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting tram dung:", error);
      alert("Đã xảy ra lỗi khi xóa trạm dừng");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-4xl translate-y-1/2 h-full font-extrabold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-auto h-full bg-white">
      <div className="flex w-auto">
        <h1 className="text-black w-1/2 p-4 text-4xl">Danh sách trạm dừng</h1>
        <div className="flex w-1/2 mr-2 justify-end">
          <button className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded">
            <a className="no-underline text-white" href="/CreateTramDung">
              Thêm trạm dừng
            </a>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Mã Trạm</th>
              <th className="border px-4 py-2">Mã Tuyến</th>
              <th className="border px-4 py-2">Địa Chỉ</th>
              <th className="border px-4 py-2">Số KM</th>
              <th className="border px-4 py-2">Giá Vé</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tramDung.map((tram) => (
              <tr key={tram._id} className="text-black">
                <td className="border px-4 py-2">{tram.MaTram}</td>
                <td className="border px-4 py-2">{tram.MaTuyen}</td>
                <td className="border px-4 py-2">{tram.DiaChi}</td>
                <td className="border px-4 py-2">{tram.SoKM}</td>
                <td className="border px-4 py-2">{tram.GiaTienVe}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    className="bg-red-500 px-4 py-2 w-fit h-fit hover:bg-red-700 text-white font-bold rounded"
                    onClick={() => handleDeleteTramDung(tram._id)}
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

export default DanhSachTramDung;
