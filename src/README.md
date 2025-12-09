# Flo & Flex Math Game - PWA

A responsive Progressive Web App (PWA) math game for kids featuring two engaging characters: **Flo** and **Flex**. Built with React, TypeScript, Tailwind CSS, and Motion (Framer Motion).

## 🎮 Features

- **Interactive Characters**: Choose between Flo and Flex, each with animated reactions
- **Multiple Game Modes**: 
  - Addition, Subtraction, Multiplication, Division
  - Different difficulty levels (1-10, 1-20, 1-50, 1-100)
  - Visual object representations for better learning
- **Bilingual Support**: Toggle between English and German (Deutsch)
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **PWA Capabilities**: Install and play offline

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

This PWA can be deployed to:
- **Vercel**: Connect your repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Build and push to `gh-pages` branch
- **Any static hosting**: Upload the `dist` folder

## 📱 PWA Installation

Once deployed, users can install the app on their devices:
- **Mobile**: Tap "Add to Home Screen" in browser menu
- **Desktop**: Click install icon in address bar

## 🎨 Game Flow

1. **Welcome Screen**: Start the game
2. **Character Selection**: Choose Flo or Flex
3. **Object Selection**: Pick visual objects (apples, stars, hearts, balls)
4. **Operation Selection**: Choose math operation
5. **Range Selection**: Select difficulty level
6. **Game Screen**: Answer 20 questions with character feedback
7. **Results Screen**: View score and play again

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **PWA** with service worker support

## 📂 Project Structure

```
/
├── App.tsx                    # Main app component
├── components/
│   ├── FloCharacter.tsx       # Flo character component
│   ├── FlexCharacter.tsx      # Flex character component
│   ├── LanguageSwitcher.tsx   # Language toggle
│   ├── game/                  # Game screens
│   │   ├── CharacterSelect.tsx
│   │   ├── ObjectSelect.tsx
│   │   ├── OperationSelect.tsx
│   │   ├── RangeSelect.tsx
│   │   ├── GameScreen.tsx
│   │   └── ResultsScreen.tsx
│   └── ui/                    # UI components
├── contexts/
│   └── LanguageContext.tsx    # Language state management
├── lib/
│   ├── gameLogic.ts           # Game logic and math generation
│   ├── translations.ts        # Language translations
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Utility functions
├── imports/                   # Character graphics and SVGs
├── public/
│   └── manifest.json          # PWA manifest
└── styles/
    └── globals.css            # Global styles
```

## 🌐 Language Support

The game supports:
- 🇬🇧 English
- 🇩🇪 German (Deutsch)

Switch languages anytime using the globe icon in the top-right corner.

## 🎭 Characters

### Flo (Purple)
- Cheerful and encouraging
- Perfect for beginners

### Flex (Pink)  
- Energetic and fun
- Great for all skill levels

Both characters have three animated states:
- **Smile**: Default friendly state
- **Thumbs Up**: Correct answer celebration
- **Hand Scratch**: Wrong answer encouragement

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

---

Made with ❤️ for young math learners
