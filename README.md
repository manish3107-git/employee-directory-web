# employee-directory-web
# Employee Directory Web Interface

This project is a frontend-only implementation of an **Employee Directory** system built as part of the Ajackus Frontend Assignment.

---

## Features

-  **Dashboard View**
  - Displays a list of employees in a clean, responsive **table layout**
  - Supports **sorting** by column (first name, last name, email, etc.)
  - **Search** functionality to filter by name or email
  - **Pagination control** to show 10/25/50/100 items per page

-  **Add/Edit Employee**
  - Simple form to add a new employee
  - Supports **editing existing employees**
  - Input validation and dropdown for **Role**

- **Delete Employee**
  - Confirmation prompt before deletion

- 📱 **Responsive Design**
  - Works on mobile and desktop screens

- 📥 **No Initial Data**
  - Dashboard starts empty as required
  - Data stored in-memory (non-persistent)

---

## 🚀 How to Run This Project

### 1. Open with VS Code

- Open the project folder in Visual Studio Code

### 2. Install Live Server Extension (if not already)

- Go to Extensions (Ctrl+Shift+X)
- Search for **Live Server** by *Ritwick Dey*
- Click **Install**

### 3. Launch the App

- Right-click `dashboard.html` → **Open with Live Server**

> Live Server will launch the app in your browser at `http://127.0.0.1:5500/dashboard.html`

---

## 💻 Project Structure
ajackus-employee-directory/
├── dashboard.html
├── form.html
├── static/
│ ├── css/
│ │ └── style.css
│ └── js/
│ ├── app.js
│ └── data.js
└── README.ME
