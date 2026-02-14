# Medical Appointment App

A **React Native** application for scheduling and managing medical appointments.  
Supports patients and doctors with appointment creation, editing, and status tracking.

---

## Features

- User authentication (email & password) with validation
- Loading state during login and data fetching
- Secure token/session handling via Firebase Authentication
- Add, edit, delete, getById, and view appointments
- Track appointment status: Scheduled, Completed, Cancelled
- Select date and time using a calendar and TimePicker
- Responsive design for iOS and Android
- Redux Toolkit for state management
- Firebase Authentication and Firestore integration

---

## Installation

### Prerequisites

- Node.js >= 18
- npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or a physical device

  ### Steps

1. **Clone the repository**  

```bash
git clone https://github.com/Aguir-Ichrak/MedicalApp.git
cd medical-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

- Create a Firebase project in the Firebase Console
- Enable Authentication (Email/Password)
- Enable Firestore Database
- Copy your Firebase config into src/firebase/config.ts

4. **Start the development server**  

```bash
npm start
```
- Scan the QR code with Expo Go or run on simulator/emulator

---

## Project Structure

```bash
/src
  /components         # Reusable UI components (FormInput, Navbar, AppointmentCard, DateInput, TimePickerInput)
  /firebase           
    config.ts         # Firebase configuration and initialization
  /models             # Data models (Appointment, User)
  /navigation         # Navigation setup (Stack Navigator with auth-based routing)
  /screens            # App screens (Login, Loading, Dashboard, AddAppointment, EditAppointment)
  /services
    /slices           # Redux Toolkit slices for state management
    store.ts          # Redux store configuration
  /utils              # Constants, types, validation
```
---

## Architecture Overview

Stack: React Native + Expo | Redux Toolkit | Firebase

Data Flow:

1. User interacts with the UI (form, buttons, etc.)
2. Redux async thunks dispatch actions to Firebase
3. Firestore updates are reflected in Redux state
4. UI automatically re-renders based on updated state

Components: Modular and reusable (inputs, cards, navigation bar)
Screens: Represent app pages, connected to Redux for state

---

## Available Scripts

- npm start → Start Expo server
- npm run android → Run on Android
- npm run ios → Run on iOS

---

## Dependencies

- React Native
- Expo
- Redux Toolkit
- React Navigation
- Firebase
- React Native Calendars
- React Native Community
  
