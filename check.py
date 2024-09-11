from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

# Replace with your MongoDB Atlas connection string
connection_string = "mongodb+srv://anmolkumardubey1:amdmongo@cluster0.zrcjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

def check_connection(uri):
    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)  # 5 seconds timeout
        # Attempt to get server information to check connection
        client.server_info()
        print("Connection to MongoDB Atlas is successful!")
    except ServerSelectionTimeoutError as e:
        print("Failed to connect to MongoDB Atlas:", e)

# Call the function with your connection string
check_connection(connection_string)
