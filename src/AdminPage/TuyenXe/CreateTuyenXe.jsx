import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../Router/UseFetch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreateTuyenXe = () => {
  const [tuyenxe, setTuyenXe] = useState({
    DiemSanBay: "",
    DiemKetThuc: "",
    ThoiGianKhoiHanh: "",
    ThoiGianKetThuc: "",
  });
  const [sanBays, setSanBays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    data,
    error: fetchError,
    isLoading: fetchLoading,
  } = UseFetch(
    "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/GetDanhSachSanBay",
    "danhSachSanBay"
  );

  useEffect(() => {
    if (data) {
      setSanBays(data);
      setIsLoading(fetchLoading);
    }
    if (fetchError) {
      setError("Không thể lấy dữ liệu từ máy chủ");
    }
  }, [data, fetchError, fetchLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTuyenXe((prevTuyenXe) => ({
      ...prevTuyenXe,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !tuyenxe.DiemSanBay ||
      !tuyenxe.DiemKetThuc ||
      !tuyenxe.ThoiGianKhoiHanh
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const thoiGianKhoiHanh = new Date(
      `1970-01-01T${tuyenxe.ThoiGianKhoiHanh}:00Z`
    );
    const thoiGianKetThuc = new Date(
      `1970-01-01T${tuyenxe.ThoiGianKetThuc}:00Z`
    );

    if (thoiGianKetThuc <= thoiGianKhoiHanh) {
      alert("Thời gian kết thúc phải sau thời gian khởi hành");
      return;
    }

    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/CreateTuyen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            DiemSanBay: tuyenxe.DiemSanBay,
            DiemKetThuc: tuyenxe.DiemKetThuc,
            ThoiGianKhoiHanh: thoiGianKhoiHanh.toISOString(),
            ThoiGianKetThuc: new Date(
              thoiGianKhoiHanh.getTime() + 1 * 60 * 60 * 1000
            ),
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        alert("Thêm danh sách tuyến xe thành công");
        navigate("/DanhSachTuyenXe");
      } else {
        console.error(data);
        alert("Điểm kết thúc đã tồn tại vui lòng nhập điểm mới");
      }
    } catch (error) {
      console.error(error);
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
        Thêm danh sách tuyến xe
      </h1>
      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <label className="text-black">Điểm khởi hành</label>
          <select
            name="DiemSanBay"
            value={tuyenxe.DiemSanBay}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          >
            <option value="">Chọn điểm khởi hành</option>
            {isLoading ? (
              <option>Loading...</option>
            ) : (
              sanBays.map((sanBay) => (
                <option key={sanBay._id} value={sanBay.MaSB}>
                  {sanBay.MaSB}
                </option>
              ))
            )}
          </select>

          <label className="text-black pb-4">Điểm kết thúc</label>
          <input
            type="text"
            name="DiemKetThuc"
            value={tuyenxe.DiemKetThuc}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />

          <label className="text-black pb-4">Thời gian khởi hành</label>
          <input
            type="time"
            name="ThoiGianKhoiHanh"
            value={tuyenxe.ThoiGianKhoiHanh}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
          />
          <div className="flex justify-center">
            <button
              disabled={
                !tuyenxe.DiemSanBay ||
                !tuyenxe.DiemKetThuc ||
                !tuyenxe.ThoiGianKhoiHanh
              }
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 mt-4 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
            >
              Thêm tuyến xe
            </button>
            <Link className="px-4 py-4" to={`/DanhSachTuyenXe`}>
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

export default CreateTuyenXe;
