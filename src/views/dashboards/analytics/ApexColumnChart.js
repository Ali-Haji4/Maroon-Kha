// ** React Imports
import React, { forwardRef, useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const columnColors = {
  bg: '#f8d3ff',
  series1: '#826af9',
  series2: '#d2b0ff'
}

const ApexColumnChart = () => {
  // ** Hook
  const theme = useTheme()
  var series = []
  const urlStats = 'http://localhost/reactProject/maroonTest/ageGroupStats.php'
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
    series = [
      {
        name: 'Males',
        data: [
          statistics[0]?.maleCount,
          statistics[1]?.maleCount,
          statistics[2]?.maleCount,
          statistics[3]?.maleCount,
          statistics[4]?.maleCount,
          statistics[5]?.maleCount,
          statistics[6]?.maleCount
        ]
      },
      {
        name: 'Females',
        data: [
          statistics[0]?.femaleCount,
          statistics[1]?.femaleCount,
          statistics[2]?.femaleCount,
          statistics[3]?.femaleCount,
          statistics[4]?.femaleCount,
          statistics[5]?.femaleCount,
          statistics[6]?.femaleCount
        ]
      }
    ]
  }

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: [columnColors.series1, columnColors.series2],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10,
          backgroundBarColors: [columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg, columnColors.bg]
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: ['16-20', '21-25', '26-30', '31-35', '36-40', '41-45', '46+'],
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Participants Age Group'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <ReactApexcharts type='bar' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexColumnChart
