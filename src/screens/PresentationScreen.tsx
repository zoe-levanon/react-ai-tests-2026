import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useCallback, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getPresentationBySlug, type PresentationEntry } from '../presentations/catalog'

export function PresentationScreen() {
  const { slug = '' } = useParams()
  const presentation = getPresentationBySlug(slug)

  if (!presentation) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 520,
            p: 4,
            borderRadius: 5,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.92),
            textAlign: 'center',
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">Presentation not found</Typography>
            <Typography color="text.secondary">
              This route does not match any folder inside `src/presentations`.
            </Typography>
            <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackRoundedIcon />}>
              Back to library
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  }

  return <PresentationPlayer presentation={presentation} />
}

function PresentationPlayer({ presentation }: { presentation: PresentationEntry }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const PresentationComponent = presentation.Component
  const requestedSlide = Number(searchParams.get('slide') ?? '1')
  const slideCount = presentation.slides.length
  const slideNumber = Number.isFinite(requestedSlide) ? Math.max(1, Math.min(slideCount, Math.floor(requestedSlide))) : 1
  const slideIndex = slideNumber - 1
  const slide = presentation.slides[slideIndex]

  const goToSlide = useCallback((nextSlideNumber: number) => {
    const params = new URLSearchParams(searchParams)

    params.set('slide', String(nextSlideNumber))
    setSearchParams(params, { replace: true })
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (String(slideNumber) !== (searchParams.get('slide') ?? '1')) {
      goToSlide(slideNumber)
    }
  }, [goToSlide, searchParams, slideNumber])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && slideNumber < slideCount) {
        event.preventDefault()
        goToSlide(slideNumber + 1)
      }

      if (event.key === 'ArrowLeft' && slideNumber > 1) {
        event.preventDefault()
        goToSlide(slideNumber - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToSlide, slideCount, slideNumber])

  const stageHeight = 'clamp(460px, calc(100vh - 170px), 860px)'
  const stageWidth = `min(100%, calc(${stageHeight} * 16 / 9), 1720px)`

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 1.25, md: 1.5 }, px: { xs: 1, md: 1.5 } }}>
      <Stack spacing={1.25} sx={{ maxWidth: 'none' }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: alpha(presentation.accent, 0.16),
            bgcolor: alpha('#fffcf8', 0.78),
            backdropFilter: 'blur(18px)',
            px: { xs: 1.5, md: 2 },
            py: 1,
          }}
        >
          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ lg: 'center' }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Button component={Link} to="/" variant="text" startIcon={<ArrowBackRoundedIcon />}>
                All presentations
              </Button>
              <Chip
                icon={<FolderRoundedIcon />}
                label={presentation.folder}
                sx={{
                  borderRadius: 999,
                  bgcolor: alpha(presentation.accent, 0.08),
                  color: presentation.accent,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {presentation.title}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Chip
                label={`${slideNumber} / ${slideCount}`}
                sx={{
                  borderRadius: 999,
                  bgcolor: alpha(presentation.accent, 0.08),
                  color: presentation.accent,
                  fontWeight: 700,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                Updated {presentation.updatedAt}
              </Typography>
              <IconButton
                size="small"
                onClick={() => goToSlide(slideNumber - 1)}
                disabled={slideNumber === 1}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <KeyboardArrowLeftRoundedIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => goToSlide(slideNumber + 1)}
                disabled={slideNumber === slideCount}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <KeyboardArrowRightRoundedIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>

        <Box sx={{ display: 'grid', placeItems: 'center' }}>
          <Box sx={{ width: stageWidth }}>
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16 / 9',
                height: { xs: 'auto', md: stageHeight },
                minHeight: { xs: 'calc(100vh - 165px)', md: 0 },
              }}
            >
              <PresentationComponent slide={slide} slideIndex={slideIndex} slideCount={slideCount} />
            </Box>
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ md: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Use left/right arrow keys. The current slide is stored in the URL.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="text"
              startIcon={<ArrowForwardRoundedIcon sx={{ transform: 'rotate(180deg)' }} />}
              onClick={() => goToSlide(1)}
              disabled={slideNumber === 1}
            >
              First
            </Button>
            <Button
              size="small"
              variant="text"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => goToSlide(slideCount)}
              disabled={slideNumber === slideCount}
            >
              Last
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
