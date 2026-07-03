<div align="center">

<h1>🎯 InterviewNova.AI</h1>

<p><strong>AI-Powered Mock Interview Platform for Students & Job Seekers</strong></p>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-4F46E5?style=for-the-badge)](https://interviewnova-client.onrender.com)
[![GitHub Stars](https://img.shields.io/github/stars/Surya-Chauhan/InterviewNova?style=for-the-badge&logo=github&color=FFD700)](https://github.com/Surya-Chauhan/InterviewNova/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Surya-Chauhan/InterviewNova?style=for-the-badge&logo=github&color=0EA5E9)](https://github.com/Surya-Chauhan/InterviewNova/network/members)
[![License](https://img.shields.io/github/license/Surya-Chauhan/InterviewNova?style=for-the-badge&color=22C55E)](https://github.com/Surya-Chauhan/InterviewNova/blob/main/LICENSE)

<br/>

<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />

<br/><br/>

> **InterviewNova.AI** is an intelligent mock interview platform that analyzes your resume, generates role-specific interview questions, evaluates your answers in real-time using AI, and delivers a detailed performance report — all in one seamless experience.

</div>

---

# 📸 Application Preview

---

## 🏠 Landing Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/a549a130-e6b0-4fd4-b986-da4e18bd7a43" alt="InterviewNova Landing Page" width="100%">
</p>

<p align="center">
  <em>Beautiful and responsive landing page introducing InterviewNova with AI-powered interview preparation, key features, and a modern user experience.</em>
</p>

<br><br>

---

## 🎤 Live Interview

<p align="center">
  <img src="https://github.com/user-attachments/assets/90029f55-d523-437d-83e7-44afdff2a3da" alt="Live Interview" width="100%">
</p>

<p align="center">
  <em>Real-time AI interview session featuring role-specific questions, timer, and an interactive interview experience.</em>
</p>

<br><br>

---

## 📊 Interview Analytics Dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/f9dee55c-75e4-4cc4-bcfe-6ce3713262d4" alt="Interview Analytics Dashboard" width="100%">
</p>

<p align="center">
  <em>Comprehensive analytics dashboard displaying interview performance, scores, progress tracking, and AI-generated insights.</em>
</p>

<br><br>

---

## 📜 Interview History

<p align="center">
  <img src="https://github.com/user-attachments/assets/6e09743d-65b7-46ba-8c82-7f6699051ec4" alt="Interview History" width="100%">
</p>

<p align="center">
  <em>View, manage, and revisit all previous interview sessions along with detailed feedback and performance reports.</em>
</p>

<br><br>

---

## 💳 Pricing & Credits

<p align="center">
  <img src="https://github.com/user-attachments/assets/1f7b8696-92cc-4393-a769-facae106dbc1" alt="Pricing and Credits" width="100%">
</p>

<p align="center">
  <em>Flexible credit-based pricing plans with secure payment integration, allowing users to purchase credits for AI interview sessions.</em>
</p>

---


## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI Smart Interview** | Resume-based question generation tailored to your role |
| 🔐 **Google OAuth** | Secure sign-in via Firebase + JWT session management |
| 📄 **Resume Upload & Parsing** | AI reads and extracts context from your resume |
| ⚡ **Real-time Evaluation** | Answers evaluated instantly using Groq LLM APIs |
| 📊 **Performance Report** | Final score, analytics, and detailed AI feedback |
| 🗂️ **Interview History** | Save and review past interview sessions |
| 💳 **Credit-based System** | Pay-as-you-go model with Razorpay integration |
| 🛡️ **Protected Routes** | Auth middleware secures all sensitive endpoints |
| 📱 **Responsive UI** | Fully mobile-friendly with smooth animations |

---

## 🎯 How It Works

```
1. Sign in with Google OAuth
         ↓
2. Upload your resume (PDF/DOCX)
         ↓
3. AI analyzes resume → generates role-specific questions
         ↓
4. Answer questions step-by-step in the interview flow
         ↓
5. Backend evaluates each answer using Groq LLM APIs
         ↓
6. View final performance report with score & feedback
         ↓
7. Interview saved to history for future review
```

---

## 🛠️ Tech Stack

### 💻 Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Tailwind CSS | Styling |
| Redux Toolkit | State management |
| Axios | HTTP client |
| Framer Motion | Animations |

### ⚙️ Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB (Mongoose) | Database |
| JWT | Authentication tokens |
| Multer | File upload handling |

### 🤖 AI / Auth / Payments
| Technology | Purpose |
|---|---|
| Groq LLM APIs | Question generation & answer evaluation |
| Firebase Google OAuth | User authentication |
| Razorpay | Payment gateway |

### ☁️ Deployment
| Service | Purpose |
|---|---|
| Render (Frontend) | Client hosting |
| Render (Backend) | API server hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
InterviewNova/
│
├── client/                        # ⚛️  React Frontend (Vite)
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Route-level pages
│   │   ├── store/                 # Redux Toolkit slices
│   │   ├── hooks/                 # Custom React hooks
│   │   └── utils/                 # Helper functions
│   └── .env                       # Frontend environment variables
│
├── server/                        # 🟢  Express Backend
│   ├── controllers/               # Route handler logic
│   ├── middlewares/               # Auth & error middleware
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # API route definitions
│   ├── services/                  # AI, payment, file services
│   ├── public/                    # Resume uploads storage
│   └── .env                       # Backend environment variables
│
└── README.md
```

## 📦 Key Modules

```
⭐ Resume Analyzer API          — Parses resume and extracts role context
⭐ Interview Question Generator — LLM-powered role-specific Q&A generation
⭐ Answer Evaluation Engine     — Scores and provides AI feedback per answer
⭐ Performance Report System    — Aggregates scores into a final report
⭐ Credit & Payment Management  — Tracks usage credits + Razorpay top-up
⭐ Secure Auth Middleware       — JWT + Firebase session verification
```

---

## 🔮 Roadmap

- [x] Resume-based AI interview generation
- [x] Real-time answer evaluation
- [x] Performance report & history tracking
- [x] Credit-based payment system
- [ ] 🎤 Voice-based Interview (Speech-to-Text)
- [ ] 🎥 Video Interview Recording & Playback
- [ ] 📈 Advanced Analytics Dashboard
- [ ] 🧾 ATS Resume Score Checker
- [ ] 🧑‍💼 Recruiter / Admin Panel
- [ ] 🏆 Gamified Leaderboard & Achievements

---

## 👨‍💻 Author

<div align="center">

**Surya Pratap Singh**

💼 Full Stack + AI Developer

[![GitHub](https://img.shields.io/badge/GitHub-Surya-Chauhan-181717?style=for-the-badge&logo=github)](https://github.com/Surya-Chauhan)

</div>

---

<div align="center">

### ⭐ If this project helped you, give it a star — it means a lot!

[![Star this repo](https://img.shields.io/github/stars/Surya-Chauhan/InterviewNova?style=social)](https://github.com/Surya-Chauhan/InterviewNova)

_Built with ❤️ by Surya Pratap Singh_

</div>
