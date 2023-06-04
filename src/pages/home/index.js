// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CardMedia from '@mui/material/CardMedia'

const Home = () => {
  const [questions, setQuestions] = React.useState([{}])
  const url = 'http://localhost/reactProject/maroonTest/testingListing.php'
  useEffect(() => {
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        setQuestions(data)
      })
    console.log(questions)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Welcome to the King Hamad Award admin panel website portal!🚀'></CardHeader>
              <CardContent>
                <Typography>
                  This platform is exclusively designed to assist with the management of the prestigious King Hamad
                  Award. Here, you can securely Manage all important aspects of the competition, and access all
                  important information and data. Save time and streamline the awards process with an efficient, modern
                  and reliable platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
        <Grid container spacing={6} className='match-height' sx={{ mt: '2px' }}>
          <Grid item xs={12} sm={6} lg={4}>
            <CardActionArea href='/user-management'>
              <Card>
                <CardHeader title='🔒 User Management'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    Here, you can perform CRUD operations with ease, allowing for efficient management of user accounts
                    of all types. Our filter and search function further simplifies the process, allowing you to quickly
                    find and update relevant information.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardActionArea href='/question-management'>
                <CardHeader title='🔒 Question Management'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    Our questions management page allows you oversee and manage questions with ease. It is also equiped
                    with a search function, you can quickly find and modify the questions you need to thanks to the
                    listed Question Number. This page is to ensure that the King Hamad Award has the most relevant and
                    up-to-date questions for its participants for each iteration!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <CardActionArea href='/panel-management'>
              <Card>
                <CardHeader title='🔒 Panel Management'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    This feature allows you to easily manage and oversee the panel of judges responsible for selecting
                    the winners of the award. With a user-friendly interface, you can efficiently handle all aspects of
                    the panel's operations from assigning judges to selecting an answer range to ensure that the grading
                    process runs smoothly.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <CardActionArea href='/statistics'>
              <Card>
                <CardHeader title='📊 Statistics'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    Here, you can find detailed data and analysis on all aspects of the award. This enables you to make
                    data-driven decisions and optimize your strategies for the future. Discover key insights and trends
                    that can help you enhance the impact and success of the prestigious King Hamad Award.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <CardActionArea href='/acl'>
              <Card>
                <CardHeader title='📝 Competition Interface'></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>
                    The competition interface page can view the competition questions just like a participant, and also
                    see the validation process in real-time. This interface has been designed to provide you with a the
                    perspective of the participant. You can ensure that the competition is being conducted fairly and in
                    accordance with the rules and regulations.
                  </Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <CardActionArea target='_blank' href='https://kinghamadaward.com/index.php'>
              <Card>
                <CardMedia
                  component='img'
                  height='290'
                  image='/images/pages/KHA-LOGO.png'
                  alt={'alt'}
                  title={'King Hamad Award Website'}
                  sx={{ padding: '0.5em 0.5em 0 0.5em', objectFit: 'contain' }}
                />
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
