# Workflow & Task Analytics Dashboard (React.js + REST API)

A responsive, component-driven task management and workflow analytics web application built with **React 18**, modern ES6+ JavaScript, custom React hooks, **real REST API integration** via native Fetch API, and comprehensive unit/integration test coverage with **Vitest** and **React Testing Library**.

[![Live Demo](https://img.shields.io/badge/demo-online%20preview-success?style=for-the-badge&logo=vercel)](https://react-analytics-dashboard-soumya.vercel.app)
[![Tests](https://img.shields.io/badge/tests-19%20passed%20%2F%20100%25-brightgreen?style=for-the-badge)](package.json)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Demo & Repository

- **Live Deployment:** [https://react-analytics-dashboard-soumya.vercel.app](https://react-analytics-dashboard-soumya.vercel.app)  
- **Source Code Repository:** [https://github.com/lsoumya014-netizen/react-analytics-dashboard](https://github.com/lsoumya014-netizen/react-analytics-dashboard)

---

## 🖥️ UI & Dashboard Layout Preview

```text
+-----------------------------------------------------------------------------------------------+
|  Workflow & Task Analytics Dashboard                   [↻ Sync REST API]  [+ New Task]        |
|  React.js component-based task management with REST API integration & local persistence      |
+-----------------------------------------------------------------------------------------------+
|  [TOTAL TASKS: 4]    [IN PROGRESS: 2]    [COMPLETED: 1 (25%)]    [HIGH PRIORITY: 1]           |
+-----------------------------------------------------------------------------------------------+
|  [ Search tasks...                         ]  Priority: [All Priorities v]  [All] [Todo] [In Progress] [Completed] |
+-----------------------------------------------------------------------------------------------+
| STATUS       | TITLE & DESCRIPTION                     | CATEGORY      | PRIORITY | ACTIONS   |
| [In Progress]| Implement Playwright End-to-End Suite   | QA / Testing  | [ HIGH ] | Edit Del  |
| [Completed]  | Build Responsive React Navigation Bar   | UI/UX         | [ MEDIUM]| Edit Del  |
| [In Progress]| Integrate Postman Collection in Actions | DevOps        | [ HIGH ] | Edit Del  |
| [To Do]      | Optimize Database Indexes (MySQL)       | Engineering   | [ LOW  ] | Edit Del  |
+-----------------------------------------------------------------------------------------------+
```

---

## 📌 Key Architectural Features

1. **Component-Driven Architecture:** Modular UI split into clean single-responsibility components (`StatCard`, `TaskTable`, `TaskModal`).
2. **REST API Integration:** Dedicated API service client (`src/services/taskApi.js`) using native `fetch` to communicate with remote REST endpoints (`jsonplaceholder.typicode.com/todos`), handling GET, POST, PATCH, and DELETE operations with asynchronous state updates and fallback caching.
3. **Live-Updating Metrics:** Dynamic computation of workflow KPIs (Total Tasks, In Progress, Completed, High Priority, and percentage completion rate).
4. **Custom React Hooks:**
   - `useLocalStorage`: Custom hook providing synchronized browser storage persistence with JSON schema serialization and safe fallback hydration.
   - `useTaskFilter`: Custom hook delivering optimized multi-criteria filtering across search queries, status tags, and priority tiers using `useMemo`.
5. **Accessible Modal & Client-Side Validation:** `TaskModal` includes accessible ARIA dialog attributes, title character minimums, required field validation, and real-time inline error alerts.
6. **Comprehensive Test Suite:** 19 automated unit and integration tests verifying rendering, hook state mutations, search/filter logic, REST API network calls, modal form validation, and user actions.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useMemo`)
- **Language:** JavaScript (ES6+ / ECMAScript Modules)
- **Networking:** REST API Integration via native `fetch` API (`taskApi.js`)
- **State Management & Persistence:** Custom React Hooks + HTML5 `localStorage`
- **Testing Framework:** Vitest 5, React Testing Library (`@testing-library/react`), `@testing-library/jest-dom`, JSDOM
- **Version Control & CI/CD:** Git, GitHub Actions compatible

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation & Local Run
```bash
git clone https://github.com/lsoumya014-netizen/react-analytics-dashboard.git
cd react-analytics-dashboard
npm install
npm test
```

### Running Automated Tests
```bash
npm test
```

Expected output:
```text
 ✓ src/__tests__/useTaskFilter.test.js (4 tests)
 ✓ src/__tests__/TaskModal.test.jsx (4 tests)
 ✓ src/__tests__/App.test.jsx (5 tests)
 ✓ src/__tests__/taskApi.test.js (3 tests)
 ✓ src/__tests__/useLocalStorage.test.js (3 tests)

 Test Files  5 passed (5)
      Tests  19 passed (19)
```

---

## 🧪 Test Suite Breakdown

| Test File | Target Layer | Test Cases & Coverage |
| :--- | :--- | :--- |
| `taskApi.test.js` | REST API Integration | Remote GET fetch schema mapping, HTTP error fallback, and POST JSON payload dispatch |
| `useLocalStorage.test.js` | Custom Hook | Storage initialization, state update mutation, and localStorage hydration |
| `useTaskFilter.test.js` | Custom Hook | Multi-criteria search, status filtering, and live-updating metric calculations |
| `TaskModal.test.jsx` | UI Component | Modal rendering, field accessibility, required validation alerts, and submission handling |
| `App.test.jsx` | Integration | Dashboard rendering, live search filtering, status tab filtering, modal flows, and REST sync |

---

## 👤 Author

**Soumya L**  
- Location: Hubballi, Karnataka, India (Open to Remote / Hybrid)  
- Email: [lsoumya014@gmail.com](mailto:lsoumya014@gmail.com)  
- LinkedIn: [linkedin.com/in/soumya-l-61b091203](https://linkedin.com/in/soumya-l-61b091203)  
- GitHub: [github.com/lsoumya014-netizen](https://github.com/lsoumya014-netizen)
