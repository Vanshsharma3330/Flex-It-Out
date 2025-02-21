import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import Header from "../components/Header";
import { Barbell, CaretUp, Check } from "@phosphor-icons/react";

// MediaPipe Pose connections for drawing
const POSE_CONNECTIONS = [
    [11, 12], // Shoulders
    [11, 13],
    [13, 15], // Left arm
    [12, 14],
    [14, 16], // Right arm
    [11, 23],
    [12, 24], // Shoulders to hips
    [23, 24], // Hips
    [23, 25],
    [25, 27], // Left leg
    [24, 26],
    [26, 28], // Right leg
];

export default function Workout() {
    const [isRecording, setIsRecording] = useState(false);
    const [exerciseType, setExerciseType] = useState("squat");
    const [metrics, setMetrics] = useState({
        similarity: 0,
        repCount: 0,
        angle: 0,
    });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const processingRef = useRef(false);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const startWebcam = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                    frameRate: { ideal: 60 }, // Increased frame rate
                    facingMode: "user",
                },
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
                streamRef.current = stream;
            }

            // Initialize canvas with device pixel ratio for better quality
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = 640 * dpr;
                canvasRef.current.height = 480 * dpr;
                const ctx = canvasRef.current.getContext("2d");
                ctx.scale(dpr, dpr);
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            toast.error("Could not access webcam. Please check permissions.");
        }
    };

    const stopWebcam = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    };

    const startExercise = async () => {
        try {
            await fetch("http://localhost:5001/start_exercise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ exerciseType }),
            });

            setIsRecording(true);
            await startWebcam();
        } catch (err) {
            console.error("Error starting exercise:", err);
            toast.error("Failed to start exercise session");
        }
    };

    const stopExercise = () => {
        setIsRecording(false);
        stopWebcam();
        setMetrics({
            similarity: 0,
            repCount: 0,
            angle: 0,
        });
    };

    const drawLandmarks = (landmarks) => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Enable anti-aliasing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Draw connections with gradient
        POSE_CONNECTIONS.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];

            if (
                startPoint &&
                endPoint &&
                startPoint.visibility > 0.3 &&
                endPoint.visibility > 0.3
            ) {
                const gradient = ctx.createLinearGradient(
                    startPoint.x * canvasRef.current.width,
                    startPoint.y * canvasRef.current.height,
                    endPoint.x * canvasRef.current.width,
                    endPoint.y * canvasRef.current.height
                );
                gradient.addColorStop(0, "#00ff00");
                gradient.addColorStop(1, "#00cc00");

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 3;
                ctx.lineCap = "round";
                ctx.moveTo(
                    startPoint.x * canvasRef.current.width,
                    startPoint.y * canvasRef.current.height
                );
                ctx.lineTo(
                    endPoint.x * canvasRef.current.width,
                    endPoint.y * canvasRef.current.height
                );
                ctx.stroke();
            }
        });

        // Draw landmarks with glow effect
        ctx.shadowColor = "rgba(255, 0, 0, 0.5)";
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#ff0000";

        landmarks.forEach((point) => {
            if (point.visibility > 0.3) {
                ctx.beginPath();
                ctx.arc(
                    point.x * canvasRef.current.width,
                    point.y * canvasRef.current.height,
                    4,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        });

        ctx.shadowBlur = 0;
    };

    const processFrame = async (timestamp) => {
        if (!isRecording || !videoRef.current) return;

        if (previousTimeRef.current != undefined) {
            const deltaTime = timestamp - previousTimeRef.current;

            if (deltaTime >= 16.67 && !processingRef.current) {
                // Limit to ~60fps
                processingRef.current = true;

                try {
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = videoRef.current.videoWidth;
                    tempCanvas.height = videoRef.current.videoHeight;
                    const ctx = tempCanvas.getContext("2d");
                    ctx.drawImage(videoRef.current, 0, 0);

                    const response = await fetch(
                        "http://localhost:5001/process_frame",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                frame: tempCanvas.toDataURL("image/jpeg", 0.8), // Reduced quality for better performance
                                exerciseType,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (data.landmarks) {
                        drawLandmarks(data.landmarks);
                        setMetrics({
                            similarity: data.similarity,
                            repCount: data.rep_count,
                            angle: data.angle,
                        });
                    }
                } catch (err) {
                    console.error("Error processing frame:", err);
                } finally {
                    processingRef.current = false;
                }

                previousTimeRef.current = timestamp;
            }
        } else {
            previousTimeRef.current = timestamp;
        }

        requestRef.current = requestAnimationFrame(processFrame);
    };

    useEffect(() => {
        if (isRecording) {
            requestRef.current = requestAnimationFrame(processFrame);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isRecording]);

    const containerStyle = {
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    };

    const videoContainerStyle = {
        position: "relative",
        marginBottom: "20px",
    };

    const videoStyle = {
        width: "100%",
        backgroundColor: "#000",
        borderRadius: "8px",
    };

    const canvasStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
    };

    const metricsStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "20px",
    };

    const metricBoxStyle = {
        padding: "15px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        textAlign: "center",
    };

    const buttonStyle = {
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        backgroundColor: isRecording ? "#ff4444" : "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        marginTop: "10px",
    };

    const selectStyle = {
        padding: "8px",
        fontSize: "16px",
        marginBottom: "20px",
        width: "200px",
    };

    const [showExerciseOptions, setShowExerciseOptions] = useState(false);

    return (
        <div className="relative">
            <Header />

            <div className="flex flex-col items-center rounded-4xl pt-20">
                <div className="relative aspect-[16/9] w-3/4 bg-gray-100 rounded-4xl overflow-hidden shadow-lg">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                    />
                    {!isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <p className="text-white">
                                Camera will be enabled when you start the
                                exercise
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Exercise Selection */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white rounded-4xl flex items-center gap-4 px-6 py-2">
                <div className="relative">
                    <button
                        onClick={() =>
                            setShowExerciseOptions(!showExerciseOptions)
                        }
                        className="focus:outline-none overflow-hidden rounded-4xl pl-2 bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
                    >
                        <CaretUp size={25} />
                        <div className="bg-gray-300 rounded-4xl p-2">
                            <Barbell size={30} />
                        </div>
                    </button>

                    {showExerciseOptions && (
                        <div className="absolute top-0 transform -translate-y-16 -translate-x-18 bg-white rounded-lg shadow-lg z-[100] overflow-hidden flex w-96">
                            <button
                                onClick={() => {
                                    setExerciseType("squat");
                                    setShowExerciseOptions(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                            >
                                Squats
                                {exerciseType === "squat" && (
                                    <Check
                                        size={20}
                                        className="text-green-500"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setExerciseType("pushup");
                                    setShowExerciseOptions(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                            >
                                Push-ups
                                {exerciseType === "pushup" && (
                                    <Check
                                        size={20}
                                        className="text-green-500"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setExerciseType("crunch");
                                    setShowExerciseOptions(false);
                                }}
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
                            >
                                Crunches
                                {exerciseType === "crunch" && (
                                    <Check
                                        size={20}
                                        className="text-green-500"
                                    />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={isRecording ? stopExercise : startExercise}
                    className={`px-4 py-2 rounded-4xl text-white transition-colors duration-200 ${
                        isRecording
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                    {isRecording ? "Stop Exercise" : "Start Exercise"}
                </button>
            </div>

            <div className="absolute top-22 left-1/2 -translate-x-1/2 px-4 py-2">
                {isRecording && (
                    <div className="flex gap-2 bg-white rounded-4xl p-2 shadow-lg">
                        <div className="bg-gray-200 rounded-full px-2">
                            <p className="font-semibold">
                                Reps: {metrics.repCount}
                            </p>
                        </div>
                        <div className="bg-gray-200 rounded-full px-2">
                            <p className="font-semibold">
                                Form Accuracy: {metrics.similarity.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
