// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

const salesData = [
  {
    stats: '8,458',
    color: 'primary',
    title: 'Total Applicants',
    icon: <Icon icon='mdi:account-outline' />
  },
  {
    stats: '7000',
    color: 'warning',
    title: 'Total Submissions',
    icon: <Icon icon='mdi:file' />
  },
  {
    color: 'info',
    stats: '22',
    title: 'Various Countries',
    icon: <Icon icon='mdi:globe' />
  }
]

const renderStats = () => {
  return salesData.map((sale, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
          {sale.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {sale.stats}
          </Typography>
          <Typography variant='caption'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const EcommerceSalesOverview = () => {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Competition Overview'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
            {/* <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 42.5k Sales
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              +18%
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize={20} /> */}
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceSalesOverview
