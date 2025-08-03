# MovieNight

MovieNight is a personalized movie recommendation web application that selects films based on user preferences, viewing history, and custom filters. With a stylish dark interface and responsive design, it delivers a smart and intuitive user experience.

## Features
- Smart filtering by genre, year, and rating  
- Personalized recommendations based on viewing history and filters  
- Automatic watch tracking to exclude previously seen titles  
- Star-based rating system for user feedback  
- Responsive design for both desktop and mobile  
- Clean interface with detailed movie cards

## Design Highlights
- Dark theme with gradient overlays in purple and blue tones  
- Smooth animations and interactive hover effects  
- Clear, structured typography for readability  
- Real-time filtering with immediate feedback  
- Visually intuitive star-based rating component  
- Balanced layout with spacing, rounded corners, and depth

## Getting Started

**Prerequisites:**  
Ensure Node.js is installed on your machine.

**(Optional for Windows)**  
To allow PowerShell script execution:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Clone the repository**

```bash
git clone https://github.com/Mpakovich/MovieNight.git
cd MovieNight
```

**Create a local environment file**

```bash
copy .env.example .env    # Windows  
# or  
cp .env.example .env      # macOS/Linux
```

**Install dependencies**

```bash
npm install
```

**Start the development server**

```bash
npm run dev
```

## Tech Stack

| Category            | Description                         | Technology           |
|---------------------|-------------------------------------|----------------------|
| Framework           | Component-based UI architecture     | React + TypeScript   |
| Styling             | Utility-first CSS framework         | Tailwind CSS         |
| State Management    | Lightweight global state handling   | React Context API    |
| Build Tool          | Fast bundler and development server | Vite                 |
