<h1>🛠️ Project Setup and Local Installation</h1>
Follow these steps to get the MERN + OAuth Image Search & Multi-Select application running locally on your machine.

Prerequisites
<ul>
You'll need the following software installed:

<li>Node.js (LTS version recommended)</li>

<li>npm or yarn (for package management)</li>

<li>Access to a MongoDB instance (local server or cloud service like MongoDB Atlas)</li>
</ul>
<br>
<h2>Step 1: Clone the Repository</h2>
Clone the project to your local machine:

```
git clone [Your-GitHub-Repo-URL]
cd [your-repo-name]
```

<h2>Step 2: Install Dependencies</h2>
You must install dependencies for both the frontend (/client) and the backend (/server).

```
# Install server dependencies
cd server
npm install
cd ..

# Install client dependencies
cd client
npm install
cd ..
```

<h1>🔑 Environment Variables Configuration</h1>
This project relies on several sensitive API keys and secrets for authentication and image searching. You must create a file named .env in the /server directory and populate it with the required credentials.

<br>
<h2>server/.env File Content</h2>
Replace the placeholders below with your actual keys obtained from the respective developer platforms.

```
# MONGODB CONNECTION
MONGO_URI=mongodb+srv://[username]:[password]@[cluster-name]/imagesearchdb?retryWrites=true&w=majority
SESSION_SECRET=A_LONG_RANDOM_STRING_FOR_EXPRESS_SESSION_ENCRYPTION

# UNSPLASH API KEY
UNSPLASH_ACCESS_KEY=[Your_Unsplash_API_Key]

# GOOGLE OAUTH 2.0 KEYS
GOOGLE_CLIENT_ID=[Your_Google_Client_ID]
GOOGLE_CLIENT_SECRET=[Your_Google_Client_Secret]

# FACEBOOK OAUTH KEYS
FACEBOOK_CLIENT_ID=[Your_Facebook_App_ID]
FACEBOOK_CLIENT_SECRET=[Your_Facebook_App_Secret]

# GITHUB OAUTH KEYS
GITHUB_CLIENT_ID=[Your_GitHub_Client_ID]
GITHUB_CLIENT_SECRET=[Your_GitHub_Client_Secret]

# Set the URL where your client app is running (e.g., for redirect URIs)
CLIENT_URL=http://localhost:3000
```
<h1>▶️ Running the Application</h1>
Start the Backend Server:

```
cd server
npm start
```
The server should start on port 5000 (or as configured).

Start the Frontend Client:
```
cd ../client
npm start
```

