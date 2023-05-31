// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

//React Imports
import React, { forwardRef, useState, useEffect } from 'react'
import axios from 'axios'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const radialBarColors = {
  series1: '#fdd835',
  series2: '#40CDFA',
  series3: '#00d4bd',
  series4: '#7367f0',
  series5: '#FFA1A1'
}

const ApexRadialBarChart = () => {
  // ** Hook
  const theme = useTheme()
  var series = []
  const urlStats = 'http://localhost/reactProject/maroonTest/participantProgressStats.php'
  const [statistics, setStatistics] = React.useState([])

  //Fetching data according to the current role
  useEffect(() => {
    axios
      .get(urlStats)
      .then(response => response.data)
      .then(data => {
        setStatistics(data)
      })
    console.log('looping in gender')
    console.log(statistics)
  }, [])

  if (statistics?.length) {
    series = [statistics[2]?.ratio, statistics[1]?.ratio, statistics[0]?.ratio]
  }

  const options = {
    stroke: { lineCap: 'round' },
    labels: ['Inactive', 'In Progress', 'Completed'],
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: theme.palette.text.secondary
      },
      markers: {
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series4],
    plotOptions: {
      radialBar: {
        hollow: { size: '30%' },
        track: {
          margin: 15,
          background: hexToRGBA(theme.palette.customColors.trackBg, 1)
        },
        dataLabels: {
          name: {
            fontSize: '1.5rem'
          },
          value: {
            fontSize: '1rem',
            color: theme.palette.text.secondary
          },
          total: {
            show: false,
            fontWeight: 400,
            label: 'Completed',
            fontSize: '1.125rem',
            color: theme.palette.text.primary
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    }
  }

  return (
    <Card>
      <CardHeader title='Participants Status' />
      <CardContent>
        <ReactApexcharts type='radialBar' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexRadialBarChart
