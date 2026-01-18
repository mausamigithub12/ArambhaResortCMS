import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const STORAGE_KEY = "highlights";

const ViewHighlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const found = data.find((h) => h.id === id);
    setItem(found);
  }, [id]);

  if (!item) {
    return <p className="p-6 text-center">Highlight not found</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">View Highlight</h2>

      <img
        src={item.image}
        className="w-full h-72 bg-black object-contain rounded mb-4"
      />

      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Title:</strong> {item.title}</p>
      <p><strong>Tagline:</strong> {item.tagline}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>
    </div>
  );
};

export default ViewHighlight;
