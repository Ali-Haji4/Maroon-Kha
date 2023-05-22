// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/user'

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'

export default function UserManagement() {
  const [admins, setAdmins] = React.useState([{}])
  const [toggleEdit, setToggleEdit] = React.useState(false)
  const [RoleFetched, setRoleFetched] = React.useState([{}])

  // const dispatch = useDispatch()

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [deleteID, setDeleteID] = React.useState({ id: '' })

  //Editing States
  const [editedAdminData, setEditedAdminData] = React.useState([
    { id: '', firstName: '', lastName: '', email: '', password: '', confirmedPassword: '' }
  ])
  const [editedJudgeData, setEditedJudgeData] = React.useState([{ id: '', firstName: '', lastName: '', email: '' }])

  const [editedParticipantData, setEditedParticipantData] = React.useState([
    { id: '', firstName: '', lastName: '', email: '' }
  ])

  //Links for the PHP files
  const urlJudges = 'http://localhost/reactProject/maroonTest/judgesList.php'
  const urlAdmins = 'http://localhost/reactProject/maroonTest/adminsList.php'
  const urlParticipants = 'http://localhost/reactProject/maroonTest/participantsList.php'

  //Fetching data according to the current role
  useEffect(() => {
    if (role === 'participant') {
      //REPLACE THE URL ONCE THE PARTICIPANT TABLE IS LINKED
      axios
        .get(urlParticipants)
        .then(response => response.data)
        .then(data => {
          setRoleFetched(data)
        })
    } else if (role === 'admin') {
      axios
        .get(urlAdmins)
        .then(response => response.data)
        .then(data => {
          setRoleFetched(data)
        })
    } else {
      axios
        .get(urlJudges)
        .then(response => response.data)
        .then(data => {
          setRoleFetched(data)
        })
    }
  }, [role])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  //Sylized components for the table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },

    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))

  function deleteUser(id) {
    if (role === 'participant') {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteParticipant.php', deleteID)
        .then(res => console.log(res.data))
      alert('Participant Deleted Succesfully')
    } else if (role === 'admin') {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteAdmin2.php', deleteID)
        .then(res => console.log(res.data))
      alert('Admin Deleted Succesfully')
    } else {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteJudge2.php', deleteID)
        .then(res => console.log(res.data))
      alert('Judge Deleted Succesfully')
    }
  }

  const handleEditAdmin = () => {
    if (role === 'admin') {
      console.log(editedAdminData)
      axios
        .post('http://localhost/reactProject/maroonTest/updateAdmin.php', editedAdminData)
        .then(res => console.log(res.data))
      handleEditClose()
    } else if (role === 'judge') {
      console.log(editedJudgeData)
      axios
        .post('http://localhost/reactProject/maroonTest/updateJudge.php', editedJudgeData)
        .then(res => console.log(res.data))
      handleEditClose()
    } else {
      console.log(editedParticipantData)
      axios
        .post('http://localhost/reactProject/maroonTest/updateParticipant.php', editedParticipantData)
        .then(res => console.log(res.data))
      handleEditClose()
    }
  }

  const handleAdd = () => {
    if (role === 'admin') {
      console.log(editedAdminData)
      axios
        .post('http://localhost/reactProject/maroonTest/insertAdmin.php', editedAdminData)
        .then(res => console.log(res.data))
      handleClose()
    } else if (role === 'judge') {
      console.log(editedJudgeData)
      axios
        .post('http://localhost/reactProject/maroonTest/insertJudge.php', editedJudgeData)
        .then(res => console.log(res.data))
      handleClose()
    } else {
      console.log(editedParticipantData)
      axios
        .post('http://localhost/reactProject/maroonTest/insertParticipant.php', editedParticipantData)
        .then(res => console.log(res.data))
      handleClose()
    }
  }

  const [open, setOpen] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  function handleDataChange(event) {
    if (role === 'admin') {
      setEditedAdminData({
        ...editedAdminData,
        [event.target.name]: event.target.value
      })
      console.log(editedAdminData)
    } else if (role === 'judge') {
      setEditedJudgeData({
        ...editedJudgeData,
        [event.target.name]: event.target.value
      })
      console.log(editedJudgeData)
    } else {
      setEditedParticipantData({
        ...editedParticipantData,
        [event.target.name]: event.target.value
      })
      console.log(editedParticipantData)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    inputProps={{ placeholder: 'Select Role' }}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='judge'>Judge</MenuItem>
                    <MenuItem value='participant'>Participant</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {role === 'participant' && (
                <>
                  <Grid item sm={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id='status-select'>Select Status</InputLabel>
                      <Select
                        fullWidth
                        value={status}
                        id='select-status'
                        label='Select Status'
                        labelId='status-select'
                        onChange={handleStatusChange}
                        inputProps={{ placeholder: 'Select Status' }}
                      >
                        <MenuItem value=''>Select Status</MenuItem>
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <TableContainer component={Paper}>
                    <Divider />
                    <TableHeader value={value} handleFilter={handleFilter} toggle={handleClickOpen} />
                    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>User ID</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {RoleFetched?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component='th' scope='row'>
                              {item.id}
                            </StyledTableCell>
                            <StyledTableCell>{item.name}</StyledTableCell>
                            <StyledTableCell>{item.email}</StyledTableCell>
                            <StyledTableCell>{item.status}</StyledTableCell>
                            <StyledTableCell>
                              <Stack direction='row' spacing={2}>
                                <Button
                                  variant='contained'
                                  type='button'
                                  className='reportBtn'
                                  onClick={event => {
                                    event.preventDefault()
                                    handleClickEditOpen()
                                    setEditedAdminData({
                                      ...editedAdminData,
                                      id: item.id,
                                      firstName: item.first_name,
                                      lastName: item.last_name,
                                      email: item.email
                                    })
                                  }}
                                >
                                  Edit
                                </Button>
                                {/* <Button variant='outlined' type='submit' className='reportBtn'>
                                        Delete{' '}
                                      </Button> */}
                                <IconButton
                                  size='small'
                                  onClick={() => deleteUser(item.id)}
                                  sx={{ color: 'text.primary' }}
                                >
                                  <Icon icon='mdi:delete' fontSize={20} />
                                </IconButton>
                              </Stack>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {role === 'admin' && (
                <TableContainer component={Paper}>
                  <Divider />
                  <TableHeader value={value} handleFilter={handleFilter} toggle={handleClickOpen} />
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {RoleFetched?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {item.id}
                          </StyledTableCell>
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{item.email}</StyledTableCell>
                          <StyledTableCell>
                            <Stack direction='row' spacing={2}>
                              <Button
                                variant='contained'
                                type='button'
                                className='reportBtn'
                                onClick={event => {
                                  event.preventDefault()
                                  handleClickEditOpen()
                                  setEditedAdminData({
                                    ...editedAdminData,
                                    id: item.id,
                                    firstName: item.first_name,
                                    lastName: item.last_name,
                                    email: item.email
                                  })
                                }}
                              >
                                Edit
                              </Button>
                              {/* <Button variant='outlined' type='submit' className='reportBtn'>
                                        Delete{' '}
                                      </Button> */}
                              <IconButton
                                size='small'
                                onClick={() => deleteUser(item.id)}
                                sx={{ color: 'text.primary' }}
                              >
                                <Icon icon='mdi:delete' fontSize={20} />
                              </IconButton>
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {role === 'judge' && (
                <TableContainer component={Paper}>
                  <Divider />
                  <TableHeader value={value} handleFilter={handleFilter} toggle={handleClickOpen} />
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Panel</StyledTableCell>
                        <StyledTableCell>Section ID</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {RoleFetched?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {item.id}
                          </StyledTableCell>
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{item.email}</StyledTableCell>
                          <StyledTableCell>{item.panel_id}</StyledTableCell>
                          <StyledTableCell>{item.sectionID}</StyledTableCell>
                          <StyledTableCell>
                            <Stack direction='row' spacing={2}>
                              <Button
                                variant='contained'
                                type='button'
                                className='reportBtn'
                                onClick={event => {
                                  event.preventDefault()
                                  handleClickEditOpen()
                                  setEditedJudgeData({
                                    ...editedJudgeData,
                                    id: item.id,
                                    firstName: item.first_name,
                                    lastName: item.last_name,
                                    email: item.email
                                  })
                                }}
                              >
                                Edit
                              </Button>
                              {/* <Button variant='outlined' type='submit' className='reportBtn'>
                                        Delete{' '}
                                      </Button> */}
                              <IconButton
                                size='small'
                                onClick={() => deleteUser(item.id)}
                                sx={{ color: 'text.primary' }}
                              >
                                <Icon icon='mdi:delete' fontSize={20} />
                              </IconButton>
                            </Stack>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </CardContent>

          {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
        </Card>
      </Grid>

      {/* Dialog for Add User and Edit User */}

      {/* Adding Admin Dialog */}
      <Dialog fullWidth maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Adding a new {role}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-email'
            label='Email'
            type='email'
            fullWidth
            variant='standard'
            name='email'
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-password-input'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            name='password'
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-confirm-password-input'
            label='Confirm Password'
            type='password'
            fullWidth
            variant='standard'
            name='confirmedPassword'
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-fName'
            label='First Name'
            type='text'
            fullWidth
            variant='standard'
            name='firstName'
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-lName'
            label='Last Name'
            type='text'
            fullWidth
            variant='standard'
            name='lastName'
            onChange={handleDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleAdd}>
            Submit
          </Button>

          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Editing Admin Dialog */}
      <Dialog
        fullWidth
        maxWidth='md'
        onClose={handleEditClose}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleEditClose}>
          Editing {role} Information | ID {role === 'admin' ? editedAdminData.id : editedJudgeData.id}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-fName'
            label='First Name'
            type='text'
            fullWidth
            variant='standard'
            multiline
            name='firstName'
            defaultValue={role === 'admin' ? editedAdminData.firstName : editedJudgeData.firstName}
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-lName'
            label='Last Name'
            type='text'
            fullWidth
            variant='standard'
            multiline
            name='lastName'
            defaultValue={role === 'admin' ? editedAdminData.lastName : editedJudgeData.lastName}
            onChange={handleDataChange}
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-email'
            label='Email Name'
            type='email'
            fullWidth
            variant='standard'
            multiline
            name='email'
            defaultValue={role === 'admin' ? editedAdminData.email : editedJudgeData.email}
            onChange={handleDataChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleEditAdmin}>
            Submit
          </Button>

          <Button onClick={handleEditClose} variant='outlined'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
