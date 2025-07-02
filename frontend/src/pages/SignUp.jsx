import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import video3 from "../../public/video3.mp4";

const SignUp = () => {
    const navigate = useNavigate();
    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/register",
                formData
            );
            alert("Registration successful!");
            console.log("Server Response:", response.data);
        } catch (error) {
            console.error(
                "Error registering:",
                error.response?.data || error.message
            );
            alert("Registration failed!");
        }
    };

    const handleGoogleSignup = async () => {
        try {
            // Use the same Google auth URL endpoint
            const response = await axios.get("/auth/google/url");

            // Redirect to Google's OAuth page
            window.location.href = response.data.url;
        } catch (error) {
            console.error("Error with Google signup:", error);
            alert("Failed to initialize Google signup");
        }
    };

    return (
        <div className="main-container bg-black flex w-full h-screen items-center justify-center gap-8">
            {/* Left Container */}
            <div className="video-container h-screen rounded-4xl overflow-hidden my-4">
                <ReactPlayer
                    url={video3}
                    playing={true}
                    loop={true}
                    width="100%"
                    height="100%"
                    controls={false}
                    muted={true}
                />
            </div>

            {/* Right Container */}
            <div className="right-flex w-[35%] h-[95%] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center px-8">
                <h1 className="text-black font-poppins text-center text-2xl font-bold">
                    YOUR GATEWAY TO UNFORGETTABLE JOURNEYS
                </h1>
                <p className="text-gray-600 text-center mt-2">
                    Register to start exploring.
                </p>

                {/* Form */}
                <form
                    className="w-full flex flex-col mt-6"
                    onSubmit={handleSubmit}
                >
                    {/* First Name & Last Name */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-gray-700 font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="text-gray-700 font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <label className="text-gray-700 font-medium mt-4">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Password */}
                    <label className="text-gray-700 font-medium mt-4">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Confirm Password */}
                    <label className="text-gray-700 font-medium mt-4">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="relative flex items-center w-full my-6">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-500 text-sm">
                        or
                    </span>
                </div>

                {/* Google Sign-In */}
                <button
                    onClick={handleGoogleSignup}
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-400 text-gray-700 p-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300"
                >
                    <FcGoogle className="text-2xl" /> Sign up with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;
