import React from "react";
const SpecialTable = () => {
return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Arambha Specials
      </h2>

      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Tag
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
          </tr>
        </thead>

        <tbody>
            <tr
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">
                {/* <img
                  src={item.img}
                  alt={item.title}
                  className="w-20 h-14 object-cover rounded-md"
                /> */}
              </td>

              <td className="px-4 py-3 font-medium text-gray-800">
                {/* {item.title} */}
              </td>

              <td className="px-4 py-3">
                <span className="px-3 py-1 text-xs font-semibold bg-sky-100 text-sky-700 rounded-full">
                  {/* {item.tag} */}
                </span>
              </td>

              <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
                {/* {item.desc} */}
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SpecialTable;
