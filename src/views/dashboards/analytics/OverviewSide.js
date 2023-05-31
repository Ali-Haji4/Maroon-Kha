import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

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

const EcommerceSalesOverview = () => {
  const urlParticipants = 'http://localhost/reactProject/maroonTest/participantsList.php'
  const urlSubmissions = 'http://localhost/reactProject/maroonTest/completedSubmissionsList.php'
  const urlGender = 'http://localhost/reactProject/maroonTest/genderStats.php'

  const [participantsList, setParticipantsList] = React.useState([])
  const [submissionsList, setSubmissionsList] = React.useState([])
  const [genderedList, setGenderedList] = React.useState([])

  //Fetching data according to the current role
  useEffect(() => {
    axios
      .get(urlParticipants)
      .then(response => response.data)
      .then(data => {
        setParticipantsList(data)
      })

    console.log(participantsList)

    //REPLACE THE URL ONCE THE PARTICIPANT TABLE IS LINKED (IT IS CURRENLTY ADMIN IN THE PHP FILE)
    axios
      .get(urlSubmissions)
      .then(response => response.data)
      .then(data => {
        setSubmissionsList(data)
      })

    axios
      .get(urlGender)
      .then(response => response.data)
      .then(data => {
        setGenderedList(data)
      })

    console.log(submissionsList)
  }, [])

  const salesData = [
    {
      stats: genderedList[0]?.maleCount,
      color: 'primary',
      title: 'Male Applicants',
      icon: <Icon icon='mdi:gender-male' />
    },
    {
      stats: genderedList[0]?.femaleCount,
      color: 'warning',
      title: 'Female Applicants',
      icon: <Icon icon='mdi:gender-female' />
    },
    {
      color: 'success',
      stats: `${submissionsList?.length} / ${participantsList?.length}`,
      title: 'Completed Submissions',
      icon: <Icon icon='mdi:file' />
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

  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Applicants Overview'
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
