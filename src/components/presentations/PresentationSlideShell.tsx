import type { ReactNode } from 'react'
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

type PresentationSlideShellProps = {
  accent: string
  eyebrow?: string
  title: string
  slideIndex: number
  slideCount: number
  summary: ReactNode
  icon?: ReactNode
  main: ReactNode
  sidebar?: ReactNode
}

export function PresentationSlideShell({
  accent,
  eyebrow,
  title,
  slideIndex,
  slideCount,
  summary,
  icon,
  main,
  sidebar,
}: PresentationSlideShellProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha(accent, 0.2),
        background: `radial-gradient(circle at top right, ${alpha(accent, 0.14)} 0%, transparent 26%), linear-gradient(180deg, #fffdfa 0%, #ffffff 58%, ${alpha(accent, 0.06)} 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: { xs: 2, md: 2.5, lg: 3 },
          gap: { xs: 1.5, md: 1.75 },
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ flexShrink: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Chip
              label={eyebrow ?? `Slide ${slideIndex + 1}`}
              size="small"
              sx={{
                borderRadius: 999,
                bgcolor: alpha(accent, 0.1),
                color: accent,
                fontWeight: 700,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {slideIndex + 1} / {slideCount}
            </Typography>
          </Stack>

          {icon ? (
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                width: { xs: 52, md: 60 },
                height: { xs: 52, md: 60 },
                borderRadius: 2,
                bgcolor: alpha(accent, 0.1),
                border: '1px solid',
                borderColor: alpha(accent, 0.16),
                flexShrink: 0,
                '& svg': {
                  fontSize: { xs: 24, md: 28 },
                },
              }}
            >
              {icon}
            </Box>
          ) : null}
        </Stack>

        <Stack spacing={1} sx={{ flexShrink: 0 }}>
          <Typography
            variant="h1"
            sx={{
              maxWidth: 'none',
              fontSize: 'clamp(2rem, 3.4vw, 4.2rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.065em',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              maxWidth: 'none',
              fontSize: 'clamp(1rem, 1.25vw, 1.22rem)',
              lineHeight: 1.42,
              color: 'text.secondary',
            }}
          >
            {summary}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: sidebar
              ? { xs: '1fr', lg: 'minmax(0, 1.45fr) minmax(300px, 0.55fr)' }
              : '1fr',
            gap: 1.5,
            flex: 1,
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          <Box sx={{ minWidth: 0, minHeight: 0 }}>{main}</Box>
          {sidebar ? <Box sx={{ minWidth: 0, minHeight: 0 }}>{sidebar}</Box> : null}
        </Box>
      </Box>
    </Paper>
  )
}
