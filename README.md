# 🏋️‍♂️ Flex-It-Out A Smart AI-Powered Fitness Companion🏆

Flex-It-Out is an innovative fitness tracking application that leverages computer vision and AI to provide real-time exercise form analysis, rep counting, and personalized yoga sessions. Built with modern web technologies, it offers an immersive fitness experience right from your browser.

![image](https://github.com/user-attachments/assets/7022dc49-f55d-42a0-8fcb-f8391558661d)

![image](https://github.com/user-attachments/assets/b59b698a-4dd1-4259-8a0f-8bc77e42481d)

## ✨ Key Features

### 🤖 AI-Powered Exercise Recognition
- **Real-time pose detection** using MediaPipe and computer vision
- **Automatic rep counting** for squats, push-ups, and crunches
- **Form analysis** with similarity scoring against master poses
- **Live feedback** on exercise technique and angles

### 🧘‍♀️ Interactive Yoga Sessions
- **Customizable yoga routines** with 10+ poses
- **Timer-based sessions** with rest intervals
- **Visual pose guides** with high-quality images
- **Session progress tracking**

### 👤 User Management
- **Secure authentication** with JWT tokens
- **User registration** with email verification
- **Protected routes** and personalized experiences

### 🎨 Modern UI/UX
- **Responsive design** built with Tailwind CSS
- **Smooth animations** using Framer Motion
- **Intuitive navigation** with React Router
- **Real-time notifications** via React Hot Toast

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4.0** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router DOM** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email services
- **CORS** - Cross-origin resource sharing

### AI/ML Services
- **Python Flask** - ML model serving
- **MediaPipe** - Pose detection
- **OpenCV** - Computer vision
- **NumPy & SciPy** - Mathematical computations
- **Pandas** - Data processing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud)
- Webcam for exercise recognition

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flex-it-out.git
   cd flex-it-out
   ```

2. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set up the Backend**
   ```bash
   cd ../backend
   npm install
   
   # Create .env file with:
   # MONGODB_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # FRONTEND_URL=http://localhost:5173
   # PORT=5000
   
   node index.js
   ```

4. **Set up the Flask ML Server**
   ```bash
   cd ../flaskserver
   pip install flask flask-cors opencv-python mediapipe numpy pillow pandas scipy
   python app.py
   ```

### Environment Variables

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
PORT=5000
ACCESS_URL=your_access_url
```

## 🎯 Usage

### Exercise Recognition
1. Navigate to the **Workout** page
2. Select your exercise type (Squat, Push-up, or Crunch)
3. Grant camera permissions
4. Follow the on-screen pose guide
5. Get real-time feedback on form and rep count

### Yoga Sessions
1. Go to the **Yoga** page
2. Select poses for your custom routine
3. Set duration for each pose
4. Start your guided session with timer

### User Authentication
1. Sign up with email verification
2. Log in to access personalized features
3. Track your workout history

## 📊 Features Deep Dive

### Computer Vision Pipeline
- **Landmark Detection**: Extracts 33 body landmarks
- **Angle Calculation**: Measures joint angles for form analysis
- **Similarity Scoring**: Compares poses against master templates
- **Real-time Processing**: Handles 30+ FPS video streams

### Exercise Types Supported
- **Squats**: Hip-knee-ankle angle analysis
- **Push-ups**: Shoulder-elbow-wrist angle tracking
- **Crunches**: Shoulder-hip-knee angle measurement

## 🏗️ Project Structure

```
Flex-It-Out/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── assets/         # Images and media
│   │   ├── fonts/          # Custom fonts
│   │   └── utils/          # Helper functions
│   └── public/             # Static assets
├── backend/                 # Node.js API server
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   └── utils/             # Database connection
└── flaskserver/            # Python ML server
    ├── app.py             # Flask application
    └── *.csv              # Master pose data
```

## 🚧 Challenges Overcome

- **Real-time Video Processing**: Optimized frame processing for smooth performance
- **Cross-Origin Communication**: Implemented seamless frontend-backend-ML communication
- **Pose Accuracy**: Fine-tuned angle calculations for different exercise types
- **User Experience**: Created intuitive UI for complex computer vision features

## 🤝 Contributing

This project was built for a hackathon, but contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
