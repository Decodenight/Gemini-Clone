# Gemini Clone
![GeminiClone](https://github.com/user-attachments/assets/628d682b-0992-4776-a26f-eaf336574f27)

Gemini Clone is a React-based web application that mimics the functionality of a chat interface. It uses Vite for fast development and build processes, Redux for state management, and Tailwind CSS for styling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)


## Features

- **Chat Interface**: Real-time chat interface with user and assistant roles.
- **Sidebar**: Sidebar for navigation and settings.
- **Dark Mode**: Toggle between dark and light themes.
- **Markdown Support**: Messages support markdown formatting.
- **API Integration**: Uses Google Generative AI for generating responses.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/gemini-clone.git
    cd gemini-clone
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

## Usage

### Development

To start the development server with hot module replacement:
```sh
npm run dev
```

## Project Structure

```
GeminiClone/
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
│   ├── Gemini-Logo.png
│   └── vite.svg
├── README.md
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Chat.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   └── useGeminiAPI.js
│   ├── index.css
│   ├── main.jsx
│   ├── store/
│   │   ├── chatSlice.js
│   │   └── index.js
│   └── tailwind.config.js
└── vite.config.js
```

