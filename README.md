# Chocolate Factory Management Web Application

## Project Overview

This project is a web application designed to manage chocolate factories. The application provides various functionalities for different user roles, including Customers, Workers, Managers, and Administrators. It was developed using **Node.js** for the backend and **Vue.js** for the frontend.

## Features

### User Roles and Authentication
- **User Registration**: New users can register as Customers, while Administrators and Managers are pre-loaded or added by higher roles.
- **User Login**: Registered users can log in to access functionalities according to their role (Customer, Worker, Manager, Administrator).

### Chocolate Factory Management
- **Factory Management**: Administrators can create and manage chocolate factories, assigning Managers to each factory.
- **Factory Display**: The application displays all chocolate factories, prioritizing those that are currently open. Users can search and filter factories by name, location, or average rating.
- **Product Management**: Managers can add, update, or remove chocolates available in their assigned factories. Workers can update the stock quantity of chocolates.

### Purchasing System
- **Shopping Cart**: Customers can add chocolates to their cart, modify quantities, and proceed to purchase.
- **Order Management**: Customers can view their purchase history, while Managers can review all purchases related to their factory. Orders can be searched and sorted by various criteria.
- **Points System**: Customers earn points with purchases, which can be used to reach different customer types (e.g., Gold, Silver, Bronze) with corresponding discounts.

### Comments and Ratings
- **Factory Reviews**: After a successful purchase, Customers can leave comments and ratings for the factories.
- **Comment Approval**: Managers must approve comments before they are visible to other users.

### Administrator Features
- **User Management**: Administrators can view and manage all registered users, including blocking suspicious users.
- **Factory Monitoring**: Administrators have tools to monitor and manage the entire system, including a feature to detect and handle users who frequently cancel orders.

## Technologies Used

- **Backend**: Node.js
- **Frontend**: Vue.js
- **Data Storage**: CSV files (No databases used)
- **Maps**: OpenLayers (for displaying factory locations)

