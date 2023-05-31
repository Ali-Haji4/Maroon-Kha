import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const AnalyticsSalesCountry = () => {
  const urlCountries = 'http://localhost/reactProject/maroonTest/uniqueCountries.php'
  const urlMostParticipated = 'http://localhost/reactProject/maroonTest/mostParticipatedCountries.php'
  const [uniqueCountries, setUniqueCountries] = React.useState([])
  const [mostParticipated, setMostParticipated] = React.useState([])

  //Fetching data according to the current role
  useEffect(() => {
    axios
      .get(urlCountries)
      .then(response => response.data)
      .then(data => {
        setUniqueCountries(data)
      })
    axios
      .get(urlMostParticipated)
      .then(response => response.data)
      .then(data => {
        setMostParticipated(data)
      })
    console.log('reached here')

    console.log('looping')
  }, [])

  const newArray = mostParticipated?.flatMap(({ id, country, participants }) => {
    return [
      {
        id: id,
        country: country,
        participants: participants
      }
    ]
  })

  var series = []
  if (mostParticipated?.length) {
    series = [
      {
        name: 'Participants',
        data: [
          mostParticipated[0]?.participated,
          mostParticipated[1]?.participated,
          mostParticipated[2]?.participated,
          mostParticipated[3]?.participated,
          mostParticipated[4]?.participated
        ]
      }
    ]
  }

  // console.log(newArray)

  // ** Hook
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        barHeight: '60%',
        horizontal: true,
        distributed: true,
        startingShape: 'rounded'
      }
    },
    dataLabels: {
      offsetY: 8,
      style: {
        fontWeight: 500,
        fontSize: '0.875rem'
      }
    },
    grid: {
      strokeDashArray: 8,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -18,
        left: 21,
        right: 33,
        bottom: 10
      }
    },
    colors: [
      hexToRGBA(theme.palette.primary.light, 1),
      hexToRGBA(theme.palette.success.light, 1),
      hexToRGBA(theme.palette.warning.light, 1),
      hexToRGBA(theme.palette.info.light, 1),
      hexToRGBA(theme.palette.error.light, 1)
    ],
    legend: { show: false },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: [
        `${newArray[0]?.country}`,
        `${newArray[1]?.country}`,
        `${newArray[2]?.country}`,
        `${newArray[3]?.country}`,
        `${newArray[4]?.country}`
      ],
      labels: {
        formatter: val => `${Number(val) / 1000}k`,
        style: {
          fontSize: '0.875rem',
          colors: theme.palette.text.disabled
        }
      }
    },
    yaxis: {
      labels: {
        align: theme.direction === 'rtl' ? 'right' : 'left',
        style: {
          fontWeight: 600,
          fontSize: '0.875rem',
          colors: theme.palette.text.primary
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Participants by Country'
        subheader={`Total of ${uniqueCountries.length} Countries`}
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <CardContent
        sx={{
          p: '0 !important',
          '& .apexcharts-canvas .apexcharts-yaxis-label': { fontSize: '0.875rem', fontWeight: 600 },
          '& .apexcharts-canvas .apexcharts-xaxis-label': { fontSize: '0.875rem', fill: theme.palette.text.disabled },
          '& .apexcharts-data-labels .apexcharts-datalabel': {
            fontWeight: 500,
            fontSize: '0.875rem',
            fill: theme.palette.common.white
          }
        }}
      >
        <ReactApexcharts type='bar' height={332} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsSalesCountry
