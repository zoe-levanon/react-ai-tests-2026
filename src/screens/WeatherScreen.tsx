import AirRoundedIcon from '@mui/icons-material/AirRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'
import WbCloudyRoundedIcon from '@mui/icons-material/WbCloudyRounded'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { useCurrentWeather } from '../hooks/useCurrentWeather'

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <Card variant="outlined" sx={{ flex: 1 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
            {icon}
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          </Stack>
          <Typography variant="h5">{value}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export function WeatherScreen() {
  const { phase, data, error, load } = useCurrentWeather()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) =>
          `radial-gradient(circle at top left, ${alpha(theme.palette.primary.light, 0.22)}, transparent 30%),
          linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.light, 0.12)} 100%)`,
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
        <Stack spacing={3}>
          <Box>
            <Button
              component={Link}
              to="/"
              variant="text"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ color: 'text.secondary' }}
            >
              Back
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 4, md: 5 },
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.88),
              backdropFilter: 'blur(18px)',
              px: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
            }}
          >
            {phase === 'idle' && (
              <Stack spacing={3} alignItems="center" textAlign="center">
                <WbCloudyRoundedIcon sx={{ fontSize: 56, color: 'primary.light' }} />
                <Stack spacing={1}>
                  <Typography variant="h5">Local Weather</Typography>
                  <Typography color="text.secondary">
                    Share your location to see current conditions near you.
                  </Typography>
                </Stack>
                <Button variant="contained" size="large" onClick={load} startIcon={<LocationOnRoundedIcon />}>
                  Get my location
                </Button>
              </Stack>
            )}

            {(phase === 'locating' || phase === 'fetching') && (
              <Stack spacing={3} alignItems="center" textAlign="center">
                <CircularProgress size={48} />
                <Typography color="text.secondary">
                  {phase === 'locating' ? 'Detecting your location…' : 'Fetching weather data…'}
                </Typography>
              </Stack>
            )}

            {phase === 'error' && (
              <Stack spacing={3}>
                <Alert severity="error">{error}</Alert>
                <Typography variant="body2" color="text.secondary">
                  Location access is required to show local weather.
                </Typography>
                <Box>
                  <Button variant="contained" onClick={load} startIcon={<RefreshRoundedIcon />}>
                    Try again
                  </Button>
                </Box>
              </Stack>
            )}

            {phase === 'success' && data && (
              <Stack spacing={3}>
                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                    <LocationOnRoundedIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      {data.locationLabel}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: '4rem', md: '5.5rem' }, lineHeight: 1, letterSpacing: '-0.04em' }}
                  >
                    {data.temperature}°C
                  </Typography>
                  <Chip
                    label={data.condition}
                    size="small"
                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <StatCard
                    icon={<AirRoundedIcon fontSize="small" />}
                    label="Wind"
                    value={`${data.windSpeed} km/h`}
                  />
                  {data.humidity !== null && (
                    <StatCard
                      icon={<WaterDropRoundedIcon fontSize="small" />}
                      label="Humidity"
                      value={`${data.humidity}%`}
                    />
                  )}
                  <StatCard
                    icon={<ThermostatRoundedIcon fontSize="small" />}
                    label="Feels like"
                    value={`${data.temperature}°C`}
                  />
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Updated {data.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<RefreshRoundedIcon />}
                    onClick={load}
                  >
                    Refresh
                  </Button>
                </Stack>
              </Stack>
            )}
          </Paper>
        </Stack>
      </Container>
    </Box>
  )
}
