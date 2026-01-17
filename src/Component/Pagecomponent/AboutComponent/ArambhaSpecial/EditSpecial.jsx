import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const API_URL =
  "https://69671b18bbe157c088b0def6.mockapi.io/cruddata/arambhaproject";

const editSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be 5 character or more")
    .max(80, "Title must be 80 characters or less")
    .required("Title is required"),
  subtitle: Yup.string()
    .min(5, "Subtitle must be 5 character or more")
    .max(120, "Subtitle must be 120 characters or less")
    .required("Subtitle is required"),
  tag: Yup.string()
    .min(3, "Tag must be 3 character or more")
    .max(80, "Tag must be 80 characters or less")
    .required("Tag is required"),
  description: Yup.string()
    .min(10, "Description must be 10 character or more")
    .max(400, "Description must be 400 characters or less")
    .required("Description is required"),
  image: Yup.mixed().nullable(), 
});

function EditSpecial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const editorRef = useRef(null);

  const [initialData, setInitialData] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchItem = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`); 
      setInitialData(res.data);
      setImagePreview(res.data.image || "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to load special for editing");
      navigate("/specialtable");
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("tag", values.tag);
      formData.append("description", values.description);

      if (values.image) {
        formData.append("image", values.image);
      } else if (initialData.image) {
        formData.append("image", initialData.image);
      }

      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 

      if (res.status === 200) {
        toast.success("Special updated successfully!");
        navigate("/specialtable");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update special, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-red-800">
            Edit Hero Special
          </h2>
          <button
            onClick={() => navigate("/specialtable")}
            className="text-sm text-slate-600 hover:text-red-600"
          >
            Cancel & Back
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Formik
            enableReinitialize
            initialValues={{
              title: initialData.title || "",
              subtitle: initialData.subtitle || "",
              tag: initialData.tag || "",
              description: initialData.description || "",
              image: null,
            }}
            validationSchema={editSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Subtitle
                  </label>
                  <Field
                    name="subtitle"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="subtitle"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Tag
                  </label>
                  <Field
                    name="tag"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <ErrorMessage
                    name="tag"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                  </label>
                  <JoditEditor
                    ref={editorRef}
                    value={values.description}
                    config={{
                      height: 300,
                      readonly: false,
                      placeholder: "Edit hero description...",
                    }}
                    onBlur={(newContent) =>
                      setFieldValue("description", newContent)
                    }
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                    <span>{values.description.length}/400</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Hero Image
                  </label>
                  <div
                    onClick={handleImageClick}
                    className="flex h-48 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-400 transition hover:border-red-400 hover:text-red-400"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Hero preview"
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <IoCloudUploadSharp className="text-3xl" />
                        <p className="text-xs">
                          Click to upload or change hero image
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFieldValue("image", file);
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      } else {
                        setImagePreview(initialData.image || "");
                      }
                    }}
                  />
                </div>

                <div className="flex gap-3 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/specialtable")}
                    className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default EditSpecial;
