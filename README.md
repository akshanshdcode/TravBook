# TravBook - A Travel Booking Platform

Welcome to the TravBook! This project is a travel booking platform that focuses exclusively on travel package bookings, supporting three distinct roles: User, Provider, and Admin.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [User](#user)
  - [Provider](#provider)
  - [Admin](#admin)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Overview

This Platform is designed to streamline the process of booking travel packages. It offers various features for Users, Providers, and Admins to manage tours, bookings, and expenses effectively.

## Features

### User

- **Access to Tours/Travel Packages:**
  - Browse and book various travel packages.
  - View tour details including title, location, distance, max people allowed, and provider's name.

- **User Profile Page:**
  - View all booked tours/travel packages.

- **Expense Management:**
  - **MyExpense Page:** Track travel-related expenses.
  - **Add Trip Form:** Add trips, automatically created when a tour is booked.
  - **Expenses:** Add and view detailed expenses for each trip.

### Provider

- **Create Tour:**
  - Create new tours via the CreateTour page.
  - View and manage all created tours on the profile page, including deleting tours.

- **Booking Management:**
  - View all bookings for created tours.
  - Access booker details including name, email, and phone number.

### Admin

- **All Bookings:**
  - Access a comprehensive list of all bookings made on the platform.

- **Tour Management:**
  - Delete any tour created by any provider on the platform.

## Technologies

- **Frontend:**
  - React
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express

- **Database:**
  - MongoDB

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/akshansh/TravBook-Minor.git
   cd TravBook-Minor

2. **Install backend dependencies:**

   ```sh
   cd backend
   npm install

3. **Create a `.env` file in the `backend` directory and add your environment variables:**

   ```sh
   touch .env

4. **Start the backend server:**

   ```sh
   npm run start

5. **Install frontend dependencies:**

   Open a new terminal window and navigate to the `frontend` directory:

   ```sh
   cd ../frontend
   npm install

6. **Start the frontend server:**

   ```sh
   npm run start

7. **Open your browser and navigate to:**

   ```plaintext
   http://localhost:3000

## Usage

- Register and log in as a User, Provider, or Admin.
- Explore available travel packages, manage tours, and track expenses.
- Admins can manage bookings and tours for overall control and oversight.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Contact

For any questions or suggestions, please contact us at [akshansh.gupta13@gmail.com](mailto:akshansh.gupta13@gmail.com).
