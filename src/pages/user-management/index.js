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
import { Radio, RadioGroup, FormControlLabel, FormLabel, Tooltip } from '@mui/material'

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
  const [RoleFetched, setRoleFetched] = React.useState([])

  // const dispatch = useDispatch()

  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [deleteID, setDeleteID] = React.useState({ id: '' })
  const [deleteIDSaved, setDeleteIDSaved] = React.useState()
  const [refresher, setRefresher] = React.useState(false)

  //Editing States
  const [editedAdminData, setEditedAdminData] = React.useState([
    { id: '', firstName: '', lastName: '', email: '', password: '', confirmedPassword: '' }
  ])

  const [editedJudgeData, setEditedJudgeData] = React.useState([
    { id: '', firstName: '', lastName: '', email: '', organization: '', job_title: '' }
  ])

  const [editedParticipantData, setEditedParticipantData] = React.useState([
    { id: '', firstName: '', lastName: '', email: '', phoneNumber: '', country: '', age: '', gender: '', status: '' }
  ])

  //Validation States
  const [isFnameValid, setIsFnameValid] = React.useState(false)
  const [isLnameValid, setIsLnameValid] = React.useState(false)
  const [isEmailValid, setIsEmailValid] = React.useState(false)
  const [isPasswordValid, setIsPasswordValid] = React.useState(false)
  const [isConfirmedPasswordValid, setIsConfirmedPasswordValid] = React.useState(false)
  const [isPasswordSimilarityValid, setIsPasswordSimilarityValid] = React.useState(false)

  //List of all countries
  const countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua &amp; Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia &amp; Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Cape Verde',
    'Cayman Islands',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cruise Ship',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Polynesia',
    'French West Indies',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Kyrgyz Republic',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Norway',
    'Oman',
    'Pakistan',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Pierre &amp; Miquelon',
    'Samoa',
    'San Marino',
    'Satellite',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'St Kitts &amp; Nevis',
    'St Lucia',
    'St Vincent',
    'St. Lucia',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    "Timor L'Este",
    'Togo',
    'Tonga',
    'Trinidad &amp; Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks &amp; Caicos',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'Uruguay',
    'Uzbekistan',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ]

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
  }, [role, refresher])

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
  console.log(status)

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

  function deleteUser() {
    if (role === 'participant') {
      setDeleteID({ id: deleteIDSaved })
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteParticipant.php', deleteID)
        .then(res => console.log(res.data))
      setRefresher(prevState => !prevState)
      handleDeleteClose()
    } else if (role === 'admin') {
      setDeleteID({ id: deleteIDSaved })
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteAdmin2.php', deleteID)
        .then(res => console.log(res.data))
      setRefresher(prevState => !prevState)
      handleDeleteClose()
    } else {
      setDeleteID({ id: deleteIDSaved })
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteJudge2.php', deleteID)
        .then(res => console.log(res.data))
      setRefresher(prevState => !prevState)
      handleDeleteClose()
    }
  }

  const handleEdit = () => {
    if (role === 'admin') {
      console.log(editedAdminData)
      if (validateEdit(editedAdminData)) {
        axios
          .post('http://localhost/reactProject/maroonTest/updateAdmin.php', editedAdminData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleEditClose()
      }
    } else if (role === 'judge') {
      if (validateEdit(editedJudgeData)) {
        console.log(editedJudgeData)
        axios
          .post('http://localhost/reactProject/maroonTest/updateJudge.php', editedJudgeData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleEditClose()
      }
    } else {
      if (validateEdit(editedParticipantData)) {
        console.log(editedParticipantData)
        axios
          .post('http://localhost/reactProject/maroonTest/updateParticipant.php', editedParticipantData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleEditClose()
      }
    }
  }

  const initialStateAdmin = {
    email: '',
    password: '',
    confirmedPassword: '',
    firstName: '',
    lastName: ''
  }

  const initialStateJudge = {
    email: '',
    password: '',
    confirmedPassword: '',
    firstName: '',
    lastName: '',
    organization: '',
    job_title: ''
  }

  const initialStateParticipant = {
    email: '',
    password: '',
    confirmedPassword: '',
    firstName: '',
    lastName: ''
  }

  const handleAdd = () => {
    if (role === 'admin') {
      if (validate(editedAdminData)) {
        console.log(editedAdminData)
        console.log('Hi')
        axios
          .post('http://localhost/reactProject/maroonTest/insertAdmin.php', editedAdminData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleClose()
        setEditedAdminData({ ...initialStateAdmin })
      }
    } else if (role === 'judge') {
      if (validate(editedJudgeData)) {
        console.log(editedJudgeData)
        axios
          .post('http://localhost/reactProject/maroonTest/insertJudge.php', editedJudgeData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleClose()
        setEditedJudgeData({ ...initialStateJudge })
      }
    } else {
      if (validate(editedParticipantData)) {
        console.log(editedParticipantData)
        axios
          .post('http://localhost/reactProject/maroonTest/insertParticipant.php', editedParticipantData)
          .then(res => console.log(res.data))
        setRefresher(prevState => !prevState)
        handleClose()
        setEditedParticipantData({ ...initialStateParticipant })
      }
    }
  }

  const isUrlValid = url => url.length < 2 || !url.includes('.') || !url.startsWith('http')

  const isNameValid = username => username.length < 2 || !username.includes('.') || username.match(/^[0-9]+$/) != null

  const validate = values => {
    //Cleanse validation states
    setIsEmailValid(false)
    setIsPasswordValid(false)
    setIsConfirmedPasswordValid(false)
    setIsFnameValid(false)
    setIsLnameValid(false)
    setIsPasswordSimilarityValid(false)

    //Validation

    //Password regex
    //Minimum eight characters
    //at least one uppercase letter, one lowercase letter and one number:
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(values.email)) {
      setIsEmailValid(true)

      return false
    } else if (!passwordRegex.test(values.password)) {
      setIsPasswordValid(true)

      return false
    } else if (values.password !== values.confirmedPassword) {
      setIsConfirmedPasswordValid(true)

      return false
    } else if (values.firstName == null || values.firstName == '' || /\d/.test(values.firstName) != false) {
      setIsFnameValid(true)

      return false
    } else if (values.lastName == null || values.lastName == '' || /\d/.test(values.lastName) != false) {
      setIsLnameValid(true)

      return false
    } else {
      return true
    }
  }

  const validateEdit = values => {
    //Cleanse validation states
    setIsEmailValid(false)

    setIsFnameValid(false)
    setIsLnameValid(false)

    //Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (values.firstName == null || values.firstName == '' || /\d/.test(values.firstName) != false) {
      setIsFnameValid(true)

      return false
    } else if (values.lastName == null || values.lastName == '' || /\d/.test(values.lastName) != false) {
      setIsLnameValid(true)

      return false
    } else if (!emailRegex.test(values.email)) {
      setIsEmailValid(true)

      return false
    } else {
      return true
    }
  }

  const [open, setOpen] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

  const handleClickOpen = () => {
    //Restore Admin data to initial state
    setEditedAdminData({ ...initialStateAdmin })
    setEditedJudgeData({ ...initialStateJudge })
    setEditedParticipantData({ ...initialStateParticipant })
    console.log(editedAdminData)

    //Cleanse validation states
    setIsEmailValid(false)
    setIsPasswordValid(false)
    setIsConfirmedPasswordValid(false)
    setIsFnameValid(false)
    setIsLnameValid(false)
    setIsPasswordSimilarityValid(false)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickEditOpen = () => {
    //Cleanse validation states
    setIsEmailValid(false)
    setIsFnameValid(false)
    setIsLnameValid(false)
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  const handleClickDeleteOpen = () => {
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
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

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const filteredUsers = RoleFetched.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                        <MenuItem value='In Progress'>In Progress</MenuItem>
                        <MenuItem value='Completed'>Completed</MenuItem>
                        <MenuItem value='Inactive'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <TableContainer component={Paper}>
                    <Divider />
                    <TableHeader value={searchTerm} handleFilter={handleSearchChange} toggle={handleClickOpen} />
                    <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>User ID</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Email</StyledTableCell>
                          <StyledTableCell>Phone Number</StyledTableCell>
                          <StyledTableCell>Country</StyledTableCell>
                          <StyledTableCell>Age</StyledTableCell>
                          <StyledTableCell>Gender</StyledTableCell>
                          <StyledTableCell>Status</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredUsers?.map((item, index) =>
                          status === '' ? (
                            <StyledTableRow key={index}>
                              <StyledTableCell component='th' scope='row'>
                                {item.id}
                              </StyledTableCell>
                              <StyledTableCell>{item.name}</StyledTableCell>
                              <StyledTableCell>{item.email}</StyledTableCell>
                              <StyledTableCell>{item.phone_number}</StyledTableCell>
                              <StyledTableCell>{item.country}</StyledTableCell>
                              <StyledTableCell>{item.age}</StyledTableCell>
                              <StyledTableCell>{item.gender}</StyledTableCell>
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
                                      setEditedParticipantData({
                                        ...editedParticipantData,
                                        id: item.id,
                                        firstName: item.first_name,
                                        lastName: item.last_name,
                                        email: item.email,
                                        phoneNumber: item.phone_number,
                                        country: item.country,
                                        age: item.age,
                                        gender: item.gender,
                                        status: item.status
                                      })
                                    }}
                                  >
                                    Edit
                                  </Button>

                                  <IconButton
                                    size='small'
                                    onClick={e => {
                                      e.preventDefault()
                                      handleClickDeleteOpen()
                                      setDeleteIDSaved(item.id)
                                      setDeleteID({ id: item.id })
                                      setEditedParticipantData(prevState => ({
                                        ...prevState,
                                        id: item.id
                                      }))
                                    }}
                                    sx={{ color: 'text.primary' }}
                                  >
                                    <Icon icon='mdi:delete' fontSize={20} />
                                  </IconButton>
                                </Stack>
                              </StyledTableCell>
                            </StyledTableRow>
                          ) : (
                            status === item.status && (
                              <StyledTableRow key={index}>
                                <StyledTableCell component='th' scope='row'>
                                  {item.id}
                                </StyledTableCell>
                                <StyledTableCell>{item.name}</StyledTableCell>
                                <StyledTableCell>{item.email}</StyledTableCell>
                                <StyledTableCell>{item.phone_number}</StyledTableCell>
                                <StyledTableCell>{item.country}</StyledTableCell>
                                <StyledTableCell>{item.age}</StyledTableCell>
                                <StyledTableCell>{item.gender}</StyledTableCell>
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
                                        setEditedParticipantData({
                                          ...editedParticipantData,
                                          id: item.id,
                                          firstName: item.first_name,
                                          lastName: item.last_name,
                                          email: item.email,
                                          phoneNumber: item.phone_number,
                                          country: item.country,
                                          age: item.age,
                                          gender: item.gender,
                                          status: item.status
                                        })
                                      }}
                                    >
                                      Edit
                                    </Button>

                                    <IconButton
                                      size='small'
                                      onClick={e => {
                                        e.preventDefault()
                                        handleClickDeleteOpen()
                                        setDeleteIDSaved(item.id)
                                        setDeleteID({ id: item.id })
                                        setEditedParticipantData(prevState => ({
                                          ...prevState,
                                          id: item.id
                                        }))
                                      }}
                                      sx={{ color: 'text.primary' }}
                                    >
                                      <Icon icon='mdi:delete' fontSize={20} />
                                    </IconButton>
                                  </Stack>
                                </StyledTableCell>
                              </StyledTableRow>
                            )
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}

              {role === 'admin' && (
                <TableContainer component={Paper}>
                  <Divider />
                  <TableHeader value={searchTerm} handleFilter={handleSearchChange} toggle={handleClickOpen} />
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
                      {filteredUsers?.map((item, index) => (
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

                              <IconButton
                                size='small'
                                onClick={e => {
                                  e.preventDefault()
                                  handleClickDeleteOpen()
                                  setDeleteIDSaved(item.id)
                                  setDeleteID({ id: item.id })
                                  setEditedAdminData(prevState => ({
                                    ...prevState,
                                    id: item.id
                                  }))
                                }}
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
                  <TableHeader value={searchTerm} handleFilter={handleSearchChange} toggle={handleClickOpen} />
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>User ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Organization</StyledTableCell>
                        <StyledTableCell>Job Title</StyledTableCell>
                        <StyledTableCell>Panel ID</StyledTableCell>
                        <StyledTableCell>Section ID</StyledTableCell>
                        <StyledTableCell>Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers?.map((item, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {item.id}
                          </StyledTableCell>
                          <StyledTableCell>{item.name}</StyledTableCell>
                          <StyledTableCell>{item.email}</StyledTableCell>
                          <StyledTableCell>{item.organization}</StyledTableCell>
                          <StyledTableCell>{item.job_title}</StyledTableCell>
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
                                    email: item.email,
                                    organization: item.organization,
                                    job_title: item.job_title
                                  })
                                }}
                              >
                                Edit
                              </Button>

                              <IconButton
                                size='small'
                                onClick={e => {
                                  e.preventDefault()
                                  handleClickDeleteOpen()
                                  setDeleteIDSaved(item.id)
                                  setDeleteID({ id: item.id })
                                  setEditedJudgeData(prevState => ({
                                    ...prevState,
                                    id: item.id
                                  }))
                                }}
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

      {/* Adding Admin and Judge Dialog */}
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
            error={isEmailValid}
            helperText={isEmailValid && 'Invalid Email Address'}
            required
          />
          <Tooltip title='Password must be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:'>
            <TextField
              margin='dense'
              id='outlined-password-input'
              label='Password'
              type='password'
              fullWidth
              variant='standard'
              name='password'
              onChange={handleDataChange}
              error={isPasswordValid}
              helperText={isPasswordValid && 'Invalid Password'}
              required
            />
          </Tooltip>

          <TextField
            margin='dense'
            id='outlined-confirm-password-input'
            label='Confirm Password'
            type='password'
            fullWidth
            variant='standard'
            name='confirmedPassword'
            onChange={handleDataChange}
            error={isConfirmedPasswordValid}
            helperText={isConfirmedPasswordValid && 'Password Does Not Match'}
            required
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
            error={isFnameValid}
            helperText={isFnameValid && 'Invalid First Name'}
            required
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
            error={isLnameValid}
            helperText={isLnameValid && 'Invalid Last Name'}
            required
          />
          {role === 'judge' && (
            <>
              <TextField
                margin='dense'
                id='outlined-multiline-flexible-org'
                label='Organization'
                type='text'
                fullWidth
                variant='standard'
                name='organization'
                onChange={handleDataChange}
              />
              <TextField
                margin='dense'
                id='outlined-multiline-flexible-job'
                label='Job Title'
                type='text'
                fullWidth
                variant='standard'
                name='job_title'
                onChange={handleDataChange}
              />
            </>
          )}
          {role === 'participant' && (
            <>
              <TextField
                sx={{ mb: 6 }}
                margin='dense'
                id='outlined-multiline-flexible-phoneNumber'
                label='Phone Number'
                type='number'
                fullWidth
                variant='standard'
                name='phoneNumber'
                onChange={handleDataChange}
              />
              <FormControl variant='standard' sx={{ minWidth: 120 }}>
                <InputLabel id='demo-simple-select-label'>Country</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={editedParticipantData.country}
                  label='Country'
                  onChange={handleDataChange}
                  name='country'
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Divider></Divider>
              <FormLabel id='demo-row-radio-buttons-group-label'>Age Group</FormLabel>
              <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label'>
                <FormControlLabel
                  value='16-20'
                  control={<Radio />}
                  label='16-20'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='21-25'
                  control={<Radio />}
                  label='21-25'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='26-30'
                  control={<Radio />}
                  label='26-30'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='31-35'
                  control={<Radio />}
                  label='31-35'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='36-40'
                  control={<Radio />}
                  label='36-40'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='41-45'
                  control={<Radio />}
                  label='41-45'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel value='46+' control={<Radio />} label='46+' onChange={handleDataChange} name='age' />
              </RadioGroup>
              <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label'>
                <FormControlLabel
                  value='Male'
                  control={<Radio />}
                  label='Male'
                  onChange={handleDataChange}
                  name='gender'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio />}
                  label='Female'
                  onChange={handleDataChange}
                  name='gender'
                />
              </RadioGroup>
              <FormLabel id='demo-row-radio-buttons-group-label'>Status</FormLabel>
              <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label'>
                <FormControlLabel
                  value='Inactive'
                  control={<Radio />}
                  label='Inactive'
                  onChange={handleDataChange}
                  name='status'
                />
                <FormControlLabel
                  value='In Progress'
                  control={<Radio />}
                  label='In Progress'
                  onChange={handleDataChange}
                  name='status'
                />
                <FormControlLabel
                  value='Completed'
                  control={<Radio />}
                  label='Completed'
                  onChange={handleDataChange}
                  name='status'
                />
              </RadioGroup>
            </>
          )}
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

      {/* Editing Dialog */}
      <Dialog
        fullWidth
        maxWidth='md'
        onClose={handleEditClose}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleEditClose}>
          Editing {role} Information | ID{' '}
          {role === 'admin' ? editedAdminData.id : role === 'judge' ? editedJudgeData.id : editedParticipantData.id}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-fName'
            label='First Name'
            type='text'
            fullWidth
            variant='standard'
            name='firstName'
            defaultValue={
              role === 'admin'
                ? editedAdminData.firstName
                : role === 'judge'
                ? editedJudgeData.firstName
                : editedParticipantData.firstName
            }
            onChange={handleDataChange}
            error={isFnameValid}
            helperText={isFnameValid && 'Invalid First Name'}
            required
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-lName'
            label='Last Name'
            type='text'
            fullWidth
            variant='standard'
            name='lastName'
            defaultValue={
              role === 'admin'
                ? editedAdminData.lastName
                : role === 'judge'
                ? editedJudgeData.lastName
                : editedParticipantData.lastName
            }
            onChange={handleDataChange}
            error={isLnameValid}
            helperText={isLnameValid && 'Invalid Last Name'}
            required
          />
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-email'
            label='Email Name'
            type='email'
            fullWidth
            variant='standard'
            name='email'
            defaultValue={
              role === 'admin'
                ? editedAdminData.email
                : role === 'judge'
                ? editedJudgeData.email
                : editedParticipantData.email
            }
            onChange={handleDataChange}
            error={isEmailValid}
            helperText={isEmailValid && 'Invalid Email Address'}
            required
          />

          {role === 'judge' && (
            <>
              <TextField
                margin='dense'
                id='outlined-multiline-flexible-orgEdit'
                label='Organization'
                type='text'
                fullWidth
                variant='standard'
                name='organization'
                onChange={handleDataChange}
                defaultValue={editedJudgeData.organization}
              />
              <TextField
                margin='dense'
                id='outlined-multiline-flexible-jobEdit'
                label='Job Title'
                type='text'
                fullWidth
                variant='standard'
                name='job_title'
                onChange={handleDataChange}
                defaultValue={editedJudgeData.job_title}
              />
            </>
          )}
          {role === 'participant' && (
            <>
              <TextField
                sx={{ mb: 6 }}
                margin='dense'
                id='outlined-multiline-flexible-phoneNumber'
                label='Phone Number'
                type='number'
                fullWidth
                variant='standard'
                name='phoneNumber'
                defaultValue={editedParticipantData.phoneNumber}
                onChange={handleDataChange}
              />
              <FormControl variant='standard' sx={{ minWidth: 120 }}>
                <InputLabel id='demo-simple-select-label'>Country</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={editedParticipantData.country}
                  label='Country'
                  onChange={handleDataChange}
                  name='country'
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Divider></Divider>
              <FormLabel id='demo-row-radio-buttons-group-label'>Age Group</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                defaultValue={editedParticipantData.age}
              >
                <FormControlLabel
                  value='16-20'
                  control={<Radio />}
                  label='16-20'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='21-25'
                  control={<Radio />}
                  label='21-25'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='26-30'
                  control={<Radio />}
                  label='26-30'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='31-35'
                  control={<Radio />}
                  label='31-35'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='36-40'
                  control={<Radio />}
                  label='36-40'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel
                  value='41-45'
                  control={<Radio />}
                  label='41-45'
                  onChange={handleDataChange}
                  name='age'
                />
                <FormControlLabel value='46+' control={<Radio />} label='46+' onChange={handleDataChange} name='age' />
              </RadioGroup>
              <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                defaultValue={editedParticipantData.gender}
              >
                <FormControlLabel
                  value='Male'
                  control={<Radio />}
                  label='Male'
                  onChange={handleDataChange}
                  name='gender'
                />
                <FormControlLabel
                  value='Female'
                  control={<Radio />}
                  label='Female'
                  onChange={handleDataChange}
                  name='gender'
                />
              </RadioGroup>

              <FormLabel id='demo-row-radio-buttons-group-label'>Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                defaultValue={editedParticipantData.status}
              >
                <FormControlLabel
                  value='Inactive'
                  control={<Radio />}
                  label='Inactive'
                  onChange={handleDataChange}
                  name='status'
                />
                <FormControlLabel
                  value='In Progress'
                  control={<Radio />}
                  label='In Progress'
                  onChange={handleDataChange}
                  name='status'
                />
                <FormControlLabel
                  value='Completed'
                  control={<Radio />}
                  label='Completed'
                  onChange={handleDataChange}
                  name='status'
                />
              </RadioGroup>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleEdit}>
            Submit
          </Button>

          <Button onClick={handleEditClose} variant='outlined'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOGUE */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Delete ${role} ID ${
          role === 'admin' ? editedAdminData.id : role === 'judge' ? editedJudgeData.id : editedParticipantData.id
        } `}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this {role}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={deleteUser} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
