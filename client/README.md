Here’s the detailed documentation formatted as a **Markdown file**:

---

# **Frontend Documentation**

## **Table of Contents**
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
   - [Core Dependencies](#core-dependencies)
   - [Utility Libraries](#utility-libraries)
4. [Pages](#pages)
   - [Home Page](#home-page)
   - [File Input Page](#file-input-page)
   - [Tabs](#tabs)
     - [Invoice Tab](#invoice-tab)
     - [Products Tab](#products-tab)
     - [Customers Tab](#customers-tab)
5. [Redux Setup](#redux-setup)
   - [Store Configuration](#store-configuration)
   - [Example Slice](#example-slice)
6. [TailwindCSS Setup](#tailwindcss-setup)
   - [Configuration](#configuration)
   - [Usage Examples](#usage-examples)
7. [Build and Deployment](#build-and-deployment)
   - [Development](#development)
   - [Build for Production](#build-for-production)
   - [Preview Production Build](#preview-production-build)
8. [Additional Notes](#additional-notes)
   - [Enhancements](#enhancements)
   - [Debugging Tips](#debugging-tips)

---
![Screenshot 2024-11-21 193804](https://github.com/user-attachments/assets/cf8f093f-a760-4e73-aeca-e99ec0f9d8c9)

## **Overview**

The Swipe Intern frontend is a web application built with React, Redux, and TailwindCSS. It is designed to provide a user-friendly interface for managing invoices, products, and customers. The application features a modular structure, optimized for scalability and maintainability.

---

## **Project Structure**

```plaintext
swipe-intern/
│
├── public/                     # Static assets
├── src/                        # Source code
│   ├── components/             # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Customers.jsx
│   │   ├── Products.jsx
│   │   └── ...
│   ├── pages/                  # Page components
│   │   ├── Home.jsx
│   │   ├── DataProcess.jsx
│   │   ├── DataTabs/
│   ├── redux/                  # Redux setup
│   │   ├── slices/             # Redux slices
│   │   │   ├── invoiceSlice.js
│   │   │   ├── productSlice.js
│   │   │   ├── customerSlice.js
│   │   │   └── ...
│   ├── store.js                # Global redux store
│   ├── App.css                 # CSS file
│   ├── App.jsx                 # Main app component
│   ├── index.jsx               # Application entry point
│   └── ...
├── tailwind.config.js          # TailwindCSS configuration
├── vite.config.js              # Vite configuration
├── package.json                # Project metadata and dependencies
└── index.html                  # Main HTML page
```

---

## **Dependencies**

### **Core Dependencies**
- **React**: ^18.3.1
- **Redux Toolkit**: ^2.3.0
- **React Router DOM**: ^6.28.0
- **TailwindCSS**: ^3.4.15

### **Utility Libraries**
- **React Dropzone**: File uploads.
- **React Loader Spinner**: Loading indicators.
- **React Hot Toast**: Toast notifications.
- **XLSX**: For handling Excel files.

---

## **Pages**

### **Home Page**
- **Path**: `/`
- **Description**:
  - Landing page of the application.
  - Provides navigation links to other features.
![Screenshot 2024-11-21 193804](https://github.com/user-attachments/assets/6c5070ba-ea7a-4463-8bed-2d17cdf410d3)

- **Components**:
  - Navbar

---

### **File Input Page**
- **Path**: `/data/process`
- **Description**:
  - Enables file uploads (e.g., invoices, product data) using **React Dropzone**.
  - Parses Excel files with the **XLSX** library.

- **Features**:
  - Drag-and-drop file input.
  - Real-time file validation.
  - Toast notifications via **React Hot Toast**.
![Screenshot 2024-11-21 194344](https://github.com/user-attachments/assets/e0be72e2-d398-413a-9e5f-5cac6840bca5)
![Screenshot 2024-11-21 194631](https://github.com/user-attachments/assets/35e7a1f8-6259-44be-8a2e-d9a2d28869f4)

---

### **Tabs**
![Screenshot 2024-11-21 194819](https://github.com/user-attachments/assets/92d616b8-2873-4a5c-8732-b19cb3ad0b78)

#### **Invoice Tab**
- **Path**: `/data/tabs`
- **Description**:
  - Lists all invoices with options to filter, sort, and search.
- **Features**:
  - Pagination
  - State management via `invoiceSlice`.
![Screenshot 2024-11-21 194910](https://github.com/user-attachments/assets/bdd8bd00-80c5-46f3-b0d2-0f177ae833e9)


#### **Products Tab**
- **Path**: `/tabs/products`
- **Description**:
  - Displays a list of products.
  - Supports CRUD operations.
- **Features**:
  - Inline editing of product details.
  - State management via `productSlice`.
![Screenshot 2024-11-21 194941](https://github.com/user-attachments/assets/c3a7faee-4599-486f-ab70-c098db3c9312)
![Screenshot 2024-11-21 200234](https://github.com/user-attachments/assets/76e7fc69-4fc9-4079-b418-24e3a90f54e8)

#### **Customers Tab**
- **Path**: `/tabs/customers`
- **Description**:
  - Lists customer data such as name, contact, and purchase history.
- **Features**:
  - Search bar with debounce functionality.
  - State management via `customerSlice`.
![Screenshot 2024-11-21 195019](https://github.com/user-attachments/assets/6d326e06-ea31-4178-b0fa-3f9b9e12a1db)
![Screenshot 2024-11-21 200218](https://github.com/user-attachments/assets/1bfcee9f-f52a-44f1-90d1-2e73086d18d4)

---

## **Redux Setup**

### **Store Configuration**
```javascript
import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./redux/slices/invoicesSlice";
import productsReducer from "./redux/slices/productsSlice";
import customersReducer from "./redux/slices/customersSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});
```

### **Example Slice**
```javascript
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInvoices,
  updateInvoiceCustomer,
  updateInvoiceProduct,
} from "../reducers/invoicesReducer";

const initialState = {
  invoices: [],
  invoicesLoading: false,
  invoicesError: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.invoicesLoading = true;
        state.invoicesError = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.invoicesLoading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.invoicesLoading = false;
        state.invoicesError = action.error.message;
      })
      .addCase(updateInvoiceProduct.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })
      .addCase(updateInvoiceCustomer.fulfilled, (state, action) => {
        state.invoices = action.payload;
      });
  },
});

export default invoicesSlice.reducer;
```

---

## **TailwindCSS Setup**

### **Configuration**
```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 2s infinite",
      },
      textColor: {
        primaryColor: "#3A643B",
        primaryYellow: "#FFF7E2",
      },
      backgroundColor: {
        primaryColor: "#3A643B",
        secondaryColor: "#f6f6f6",
        tertiaryColor: "#fff7e2",
        primaryYellow: "#FFF7E2",
      },
      borderColor: {
        primaryColor: "#3A643B",
        primaryYellow: "#FFF7E2",
      },
    },
  },
  plugins: [],
};
```

## **Build and Deployment**

### **Development**
To run the application locally:
```bash
npm run dev
```

### **Build for Production**
```bash
npm run build
```
---
