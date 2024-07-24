import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import DanhSachSanBay from "../AdminPage/ListSanBay/DanhSachSanBay.jsx";
import CreateDanhSachSanBay from "../AdminPage/ListSanBay/CreateDanhSachSanBay.jsx";
import DanhSachTuyenXe from "../AdminPage/TuyenXe/DanhSachTuyenXe.jsx";
import CreateTuyenXe from "../AdminPage/TuyenXe/CreateTuyenXe.jsx";
import PhuongTien from "../AdminPage/PhuongTien/DanhSachPhuongTien.jsx";
import CreatePhuongTien from "../AdminPage/PhuongTien/CreatePhuongTien.jsx";
import DanhSachTramDung from "../AdminPage/TramDung/DanhSachTramDung.jsx";
import CreateTramDung from "../AdminPage/TramDung/CreateTramDung.jsx";
import ListDetailCar from "../AdminPage/DetailCar/ListDetailCar.jsx";
import CreateDetailCar from "../AdminPage/DetailCar/CreateDetailCar.jsx";
import GetDetailCar from "../AdminPage/DetailCar/GetDetailCar.jsx";
import EditDetailCar from "../AdminPage/DetailCar/UpdateDetail.jsx";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DanhSachSanBay />,
      },
      {
        path: "CreateDanhSachSanBay",
        element: <CreateDanhSachSanBay />,
      },
      {
        path: "DanhSachTuyenXe",
        element: <DanhSachTuyenXe />,
      },
      {
        path: "CreateTuyenXe",
        element: <CreateTuyenXe />,
      },
      {
        path: "PhuongTien",
        element: <PhuongTien />,
      },
      {
        path: "CreatePhuongTien",
        element: <CreatePhuongTien />,
      },
      {
        path: "DanhSachTramDung",
        element: <DanhSachTramDung />,
      },
      {
        path: "CreateTramDung",
        element: <CreateTramDung />,
      },
      {
        path: "ListDetailCar",
        element: <ListDetailCar />,
      },
      {
        path: "CreateDetailCar",
        element: <CreateDetailCar />,
      },
      {
        path: `GetDetailCar/:id`,
        element: <GetDetailCar />,
      },
      {
        path: `EditDetailCar/:id`,
        element: <EditDetailCar />,
      },
    ],
  },
]);

export default router;
