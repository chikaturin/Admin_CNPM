import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreateTramDung = () => {
  const [MaTuyen, setMaTuyen] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [GiaTienVe, setGiaTienVe] = useState("");
  const [SoKM, setSoKM] = useState("");
  const [GiaTienVeTau, setGiaTienVeTrain] = useState("");
  const [tuyenList, setTuyenList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTuyen = async () => {
      try {
        const res = await fetch(
          "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetTuyen"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        setTuyenList(result.tuyen || []);
      } catch (error) {
        setError("Không thể lấy dữ liệu từ máy chủ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTuyen();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!MaTuyen || !DiaChi || !GiaTienVe || !SoKM || !GiaTienVeTau) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const res = await fetch("https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/CreateTramDung", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaTuyen,
          DiaChi,
          GiaTienVe: parseFloat(GiaTienVe),
          SoKM: parseFloat(SoKM),
          GiaTienVeTau: parseFloat(GiaTienVeTau),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Thêm trạm dừng thành công!");
        setMaTuyen("");
        setDiaChi("");
        setGiaTienVe("");
        setSoKM("");
        setGiaTienVeTrain("");
        navigate("/DanhSachTramDung");
      } else {
        alert(`Thêm thất bại: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding tram dung:", error);
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
    <div className="w-full h-full bg-white p-4">
      <h1 className="text-center text-2xl text-black mb-4">Thêm Trạm Dừng</h1>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-black mb-2">Mã Tuyến</label>
          <select
            value={MaTuyen}
            onChange={(e) => setMaTuyen(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          >
            <option value="">Chọn Mã Tuyến</option>
            {tuyenList.map((tuyen) => (
              <option key={tuyen._id} value={tuyen.MaTuyen}>
                {tuyen.MaTuyen}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Địa Chỉ</label>
          <input
            type="text"
            value={DiaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Giá Tiền Vé</label>
          <input
            type="number"
            value={GiaTienVe}
            onChange={(e) => setGiaTienVe(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Giá Tiền Vé tàu</label>
          <input
            type="number"
            value={GiaTienVeTau}
            onChange={(e) => setGiaTienVeTrain(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2">Số KM</label>
          <input
            type="number"
            value={SoKM}
            onChange={(e) => setSoKM(e.target.value)}
            className="w-full bg-slate-100 border-black rounded-lg p-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 px-4 h-fit py-2 mt-4 hover:bg-blue-700 text-white font-bold rounded"
          >
            Thêm Trạm Dừng
          </button>
          <Link className="px-4 py-4" to={`/DanhSachTramDung`}>
            <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
              <FontAwesomeIcon icon={faXmark} /> Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateTramDung;
