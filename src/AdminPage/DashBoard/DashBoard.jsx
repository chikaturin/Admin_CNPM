import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ChartBookingCar } from "./ChartBookingCar";

export const Dashboard = () => {
    const url = "https://cnpm-api-thanh-3cf82c42b226.herokuapp.com/api";
    const [isLoading, setIsLoading] = useState(true);
    const [slCar,setSlCar] = useState([]);
    const [slTrain,setSlTrain] = useState([]);
    const [slBus,setSlBus] = useState([]);
    const [error, setError] = useState(null);
    
    //get History
    useEffect(() => {
        //get HistoryCar
        const fetchHistoryCar = async () => {
            try {
              const response = await fetch(`${url}/GetLichSuDatXeOto`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setSlCar(result.lichSuDatXeOto || []);
            } catch (error) {
              setError("Không thể lấy dữ liệu từ máy chủ");
            }finally {
                setIsLoading(false);
            } 
        };
        //get HistoryTrain
        const fetchHistoryTrain = async () => {
            try {
              const response = await fetch(`${url}/GetLichSuDatTau`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setSlTrain(result.lichSuDatTau || []);
            } catch (error) {
              setError("Không thể lấy dữ liệu từ máy chủ");
            }finally {
                setIsLoading(false);
            } 
        };
        //get HistoryBus
        const fetchHistoryBus = async () => {
            try {
              const response = await fetch(`${url}/GetHistoryBus`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const result = await response.json();
              setSlBus(result.lichSuDatXeBus || []);
            } catch (error) {
              setError("Không thể lấy dữ liệu từ máy chủ");
            }finally {
                setIsLoading(false);
            } 
        };
        fetchHistoryCar();
        fetchHistoryTrain();
        fetchHistoryBus();
    }, []); 

    //Tính sl đã đặt
    const totalBookingsCar = slCar.length;
    const totalBookingsTrain = slTrain.length;
    const totalBookingsBus = slBus.length;

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
    <main className="">
      <div className="p-6">
      <h1 className="text-4xl font-semibold mb-6">Dashboard</h1>  
        {/*Responsive dòng 1*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Bảng 1 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">10</div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng chuyến
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: "60%" }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                60%
              </span>
            </div>
          </div>
          {/* Bảng 2 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">324</div>
                  <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                    +30%
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Khách hàng
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
              <img
                src="https://placehold.co/32x32"
                alt=""
                className="w-8 h-8 rounded-full object-cover block -ml-3"
              />
            </div>
          </div>
          {/* Bảng 3 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">
                  <span className="text-base font-normal text-gray-400 align-top">
                    đ
                  </span>
                  1,843,242,345
                </div>
                <div className="text-sm font-medium text-gray-400">
                  Lợi nhuận
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <a
              href="#"
              className="text-blue-500 font-medium text-sm hover:text-blue-600"
            >
              View details
            </a>
          </div>
        </div>
        {/*Responsive dòng 2*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Bảng 4 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
              {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">{totalBookingsCar}</div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt xe 
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: "50%" }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                50%
              </span>
            </div>
          </div>
          {/* Bảng 5 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
              {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">{totalBookingsTrain}</div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt Tàu
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: "20%" }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                20%
              </span>
            </div>
          </div>
          {/* Bảng 6 */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
              {/* Tổng số lượng xe đã đặt */}
                <div className="text-2xl font-semibold mb-1">{totalBookingsBus}</div>
                <div className="text-sm font-medium text-gray-400">
                  Số lượng đặt Bus 
                </div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-100 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full p-1"
                  style={{ width: "30%" }}
                >
                  <div className="w-2 h-2 rounded-full bg-white ml-auto"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 ml-4">
                30%
              </span>
            </div>
          </div>
        </div>
        {/*Responsive dòng 3*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Bảng 7 */}
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Manage bookings</div>
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"> <FontAwesomeIcon icon={faCaretDown} /></button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 order-tab">
                        <button type="button" data-tab="order" data-tab-page="active" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tl-md rounded-bl-md hover:text-gray-600 active">Active</button>
                        <button type="button" data-tab="order" data-tab-page="completed" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 hover:text-gray-600">Completed</button>
                        <button type="button" data-tab="order" data-tab-page="canceled" className="bg-gray-50 text-sm font-medium text-gray-400 py-2 px-4 rounded-tr-md rounded-br-md hover:text-gray-600">Canceled</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[540px]" data-tab-for="order" data-page="active">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="w-full min-w-[540px] hidden" data-tab-for="order" data-page="completed">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Completed</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="w-full min-w-[540px] hidden" data-tab-for="order" data-page="canceled">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Budget</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">3 days</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$56</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Canceled</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
            {/* Bảng 8 */}
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                    <div className="flex justify-between mb-4 items-start">
                        <div className="font-medium">Manage Services</div>
                        <div className="dropdown">
                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><FontAwesomeIcon icon={faCaretDown} /></button>
                            
                        </div>
                    </div>
                    <form action="" className="flex items-center mb-4">
                        <div className="relative w-full mr-2">
                            <input type="text" className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..."/>
                            <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <select className="text-sm py-2 pl-4 pr-10 bg-gray-50 border border-gray-100 rounded-md focus:border-blue-500 outline-none appearance-none bg-select-arrow bg-no-repeat bg-[length:16px_16px] bg-[right_16px_center]">
                            <option value="">All</option>
                        </select>
                    </form>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[540px]">
                            <thead>
                                <tr>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Price</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Clicks</th>
                                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">1K</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><FontAwesomeIcon icon={faCaretDown} /></button>
                                            
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">1K</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><FontAwesomeIcon icon={faCaretDown} /></button>
                                            
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">1K</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><FontAwesomeIcon icon={faCaretDown} /></button>
                                            
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">1K</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><FontAwesomeIcon icon={faCaretDown} /></button>
                                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block"/>
                                            <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">$235</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-gray-400">1K</span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <div className="dropdown">
                                            <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600 text-sm w-6 h-6 rounded flex items-center justify-center bg-gray-50"><FontAwesomeIcon icon={faCaretDown} /></button>
                                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
        <ChartBookingCar />
        
    </div>  
    </main>
  );
};
