from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from React

# Configure MongoDB connection
app.config["MONGO_URI"] = ""
mongo = PyMongo(app)

@app.route('/api/jobs', methods=['POST'])
def post_job():
    try:
        job_data = request.json
        # Ensure that all required fields are present
        required_fields = ['position', 'skills', 'experience', 'description']
        for field in required_fields:
            if field not in job_data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # Insert job posting into MongoDB
        job_collection = mongo.db.jobs
        result = job_collection.insert_one({
            "position": job_data['position'],
            "company": job_data.get('company', 'Default Company Name'),  # Optional field
            "skills": job_data['skills'],
            "experience": job_data['experience'],
            "description": job_data['description']
        })

        return jsonify({"message": "Job posted successfully", "jobId": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    try:
        job_collection = mongo.db.jobs
        jobs = list(job_collection.find({}, {'_id': 0}))  # Exclude MongoDB _id from results
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
