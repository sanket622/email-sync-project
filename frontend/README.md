Email Dashboard

📌 Project Overview

Email Dashboard is a React-based application that allows users to fetch and search emails from an API. The project is built using Vite, React, and Tailwind CSS for a fast and modern development experience.

🚀 Features

Fetch emails from a backend API.

Search functionality to find specific emails.
Responsive UI with Tailwind CSS.
Efficient state management using React hooks.

🛠️ Tech Stack

Frontend: Vite + React
Styling: Tailwind CSS
HTTP Requests: Axios
Routing: React Router DOM

📂 Project Structure
frontend/
│── src/
│   ├── api/
│   │   ├── emailApi.js        # API calls to fetch and search emails
│   ├── components/
│   │   ├── EmailItem.jsx      # Renders an individual email
│   │   ├── EmailList.jsx      # Displays a list of emails
│   │   ├── SearchBar.jsx      # Input field for searching emails
│   ├── pages/
│   │   ├── Home.jsx           # Main home page with email listing
│   ├── main.jsx               # React root component
│   ├── App.jsx                # Application wrapper
│── public/
│── package.json
│── vite.config.js
│── tailwind.config.js
│── postcss.config.js
│── index.html

🏗️ Installation & Setup
1️⃣ Clone the Repository

git clone https://github.com/your-username/email-dashboard.git
cd email-dashboard
2️⃣ Install Dependencies

npm install
3️⃣ Start the Development Server

npm run dev
The app will run at: http://localhost:5173/

⚙️ API Endpoints
Ensure the backend API is running at http://localhost:8080/api.


Endpoint = /emails	        (GET	Fetches all emails)
Endpoint = /search?query=	(GET	Searches emails by query)

📦 Dependencies

json

"dependencies": {
  "@tailwindcss/vite": "^4.0.8",
  "axios": "^1.7.9",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.2.0",
  "tailwindcss": "^4.0.8"
}
🔧 Development Tools

json

"devDependencies": {
  "@vitejs/plugin-react": "^4.3.4",
  "vite": "^6.1.0",
  "eslint": "^9.19.0",
  "eslint-plugin-react": "^7.37.4"
}

📜 Scripts

npm run dev      # Start development server
npm run build    # Build the project
npm run lint     # Run ESLint checks
npm run preview  # Preview built app

🎨 Tailwind Configuration
This project is pre-configured with Tailwind CSS using @tailwindcss/vite.

🤝 Contributing

Fork the repo.
Create a new branch (git checkout -b feature-branch).
Commit changes (git commit -m 'Add new feature').
Push to branch (git push origin feature-branch).
Open a pull request.
