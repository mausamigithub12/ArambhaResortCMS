import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

const TableActions = ({ onView, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
      >
        <MoreVertical size={18} />
      </button>

      <div
        className={`
          absolute right-0 bottom-0  w-36   rounded-xl border border-slate-100 bg-white py-1 shadow-lg ring-1 ring-black/5 z-50
          transition-all duration-150 ease-out
          ${open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
        `}
      >
        <button
          type="button"
          onClick={() => {
            onView();
            setOpen(false);
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        >
          <Eye size={16} className="text-blue-500" />
          <span>View</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onEdit();
            setOpen(false);
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
        >
          <Pencil size={16} className="text-green-500" />
          <span>Edit</span>
        </button>

        <div className="my-1 h-px bg-slate-100" />

        <button
          type="button"
          onClick={() => {
            onDelete();
            setOpen(false);
          }}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} className="text-red-500" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TableActions;
