# Flo & Flex Math Game - UI Component Library Documentation

A comprehensive, production-ready UI component library extracted from the Math Adventure game. Built with **React 18.3.1**, **Tailwind CSS v4.1.3**, and **Framer Motion**.

## 📦 Installation

```bash
# Required dependencies
npm install react react-dom framer-motion
# or
yarn add react react-dom framer-motion

# Tailwind CSS v4.1.3
npm install -D tailwindcss@4.1.3
# or
yarn add -D tailwindcss@4.1.3
```

## 🎨 Design System

### Design Tokens

Access the complete design system tokens:

```jsx
import { DesignTokens } from './ui-library';

// Colors
DesignTokens.colors.primary // '#9333ea'
DesignTokens.colors.success // '#10b981'

// Spacing
DesignTokens.spacing.md // '1rem'

// Typography
DesignTokens.typography.sizes.xl // '1.25rem'

// Shadows
DesignTokens.shadows.lg // '0 10px 15px -3px rgb(0 0 0 / 0.1)'
```

### Animation Variants

Pre-built Framer Motion animation variants:

```jsx
import { AnimationVariants } from './ui-library';

<motion.div {...AnimationVariants.fadeIn}>
  Content
</motion.div>

// Available variants:
// - fadeIn
// - scaleIn
// - slideUp
// - slideDown
// - bounce
// - pulse
// - staggerContainer / staggerItem
```

## 🎯 Component Reference

### Buttons

#### Button

A versatile button component with multiple variants and sizes.

```jsx
import { Button } from './ui-library';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

// Props:
// - variant: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
// - size: 'sm' | 'md' | 'lg'
// - disabled: boolean
// - fullWidth: boolean
// - onClick: function
```

**Variants:**
- `primary` - Purple gradient with hover effects
- `secondary` - White with border
- `success` - Green gradient
- `danger` - Red gradient
- `ghost` - Transparent background

#### IconButton

Round button for icons.

```jsx
import { IconButton } from './ui-library';

<IconButton variant="primary" size="md">
  🎮
</IconButton>

// Props:
// - variant: 'primary' | 'secondary' | 'ghost'
// - size: 'sm' | 'md' | 'lg'
// - disabled: boolean
```

### Input Components

#### Input

Text input with label and error handling.

```jsx
import { Input } from './ui-library';

<Input
  label="Username"
  placeholder="Enter username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error={errors.username}
  fullWidth
/>

// Props:
// - type: string (default: 'text')
// - label: string
// - placeholder: string
// - value: string
// - onChange: function
// - error: string
// - disabled: boolean
// - fullWidth: boolean
```

#### Select

Dropdown select component.

```jsx
import { Select } from './ui-library';

<Select
  label="Difficulty"
  options={[
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]}
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
  placeholder="Select difficulty"
/>

// Props:
// - label: string
// - options: Array<{value: string, label: string}>
// - value: string
// - onChange: function
// - error: string
// - disabled: boolean
// - fullWidth: boolean
// - placeholder: string
```

#### Textarea

Multi-line text input.

```jsx
import { Textarea } from './ui-library';

<Textarea
  label="Comments"
  placeholder="Enter your comments"
  value={comments}
  onChange={(e) => setComments(e.target.value)}
  rows={4}
/>

// Props:
// - label: string
// - placeholder: string
// - value: string
// - onChange: function
// - rows: number (default: 4)
// - error: string
// - disabled: boolean
// - fullWidth: boolean
```

### Card Components

#### Card

Basic card container with variants.

```jsx
import { Card } from './ui-library';

<Card variant="default" padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Props:
// - variant: 'default' | 'outlined' | 'elevated' | 'gradient'
// - gradient: boolean
// - hover: boolean (default: true)
// - padding: 'none' | 'sm' | 'md' | 'lg'
```

#### GameCard

Specialized card for game selection with icon and gradient.

```jsx
import { GameCard } from './ui-library';

<GameCard
  title="Addition"
  description="Practice adding numbers"
  icon="➕"
  color="purple"
  onClick={() => startGame('addition')}
/>

// Props:
// - title: string (required)
// - description: string
// - icon: string | ReactNode
// - color: 'purple' | 'pink' | 'blue' | 'green' | 'orange'
// - onClick: function
```

### Layout Components

#### Container

Page container with max-width and centering.

```jsx
import { Container } from './ui-library';

<Container maxWidth="xl" centered padding>
  <YourContent />
</Container>

// Props:
// - maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
// - centered: boolean (default: true)
// - padding: boolean (default: true)
```

#### Grid

Responsive grid layout.

```jsx
import { Grid } from './ui-library';

<Grid cols={3} gap="md" responsive>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Props:
// - cols: number (default: 3)
// - gap: 'sm' | 'md' | 'lg' | 'xl'
// - responsive: boolean (default: true)
```

#### Flex

Flexbox container with convenient props.

```jsx
import { Flex } from './ui-library';

<Flex direction="row" align="center" justify="between" gap="md">
  <div>Left</div>
  <div>Right</div>
</Flex>

// Props:
// - direction: 'row' | 'col' | 'row-reverse' | 'col-reverse'
// - align: 'start' | 'center' | 'end' | 'stretch'
// - justify: 'start' | 'center' | 'end' | 'between' | 'around'
// - gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
// - wrap: boolean
```

#### Stack

Vertical stack with spacing.

```jsx
import { Stack } from './ui-library';

<Stack spacing="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Props:
// - spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl'
```

### Modal

Full-featured modal with backdrop and animations.

```jsx
import { Modal } from './ui-library';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>

// Props:
// - isOpen: boolean (required)
// - onClose: function (required)
// - title: string
// - size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
// - closeOnOverlay: boolean (default: true)
```

### Feedback Components

#### Alert

Informational alert box.

```jsx
import { Alert } from './ui-library';

<Alert variant="success" title="Success!" onClose={handleClose}>
  Your changes have been saved.
</Alert>

// Props:
// - variant: 'success' | 'error' | 'warning' | 'info'
// - title: string
// - onClose: function
```

#### Toast

Temporary notification message.

```jsx
import { Toast } from './ui-library';

<Toast
  message="Game saved successfully!"
  variant="success"
  duration={3000}
  onClose={() => setShowToast(false)}
/>

// Props:
// - message: string (required)
// - variant: 'success' | 'error' | 'warning' | 'info'
// - duration: number (ms, default: 3000)
// - onClose: function
```

#### Badge

Small status indicator.

```jsx
import { Badge } from './ui-library';

<Badge variant="success" size="md">
  Level 5
</Badge>

// Props:
// - variant: 'primary' | 'success' | 'error' | 'warning' | 'info'
// - size: 'sm' | 'md' | 'lg'
```

#### ProgressBar

Animated progress indicator.

```jsx
import { ProgressBar } from './ui-library';

<ProgressBar
  value={75}
  max={100}
  variant="primary"
  showLabel
/>

// Props:
// - value: number (default: 0)
// - max: number (default: 100)
// - variant: 'primary' | 'success' | 'error' | 'warning'
// - size: 'sm' | 'md' | 'lg'
// - showLabel: boolean
```

#### Spinner

Loading spinner.

```jsx
import { Spinner } from './ui-library';

<Spinner size="md" variant="primary" />

// Props:
// - size: 'sm' | 'md' | 'lg'
// - variant: 'primary' | 'white'
```

### Typography

#### Heading

Responsive heading component.

```jsx
import { Heading } from './ui-library';

<Heading level={1} gradient>
  Main Title
</Heading>

// Props:
// - level: 1 | 2 | 3 | 4 | 5 | 6
// - gradient: boolean
```

#### Text

Styled text component.

```jsx
import { Text } from './ui-library';

<Text size="lg" weight="semibold" color="secondary">
  Some text content
</Text>

// Props:
// - size: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
// - weight: 'normal' | 'medium' | 'semibold' | 'bold'
// - color: 'primary' | 'secondary' | 'tertiary' | 'white'
```

### Game-Specific Components

#### ScoreDisplay

Animated score counter.

```jsx
import { ScoreDisplay } from './ui-library';

<ScoreDisplay score={1250} label="Total Score" animated />

// Props:
// - score: number (required)
// - label: string (default: 'Score')
// - animated: boolean (default: true)
```

#### LevelIndicator

Visual level progress dots.

```jsx
import { LevelIndicator } from './ui-library';

<LevelIndicator currentLevel={3} totalLevels={5} />

// Props:
// - currentLevel: number (required)
// - totalLevels: number (required)
```

#### QuestionCard

Interactive question with multiple choice answers.

```jsx
import { QuestionCard } from './ui-library';

<QuestionCard
  question="What is 5 + 3?"
  answers={['6', '7', '8', '9']}
  selectedAnswer={selectedAnswer}
  onAnswer={(index) => setSelectedAnswer(index)}
  disabled={isChecking}
/>

// Props:
// - question: string (required)
// - answers: string[] (required)
// - onAnswer: function (required)
// - selectedAnswer: number
// - disabled: boolean
```

#### Timer

Countdown timer with circular or linear display.

```jsx
import { Timer } from './ui-library';

<Timer
  seconds={60}
  onComplete={() => alert('Time up!')}
  variant="circular"
  size="md"
/>

// Props:
// - seconds: number (required)
// - onComplete: function
// - variant: 'circular' | 'linear'
// - size: 'sm' | 'md' | 'lg'
```

### Utility Components

#### Divider

Visual separator line.

```jsx
import { Divider } from './ui-library';

<Divider orientation="horizontal" spacing="md" />

// Props:
// - orientation: 'horizontal' | 'vertical'
// - spacing: 'none' | 'sm' | 'md' | 'lg' | 'xl'
```

#### Spacer

Empty space for layout.

```jsx
import { Spacer } from './ui-library';

<Spacer size="lg" />

// Props:
// - size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

#### AnimatedBackground

Full-screen animated background.

```jsx
import { AnimatedBackground } from './ui-library';

<AnimatedBackground variant="gradient">
  <YourContent />
</AnimatedBackground>

// Props:
// - variant: 'gradient' | 'dots' | 'waves'
```

## 🎨 Complete Example

Here's a complete example using multiple components:

```jsx
import React, { useState } from 'react';
import {
  AnimatedBackground,
  Container,
  Heading,
  Grid,
  GameCard,
  Modal,
  Button,
  Stack,
  ScoreDisplay,
  LevelIndicator,
} from './ui-library';

function App() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);

  return (
    <AnimatedBackground variant="gradient">
      <Container maxWidth="xl">
        <Stack spacing="xl">
          {/* Header */}
          <div className="text-center py-8">
            <Heading level={1} gradient>
              Math Adventure
            </Heading>
            <div className="flex justify-center gap-8 mt-6">
              <ScoreDisplay score={score} animated />
              <LevelIndicator currentLevel={level} totalLevels={5} />
            </div>
          </div>

          {/* Game Selection */}
          <Grid cols={3} gap="lg" responsive>
            <GameCard
              title="Addition"
              description="Practice adding numbers"
              icon="➕"
              color="purple"
              onClick={() => setShowModal(true)}
            />
            <GameCard
              title="Subtraction"
              description="Practice subtracting numbers"
              icon="➖"
              color="pink"
              onClick={() => setShowModal(true)}
            />
            <GameCard
              title="Multiplication"
              description="Practice multiplying numbers"
              icon="✖️"
              color="blue"
              onClick={() => setShowModal(true)}
            />
          </Grid>

          {/* Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Game Options"
            size="md"
          >
            <Stack spacing="md">
              <p>Select your difficulty level:</p>
              <Button variant="success" fullWidth>
                Easy
              </Button>
              <Button variant="primary" fullWidth>
                Medium
              </Button>
              <Button variant="danger" fullWidth>
                Hard
              </Button>
            </Stack>
          </Modal>
        </Stack>
      </Container>
    </AnimatedBackground>
  );
}

export default App;
```

## 🎯 Best Practices

### 1. Consistent Spacing

Use the spacing props consistently:

```jsx
<Stack spacing="md">
  <Card padding="md">
    <Heading level={2}>Title</Heading>
  </Card>
</Stack>
```

### 2. Responsive Design

Components use responsive breakpoints automatically:

```jsx
<Grid cols={3} responsive>  {/* 1 col on mobile, 3 on desktop */}
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### 3. Accessibility

All components include proper ARIA attributes. Add labels to interactive elements:

```jsx
<Input
  label="Email Address"  // Always include labels
  placeholder="Enter email"
  aria-required="true"
/>
```

### 4. Animation Performance

Use Framer Motion variants for better performance:

```jsx
import { AnimationVariants } from './ui-library';

<motion.div {...AnimationVariants.fadeIn}>
  Content
</motion.div>
```

### 5. Color Consistency

Use variant props instead of custom colors:

```jsx
// Good
<Button variant="primary">Click</Button>
<Alert variant="success">Success!</Alert>

// Avoid
<Button className="bg-custom-color">Click</Button>
```

## 🔧 Customization

### Extending Components

You can extend components with additional classes:

```jsx
<Button
  variant="primary"
  className="my-custom-class"
>
  Custom Button
</Button>
```

### Custom Variants

Add new variants by modifying the component:

```jsx
// In ui-library.jsx
const variants = {
  // ... existing variants
  custom: 'bg-gradient-to-r from-indigo-400 to-cyan-400 text-white',
};
```

### Tailwind Configuration

Ensure Tailwind includes all required utilities:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './ui-library.jsx'  // Include the UI library
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
};
```

## 📊 Component Statistics

- **Total Components:** 35+
- **Animation Variants:** 8
- **Design Tokens:** 50+
- **Variants per Component:** 3-5 average
- **Framework:** React 18.3.1
- **Styling:** Tailwind CSS v4.1.3
- **Animation:** Framer Motion

## 🚀 Performance Tips

1. **Code Splitting:** Import only the components you need
2. **Lazy Loading:** Use React.lazy() for large modals
3. **Memoization:** Wrap components with React.memo() when appropriate
4. **Animation:** Use Framer Motion's `layout` prop for smooth transitions
5. **Images:** Always optimize images before using in GameCard components

## 📝 License

This UI library is extracted from the FlexnFlex-Math-Test project.

## 🤝 Contributing

To add new components:
1. Follow the existing component structure
2. Include prop types and defaults
3. Add Framer Motion animations where appropriate
4. Use Tailwind classes for styling
5. Document the component in this README

## 📞 Support

For issues or questions about the UI library:
- Check the component examples above
- Review the design tokens for consistent values
- Ensure all dependencies are installed correctly

---

**Built with ❤️ for the Math Adventure Game**
