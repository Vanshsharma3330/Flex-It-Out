# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import mediapipe as mp
import base64
from PIL import Image
import io
import time
import pandas as pd
from scipy.spatial.distance import cosine
import os

app = Flask(__name__)
CORS(app)

class ExerciseRecognizer:
    def __init__(self, exercise_type='squat', target_reps=5):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose()
        self.exercise_type = exercise_type
        self.rep_count = 0
        self.target_reps = target_reps
        self.exercise_started = False
        self.previous_angle = None
        self.final_similarity = 0
        self.master_landmarks = self.load_master_landmarks()
        
    def load_master_landmarks(self):
        csv_file = f"{self.exercise_type}_master.csv"
        if os.path.exists(csv_file):
            df = pd.read_csv(csv_file)
            return df.values.tolist()
        return []
    
    def process_frame(self, frame_data):
        # Decode base64 image
        image_data = base64.b64decode(frame_data.split(',')[1])
        image = Image.open(io.BytesIO(image_data))
        frame = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Process with MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(frame_rgb)
        
        if not results.pose_landmarks:
            return {
                'landmarks': None,
                'similarity': 0,
                'rep_count': self.rep_count,
                'angle': 0
            }
        
        # Extract landmarks
        landmarks = [[lm.x, lm.y, lm.z] for lm in results.pose_landmarks.landmark]
        
        # Calculate angle based on exercise type
        if self.exercise_type == 'squat':
            angle = self.calculate_squat_angle(landmarks)
        elif self.exercise_type == 'pushup':
            angle = self.calculate_pushup_angle(landmarks)
        else:  # crunch
            angle = self.calculate_crunch_angle(landmarks)
        
        # Update rep count
        self.update_rep_count(angle)
        
        # Calculate similarity
        similarity = self.calculate_similarity(landmarks)
        
        # Convert landmarks to list for JSON serialization
        landmarks_list = []
        for landmark in results.pose_landmarks.landmark:
            landmarks_list.append({
                'x': landmark.x,
                'y': landmark.y,
                'z': landmark.z,
                'visibility': landmark.visibility
            })
        
        return {
            'landmarks': landmarks_list,
            'similarity': similarity,
            'rep_count': self.rep_count,
            'angle': angle
        }
    
    def calculate_squat_angle(self, landmarks):
        hip = landmarks[self.mp_pose.PoseLandmark.LEFT_HIP.value]
        knee = landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value]
        ankle = landmarks[self.mp_pose.PoseLandmark.LEFT_ANKLE.value]
        return self.calculate_angle(hip, knee, ankle)
    
    def calculate_pushup_angle(self, landmarks):
        shoulder = landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        elbow = landmarks[self.mp_pose.PoseLandmark.LEFT_ELBOW.value]
        wrist = landmarks[self.mp_pose.PoseLandmark.LEFT_WRIST.value]
        return self.calculate_angle(shoulder, elbow, wrist)
    
    def calculate_crunch_angle(self, landmarks):
        shoulder = landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER.value]
        hip = landmarks[self.mp_pose.PoseLandmark.LEFT_HIP.value]
        knee = landmarks[self.mp_pose.PoseLandmark.LEFT_KNEE.value]
        return self.calculate_angle(shoulder, hip, knee)
    
    def calculate_angle(self, p1, p2, p3):
        p1 = np.array([p1[0], p1[1]])
        p2 = np.array([p2[0], p2[1]])
        p3 = np.array([p3[0], p3[1]])
        
        ba = p1 - p2
        bc = p3 - p2
        
        cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
        angle = np.arccos(np.clip(cosine_angle, -1.0, 1.0))
        return np.degrees(angle)
    
    def calculate_similarity(self, landmarks):
        if not self.master_landmarks:
            return 0
        
        current_landmarks = np.array(landmarks).flatten()
        master_landmarks = np.array(self.master_landmarks[0]).flatten()
        
        min_length = min(len(current_landmarks), len(master_landmarks))
        current_landmarks = current_landmarks[:min_length]
        master_landmarks = master_landmarks[:min_length]
        
        similarity = 1 - cosine(current_landmarks, master_landmarks)
        return max(0, similarity * 100)
    
    def update_rep_count(self, angle):
        if self.previous_angle is not None:
            if self.exercise_type == 'squat':
                if angle < 90 and not self.exercise_started:
                    self.exercise_started = True
                elif angle > 160 and self.exercise_started:
                    self.rep_count += 1
                    self.exercise_started = False
            elif self.exercise_type == 'pushup':
                if angle < 90 and not self.exercise_started:
                    self.exercise_started = True
                elif angle > 160 and self.exercise_started:
                    self.rep_count += 1
                    self.exercise_started = False
            else:  # crunch
                if angle < 45 and not self.exercise_started:
                    self.exercise_started = True
                elif angle > 100 and self.exercise_started:
                    self.rep_count += 1
                    self.exercise_started = False
        self.previous_angle = angle

# Global variable to store recognizer instance
recognizer = None

@app.route('/', methods=['GET'])
def home():
    return jsonify({'status': 'success'})


@app.route('/start_exercise', methods=['POST'])
def start_exercise():
    global recognizer
    data = request.json
    exercise_type = data.get('exerciseType', 'squat')
    target_reps = data.get('targetReps', 5)
    
    recognizer = ExerciseRecognizer(exercise_type, target_reps)
    return jsonify({'status': 'success'})

@app.route('/process_frame', methods=['POST'])
def process_frame():
    if recognizer is None:
        return jsonify({'error': 'Exercise session not started'})
    
    frame_data = request.json['frame']
    results = recognizer.process_frame(frame_data)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
