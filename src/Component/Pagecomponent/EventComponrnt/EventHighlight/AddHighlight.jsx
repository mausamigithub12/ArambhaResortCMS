import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCloudUploadSharp } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "highlights";

const highlightSchema = Yup.object({
  category: Yup.string().min(5).max(80).required(),
  title: Yup.string().min(5).max(80).required(),
  tagline: Yup.string().min(5).max(120).required(),
  image: Yup.mixed().required("Image is required"),
});

const AddHighlight = () => {
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);


// converting image to string for localstorage
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="flex flex-col items-center p-6">
      <Toaster position="top-right" />

      <h2 className="mb-2 text-xl font-semibold text-red-800">
        Add Highlight
      </h2>

      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow">
        <Formik
          initialValues={{
            category: "",
            title: "",
            tagline: "",
            image: null,
          }}
          validationSchema={highlightSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const base64Image = await toBase64(values.image);

              const newItem = {
                id: Date.now().toString(),
                category: values.category,
                title: values.title,
                tagline: values.tagline,
                image: base64Image,
                createdAt: new Date().toISOString(),
              };

              const existing =
                JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify([...existing, newItem])
              );

              toast.success("Highlight added successfully");
              resetForm();
              setImagePreview("");

              navigate("/highlighttable");
            } catch (err) {
              toast.error("Failed to save");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form className="space-y-5">
              <FieldBlock name="category" label="Category" />
              <FieldBlock name="title" label="Title" />
              <FieldBlock name="tagline" label="Tagline" />

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image
                </label>
                <div
                  onClick={() => imageInputRef.current.click()}
                  className="h-40 border border-dashed rounded-xl flex items-center justify-center cursor-pointer"
                >
                  {values.image ? (
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
                    setFieldValue("image", file);
                    setImagePreview(URL.createObjectURL(file));
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const FieldBlock = ({ name, label }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <Field
      name={name}
      className="w-full border rounded-lg px-3 py-2 text-sm"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-xs text-red-500"
    />
  </div>
);

export default AddHighlight;
