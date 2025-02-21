import { useEffect, useRef, useState } from "react";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.webp";
import image8 from "../assets/8.jpg";
import image9 from "../assets/9.jpg";
import image10 from "../assets/10.jpg";


export default function YogaSession() {
  const videoRef = useRef(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [poseIndex, setPoseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(5);
  const [exerciseDurations, setExerciseDurations] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const poses = [
    { id: 1, src: image1, name: "Child's Pose" },
    { id: 2, src: image2, name: "Downward Dog" },
    { id: 3, src: image3, name: "Warrior I" },
    { id: 4, src: image4, name: "Warrior II" },
    { id: 5, src: image5, name: "Tree Pose" },
    { id: 6, src: image6, name: "Cobra Pose" },
    { id: 7, src: image7, name: "Bridge Pose" },
    { id: 8, src: image8, name: "Triangle Pose" },
    { id: 9, src: image9, name: "Seated Forward Bend" },
    { id: 10, src: image10, name: "Corpse Pose" }
  ];

  useEffect(() => {
    if (!isSessionActive) return;
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      if (isResting) {
        if (poseIndex < selectedExercises.length - 1) {
          setPoseIndex(poseIndex + 1);
          setTimer(exerciseDurations[selectedExercises[poseIndex + 1].id] || 10);
          setIsResting(false);
        } else {
          setIsSessionActive(false);
          setIsSessionComplete(true);
        }
      } else {
        setIsResting(true);
        setTimer(restTime);
      }
    }
  }, [timer, isSessionActive, isResting, poseIndex, selectedExercises, exerciseDurations, restTime]);

  const handleExerciseSelection = (pose, isChecked) => {
    if (isChecked) {
      setSelectedExercises([...selectedExercises, pose]);
    } else {
      setSelectedExercises(selectedExercises.filter((p) => p.id !== pose.id));
    }
  };

  const handleDurationChange = (poseId, duration) => {
    setExerciseDurations({ ...exerciseDurations, [poseId]: duration });
  };

  const startSession = () => {
    if (selectedExercises.length === 0) return alert("Please select at least one exercise.");
    setPoseIndex(0);
    setTimer(exerciseDurations[selectedExercises[0].id] || 10);
    setIsResting(false);
    setIsSessionActive(true);
    setIsSessionComplete(false);
    startCamera();
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("Camera access error:", error));
  };

  const totalExerciseTime = selectedExercises.reduce(
    (total, pose) => total + (exerciseDurations[pose.id] || 10),
    0
  );
  const totalSessionTime =
    totalExerciseTime + restTime * (selectedExercises.length - 1);

  return (
    <div className="flex flex-col items-center p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Yoga Training Session</h1>
      
      {!isSessionActive && !isSessionComplete ? (
        <>
          <div className="mb-4 p-4 bg-white shadow-lg rounded-lg overflow-auto h-80 w-96 border">
            <h2 className="text-lg font-semibold mb-2">Select Exercises & Set Time</h2>
            {poses.map((pose) => (
              <div key={pose.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={(e) => handleExerciseSelection(pose, e.target.checked)}
                  />
                  <span className="font-semibold">{pose.name}</span>
                </div>
                <input
                  type="number"
                  placeholder="Time (s)"
                  min="5"
                  className="border p-1 w-24 rounded-md"
                  onChange={(e) => handleDurationChange(pose.id, parseInt(e.target.value) || 10)}
                />
              </div>
            ))}
          </div>
          
          <div className="mb-4 flex items-center gap-2">
            <label className="mr-2 font-semibold">Rest Time (seconds):</label>
            <input
              type="number"
              value={restTime}
              onChange={(e) => setRestTime(parseInt(e.target.value))}
              className="border p-2 w-24 rounded-md"
            />
          </div>

          <button
            onClick={startSession}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Start Session
          </button>
        </>
      ) : isSessionActive ? (
        <>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">
              {isResting ? "Rest Time" : selectedExercises[poseIndex]?.name}
            </h2>
            <div className="flex flex-row justify-center gap-10">
              <div className="w-120 h-80 flex items-center justify-center rounded-lg shadow-lg bg-white border">
                {isResting ? (
                  <p className="text-xl font-bold text-red-500">Rest Time</p>
                ) : (
                  <img
                    src={selectedExercises[poseIndex]?.src}
                    alt="Yoga Pose"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <video
                ref={videoRef}
                autoPlay
                className="w-80 h-80 border-2 border-gray-500 rounded-lg shadow-lg"
              ></video>
            </div>
          </div>
          <p className="text-2xl font-bold mt-6">{timer} seconds</p>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Session Overview</h2>
          <ul className="text-left mb-4 space-y-2">
            {selectedExercises.map((pose) => (
              <li key={pose.id} className="font-semibold">
                {pose.name}: {exerciseDurations[pose.id] || 10} seconds
              </li>
            ))}
          </ul>
          <p className="text-md font-semibold">
            Total Rest Time: {restTime * (selectedExercises.length - 1)} seconds
          </p>
          <p className="text-2xl font-bold mt-2">
            Total Session Time: {totalSessionTime} seconds
          </p>
        </div>
      )}
    </div>
  );
}
