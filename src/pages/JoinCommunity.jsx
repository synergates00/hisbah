import React, { useState } from "react";
import * as Yup from "yup";
import { katsinaLgas } from "../lib/lga";
import { supabase } from "../lib/supabase";
import Modal from "react-modal";
import Lottie from "react-lottie";
import animationData from "../assets/Success.json";
import { useNavigate } from "react-router-dom";

const defaultOptions = {
  loop: true, // Set to true for continuous animation
  autoplay: true, // Set to true for automatic playback
  animationData, // Replace with animation data (local or URL)
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice", // Adjust aspect ratio as needed
  },
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function JoinCommunity() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nin: "",
    lga: "",
    address: "",
    occupation: "",
    ward: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Please enter your name"),
    nin: Yup.string().min(10).required("Please enter a valid NIN"),
    lga: Yup.string().min(4).required("Please Select LGA"),
    address: Yup.string().min(5).required("Please Enter Your Address"),
    occupation: Yup.string().required("Please Select Occupation"),
    ward: Yup.string().min(4).required("Please Select Ward"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    phone: Yup.string()
      .required("Please enter your phone number")
      .matches(/^\d{11}$/, "Phone number must be 11 digits"),
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // Form data is valid, submit the form here
      setLoading(true);
      console.log("Form submitted successfully!", formData);
      const { data, error } = await supabase
        .from("members") // Replace with your table name
        .insert([formData]);
      setIsOpen(true);
      setLoading(false);
      if (error) {
        setLoading(false);
        alert("Request is not successful at the moment");
        throw error; // Re-throw for error handling
      }

      setFormData({
        name: "",
        email: "",
        nin: "",
        lga: "",
        address: "",
        occupation: "",
        ward: "",
        phone: "",
      }); // Clear form after successful submission
      setErrors({}); // Clear any previous errors
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='min-h-screen bg-gray-200 pt-12 md:pt-4 flex items-center justify-center'>
      <div className='p-4 bg-white rounded-lg shadow-md w-4/5 mx-auto md:w-3/5'>
        <div className='mb-5'>
          <p className='text-brand text-[10px] md:text-sm font-semibold'>
            Hisbah Katsina
          </p>
          <h2 className='text-black font-bold text-sm md:text-lg'>
            Join Our Community Now
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>Your Name</label>
              <input
                placeholder='Enter full name'
                className={`bg-gray-50 shadow-sm px-3 py-2 outline-teal-600 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
                name='name'
              />
              {errors.name && (
                <p className='text-red-500 text-xs'>{errors.name}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>Your Email</label>
              <input
                placeholder='Enter Email Address'
                className={`bg-gray-50 px-3 shadow-sm py-2 outline-teal-600 ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={formData.email}
                onChange={handleChange}
                name='email'
              />
              {errors.email && (
                <p className='text-red-500 text-xs'>{errors.email}</p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>Your NIN</label>
              <input
                placeholder='National Identity Number'
                className={`bg-gray-50 shadow-sm px-3 py-2 outline-teal-600 ${
                  errors.nin ? "border-red-500" : ""
                }`}
                value={formData.nin}
                onChange={handleChange}
                name='nin'
              />
              {errors.nin && (
                <p className='text-red-500 text-xs'>{errors.nin}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>
                Local Government Area (LGA)
              </label>
              <select
                onChange={handleChange}
                name='lga'
                className='bg-gray-50 px-3 rounded-md shadow-sm py-2 outline-teal-600 border-none'
              >
                <option></option>
                {katsinaLgas.map((data, i) => (
                  <option key={i}>{data}</option>
                ))}
              </select>
              {errors.lga && (
                <p className='text-red-500 text-xs'>{errors.lga}</p>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>
                Enter Your Address
              </label>
              <input
                placeholder='Home Address'
                className={`bg-gray-50 shadow-sm px-3 py-2 outline-teal-600 ${
                  errors.address ? "border-red-500" : ""
                }`}
                value={formData.address}
                onChange={handleChange}
                name='address'
              />
              {errors.address && (
                <p className='text-red-500 text-xs'>{errors.address}</p>
              )}
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>
                Your Occupation
              </label>
              <select
                onChange={handleChange}
                name='occupation'
                className='bg-gray-50 px-3 rounded-md shadow-sm py-2 outline-teal-600 border-none'
              >
                <option></option>
                <option>Civil Servant</option>
                <option>Business Owner</option>
                <option>Student</option>
                <option>Others</option>
              </select>
              {errors.occupation && (
                <p className='text-red-500 text-xs'>{errors.occupation}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mt-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>Select Ward</label>
              <select
                onChange={handleChange}
                name='ward'
                className='bg-gray-50 px-3 rounded-md shadow-sm py-2 outline-teal-600 border-none'
              >
                <option></option>
                <option>WAKILIN GABAS I WARD</option>
                <option>WAKILIN GABAS II WARD</option>
                <option>KANGIWA WARD</option>
                <option>WAKILIN YAMMA I WARD</option>
                <option>WAKILIN YAMMA II WARD</option>
                <option>WAKILIN KUDU I WARD</option>
                <option>WAKILIN KUDU II WARD</option>
                <option>WAKILIN AREWA I WARD</option>
                <option>WAKILIN AREWA II WARD</option>
                <option>SHINKAFI A WARD</option>
                <option>Others</option>
              </select>
              {errors.ward && (
                <p className='text-red-500 text-xs'>{errors.ward}</p>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-[11px] font-semibold '>Phone Number</label>
              <input
                placeholder='Phone Number'
                className={`bg-gray-50 shadow-sm px-3 py-2 outline-teal-600 ${
                  errors.phone ? "border-red-500" : ""
                }`}
                value={formData.phone}
                onChange={handleChange}
                name='phone'
              />
              {errors.phone && (
                <p className='text-red-500 text-xs'>{errors.phone}</p>
              )}
            </div>
          </div>

         {loading === false && <button
            type='submit'
            className='bg-teal-600  text-white px-4 py-2 rounded-md mt-4'
          >
            Join Community
          </button>}
         {loading === true && <div className='bg-teal-50 w-40 text-center text-teal-400 px-4 py-2 rounded-md mt-4'>
            Loading...
          </div>}
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='flex items-center justify-center flex-col p-16'>
          <Lottie options={defaultOptions} height={400} width={400} />
          <button
            onClick={() => {
              closeModal();
              navigate("/");
            }}
            className='bg-teal-100 px-4 py-1.5 shadow-sm rounded-sm text-teal-700'
          >
            Your Request is Successful!
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default JoinCommunity;
