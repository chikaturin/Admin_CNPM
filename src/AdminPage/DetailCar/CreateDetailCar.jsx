import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../Router/UseFetch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const CreateDetailCar = () => {
  const [sanBays, setSanBays] = useState([]);
  const [detailCar, setDetailCar] = useState({
    TenHangXe: "",
    TenChuSoHuu: "",
    SoHanhLyToiDa: "",
    BienSoXe: "",
    CongTy: "",
    SDT_TaiXe: "",
    SoGheToiDa: "",
    SoTien_1km: "",
    Image: "",
    MaSB: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    setDetailCar((prevDetailCar) => ({
      ...prevDetailCar,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(detailCar).some((value) => !value)) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await fetch(
        "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api/CreateDetailCar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detailCar),
        }
      );

      const responseData = await res.json();

      if (res.status === 201) {
        alert("Thêm chi tiết xe thành công");
        navigate("/ListDetailCar");
      } else {
        console.error(responseData);
        alert("Đã xảy ra lỗi khi thêm chi tiết xe");
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
    <div className="w-full h-full bg-white p-4">
      {error && <div className="text-red-500">{error}</div>}

      <div className="pt-4 flex justify-center">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex ">
              <div className="pr-7">
                <label className="text-black pb-4">Tên hãng xe</label>
                <input
                  type="text"
                  value={detailCar.TenHangXe || ""}
                  onChange={handleChange}
                  name="TenHangXe"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Tên chủ sở hữu</label>
                <input
                  type="text"
                  value={detailCar.TenChuSoHuu || ""}
                  onChange={handleChange}
                  name="TenChuSoHuu"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Số hành lý tối đa</label>
                <input
                  type="text"
                  value={detailCar.SoHanhLyToiDa || ""}
                  onChange={handleChange}
                  name="SoHanhLyToiDa"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Biển số xe</label>
                <input
                  type="text"
                  value={detailCar.BienSoXe || ""}
                  onChange={handleChange}
                  name="BienSoXe"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Công ty</label>
                <input
                  type="text"
                  value={detailCar.CongTy || ""}
                  onChange={handleChange}
                  name="CongTy"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-black pb-4">Số điện thoại tài xế</label>
                <input
                  type="text"
                  value={detailCar.SDT_TaiXe || ""}
                  onChange={handleChange}
                  name="SDT_TaiXe"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Số ghế tối đa</label>
                <input
                  type="text"
                  value={detailCar.SoGheToiDa || ""}
                  onChange={handleChange}
                  name="SoGheToiDa"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Số tiền 1km</label>
                <input
                  type="number"
                  value={detailCar.SoTien_1km || ""}
                  onChange={handleChange}
                  name="SoTien_1km"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Hình ảnh</label>
                <input
                  type="text"
                  value={detailCar.Image || ""}
                  onChange={handleChange}
                  name="Image"
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                />
                <label className="text-black pb-4">Mã sân bay</label>
                <select
                  name="MaSB"
                  value={detailCar.MaSB}
                  onChange={handleChange}
                  className="w-full mt-2 bg-slate-100 border-black rounded-lg p-2"
                >
                  <option value="">Chọn mã sân bay</option>
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
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={Object.values(detailCar).some((value) => !value)}
                className="bg-blue-500 px-4 py-2 w-fit h-fit hover:bg-blue-700 text-white font-bold rounded"
              >
                Thêm chi tiết xe
              </button>
              <Link className="px-4" to="/ListDetailCar">
                <button className="bg-red-500 px-4 py-2 hover:bg-red-700 text-white font-bold rounded">
                  <FontAwesomeIcon icon={faXmark} /> Hủy
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDetailCar;
