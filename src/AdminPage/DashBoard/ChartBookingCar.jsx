import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Chart } from "chart.js/auto";
import {
  Bar,
  Doughnut,
  Line,
  Pie,
  PolarArea,
  Radar,
  Scatter,
} from "react-chartjs-2";

export const ChartBookingCar = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Đã đặt',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(59, 130, 246)',
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgb(59 130 246 / .05)',
                tension: .2
            },
            {
                label: 'Đã hoàn thành',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(16, 185, 129)',
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgb(16 185 129 / .05)',
                tension: .2
            },
            {
                label: 'Hủy chuyến',
                data: generateRandomData(7),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: 'rgb(244, 63, 94)',
                borderColor: 'rgb(244, 63, 94)',
                backgroundColor: 'rgb(244 63 94 / .05)',
                tension: .2
            },
        ],
    };
      
    const options = {
        options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    };

    function generateRandomData(n) {
        const data = []
        for(let i=0; i<n; i++) {
            data.push(Math.round(Math.random() * 10))
        }
        return data
    }  



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
        <div className="flex justify-between mb-4 items-start">
          <div className="font-medium">Bookings Car</div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="rounded-md border border-dashed border-gray-200 p-4">
            <div className="flex items-center mb-0.5">
              <div className="text-xl font-semibold">10</div>
              <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                $80
              </span>
            </div>
            <span className="text-gray-400 text-sm">Đã đặt</span>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-4">
            <div className="flex items-center mb-0.5">
              <div className="text-xl font-semibold">50</div>
              <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                +$469
              </span>
            </div>
            <span className="text-gray-400 text-sm">Đã hoàn thành</span>
          </div>
          <div className="rounded-md border border-dashed border-gray-200 p-4">
            <div className="flex items-center mb-0.5">
              <div className="text-xl font-semibold">4</div>
              <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                -$130
              </span>
            </div>
            <span className="text-gray-400 text-sm">Hủy chuyến</span>
          </div>
        </div>
        {/* Line Chart */}
        <div>
          <Line data={data} options={options}  />
        </div>
      </div>
      <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
        <div className="flex justify-between mb-4 items-start">
          <div className="font-medium">Earnings</div>
          <div className="dropdown">
            <button
              type="button"
              className="dropdown-toggle text-gray-400 hover:text-gray-600"
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px]">
            <thead>
              <tr>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                  Service
                </th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                  Earning
                </th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-emerald-500">
                    +$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-rose-500">
                    -$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                    Withdrawn
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-emerald-500">
                    +$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-rose-500">
                    -$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                    Withdrawn
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-emerald-500">
                    +$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-rose-500">
                    -$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                    Withdrawn
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-emerald-500">
                    +$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-rose-500">
                    -$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                    Withdrawn
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-emerald-500">
                    +$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                    Pending
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/32x32"
                      alt=""
                      className="w-8 h-8 rounded object-cover block"
                    />
                    <a
                      href="#"
                      className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                    >
                      Create landing page
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="text-[13px] font-medium text-rose-500">
                    -$235
                  </span>
                </td>
                <td className="py-2 px-4 border-b border-b-gray-50">
                  <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                    Withdrawn
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
