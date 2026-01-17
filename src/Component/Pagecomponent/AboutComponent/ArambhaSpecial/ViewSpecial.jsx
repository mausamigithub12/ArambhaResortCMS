import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL =
  "https://69671b18bbe157c088b0def6.mockapi.io/cruddata/arambhaproject";

function ViewSpecial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`); 
      setItem(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load special");
      navigate("/specialtable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="mb-4 text-slate-600">Special not found.</p>
        <button
          onClick={() => navigate("/specialtable")}
          className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
        >
          Back to table
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/specialtable")}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-red-600"
          >
            <span>←</span> Back to Specials
          </button>

          <button
            onClick={() => navigate(`/specialtable/editspecial/${item.id}`)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
          >
            Edit Special
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="h-64 md:h-full bg-slate-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  No image available
                </div>
              )}
            </div>

            {/* Content side */}
            <div className="p-6 md:p-8 space-y-5">
              <div className="space-y-2">
                <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {item.tag}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {item.title}
                </h1>
                <p className="text-sm md:text-base text-slate-600">
                  {item.subtitle}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Description
                </h2>
                <div
                  className="prose prose-sm max-w-none text-slate-700"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500">
                <span>
                  Created:{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "N/A"}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>ID: {item.id}</span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/specialtable/editspecial/${item.id}`)}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Edit
                </button>
                <Link
                  to="/specialtable"
                  className="px-5 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back to table
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSpecial;
