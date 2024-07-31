import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreatePhuongTien = () => {
  const [phuongtien, setPhuongTien] = useState({
    MaTuyen: "",
    MaLoai: true, // true for bus, false for train
    TenPhuongTien: "",
    SoGheToiDa: "",
    image: "",
    TenCty: "",
  });
  const [tuyenXes, setTuyenXes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchPhuongTien = async () => {
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetTuyen"
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await res.json();
      setTuyenXes(result.tuyen || []);
    } catch (error) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhuongTien();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhuongTien((prevPhuongTien) => ({
      ...prevPhuongTien,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setPhuongTien((prevPhuongTien) => ({
      ...prevPhuongTien,
      MaLoai: !prevPhuongTien.MaLoai,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !phuongtien.MaTuyen ||
      phuongtien.MaLoai === null ||
      !phuongtien.TenPhuongTien ||
      !phuongtien.SoGheToiDa ||
      !phuongtien.image ||
      !phuongtien.TenCty
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/CreatePhuongTien",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(phuongtien),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert("Thêm danh sách phương tiện thành công");
        navigate("/PhuongTien");
      } else {
        console.error("Error data:", data);
        alert("Đã xảy ra lỗi khi thêm phương tiện");
      }
    } catch (error) {
      console.error("Error caught:", error);
      alert("Đã xảy ra lỗi khi kết nối tới máy chủ");
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
    <div className="w-full h-full bg-white">
      <h1 className="text-center text-2xl text-black pt-4 font-extrabold">
        Thêm danh sách phương tiện
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black pb-4">Mã Tuyến</label>
          <select
            name="MaTuyen"
            value={phuongtien.MaTuyen}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          >
            <option value="">Chọn Mã tuyến</option>
            {tuyenXes.map((tuyenXe) => (
              <option key={tuyenXe._id} value={tuyenXe.MaTuyen}>
                {tuyenXe.MaTuyen}
              </option>
            ))}
          </select>

          <label className="text-black pb-4">Mã loại</label>
          <button
            onClick={handleToggle}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          >
            {phuongtien.MaLoai ? "Bus" : "Train"}
          </button>

          <label className="text-black pb-4">Tên phương tiện</label>
          <input
            type="text"
            name="TenPhuongTien"
            value={phuongtien.TenPhuongTien}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Số ghế tối đa</label>
          <input
            type="text"
            name="SoGheToiDa"
            value={phuongtien.SoGheToiDa}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Ảnh</label>
          <input
            type="text"
            name="image"
            value={phuongtien.image}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />
          <label className="text-black pb-4">Tên Công Ty</label>
          <input
            type="text"
            name="TenCty"
            value={phuongtien.TenCty}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />
          <div className="flex justify-center">
            <button
              disabled={
                !phuongtien.MaTuyen ||
                phuongtien.MaLoai === null ||
                !phuongtien.TenPhuongTien ||
                !phuongtien.SoGheToiDa ||
                !phuongtien.image ||
                !phuongtien.TenCty
              }
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm phương tiện
            </button>
            <Link className="px-4 py-4" to="/PhuongTien">
              <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
                <FontAwesomeIcon icon={faXmark} /> Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePhuongTien;
