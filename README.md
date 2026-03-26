# Civic Track

Civic Track is a comprehensive web platform built to empower communities by allowing citizens to seamlessly report, track, and support local civic issues (e.g., potholes, broken streetlights, sanitation concerns). The platform operates with an interactive map-based interface alongside an active community Reddit-style feed to upvote critical anomalies. Administrators have a specialized dashboard to manage, verify, and resolve these reports in real-time.

## Features

* **Interactive Mapping**: Discover issue markers bounded natively within the city layout via [Leaflet](https://leafletjs.com/).
* **Issue Reporting**: Form-based incident reporting with categorized inputs, automated coordinate fetching via map tapping, and photo evidence uploading directly from the browser.
* **Community Voting Feed**: Browse and upvote open civic reports submitted by others in a real-time Reddit-style scrolling queue.
* **Admin Dashboard**: Specialized, secure dashboard restricted strictly to administrators providing analytical snapshot views and the ability to update report statuses (Pending, In-Progress, Resolved) or delete illicit entries.
* **Secure Authentication**: Node-built JWT authentication mechanism spanning from React-Router UI restrictions down to strictly protected robust Express API endpoint middlewares.

## Technology Stack

* **Frontend**: Built on React.js using Vite. Routing is handled by React Router DOM. Maps are integrated using React Leaflet, and iconography flows through Lucide React. The UI architecture intentionally uses strictly custom CSS modules to showcase a premium, distinct dark-mode-convertible aesthetic devoid of restrictive UI frameworks.
* **Backend**: Node.js & Express API, utilizing MongoDB with Mongoose schemas for data persistence and relationship mapping.
* **Media Handling**: Utilizing Multer for localized buffering and Express static configuration serving files directly from the `public/uploads` mount.

## Getting Started

### Prerequisites
* Node.js v16+
* MongoDB running either locally or via a MongoDB Atlas cloud cluster

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krishna-acharya-dev/civic-track.git
   cd civic-track
   ```

2. **Backend Environment Integration**
   Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside `server/` with the following critical bindings:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
   Run the backend development server:
   ```bash
   npm run dev
   ```

3. **Frontend Environment Integration**
   Navigate to the client directory from the project root and install dependencies:
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file inside `client/` pointing to your Express backend:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_API_UPLOADS_URL=http://localhost:3000/uploads/
   ```
   Run the frontend development workspace:
   ```bash
   npm run dev
   ```

4. The application should now be accessible locally at `http://localhost:5173`.

## Contributing
Contributions are always welcome! Feel free to open a pull request or submit an issue if you have ideas for new features or find a bug.

## License
This project is open-source and available under the [MIT License](LICENSE).
