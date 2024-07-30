import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faChartLine } from "@fortawesome/free-solid-svg-icons";
import {
  faRoute,
  faBus,
  faMapLocationDot,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <div className="bg-custom-gradient w-1/4 p-0 m-0 min-h-screen">
      <h1 className="font-extrabold text-white text-center pt-4">
        DANH MỤC QUẢN LÝ
      </h1>
      <div className="p-4">
        <ul>
          <li>
            <a
              href="/"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faChartLine} /> DashBoard
            </a>
          </li>
          <li className="pt-6">
            <a
              href="/DanhSachSanBay"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faPlane} /> Danh sách sân bay
            </a>
          </li>
          <li className="pt-6">
            <a
              href="/DanhSachTuyenXe"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faRoute} /> Danh sách tuyến xe
            </a>
          </li>
          <li className="pt-6">
            <a
              href="/PhuongTien"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faBus} /> Danh sách phương tiện
            </a>
          </li>
          <li className="pt-6">
            <a
              href="/DanhSachTramDung"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faMapLocationDot} /> Danh sách Trạm Dừng
            </a>
          </li>
          <li className="pt-6">
            <a
              href="/ListDetailCar"
              className="route text-white text-xl font-extrabold hover:text-black"
            >
              <FontAwesomeIcon icon={faCar} /> Danh sách Chi Tiết Xe
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
