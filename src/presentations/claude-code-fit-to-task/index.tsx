import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import CallSplitRoundedIcon from '@mui/icons-material/CallSplitRounded'
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded'
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded'
import {
  Box,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { PresentationSlideShell } from '../../components/presentations/PresentationSlideShell'
import type { PresentationComponentProps } from '../catalog'

const slideContent = {
  manual: {
    body:
      'If the change is smaller than the prompt, smaller than the review, and smaller than the wait time, just do it yourself. You do not use a calculator for 5 x 8, and you do not need Claude Code for a one-line CSS variable tweak.',
    bullets: [
      'Use the tool when reasoning or execution is the bottleneck, not when typing is.',
      'Manual edits are often the fastest path for tiny, low-risk changes.',
      'Save agent time for work that actually benefits from delegation.',
    ],
    accent: '#b35c3f',
  },
  model: {
    body:
      'Small changes should use lighter settings. Larger refactors, ambiguous tasks, or risky changes should use a stronger model or higher effort. That shortens simple tasks and avoids repeated repair loops on harder work.',
    bullets: [
      'Simple, local edits: pick the fastest model and lower effort.',
      'Cross-cutting or unclear tasks: step up model quality before you start.',
      'The wrong setting costs time twice: once in latency and again in fix iterations.',
    ],
    accent: '#1e5f74',
  },
  guidance: {
    body:
      'Keep CLAUDE.md short, current, and opinionated. Add hooks for linting and lightweight skills for common operations. When asking for a change, point Claude to the exact file or lines so it can skip unnecessary exploration.',
    bullets: [
      'Keep CLAUDE.md focused on project rules that affect decisions.',
      'Use hooks and skills to automate predictable low-level steps.',
      'Reference precise files and line ranges to reduce search time.',
    ],
    accent: '#6a4c93',
  },
  parallel: {
    body:
      'If a task is running, switch to something else. Use worktrees with superset.sh or an equivalent tool and keep momentum by reviewing a PR, validating another branch, or starting the next phase while Claude finishes.',
    bullets: [
      'Separate tasks into independent branches or worktrees.',
      'Use idle time for reviews, validation, or the next slice of work.',
      'Parallel work turns waiting time into throughput.',
    ],
    accent: '#2f7d5b',
  },
  plan: {
    body:
      'Ask Claude Code to sketch the full path in a plan file, then run each phase separately. This fits small-increment workflows, keeps verification tight, and makes later prompts much faster because the structure is already agreed. Anton will cover this methodology in a future presentation.',
    bullets: [
      'Create the roadmap once, but keep execution granular.',
      'Validate each slice before starting the next one.',
      'Plans can live in a file or in commented code, but a dedicated plan is easier to follow.',
    ],
    accent: '#c2872d',
  },
} as const

const slideIcons = {
  manual: <AutoFixHighRoundedIcon sx={{ color: '#b35c3f' }} />,
  model: <BoltRoundedIcon sx={{ color: '#1e5f74' }} />,
  guidance: <PrecisionManufacturingRoundedIcon sx={{ color: '#6a4c93' }} />,
  parallel: <CallSplitRoundedIcon sx={{ color: '#2f7d5b' }} />,
  plan: <ChecklistRoundedIcon sx={{ color: '#c2872d' }} />,
} as const

export default function ClaudeCodeFitToTaskPresentation({
  slide,
  slideIndex,
  slideCount,
}: PresentationComponentProps) {
  const content = slideContent[slide.id as keyof typeof slideContent]
  const icon = slideIcons[slide.id as keyof typeof slideIcons]

  return (
    <PresentationSlideShell
      accent={content.accent}
      eyebrow={slide.eyebrow}
      title={slide.title}
      slideIndex={slideIndex}
      slideCount={slideCount}
      icon={icon}
      summary={content.body}
      main={
        <Paper
          elevation={0}
          sx={{
            height: '100%',
            p: { xs: 1.25, md: 1.5 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: alpha(content.accent, 0.12),
            bgcolor: alpha(content.accent, 0.05),
          }}
        >
          <Stack spacing={1.25} sx={{ height: '100%' }}>
            <Typography
              variant="body2"
              sx={{ color: content.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              Key points
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                gap: 1.25,
                flex: 1,
              }}
            >
              {content.bullets.map((bullet, index) => (
                <Paper
                  key={bullet}
                  elevation={0}
                  sx={{
                    p: { xs: 1.25, md: 1.5 },
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha(content.accent, 0.14),
                    bgcolor: '#fffdf9',
                    display: 'grid',
                    alignContent: 'start',
                    gap: 0.9,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: content.accent, letterSpacing: '0.16em', textTransform: 'uppercase' }}
                  >
                    Point 0{index + 1}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 'clamp(1rem, 1.08vw, 1.18rem)',
                      fontWeight: 700,
                      lineHeight: 1.16,
                    }}
                  >
                    {bullet}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Paper>
      }
      sidebar={
        <Stack spacing={1.25} sx={{ height: '100%' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.25, md: 1.5 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: alpha(content.accent, 0.12),
              bgcolor: alpha(content.accent, 0.08),
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: content.accent, letterSpacing: '0.14em', textTransform: 'uppercase' }}
            >
              Core message
            </Typography>
            <Typography sx={{ mt: 0.9, fontSize: 'clamp(1rem, 1vw, 1.12rem)', fontWeight: 700, lineHeight: 1.2 }}>
              {coreMessages[slide.id as keyof typeof coreMessages]}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.25, md: 1.5 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: alpha(content.accent, 0.12),
              bgcolor: alpha('#111827', 0.04),
              flex: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{ letterSpacing: '0.14em', textTransform: 'uppercase', color: 'text.secondary' }}
            >
              AMA question
            </Typography>
            <Typography sx={{ mt: 0.9, fontSize: 'clamp(1rem, 0.96vw, 1.08rem)', fontWeight: 700, lineHeight: 1.2 }}>
              {questionMapping[slide.id as keyof typeof questionMapping]}
            </Typography>
          </Paper>
        </Stack>
      }
    />
  )
}

const coreMessages = {
  manual: 'Do not delegate work that is smaller than the coordination cost.',
  model: 'Latency and quality both improve when the model matches the task shape.',
  guidance: 'A sharp project contract removes search, confusion, and repeated setup.',
  parallel: 'Waiting is optional if your workflow has another branch ready.',
  plan: 'Separate planning from execution so every later step starts with context.',
} as const

const questionMapping = {
  manual: 'How do I handle tiny changes that are faster manually?',
  model: 'How do I choose the right model and effort level?',
  guidance: 'How do I make small or repeated tasks move faster?',
  parallel: 'How do I avoid feeling blocked while Claude Code runs?',
  plan: 'How do I keep working in small verified increments?',
} as const
