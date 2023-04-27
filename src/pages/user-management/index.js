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

  const urlJudges = 'http://localhost/reactProject/maroonTest/judgesList.php'
  const urlAdmins = 'http://localhost/reactProject/maroonTest/adminsList.php'
  const urlParticipants = 'http://localhost/reactProject/maroonTest/participantsList.php'

  useEffect(() => {
    if (role === 'participant') {
      //REPLACED THE URL ONCE THE PARTICIPANT TABLE IS LINKED
      axios
        .get(urlAdmins)
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
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

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
      window.location.reload(true)
    } else if (role === 'admin') {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteAdmin2.php', deleteID)
        .then(res => console.log(res.data))
      alert('Admin Deleted Succesfully')
      window.location.reload(true)
    } else {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteJudge2.php', deleteID)
        .then(res => console.log(res.data))
      alert('Judge Deleted Succesfully')
      window.location.reload(true)
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
                <Grid item sm={4} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='plan-select'>Select Competition</InputLabel>
                    <Select
                      fullWidth
                      value={plan}
                      id='select-plan'
                      label='Select Plan'
                      labelId='plan-select'
                      onChange={handlePlanChange}
                      inputProps={{ placeholder: 'Select Competition' }}
                    >
                      <MenuItem value=''>Select Competition</MenuItem>
                      <MenuItem value='youth'>Youth Award</MenuItem>
                      <MenuItem value='standard'>Standard Award</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {role === 'participant' && (
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
              )}

              {role === 'admin' && (
                <TableContainer component={Paper}>
                  <Divider />
                  <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
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
                          <StyledTableCell>
                            <Stack direction='row' spacing={2}>
                              <Button
                                variant='contained'
                                type='button'
                                className='reportBtn'
                                onClick={() => returnEdit(item.id, item.name)}
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
                  <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
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
                          <StyledTableCell>
                            <Stack direction='row' spacing={2}>
                              <Button
                                variant='contained'
                                type='button'
                                className='reportBtn'
                                onClick={() => returnEdit(item.id, item.name)}
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
    </Grid>
  )
}
