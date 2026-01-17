import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TableActions from "../../TableAction";
import toast from "react-hot-toast";

const API_URL =
  "https://69671b18bbe157c088b0def6.mockapi.io/cruddata/arambhaproject";

const SpecialTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL); 
      setData(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load specials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`); 
      toast.success("Deleted successfully");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Specials Table</h2>
        <button
          onClick={() => navigate("/addspecial")}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          + Add Special
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-slate-50 text-left text-sm">
            <th className="p-3">ID</th>
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Subtitle</th>
            <th className="p-3">Tag</th>
            <th className="p-3">Description</th>
            <th className="p-3">Created At</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b text-sm">
              <td className="p-3 font-medium">{item.id}</td>

              <td className="p-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                ) : (
                  <span className="text-xs text-gray-400">No image</span>
                )}
              </td>

              <td className="p-3 font-medium">{item.title}</td>
              <td className="p-3">{item.subtitle}</td>
              <td className="p-3">{item.tag}</td>

              <td className="p-3 max-w-xs">
                <div
                  className="line-clamp-3 text-xs text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </td>

              <td className="p-3">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-3 text-center">
                <TableActions
                  onView={() =>
                    navigate(`/specialtable/viewspecial/${item.id}`)
                  }
                  onEdit={() =>
                    navigate(`/specialtable/editspecial/${item.id}`)
                  }
                  onDelete={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialTable;
