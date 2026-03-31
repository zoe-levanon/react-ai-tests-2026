import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import SlideshowRoundedIcon from '@mui/icons-material/SlideshowRounded'
import {
  Box,
  Button,
  CardContent,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { presentations } from '../presentations/catalog'

export function HomeScreen() {
  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2.5, md: 4 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 2,
              px: { xs: 2, md: 2.5 },
              py: { xs: 2.25, md: 2.5 },
              border: '1px solid',
              borderColor: 'divider',
              background: (theme) =>
                `linear-gradient(135deg, ${alpha('#a44d35', 0.14)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 52%, ${alpha('#235a78', 0.1)} 100%)`,
              backdropFilter: 'blur(18px)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 'auto -48px -72px auto',
                width: 220,
                height: 220,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(164, 77, 53, 0.26) 0%, transparent 72%)',
              }}
            />
            <Stack
              spacing={2}
              sx={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)' },
                gap: 2,
                alignItems: 'end',
              }}
            >
              <Stack spacing={2}>
                <Chip
                  icon={<SlideshowRoundedIcon />}
                  label="Presentation Library"
                  sx={{
                    alignSelf: 'flex-start',
                    borderRadius: 999,
                    bgcolor: alpha('#a44d35', 0.1),
                    color: '#8f3f2a',
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: '11ch',
                    fontSize: { xs: '2.3rem', md: '3.8rem' },
                    lineHeight: 0.9,
                    letterSpacing: '-0.06em',
                  }}
                >
                  Presentation folders, with a cleaner front door.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, fontSize: '1rem' }}>
                  Every presentation in <Box component="code" sx={codeSx}>src/presentations</Box> is discovered
                  automatically. Add a folder, export metadata, and it appears here without editing the home page.
                </Typography>
              </Stack>

              <Chip
                label={`${presentations.length} deck${presentations.length === 1 ? '' : 's'} ready`}
                sx={{ display: 'none' }}
              />
              <Stack spacing={1}>
                <StatRow
                  label="Deck count"
                  value={String(presentations.length)}
                />
                <StatRow
                  label="Structure"
                  value="Folder-based"
                />
                <StatRow
                  label="Workflow"
                  value="Add a folder, then present"
                />
              </Stack>
            </Stack>
          </Paper>

          <Stack spacing={1.25}>
            {presentations.map((presentation) => (
              <Paper
                key={presentation.slug}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha(presentation.accent, 0.28),
                  background: `linear-gradient(90deg, ${alpha(presentation.accent, 0.1)} 0%, rgba(255, 255, 255, 0.96) 34%, rgba(255, 255, 255, 0.92) 100%)`,
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 2.25 } }}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ md: 'center' }}
                  >
                    <Stack spacing={1.1} sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                        <Chip
                          icon={<FolderRoundedIcon />}
                          label={presentation.folder}
                          sx={{
                            alignSelf: 'flex-start',
                            borderRadius: 999,
                            bgcolor: alpha(presentation.accent, 0.12),
                            color: presentation.accent,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Updated {presentation.updatedAt}
                        </Typography>
                      </Stack>
                      <Typography variant="h4" sx={{ letterSpacing: '-0.04em', fontSize: { xs: '1.55rem', md: '1.75rem' } }}>
                        {presentation.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
                        {presentation.description}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {presentation.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: alpha('#111827', 0.05),
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>

                    <Stack direction={{ xs: 'row', md: 'column' }} spacing={1} alignItems={{ md: 'flex-end' }}>
                      <Typography variant="body2" color="text.secondary">
                        {presentation.slides.length} slide{presentation.slides.length === 1 ? '' : 's'}
                      </Typography>
                      <Button
                        component={Link}
                        to={presentation.path}
                        variant="contained"
                        endIcon={<ArrowOutwardRoundedIcon />}
                        sx={{
                          bgcolor: presentation.accent,
                          '&:hover': {
                            bgcolor: presentation.accent,
                            filter: 'brightness(0.95)',
                          },
                        }}
                      >
                        Present
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 1.5,
        py: 1.1,
        borderRadius: 2,
        border: '1px solid',
        borderColor: alpha('#111827', 0.08),
        bgcolor: alpha('#ffffff', 0.74),
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={700}>
          {value}
        </Typography>
      </Stack>
    </Paper>
  )
}

const codeSx = {
  px: 0.75,
  py: 0.25,
  borderRadius: 1,
  bgcolor: 'rgba(15, 23, 42, 0.06)',
  fontFamily: '"IBM Plex Mono", "SFMono-Regular", monospace',
  fontSize: '0.95em',
}
