
# Role-Based Access Control (RBAC) 🚀

This is a **Role-Based Access Control** application built using **Node.js**, **Express.js**, **Passport.js**, and **MongoDB**. The application provides a starting point for projects requiring authentication and authorization.

🌟 **Features**  
- Role-based access control system (Admin, Moderator, Client roles).
- Email & Password authentication (extendable to OAuth/OAuth2.0 options like Google, Facebook, GitHub, etc.).
- Based on the **MVC pattern** (Model-View-Controller architecture).
- **Mongoose ORM** for MongoDB integration.
- Local authentication using **Passport.js**.
- Production-ready configuration.

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/Lahu19/VRV-RBAC-Assignment.git
```

### 2️⃣ Install dependencies  
Navigate into the project directory and run:  
```bash
npm install
```

### 3️⃣ Set up environment variables  
Create a `.env` file in the project root and add your credentials:  
```env
PORT=3000
MONGODB_URI=YOUR_MONGODB_URI (e.g., mongodb://localhost:27017)
DB_NAME=YOUR_DB_NAME
```

### 4️⃣ Install MongoDB  
For installation, refer to the official [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/).  

### 5️⃣ Start the MongoDB service  
```bash
sudo service mongod start
```

### 6️⃣ Start the application  
Run the app with:  
```bash
npm start
```

---

## 📂 Project Structure  
- **`models/`**: Contains Mongoose schemas for database models (e.g., User model).  
- **`routes/`**: Defines application routes for authentication, user management, etc.  
- **`views/`**: Contains EJS templates for UI rendering.  
- **`utils/`**: Contains helper utilities like validation and constants.  

---

## 🔑 Default Admin Credentials  
- **Username**: `admin@gmail.com`  
- **Password**: `123`

---

## 🤝 Contributing  
Fork the repository and submit a pull request to contribute. Suggestions and improvements are always welcome!  

---

## ⚙️ Built With  
- **Node.js** 🟩  
- **Express.js** 🌐  
- **Passport.js** 🔑  
- **MongoDB & Mongoose** 🗂️  
- **EJS** 🎨  

---


### 📬 Contact  
Feel free to reach out with any questions or feedback!  
```
