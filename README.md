# EdTech Mobile Application

A premium, feature-rich educational technology mobile application built with **React Native** and **Expo**. This app features a robust authentication system, state management using Context API, and a clean, modern design system.

## 🚀 Key Features

*   **Authentication System**: Complete Login and Signup flow.
*   **Persistent Login**: Uses `AsyncStorage` to keep users logged in across sessions.
*   **Advanced Form Validation**: Real-time field-level validation with clear error messaging.
*   **Context API State Management**: Global authentication state handling.
*   **Modern UI/UX**: Built with a custom theme system and premium aesthetics.
*   **Password Visibility**: Toggleable password fields for better user experience.
*   **Navigation**: Smooth screen transitions using `@react-navigation/native`.

## 🛠️ Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/)
*   **Platform**: [Expo](https://expo.dev/)
*   **Navigation**: [React Navigation](https://reactnavigation.org/)
*   **State Management**: React Context API
*   **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
*   **Icons**: Expo Vector Icons (Ionicons)
*   **Styling**: StyleSheet (Vanilla React Native)

## 📁 Project Structure

```text
Edtech1/
├── App.js               # Application Root & Providers
├── src/
│   ├── context/         # AuthContext for global state
│   ├── navigation/      # Stack & Tab Navigators
│   ├── screens/         # UI Components (Login, Signup, Home)
│   ├── theme.js         # Global Design Tokens (colors, spacing)
├── assets/              # Images, Fonts, and static assets
└── package.json         # Dependencies and scripts
```

## ⚙️ Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   Expo Go app on your mobile device (or an Emulator)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd Edtech1
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npx expo start --tunnel
    ***
    We use the --tunnel flag in Expo primarily to solve connection issues between your computer and your mobile device.
    ***
    ```

4.  **Run on device**:
    Scan the QR code shown in the terminal using the **Expo Go** app (Android) or **Camera App** (iOS).

## 🔐 Authentication Logic

The app uses a mock authentication flow for demonstration:
1.  **Signup**: User details (Name, Email, Password) are stored locally in `AsyncStorage` under the key `registeredUser`.
2.  **Login**: The app checks the entered credentials against the `registeredUser` stored in the device.
3.  **Persistence**: On successful login/signup, `userInfo` is saved to keep the user authenticated until they explicitly logout.

## 🎨 Design System

The application follows a consistent design language defined in `src/theme.js`. It uses a primary color-driven UI with focus on readability and smooth micro-interactions.

---

Built with ❤️ by Antigravity.
