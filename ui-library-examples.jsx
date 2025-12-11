/**
 * UI Library Examples
 *
 * Copy-paste ready examples for all components
 */

import React, { useState } from 'react';
import {
  // Layout
  Container, Grid, Flex, Stack, AnimatedBackground,

  // Components
  Button, IconButton, Card, GameCard, Modal,
  Input, Select, Textarea,
  Alert, Toast, Badge, ProgressBar, Spinner,
  Heading, Text,
  ScoreDisplay, LevelIndicator, QuestionCard, Timer,
  Divider, Spacer,

  // Utilities
  DesignTokens, AnimationVariants
} from './ui-library';

/* ============================================================================
 * EXAMPLE 1: Game Selection Screen
 * ========================================================================= */

export function GameSelectionExample() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <AnimatedBackground variant="gradient">
      <Container maxWidth="xl">
        <Stack spacing="xl">
          <div className="text-center py-12">
            <Heading level={1} gradient>
              Choose Your Game
            </Heading>
            <Text size="lg" color="secondary" className="mt-4">
              Select a math challenge to begin
            </Text>
          </div>

          <Grid cols={3} gap="lg" responsive>
            <GameCard
              title="Addition"
              description="Practice adding numbers"
              icon="➕"
              color="purple"
              onClick={() => setSelectedGame('addition')}
            />
            <GameCard
              title="Subtraction"
              description="Practice subtracting"
              icon="➖"
              color="pink"
              onClick={() => setSelectedGame('subtraction')}
            />
            <GameCard
              title="Multiplication"
              description="Times tables practice"
              icon="✖️"
              color="blue"
              onClick={() => setSelectedGame('multiplication')}
            />
            <GameCard
              title="Division"
              description="Division challenges"
              icon="➗"
              color="green"
              onClick={() => setSelectedGame('division')}
            />
            <GameCard
              title="Mixed"
              description="All operations"
              icon="🎯"
              color="orange"
              onClick={() => setSelectedGame('mixed')}
            />
            <GameCard
              title="Speed Challenge"
              description="Race against time"
              icon="⚡"
              color="purple"
              onClick={() => setSelectedGame('speed')}
            />
          </Grid>
        </Stack>
      </Container>
    </AnimatedBackground>
  );
}

/* ============================================================================
 * EXAMPLE 2: Quiz Interface
 * ========================================================================= */

export function QuizInterfaceExample() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);

  return (
    <AnimatedBackground variant="waves">
      <Container maxWidth="lg">
        <Stack spacing="lg">
          {/* Header with Stats */}
          <Card padding="md">
            <Flex justify="between" align="center">
              <ScoreDisplay score={score} label="Score" animated />
              <LevelIndicator currentLevel={level} totalLevels={5} />
              <Timer
                seconds={timeLeft}
                onComplete={() => alert('Time up!')}
                variant="circular"
                size="md"
              />
            </Flex>
          </Card>

          {/* Question */}
          <QuestionCard
            question="What is 7 × 8?"
            answers={['54', '56', '58', '60']}
            selectedAnswer={selectedAnswer}
            onAnswer={(index) => setSelectedAnswer(index)}
          />

          {/* Actions */}
          <Flex gap="md">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setSelectedAnswer(null)}
            >
              Skip
            </Button>
            <Button
              variant="primary"
              fullWidth
              disabled={selectedAnswer === null}
              onClick={() => {
                if (selectedAnswer === 1) {
                  setScore(score + 10);
                }
                setSelectedAnswer(null);
              }}
            >
              Submit Answer
            </Button>
          </Flex>
        </Stack>
      </Container>
    </AnimatedBackground>
  );
}

/* ============================================================================
 * EXAMPLE 3: Settings Panel
 * ========================================================================= */

export function SettingsPanelExample() {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container maxWidth="md">
      <Card padding="lg">
        <Stack spacing="lg">
          <Heading level={2}>Settings</Heading>

          <Divider spacing="lg" />

          {/* Form Fields */}
          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />

          <Select
            label="Difficulty Level"
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
              { value: 'expert', label: 'Expert' }
            ]}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="Select difficulty"
            fullWidth
          />

          <Textarea
            label="About Me"
            placeholder="Tell us about yourself..."
            rows={4}
            fullWidth
          />

          {/* Toggle Example */}
          <Flex justify="between" align="center">
            <div>
              <Text weight="semibold">Sound Effects</Text>
              <Text size="sm" color="secondary">
                Enable game sound effects
              </Text>
            </div>
            <Button
              variant={soundEnabled ? 'success' : 'secondary'}
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </Button>
          </Flex>

          <Divider spacing="lg" />

          {/* Actions */}
          <Flex gap="md">
            <Button variant="secondary" fullWidth>
              Cancel
            </Button>
            <Button variant="primary" fullWidth onClick={handleSave}>
              Save Changes
            </Button>
          </Flex>

          {/* Success Toast */}
          {showSuccess && (
            <Toast
              message="Settings saved successfully!"
              variant="success"
              duration={3000}
              onClose={() => setShowSuccess(false)}
            />
          )}
        </Stack>
      </Card>
    </Container>
  );
}

/* ============================================================================
 * EXAMPLE 4: Achievement Modal
 * ========================================================================= */

export function AchievementModalExample() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Show Achievement
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🎉 Achievement Unlocked!"
        size="md"
      >
        <Stack spacing="lg" className="text-center">
          <div className="text-6xl">🏆</div>

          <Heading level={3}>Math Master</Heading>

          <Text color="secondary">
            You've completed 100 problems correctly!
          </Text>

          <ProgressBar
            value={100}
            max={100}
            variant="success"
            showLabel
          />

          <Flex direction="col" gap="sm">
            <Badge variant="success" size="lg">
              +500 Points
            </Badge>
            <Badge variant="info" size="lg">
              Level Up!
            </Badge>
          </Flex>

          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowModal(false)}
          >
            Continue Playing
          </Button>
        </Stack>
      </Modal>
    </>
  );
}

/* ============================================================================
 * EXAMPLE 5: Dashboard with Stats
 * ========================================================================= */

export function DashboardExample() {
  return (
    <AnimatedBackground variant="dots">
      <Container maxWidth="xl">
        <Stack spacing="xl">
          {/* Header */}
          <div className="py-8">
            <Heading level={1} gradient>
              Your Dashboard
            </Heading>
            <Text size="lg" color="secondary" className="mt-2">
              Track your progress and achievements
            </Text>
          </div>

          {/* Stats Grid */}
          <Grid cols={4} gap="lg" responsive>
            <Card padding="md" hover>
              <Stack spacing="sm">
                <Text size="sm" color="secondary">Total Score</Text>
                <Heading level={2}>1,247</Heading>
                <Badge variant="success">+12%</Badge>
              </Stack>
            </Card>

            <Card padding="md" hover>
              <Stack spacing="sm">
                <Text size="sm" color="secondary">Problems Solved</Text>
                <Heading level={2}>324</Heading>
                <Badge variant="info">This week</Badge>
              </Stack>
            </Card>

            <Card padding="md" hover>
              <Stack spacing="sm">
                <Text size="sm" color="secondary">Accuracy</Text>
                <Heading level={2}>94%</Heading>
                <Badge variant="warning">Improving</Badge>
              </Stack>
            </Card>

            <Card padding="md" hover>
              <Stack spacing="sm">
                <Text size="sm" color="secondary">Current Level</Text>
                <Heading level={2}>15</Heading>
                <Badge variant="primary">Expert</Badge>
              </Stack>
            </Card>
          </Grid>

          {/* Progress Section */}
          <Card padding="lg">
            <Stack spacing="lg">
              <Heading level={3}>Weekly Progress</Heading>

              <div>
                <Flex justify="between" className="mb-2">
                  <Text>Addition</Text>
                  <Text weight="semibold">85/100</Text>
                </Flex>
                <ProgressBar value={85} max={100} variant="primary" />
              </div>

              <div>
                <Flex justify="between" className="mb-2">
                  <Text>Subtraction</Text>
                  <Text weight="semibold">92/100</Text>
                </Flex>
                <ProgressBar value={92} max={100} variant="success" />
              </div>

              <div>
                <Flex justify="between" className="mb-2">
                  <Text>Multiplication</Text>
                  <Text weight="semibold">67/100</Text>
                </Flex>
                <ProgressBar value={67} max={100} variant="warning" />
              </div>

              <div>
                <Flex justify="between" className="mb-2">
                  <Text>Division</Text>
                  <Text weight="semibold">45/100</Text>
                </Flex>
                <ProgressBar value={45} max={100} variant="error" />
              </div>
            </Stack>
          </Card>

          {/* Recent Activity */}
          <Card padding="lg">
            <Stack spacing="md">
              <Heading level={3}>Recent Activity</Heading>

              <Alert variant="success" title="Perfect Score!">
                Completed "Advanced Multiplication" with 100% accuracy
              </Alert>

              <Alert variant="info" title="New Level">
                You've reached Level 15 - Expert tier!
              </Alert>

              <Alert variant="warning" title="Challenge Available">
                Try the new Speed Challenge to earn bonus points
              </Alert>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </AnimatedBackground>
  );
}

/* ============================================================================
 * EXAMPLE 6: Loading States
 * ========================================================================= */

export function LoadingStatesExample() {
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="md">
      <Card padding="lg">
        <Stack spacing="lg">
          <Heading level={2}>Loading States</Heading>

          {/* Spinner Variants */}
          <div>
            <Text weight="semibold" className="mb-4">Spinners</Text>
            <Flex gap="lg" align="center">
              <Spinner size="sm" variant="primary" />
              <Spinner size="md" variant="primary" />
              <Spinner size="lg" variant="primary" />
            </Flex>
          </div>

          {/* Button Loading State */}
          <div>
            <Text weight="semibold" className="mb-4">Button Loading</Text>
            <Button
              variant="primary"
              fullWidth
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2000);
              }}
            >
              {loading ? (
                <Flex align="center" justify="center" gap="sm">
                  <Spinner size="sm" variant="white" />
                  <span>Loading...</span>
                </Flex>
              ) : (
                'Click to Load'
              )}
            </Button>
          </div>

          {/* Skeleton Loading */}
          <div>
            <Text weight="semibold" className="mb-4">Content Loading</Text>
            <Card padding="md">
              {loading ? (
                <Stack spacing="md">
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
                </Stack>
              ) : (
                <Text>Content loaded successfully!</Text>
              )}
            </Card>
          </div>
        </Stack>
      </Card>
    </Container>
  );
}

/* ============================================================================
 * EXAMPLE 7: All Buttons Showcase
 * ========================================================================= */

export function ButtonShowcaseExample() {
  return (
    <Container maxWidth="lg">
      <Stack spacing="xl">
        <Heading level={2}>Button Variants</Heading>

        {/* Primary Buttons */}
        <div>
          <Text weight="semibold" className="mb-4">Primary Buttons</Text>
          <Flex gap="md" wrap>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </Flex>
        </div>

        {/* All Variants */}
        <div>
          <Text weight="semibold" className="mb-4">All Variants</Text>
          <Flex gap="md" wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </Flex>
        </div>

        {/* Icon Buttons */}
        <div>
          <Text weight="semibold" className="mb-4">Icon Buttons</Text>
          <Flex gap="md">
            <IconButton variant="primary" size="sm">❤️</IconButton>
            <IconButton variant="primary" size="md">⭐</IconButton>
            <IconButton variant="primary" size="lg">🎮</IconButton>
            <IconButton variant="secondary">⚙️</IconButton>
            <IconButton variant="ghost">✕</IconButton>
          </Flex>
        </div>

        {/* Full Width */}
        <div>
          <Text weight="semibold" className="mb-4">Full Width</Text>
          <Stack spacing="md">
            <Button variant="primary" fullWidth>Full Width Primary</Button>
            <Button variant="secondary" fullWidth>Full Width Secondary</Button>
          </Stack>
        </div>
      </Stack>
    </Container>
  );
}

/* ============================================================================
 * EXPORT ALL EXAMPLES
 * ========================================================================= */

export default {
  GameSelectionExample,
  QuizInterfaceExample,
  SettingsPanelExample,
  AchievementModalExample,
  DashboardExample,
  LoadingStatesExample,
  ButtonShowcaseExample,
};
