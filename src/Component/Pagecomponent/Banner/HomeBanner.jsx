import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCloudUploadSharp } from "react-icons/io5";
import JoditEditor from "jodit-react";
import toast, { Toaster } from "react-hot-toast";

const heroSchema = Yup.object({
  title: Yup.string()
  .min(5,"Title must be 5 character or more")
    .max(80, "Title must be 80 characters or less")
    .required("Title is required"),

  subtitle: Yup.string()
    .min(5,"subtitle must be 5 character or more")

    .max(120, "Subtitle must be 120 characters or less")
    .required("Subtitle is required"),

  description: Yup.string()
    .min(10,"Title must be 10 character or more")

    .max(400, "Description must be 400 characters or less")
    .required("Description is required"),

  image: Yup.mixed().required("Image is required"),
});

function HeroForm() {
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
    <div className="mt-10 flex justify-center">
      <Toaster position="top-right" />

      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-slate-800">
          Hero Section Content
        </h2>
        <p className="mb-6 text-sm text-slate-500">
          Manage the title, subtitle, description and image shown in your hero section.
        </p>

        <Formik
          initialValues={{
            title: "",
            subtitle: "",
            description: "",
            image: null,
          }}
          validationSchema={heroSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log("Hero form values:", values);

            toast.success("Hero section saved successfully!");

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
                  placeholder="Celebrate Life's Beautiful Moments"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="title" component="div" className="mt-1 text-xs text-red-500" />
              </div>

              {/* Subtitle */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Subtitle
                </label>
                <Field
                  name="subtitle"
                  type="text"
                  placeholder="Arambha Resort · Butwal, Nepal"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500"
                />
                <ErrorMessage name="subtitle" component="div" className="mt-1 text-xs text-red-500" />
              </div>

              {/* Description - Jodit Editor */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <JoditEditor
                  ref={editorRef}
                  value={values.description}
                  config={{
                    height: 200,
                    readonly: false,
                    placeholder: "Write hero description...",
                  }}
                  onBlur={(newContent) =>
                    setFieldValue("description", newContent)
                  }
                />

                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                  <span>{values.description.length}/400</span>
                </div>
              </div>

              {/* Image Upload */}
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
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default HeroForm;
