import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from "../utils/axios"; // Importing the axios instance
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const clientId = "254976336751-iaf4mta61chfn0nn8qbt5h4m68u1hlap.apps.googleusercontent.com"; // Replace with your Google Client ID

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post("http://localhost:5000/login", formData);
            console.log("Response:", response.data);
            alert("success");

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (response) => {
        console.log("Google Login Success:", response);

        try {
            const backendResponse = await fetch(
                `http://localhost:5000/googlelogin?code=${response.credential}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (backendResponse.redirected) {
                window.location.href = backendResponse.url;
            } else {
                console.log("Backend Response:", await backendResponse.json());
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Failed to log in with Google");
        }
    };

    const handleGoogleFailure = () => {
        console.error("Google Login Failed");
        alert("Google login failed. Please try again.");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="main-container bg-black flex w-full h-screen items-center justify-center gap-8">
                <div className="left-flex w-[35%] h-[95%] bg-white rounded-2xl shadow-lg flex items-center justify-center"></div>

                <div className="right-flex w-[35%] h-[95%] bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center px-8">
                    <h1 className="text-black text-center text-2xl font-black font-poppins">
                        YOUR GATEWAY TO UNFORGETTABLE JOURNEYS
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Login to access your account and start exploring.
                    </p>

                    <form className="w-full flex flex-col mt-6" onSubmit={handleSubmit}>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label className="text-gray-700 font-medium mt-4">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {/* <div className="relative flex items-center w-full my-6">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-3 text-gray-500 text-sm">
                            or
                        </span>
                    </div> */}

                    
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
