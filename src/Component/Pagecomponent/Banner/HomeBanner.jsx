import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HeroSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),

  subtitle: Yup.string()
    .min(3, "Too Short!")
    .max(80, "Too Long!")
    .required("Subtitle is required"),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),

  image: Yup.mixed()
    .required("Hero image is required")
    .test(
      "fileSize",
      "Image size is too large (max 2MB)",
      (value) => value && value.size <= 2 * 1024 * 1024
    )
    .test(
      "fileType",
      "Only JPG, JPEG, PNG files are allowed",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    ),
});

const HomeBanner = () => {
  const [preview, setPreview] = useState(null);

  return (
    <div className=" mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-semibold  text-gray-800">
        Hero Section CMS
      </h2>

      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          description: "",
          image: null,
        }}
        validationSchema={HeroSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Hero Data:", values);

          alert("Hero section updated successfully!");
          resetForm();
          setPreview(null);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            {/* Title */}
            <div>
              <label className="block font-medium">Title</label>
              <Field
                name="title"
                type="text"
                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-sky-200"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block font-medium">Subtitle</label>
              <Field
                name="subtitle"
                type="text"
                className="w-full mt-1 p-2 border rounded-lg"
              />
              <ErrorMessage
                name="subtitle"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <Field
                name="description"
                as="textarea"
                rows="4"
                className="w-full mt-1 p-2 border rounded-lg"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium">Hero Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                  setPreview(URL.createObjectURL(file));
                }}
                className="mt-1"
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm mt-1"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-40 rounded-lg object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
            >
              Save Hero Section
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomeBanner;
