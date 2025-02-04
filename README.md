# 🌍 Visa Navigator  

🔗 **Live Site URL**: [Visa Navigator Client](https://visa-navigator-f6a31.web.app)  

Visa Navigator is a **web application** designed to assist users in **managing and applying** for different types of visas. Whether you're planning to **travel, study, or do business abroad**, Visa Navigator streamlines the process by helping users find and apply for the appropriate visa with ease.  

![Visa Navigator Screenshot](./public/image.png)

---

## 🚀 Features  

### 🏷 **Client-Side Features**  
✅ **🔐 User Authentication** – Secure login and registration using **Firebase Authentication**.  
✅ **➕ Add Visa** – Users can **add visa details** (Country, Visa Type, Processing Time, Required Documents, etc.). *(Available only to logged-in users.)*  
✅ **📌 View All Visas** – Browse all available visas with essential details (**country, processing time, fees, and validity**).  
✅ **📁 My Added Visas** – Logged-in users can view, **update, or delete** their added visas.  
✅ **🔎 Search Functionality** – Search visas by **country name or keywords** for easy navigation.  
✅ **🎨 Interactive UI** – Smooth **modals, alerts, and responsive design** for a seamless user experience.  

---

## 🛠️ Technologies Used  

| Technology             | Description |
|------------------------|-------------|
| **React.js**           | Frontend framework for building dynamic UI |
| **React Router**       | Client-side routing and navigation |
| **Tailwind CSS**       | Utility-first styling framework |
| **SweetAlert2**        | Modern popups and alerts for user interaction |
| **Firebase Authentication** | Secure user authentication system |
| **React Icons**        | Provides scalable vector icons |
| **React Toastify**     | Beautiful notifications for better UX |

---

## 📦 Dependencies  

Run the following command to install project dependencies:  
```bash
npm install
```

Key dependencies from `package.json`:  
- `"react"`  
- `"react-router-dom"`  
- `"firebase"`  
- `"tailwindcss"`  
- `"sweetalert2"`  
- `"react-icons"`  
- `"react-toastify"`

---

## 🏗️ Installation & Setup  

Follow these steps to run **Visa Navigator** locally:  

### 🔹 Prerequisites  
Ensure you have installed:  
- **Node.js** → [Download](https://nodejs.org/)  
- **Git** (Optional)  

### 🔹 Steps  
1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/NissanJK/Visa-navigator-Client.git
cd visa-navigator-client
```

2️⃣ **Install Dependencies**  
```bash
npm install
```

3️⃣ **Set Up Firebase**  
- Go to **Firebase Console** ([https://console.firebase.google.com/](https://console.firebase.google.com/)).  
- Create a project and enable **Authentication**.  
- Copy your **Firebase Config** and replace it in a `.env` file:  
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4️⃣ **Run the Development Server**  
```bash
npm start
```
- The app will be available at **http://localhost:3000/** 🚀  

---

## 📬 Contact  

📧 **Email:** [jawadul.karim78@gmail.com](mailto:jawadul.karim78@gmail.com)  
🔗 **LinkedIn:** [Jawadul Karim](https://www.linkedin.com/in/jawadul-karim-612a18318/)  

---


### 🎉 Happy Coding! 🚀  
