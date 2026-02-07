# 🌐 Social Network

**Social Network** is a full-stack **social networking platform** built using **Django (REST API)** and **React**.  
It allows users to **register/login, create posts, like and comment**, and interact with other users in a clean, modern interface.

The project follows a **decoupled architecture** where Django serves as the backend API layer and React handles the frontend — making the application scalable, maintainable, and production-ready.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Django
- Django REST Framework (DRF)

### Database
- PostgreSQL (SQLite for development)

### Authentication
- JWT Authentication
- Django REST Simple JWT

---

## 🧱 Architecture

### Backend (Django – API Layer)
- Models – Users, Posts, Likes, Comments
- Serializers – Data validation and transformation
- Views / ViewSets – Business logic
- URLs – RESTful routing
- JWT – Secure authentication

### Frontend (React – UI Layer)
- Components – Reusable UI components
- Pages – Login, Register, Feed, Profile
- Services – Axios-based API calls
- State Management – React Hooks

---

## ✨ Features

- 🧑‍💻 User authentication (Register / Login / Logout)
- 📝 Create and delete posts
- ❤️ Like/dislike
- 👤 User profile pages
- 📰 Dynamic social feed
- 🔐 JWT-based authentication
- 📱 Fully responsive UI
- 🧭 RESTful API design

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/atifx17/social_network.git
cd social_network
```

---

## ⚙️ Backend Setup (Django)

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
```

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the backend root:

```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_NAME=your_db_name
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### 5. Run Migrations & Start Server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Backend will run at:
👉 http://localhost:8000/

---

## 🎨 Frontend Setup (React)

### 6. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 7. Start React App

```bash
npm run dev
```

Frontend will run at:
👉 http://localhost:5137/

---

## 📂 Project Structure

```text
social_network/
├── backend/
│   ├── accounts/
│   ├── posts/
│   ├── backend/
|   |-- media/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── .env
├── .gitignore
└── README.md
```

---

## 🔐 API Endpoints (Sample)

- POST `/api/auth/register/`
- POST `/api/auth/login/`
- GET `/api/posts/`
- POST `/api/posts/create/`
- POST `/api/posts/{id}/like/`
- POST `/api/posts/{id}/comment/`

---

## 🧑‍💻 Author

**MD Atif Alam**  
Full Stack Developer | Django | React | MERN | Cloud Computing Enthusiast  

🔗 LinkedIn: https://www.linkedin.com/in/atifx17  
💻 GitHub: https://github.com/atifx17
