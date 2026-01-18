import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IoCloudUploadSharp } from "react-icons/io5";

const STORAGE_KEY = "highlights";

const schema = Yup.object({
  category: Yup.string().required(),
  title: Yup.string().required(),
  tagline: Yup.string().required(),
});

const EditHighlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const [initialData, setInitialData] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const found = data.find((h) => h.id === id);
    if (found) {
      setInitialData(found);
      setImagePreview(found.image);
    }
  }, [id]);

  if (!initialData) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Highlight</h2>

      <Formik
        initialValues={initialData}
        validationSchema={schema}
        onSubmit={(values) => {
          const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
          const updated = data.map((h) =>
            h.id === id ? { ...h, ...values, image: imagePreview } : h
          );

          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          toast.success("Updated successfully");
          navigate("/highlighttable");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <FieldBlock name="category" label="Category" />
            <FieldBlock name="title" label="Title" />
            <FieldBlock name="tagline" label="Tagline" />

            {/* Image */}
            <div>
              <label className="block mb-1">Image</label>
              <div
                onClick={() => imageInputRef.current.click()}
                className="h-40 border border-dashed rounded-xl flex items-center justify-center cursor-pointer"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <IoCloudUploadSharp size={28} />
                )}
              </div>

              <input
                ref={imageInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                }}
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded-xl"
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const FieldBlock = ({ name, label }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <Field
      name={name}
      className="w-full border rounded-lg px-3 py-2"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-xs text-red-500"
    />
  </div>
);

export default EditHighlight;
