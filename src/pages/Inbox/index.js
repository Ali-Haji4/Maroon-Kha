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
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const Inbox = () => {
  const [messages, setMessages] = React.useState([{}])
  const [deleteID, setDeleteID] = React.useState({ id: '' })
  const [refresher, setRefresher] = React.useState(false)
  const url = 'http://localhost/reactProject/maroonTest/messagesList.php'
  useEffect(() => {
    axios
      .get(url)
      .then(response => response.data)
      .then(data => {
        setMessages(data)
      })
    console.log(messages)
  }, [refresher])

  const [openDelete, setOpenDelete] = React.useState(false)

  const handleClickDeleteOpen = () => {
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  function deleteMessage() {
    // //This deletes the whole panel
    // console.log('delete ID is ' + id)
    // setDeleteID((deleteID.id = id))
    console.log(deleteID)

    axios
      .post('http://localhost/reactProject/maroonTest/deleteMessage.php', deleteID)
      .then(res => console.log(res.data))
    setRefresher(prevState => !prevState)
    handleDeleteClose()
    setOpen(true)
  }

  //Snackbar
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const action = (
    <React.Fragment>
      <Button color='secondary' size='small' onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
        <Icon icon='mdi:close' fontSize='small' />
      </IconButton>
    </React.Fragment>
  )

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
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
        </Box> */}
        <Grid container spacing={6} className='match-height' sx={{ mt: '2px' }}>
          {messages?.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card>
                <CardHeader title={item.requestType}></CardHeader>
                <CardContent>
                  <Typography sx={{ mb: 2 }}>{item.requestText}</Typography>
                  <Box sx={{ mt: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}></Box>
                </CardContent>

                <Box sx={{ ml: 2, mr: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography sx={{ ml: 2, mr: 2 }}>
                    {item.name} | Msg ID {item.requestID}
                  </Typography>
                  <Typography>{item.requestDate}</Typography>
                  <IconButton
                    size='small'
                    onClick={event => {
                      event.preventDefault()
                      setDeleteID({ id: item.requestID })
                      handleClickDeleteOpen()
                    }}
                    sx={{ color: 'text.primary' }}
                  >
                    <Icon icon='mdi:delete' fontSize={20} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete Message | ID {deleteID.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this Message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={deleteMessage} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message='Note archived' action={action}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Message Delete Succesfully
        </Alert>
      </Snackbar>
    </Grid>
  )
}

Inbox.inbox = {
  action: 'read',
  subject: '/Inbox'
}

export default Inbox
