import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";

const roomSchema = Yup.object({
  title: Yup.string()
  .min(5,"Title must be 5 character or more")
    .max(80, "Title must be 80 characters or less")
    .required("Title is required"),

  subtitle: Yup.string()
    .min(5,"subtitle must be 5 character or more")

    .max(120, "Subtitle must be 120 characters or less")
    .required("Subtitle is required"),

  

  image: Yup.mixed().required("Image is required"),
});

function RoomBanner() {
  const imageInputRef = useRef(null);
  const editorRef = useRef(null);

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster position="top-right" />
        <h2 className="mb-2 text-xl font-semibold text-red-800">
          Room Section Content
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Manage the title, subtitle,  image shown in your room section.
        </p>

      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <Formik
          initialValues={{
            title: "",
            subtitle: "",
            image: null,
          }}
          validationSchema={roomSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(" form values:", values);

            toast.success("Your data submit successfully!");

            setSubmitting(false);
            resetForm();
            setImagePreview("");
          }}
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
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-1 outline-none focus:ring-red-500"
                />
                <ErrorMessage name="title" component="div" className="mt-1 text-xs text-red-500" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subtitle
                </label>
                <Field
                  name="subtitle"
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-500"
                />
                <ErrorMessage name="subtitle" component="div" className="mt-1 text-xs text-red-500" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Hero Image
                </label>

                <div
                  onClick={handleImageClick}
                  className="flex h-48 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-400 transition hover:border-red-400 hover:text-red-400"
                >
                  {values.image ? (
                    <img
                      src={imagePreview}
                      alt="Hero preview"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <IoCloudUploadSharp className="text-3xl" />
                      <p className="text-xs">Click to upload hero image</p>
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
                      setImagePreview("");
                    }
                  }}
                />

                <ErrorMessage name="image" component="div" className="mt-1 text-xs text-red-500" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2 justify-end">
                 <button
                  type="button"
                  className="rounded-xl cursor-pointer border border-slate-300 px-5 py-2 text-sm font-semibold text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl cursor-pointer bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

               
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RoomBanner;
