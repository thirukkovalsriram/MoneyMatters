# 💰 Money Matters — Personal Finance & Transaction Management Web Application

> A production-grade, highly responsive financial dashboard built with **React**, **Vite**, **Recharts**, and **Lucide Icons**, integrated directly with the live **Hasura GraphQL / REST API**. Designed in strict fidelity with the [Money Matters Figma Specifications](https://www.figma.com/file/U75zTaCvoQJUPT9FOaA3Dj/Money-Matters?node-id=1%3A1492&mode=dev).

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Architectural Design & ELP (Execution Level Plan)](#-architectural-design--elp)
- [Clean Code & Best Practices Adherence](#-clean-code--best-practices-adherence)
- [Live Backend & Postman API Integration](#-live-backend--postman-api-integration)
- [Demo Credentials](#-demo-credentials)
- [Getting Started](#-getting-started)
- [Loom Recording Walkthrough Guide (< 5 mins)](#-loom-recording-walkthrough-guide--5-mins)

---

## 🌟 Project Overview

**Money Matters** empowers users and administrators to track, manage, and analyze incoming income (Credit) and outgoing expenses (Debit) through an intuitive, data-dense interface.

### Highlights:
- **Real-Time Hasura REST API Integration**: Connects to the live Hasura backend for CRUD operations, aggregates, and user sessions.
- **Dual-Role Capabilities**:
  - **User Mode (`Jane Doe`)**: Personal financial metrics, add/update/delete transactions with confirmations, category breakdowns, and weekly chart.
  - **Admin Mode (`System Admin`)**: High-level platform oversight across all system users, aggregate cash flows, user mapping, and read-only protections.
- **Strict Guidelines Compliance**:
  - **No Boolean Flag Arguments**: Functions and components are split into distinct, single-purpose units.
  - **Zero Magic Strings / Numbers**: All endpoints, categories, storage keys, and status codes are centralized into constants.
  - **Total Destructuring**: All props and objects are cleanly destructured across the application.
  - **Comprehensive Status Handling**: Explicit UI states for `LOADING`, `SUCCESS`, `EMPTY`, and `ERROR` with retry mechanisms.

---

## 🚀 Key Features

### 1. 📊 Interactive Dashboard
- **Summary Metric Cards**: Live totals for **Total Credit**, **Total Debit**, and **Net Balance** with color-coded trend indicators.
- **Weekly Activity Chart**: Responsive dual-bar chart visualizing Debit vs Credit activity over the week.
- **Expense Statistics**: Doughnut chart illustrating spending distribution across categories (Food, Shopping, Entertainment, Transfer, Housing, etc.).
- **Recent Transactions Ledger**: Snapshot of the 3 latest transactions with direct links to full management.

### 2. 💳 Complete Transactions Management
- **Category Filter Tabs**: One-click toggling between `All Transactions`, `Credit`, and `Debit`.
- **Instant Search**: Real-time filtering by transaction name, category, or user name.
- **Pagination**: Paginated navigation with configurable page size (8 items/page) and entry counters.
- **Transactional CRUD**:
  - `AddTransactionModal`: Dedicated form with validation for new entries.
  - `UpdateTransactionModal`: Pre-filled update dialog for existing records.
  - `DeleteConfirmModal`: Safe confirmation dialog preventing accidental data deletion.

### 3. 👤 User Profile & Role Switcher
- View and update personal information (Name, Email, Date of Birth, Present Address, Permanent Address, City, Postal Code, Country).
- Seamless, one-click Role Switcher in header and sidebar to test both User and Admin experiences instantly.

---

## 🏗️ Architectural Design & ELP

### Component Hierarchy Tree

```
src/
├── api/
│   ├── client.js                   # Authenticated fetch client with Hasura headers
│   └── endpoints.js                # Hasura REST endpoint service functions
├── constants/
│   ├── api.js                      # Base URL, Admin Secret, Endpoints, Roles
│   ├── transaction.js              # Types (credit/debit), Categories, Page limits
│   ├── ui.js                       # Button variants, Modal types, Storage keys
│   └── routes.js                   # Route definitions
├── context/
│   ├── AuthContext.jsx             # User authentication, session storage & role management
│   └── DashboardContext.jsx        # Transaction state, live totals, charts, modal controllers
├── components/
│   ├── common/
│   │   ├── Button/                 # PrimaryButton, SecondaryButton, DangerButton, IconButton
│   │   ├── Form/                   # TextField, SelectField
│   │   ├── Feedback/               # Loader, SkeletonCard, EmptyState, ErrorState
│   │   ├── Modal/                  # ModalShell, AddTransactionModal, UpdateTransactionModal, DeleteConfirmModal
│   │   ├── Navigation/             # Tabs, Pagination
│   │   ├── Transaction/            # CreditTransactionIcon, DebitTransactionIcon, CategoryBadge
│   │   └── Logo.jsx                # Money Matters SVG brand logo
│   ├── layout/
│   │   ├── AppShell.jsx            # Main responsive layout frame
│   │   ├── Sidebar.jsx             # Navigation drawer, brand, user badge, logout
│   │   └── Header.jsx              # Top bar, route title, Add CTA, quick role switch
│   └── dashboard/
│       ├── StatCard.jsx            # Metric card component
│       ├── StatsGrid.jsx           # 3-column metric cards container with loading skeletons
│       ├── WeeklyActivityChart.jsx # Recharts Bar Chart (Debit vs Credit)
│       ├── ExpenseCategoryChart.jsx# Recharts Doughnut Chart (Category statistics)
│       └── RecentTransactions.jsx  # Last 3 transactions list
├── pages/
│   ├── LoginPage.jsx               # Auth screen with 1-click demo access buttons
│   ├── DashboardPage.jsx           # Main dashboard overview
│   ├── TransactionsPage.jsx        # Data table with tabs, search, pagination & actions
│   └── ProfilePage.jsx             # Profile view & edit form
├── utils/
│   ├── currencyFormatter.js        # formatAmount, formatCreditAmount, formatDebitAmount
│   └── dateFormatter.js            # formatTransactionDate, formatDayOfWeek, formatInputDateTime
├── styles/
│   └── index.css                   # Design tokens, typography, responsive styling
├── App.jsx                         # React Router v6 & ProtectedRoute configuration
└── main.jsx                        # React root bootstrap
```

### Minimal State Identification Matrix

| State Element | Type | Owner | Why Minimal? |
| :--- | :--- | :--- | :--- |
| `currentUser` | `User \| null` | `AuthContext` | Unique active session data; cannot be computed. |
| `transactions` | `Array` | `DashboardContext` | Primary dataset from `/all-transactions`. |
| `totals` | `{ credit, debit }` | `DashboardContext` | Fetched directly from aggregate endpoints. |
| `activeModal` | `enum` | `DashboardContext` | Replaces conflicting boolean flags with single enum. |
| `selectedTransaction` | `Object \| null`| `DashboardContext` | Current transaction targeted for edit/delete. |
| `selectedTab` | `string` | `TransactionsPage` | Local tab filtering (`all`, `credit`, `debit`). |
| `searchQuery` | `string` | `TransactionsPage` | Local search term. |
| `currentPage` | `number` | `TransactionsPage` | Current pagination index. |

---

## 🎯 Clean Code & Best Practices Adherence

### 1. Eliminating Flag Arguments (Boolean Parameters)
Instead of passing boolean flags like `isPrimary`, `isCredit`, or `isEdit` into multipurpose components:
- **Buttons**: Split into `<PrimaryButton />`, `<SecondaryButton />`, `<DangerButton />`, and `<IconButton />`.
- **Currency Formatter**: Split into `formatAmount(val)`, `formatCreditAmount(val)` (explicit `+`), and `formatDebitAmount(val)` (explicit `-`).
- **Transaction Icons**: Split into `<CreditTransactionIcon />` and `<DebitTransactionIcon />`.
- **Modals**: Split into `<AddTransactionModal />`, `<UpdateTransactionModal />`, and `<DeleteConfirmModal />`.

### 2. Extracting Magic Numbers & Strings
No arbitrary numbers or string literals are hardcoded in application logic:
- `API_ENDPOINTS`: Centralized in `src/constants/api.js`.
- `TRANSACTION_TYPES` (`credit`, `debit`): Centralized in `src/constants/transaction.js`.
- `PAGINATION_LIMITS`: Centralized in `src/constants/transaction.js`.
- `MODAL_TYPES`: Centralized in `src/constants/ui.js`.

### 3. Strict Destructuring Everywhere
Every function, React hook, and component uniformly destructures its arguments and parameters.

### 4. Single Responsibility Principle (SRP)
- Presentation components contain no data fetching side-effects.
- Context providers encapsulate and isolate state mutations and API calls.
- API service adapters handle all HTTP communication.

---

## 🌐 Live Backend & Postman API Integration

The project communicates with the official **Hasura GraphQL / REST API**:
* **Base URL**: `https://bursting-gelding-24.hasura.app/api/rest`
* **Admin Secret Header**: `x-hasura-admin-secret: g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF`

### Verified Endpoints:
1. `POST /get-user-id`: Authenticates credentials and returns user ID.
2. `GET /profile`: Retrieves user profile attributes.
3. `GET /all-transactions?limit=:limit&offset=:offset`: Retrieves paginated ledger transactions.
4. `GET /credit-debit-totals`: Retrieves user total credit and debit.
5. `GET /transaction-totals-admin`: Retrieves admin platform-wide aggregates.
6. `GET /daywise-totals-7-days`: Retrieves user weekly activity data.
7. `GET /daywise-totals-last-7-days-admin`: Retrieves admin weekly activity data.
8. `POST /add-transaction`: Inserts new transaction record.
9. `POST /update-transaction`: Modifies existing record by ID.
10. `DELETE /delete-transaction`: Deletes record by ID.

---

## 🔑 Demo Credentials

For testing and evaluator convenience, pre-configured accounts are provided on the Login screen with **1-Click Demo Access**:

| Role | Email | Password | User ID | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Standard User** | `jane.doe@gmail.com` | `janedoe@123` | `1` | Full personal ledger access; can add, edit, and delete transactions. |
| **System Admin** | `admin@gmail.com` | `Admin@123` | `3` | Global platform analytics; view all user transactions across the system. |

> **Pro Tip**: You can also use the **Role Switcher Pill** in the top header (`Role: User (Switch)`) at any time to toggle between User and Admin views without logging out!

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended; verified on Node v26)
- npm

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd moneymatters
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🎥 Loom Recording Walkthrough Guide (< 5 mins)

When recording your Loom demonstration video, follow this concise script:

1. **Introduction (0:00 - 0:45)**:
   - Introduce yourself and the project: *"Hello, this is my submission for the Money Matters financial dashboard assignment."*
   - Mention tech stack: React, Vite, Recharts, Context API, and Hasura REST APIs.
   - Show the Login page and demonstrate the clean login flow with the demo account.

2. **Dashboard Overview (0:45 - 2:00)**:
   - Walk through the Dashboard:
     - 3 Metric Cards: Total Credit, Total Debit, and Net Balance.
     - Weekly Activity Bar Chart: Debit vs Credit comparison.
     - Expense Statistics: Doughnut chart showing category breakdown.
     - Recent Transactions list showing the 3 latest entries.

3. **Transactions Management (2:00 - 3:30)**:
   - Navigate to the **Transactions** page.
   - Demonstrate the **Tabs** (`All Transactions`, `Credit`, `Debit`).
   - Demonstrate the **Search Bar** (typing filters records instantly).
   - Show **Pagination** controls.
   - Click **+ Add Transaction**: Fill in Name, Type, Category, Amount, Date, and save. Show that the new transaction immediately reflects in the table and updates the totals!
   - Demonstrate **Edit Transaction** and **Delete Transaction** with the confirmation modal.

4. **Admin Role & Profile (3:30 - 4:15)**:
   - Click the **Role Switcher** in the header to switch to **Admin Mode**.
   - Show how the Admin view aggregates platform-wide transactions and attributes records to specific usernames.
   - Briefly visit the **Profile** page to show user profile details and editing.

5. **Code Architecture & Guidelines Summary (4:15 - 5:00)**:
   - Open the code in your editor:
     - Show `src/components/common/Button/` to demonstrate **no boolean flag arguments**.
     - Show `src/constants/` to demonstrate **elimination of magic strings & numbers**.
     - Show clean **destructuring** and **status handling** (`LOADING`, `SUCCESS`, `ERROR`, `EMPTY`).
   - Conclude and thank the reviewer!
