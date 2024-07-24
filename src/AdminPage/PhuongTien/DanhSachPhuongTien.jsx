import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const DanhSachPhuongTien = () => {
  const [phuongtien, setPhuongTien] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhuongTien = async () => {
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetPhuongTien"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setPhuongTien(result.phuongTien || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhuongTien();
  }, []);

  const handleDeletePhuongTien = async (_id) => {
    try {
      const res = await fetch(
        `https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/DeletePhuongTien/${_id}`, // Cập nhật URL nếu cần
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        alert("Xóa thành công");
        fetchPhuongTien();
      } else {
        const { message } = await res.json();
        alert(`Xóa thất bại: ${message}`);
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
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
            <a className="no-underline text-white" href="/CreatePhuongTien">
              Thêm phương tiện
            </a>
          </button>
        </div>
      </div>
      <div className="p-2">
        <table className="w-full">
          <thead>
            <tr className="bg-green-400">
              <th className="border px-4 py-2">Mã phương tiện</th>
              <th className="border px-4 py-2">Mã Tuyến</th>
              <th className="border px-4 py-2">Mã Loại</th>
              <th className="border px-4 py-2">Tên Phương Tiện</th>
              <th className="border px-4 py-2">Số ghế tối đa</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {phuongtien.map((phuongTien) => (
              <tr key={phuongTien._id} className="text-black">
                <td className="border px-4 py-2">{phuongTien.MaPT}</td>
                <td className="border px-4 py-2">{phuongTien.MaTuyen}</td>
                <td className="border px-4 py-2">
                  {phuongTien.MaLoai ? "Bus" : "Train"}
                </td>{" "}
                <td className="border px-4 py-2">{phuongTien.TenPhuongTien}</td>
                <td className="border px-4 py-2">{phuongTien.SoGheToiDa}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <button
                    className="bg-red-500 px-4 py-2 w-fit h-fit hover:bg-red-700 text-white font-bold rounded"
                    onClick={() => handleDeletePhuongTien(phuongTien._id)}
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

export default DanhSachPhuongTien;
