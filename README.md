# Hospital Billing Management System

A web-based application for managing hospital patient records and billing.
This system allows an admin to admit patients, manage their details, generate bills during discharge, and download invoices.

---

## Features

* Admin login system
* Add and admit patients
* View patient records
* Discharge patients
* Generate bill at discharge
* Download and print bill

---

## Tech Stack

Frontend:

* HTML
* CSS
* JavaScript

Backend:

* Node.js
* Express.js

Database:

* MongoDB

---

## Project Structure

```
hospital-billing-management/
│── public/
│   ├── admit.html
│   ├── admit.css
│   ├── billGen.html
│   ├── billGen.css
│   ├── bills-invoices.html
│   ├── bills.js
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── login1.html
│   ├── login1.css
│   ├── viewpat.html
│   ├── viewpat.css
│   ├── styles.css
│   ├── doctor.png
│
│── billingData.js
│── patientsMongo.js
│── mongo.js
│── index.js
│── package.json
│── README.md
```

---

## Installation and Setup

1. Clone the repository

```
git clone https://github.com/Ram-Etamsetty/Hospital-Billing-Management-System.git
cd hospital-billing-management
```

2. Install dependencies

```
npm install
```

3. Create a .env file and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Run the application

```
node index.js
```

---

## Usage

1. Login as admin
2. Admit a new patient
3. View patient details
4. Discharge patient and enter bill amount
5. Download the generated bill

---

## Future Improvements

* Multiple user roles (admin, doctor, receptionist)
* Payment integration
* Report generation
* Search and filter patients

---

## Author
Ram Etamsetty
https://github.com/Ram-Etamsetty
