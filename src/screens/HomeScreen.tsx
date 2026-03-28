import { useState } from 'react'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import ForumRoundedIcon from '@mui/icons-material/ForumRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import WbCloudyRoundedIcon from '@mui/icons-material/WbCloudyRounded'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'

const docsLinks = [
  { label: 'MUI', href: 'https://mui.com/material-ui/getting-started/' },
  { label: 'Vite', href: 'https://vite.dev/' },
  { label: 'React', href: 'https://react.dev/' },
]

const communityLinks = [
  { label: 'GitHub', href: 'https://github.com/vitejs/vite', icon: <GitHubIcon /> },
  { label: 'Discord', href: 'https://chat.vite.dev/', icon: <ForumRoundedIcon /> },
  { label: 'Bluesky', href: 'https://bsky.app/profile/vite.dev', icon: <GroupsRoundedIcon /> },
]

const codeSx = {
  px: 0.75,
  py: 0.25,
  borderRadius: 1,
  bgcolor: 'rgba(15, 23, 42, 0.06)',
  fontFamily: '"IBM Plex Mono", "SFMono-Regular", monospace',
  fontSize: '0.95em',
}

export function HomeScreen() {
  const [count, setCount] = useState(0)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) =>
          `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.18)}, transparent 28%),
          linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.light, 0.12)} 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: 4, md: 6 },
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.86),
            backdropFilter: 'blur(18px)',
            px: { xs: 2.5, md: 5 },
            py: { xs: 3, md: 5 },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 'auto auto -72px -72px',
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: (theme) =>
                `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.22)} 0%, transparent 70%)`,
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gap: { xs: 4, md: 5 },
              alignItems: 'center',
              gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)' },
            }}
          >
            <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="Material UI Homepage"
                color="primary"
                sx={{ alignSelf: { xs: 'flex-start', md: 'flex-start' } }}
              />

              <Stack spacing={2}>
                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: '12ch',
                    fontSize: { xs: '2.75rem', md: '4.5rem' },
                    lineHeight: 0.95,
                    letterSpacing: '-0.06em',
                  }}
                >
                  React starter, rebuilt with MUI components.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, fontSize: '1.05rem' }}>
                  Edit <Box component="code" sx={codeSx}>src/App.tsx</Box> and save to test{' '}
                  <Box component="code" sx={codeSx}>HMR</Box>. The hero, action cards, links, and counter now render
                  through Material UI primitives instead of custom page markup.
                </Typography>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<BoltRoundedIcon />}
                  onClick={() => setCount((c) => c + 1)}
                >
                  Count is {count}
                </Button>
                <Button
                  component="a"
                  href="https://mui.com/material-ui/getting-started/"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  size="large"
                  endIcon={<LaunchRoundedIcon />}
                >
                  Open MUI docs
                </Button>
                <Button
                  component={Link}
                  to="/weather"
                  variant="outlined"
                  size="large"
                  startIcon={<WbCloudyRoundedIcon />}
                >
                  View local weather
                </Button>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                {['Theme-backed layout', 'Responsive cards', 'Accessible actions'].map((label) => (
                  <Paper
                    key={label}
                    elevation={0}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 999,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: (theme) => alpha(theme.palette.background.paper, 0.72),
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {label}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                minHeight: { xs: 280, md: 420 },
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: { xs: 240, md: 320 },
                  height: { xs: 240, md: 320 },
                  borderRadius: '50%',
                  background: (theme) =>
                    `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.34)} 0%, transparent 72%)`,
                  filter: 'blur(6px)',
                }}
              />
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  width: 'min(100%, 380px)',
                  aspectRatio: '1 / 1',
                  borderRadius: { xs: 4, md: 5 },
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={heroImg}
                  alt=""
                  sx={{ width: { xs: '58%', md: '56%' }, maxWidth: 240, userSelect: 'none' }}
                />
                <Avatar
                  src={reactLogo}
                  alt="React logo"
                  sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 28 },
                    right: { xs: 20, md: 28 },
                    width: { xs: 58, md: 72 },
                    height: { xs: 58, md: 72 },
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    p: 1,
                  }}
                />
                <Avatar
                  src={viteLogo}
                  alt="Vite logo"
                  variant="rounded"
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 20, md: 28 },
                    left: { xs: 20, md: 28 },
                    width: { xs: 60, md: 74 },
                    height: { xs: 60, md: 74 },
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 3,
                    p: 1.25,
                  }}
                />
              </Paper>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          }}
        >
          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                    <MenuBookRoundedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Documentation</Typography>
                    <Typography color="text.secondary">Reference links for the stack behind this page.</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                  {docsLinks.map((link) => (
                    <Button
                      key={link.label}
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      variant="outlined"
                      endIcon={<LaunchRoundedIcon />}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar
                    sx={{ bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16), color: 'secondary.main' }}
                  >
                    <GroupsRoundedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Community</Typography>
                    <Typography color="text.secondary">Stay close to the Vite ecosystem and release chatter.</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                  {communityLinks.map((link) => (
                    <Button
                      key={link.label}
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      variant="text"
                      startIcon={link.icon}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" component={Link} to="/weather" sx={{ textDecoration: 'none', cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}>
            <CardContent sx={{ p: 3 }}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                    <WbCloudyRoundedIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5">Local Weather</Typography>
                    <Typography color="text.secondary">See current conditions near you.</Typography>
                  </Box>
                </Stack>
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<WbCloudyRoundedIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  View local weather
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}
