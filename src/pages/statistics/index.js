// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'

// ** Demo Components Imports
import AnalyticsSalesCountry from 'src/views/dashboards/analytics/AnalyticsSalesCountry'
import EcommerceSalesOverview from 'src/views/dashboards/analytics/EcommerceSalesOverview'

const SecondPage = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
            <EcommerceSalesOverview />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsSalesCountry />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default SecondPage
