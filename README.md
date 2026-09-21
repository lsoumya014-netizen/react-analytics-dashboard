# Workflow & Task Analytics Dashboard (React.js)

A responsive, component-driven task management and analytics web application built with **React 18**, modern ES6+ JavaScript, custom React hooks, and comprehensive unit/integration test coverage with **Vitest** and **React Testing Library**.

[![Tests](https://img.shields.io/badge/tests-15%20passed%20%2F%20100%25-brightgreen)](package.json)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📌 Features

- **Component-Driven Architecture:** Modular UI split into clean, reusable single-responsibility components (`StatCard`, `TaskTable`, `TaskModal`).
- **Real-Time Analytics:** Dynamic computation of key workflow metrics (Total Tasks, In Progress, Completed, High Priority, and Completion Rate percentage).
- **Custom React Hooks:**
  - `useLocalStorage`: Custom hook for persistent browser state synchronization with automatic serialization and fallback hydration.
  - `useTaskFilter`: Custom hook providing optimized multi-criteria filtering across search strings, status tags, and priority tiers using `useMemo`.
- **Accessible Modal & Strict Form Validation:** `TaskModal` includes accessible ARIA dialog roles, required field validations, character minimum constraints, and actionable inline error messages.
- **Full Test Coverage:** 15 automated unit and integration tests verifying rendering, hook state mutations, search/filter logic, modal form validation, and user actions.

---

## 🏗️ Architecture & Component Hierarchy

```text
App (Root Component)
 ├── Header (Title & "+ New Task" Action)
 ├── Metrics Section (StatCards: Total, In Progress, Completed, High Priority)
 ├── Filter Toolbar (Search Input, Priority Dropdown, Status Button Group)
 ├── TaskTable (Sortable, Filterable Data Grid with Action Handlers)
 └── TaskModal (Accessible Form with Strict Client-side Validation)
```

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 (Functional Components, Hooks: `useState`, `useEffect`, `useMemo`)
- **Language:** JavaScript (ES6+ / ECMAScript Modules)
- **State Management & Persistence:** Custom React Hooks + HTML5 `localStorage`
- **Testing Framework:** Vitest 5, React Testing Library (`@testing-library/react`), `@testing-library/jest-dom`, JSDOM
- **Version Control & CI/CD:** Git, GitHub Actions compatible

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation
```bash
git clone https://github.com/lsoumya014-netizen/react-analytics-dashboard.git
cd react-analytics-dashboard
npm install
```

### Running Automated Tests
Execute the comprehensive test suite with Vitest:
```bash
npm test
```

Expected output:
```text
 ✓ src/__tests__/useTaskFilter.test.js (4 tests)
 ✓ src/__tests__/TaskModal.test.jsx (4 tests)
 ✓ src/__tests__/App.test.jsx (4 tests)
 ✓ src/__tests__/useLocalStorage.test.js (3 tests)

 Test Files  4 passed (4)
      Tests  15 passed (15)
```

---

## 🧪 Test Suite Summary

| Test File | Target | Coverage & Test Cases |
| :--- | :--- | :--- |
| `useLocalStorage.test.js` | Custom Hook | Storage initialization, state update, and localStorage hydration |
| `useTaskFilter.test.js` | Custom Hook | Multi-criteria search, status filtering, and dynamic metric calculations |
| `TaskModal.test.jsx` | Component | Modal rendering, field accessibility, validation errors, and submission handling |
| `App.test.jsx` | Integration | Dashboard rendering, live search filtering, status tab filtering, and modal flows |

---

## 👤 Author

**Soumya L**  
- Location: Hubballi, Karnataka, India  
- Email: [lsoumya014@gmail.com](mailto:lsoumya014@gmail.com)  
- LinkedIn: [linkedin.com/in/soumya-l-61b091203](https://linkedin.com/in/soumya-l-61b091203)  
- GitHub: [github.com/lsoumya014-netizen](https://github.com/lsoumya014-netizen)
