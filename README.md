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

<h2>🔑 Environment Variables Configuration</h2>
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
<h2>▶️ Running the Application</h2>
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

<br>
<h2>Folder Structure of the Project</h2>

```
Task/
├── front/
│   ├── public/
│   ├── src/
│   │   ├             
│   │   ├── components/      # Reusable UI elements (ImageCard, Banner)
│   │   ├── context/         # React Context for global state (Auth, selection)
│   │   ├── pages/           # View components (LoginPage, Dashboard)
│   │   └── App.js
│   └── package.json
├── server/
│   ├── config/              # Passport.js setup and strategies
│   ├── server.js            # Server entry point, DB connection, middleware
│   ├── middleware/          # Authentication checks (isAuthenticated)
│   ├── models/              # Mongoose schemas (User, SearchEntry)
│   ├── routes/              # Express routes (auth.js, api.js)
│   ├            
│   ├── package.json
│   └── .env                 # *Local file (ignored by Git)*
├── .gitignore
└── README.md
```

<br>
<h2> API Endpoints and cURL Examples</h2>
<br>

All data endpoints (`/api/search` and `/api/history`) are protected and require a valid session cookie, which is established after a successful OAuth login.

### API Summary Table

| Endpoint | Method | Authentication | Description |
| :--- | :--- | :--- | :--- |
| **`/auth/:provider`** | `GET` | None | Initiates the OAuth flow (e.g., `/auth/google`). |
| **`/api/top-searches`** | `GET` | None | Retrieves the top 5 most frequent search terms globally (Public access). |
| **`/api/search`** | `POST` | **Required** | Logs the search term, calls Unsplash, and returns image results. |
| **`/api/history`** | `GET` | **Required** | Shows the logged-in user's personal search history. |

### cURL Examples

Replace `[YOUR_SESSION_COOKIE]` with the actual `connect.sid` cookie value obtained from your browser after a successful OAuth login.

#### 1. GET /api/top-searches (Global Top Searches)

```
curl -X GET \
  http://localhost:5000/api/top-searches
```

#### 2. POST /api/search (Search Images)
```
curl -X POST \
  http://localhost:5000/api/search \
  -H 'Content-Type: application/json' \
  -H 'Cookie: connect.sid=[YOUR_SESSION_COOKIE]' \
  -d '{ "term": "ocean sunset" }'
```
#### 3. GET /api/history (User's Search History)
```
curl -X GET \
  http://localhost:5000/api/history \
  -H 'Cookie: connect.sid=[YOUR_SESSION_COOKIE]'
```

### ▶️ Full Project Demonstration

[Click to Watch Demo Video](https://youtu.be/SDhRr0jmNzk)

A comprehensive walkthrough showing the OAuth flow, image search, and history tracking.

