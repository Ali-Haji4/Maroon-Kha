// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

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
import ApexRadialBarChart from 'src/views/dashboards/analytics/ApexRadialBarChart'
import ChartjsPolarAreaChart from 'src/views/dashboards/analytics/ChartjsPolarAreaChart'
import ApexBarChart from 'src/views/dashboards/analytics/ApexBarChart'
import ApexColumnChart from 'src/views/dashboards/analytics/ApexColumnChart'
import OverviewSide from 'src/views/dashboards/analytics/OverviewSide'

import { CardMedia } from '@mui/material'

// ** Third Party Styles Import
import 'chart.js/auto'

const SecondPage = () => {
  // ** Hook
  const theme = useTheme()

  // ** Colors
  const whiteColor = '#fff'
  const yellowColor = '#ffe802'
  const primaryColor = '#836af9'
  const areaChartBlue = '#2c9aff'
  const barChartYellow = '#ffcf5c'
  const polarChartGrey = '#4f5d70'
  const polarChartInfo = '#299aff'
  const lineChartYellow = '#d4e157'
  const polarChartGreen = '#28dac6'
  const lineChartPrimary = '#787EFF'
  const lineChartWarning = '#ff9800'
  const horizontalBarInfo = '#26c6da'
  const polarChartWarning = '#ff8131'
  const scatterChartGreen = '#28c76f'
  const warningColorShade = '#ffbd1f'
  const areaChartBlueLight = '#84d0ff'
  const areaChartGreyLight = '#edf1f4'
  const scatterChartWarning = '#ff9f43'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6} mb={6}>
            <EcommerceSalesOverview />
          </Grid>
          <Grid item xs={12} md={6} mb={6}>
            <OverviewSide />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
      <Grid container spacing={6} className='match-height'>
        <Grid item xs={12} sm={6} md={4}>
          <AnalyticsSalesCountry />
        </Grid>
        <Grid item xs={12} md={6}>
          <ApexRadialBarChart />
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent>
              {' '}
              <CardMedia sx={{ height: 420 }} image='/images/pages/404.png' title='green iguana' />
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <ChartjsPolarAreaChart
            yellow={yellowColor}
            info={polarChartInfo}
            grey={polarChartGrey}
            primary={primaryColor}
            green={polarChartGreen}
            legendColor={legendColor}
            warning={polarChartWarning}
          />
        </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <ApexBarChart />
        </Grid> */}
        <Grid item xs={12}>
          <ApexColumnChart />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default SecondPage
