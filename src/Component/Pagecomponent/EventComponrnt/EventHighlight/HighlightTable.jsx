import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TableActions from "../../TableAction";
const STORAGE_KEY = "highlights";
const HighlightTable = () => {
  const [highlights, setHighlights] = useState([]);
  const navigate = useNavigate();

  const loadData = () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setHighlights(stored);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;

    const updated = highlights.filter((h) => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setHighlights(updated);
    toast.success("Deleted successfully");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Highlights CMS</h2>
        <button
          onClick={() => navigate("/addhighlight")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          + Add
        </button>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Image</th>
            <th className="p-3">Category</th>
            <th className="p-3">Title</th>
            <th className="p-3">Tagline</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {highlights.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No highlights found
              </td>
            </tr>
          ) : (
            highlights.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">
                  <td className="p-3">{index + 1}</td>
                </td>

                <td className="p-3">
                  <img
                    src={item.image}
                    className="w-16 h-12 rounded object-cover"
                  />
                </td>
                <td className="p-3">{item.category}</td>
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3">{item.tagline}</td>

                <td className="p-3 text-center">
                  {/* <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 text-xs font-semibold"
                  >
                    Delete
                  </button> */}
                  <TableActions
                   onDelete={()=>handleDelete(item.id)}
                   onView={() => navigate(`/highlighttable/view/${item.id}`)}
  onEdit={() => navigate(`/highlighttable/edit/${item.id}`)}
                  />

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HighlightTable;
