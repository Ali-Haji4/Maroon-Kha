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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

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

export default function QuestionManagement() {
  const [admins, setAdmins] = React.useState([{}])
  const [toggleEdit, setToggleEdit] = React.useState(false)
  const [questions, setQuestions] = React.useState([{}])
  const [questions2, setQuestions2] = React.useState([{}])

  //Axios function to retrieve admins from database and insert them into the admins
  const urlAdmins = 'http://localhost/reactProject/maroonTest/adminsList.php'

  //Axios function to retrieve judges frim database and insert them into the judges constant
  const urlQuestions = 'http://localhost/reactProject/maroonTest/questionsList.php'

  const urlQuestions2 = 'http://localhost/reactProject/maroonTest/questions2List.php'

  // ** State
  const [competition, setCompetition] = useState('youth')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [deleteID, setDeleteID] = React.useState({ id: '' })

  useEffect(() => {
    if (competition === 'youth') {
      axios
        .get(urlQuestions)
        .then(response => response.data)
        .then(data => {
          setQuestions(data)
        })
    } else {
      axios
        .get(urlQuestions2)
        .then(response => response.data)
        .then(data => {
          setQuestions(data)
        })
    }
  }, [competition])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleCompetitionChange = useCallback(e => {
    setCompetition(e.target.value)
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

  function deleteQuestion(id) {
    if (competition === 'youth') {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteQuestion2.php', deleteID)
        .then(res => console.log(res.data))
      alert('Question Deleted Succesfully')
      window.location.reload(true)
    } else {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteQuestion3.php', deleteID)
        .then(res => console.log(res.data))
      alert('Question Deleted Succesfully')
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
                  <InputLabel id='role-select'>Competition</InputLabel>
                  <Select
                    fullWidth
                    value={competition}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    inputProps={{ placeholder: 'Select Competition' }}
                    onChange={handleCompetitionChange}
                  >
                    <MenuItem value=''>Select Competition</MenuItem>
                    <MenuItem value='youth'>Youth Award</MenuItem>
                    <MenuItem value='standard'>Standard Award</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Question ID</StyledTableCell>
                  <StyledTableCell>Question</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component='th' scope='row'>
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell>{item.text}</StyledTableCell>
                    <StyledTableCell>
                      <Stack direction='row' spacing={2}>
                        <Button
                          variant='contained'
                          type='button'
                          className='reportBtn'
                          onClick={() => returnEdit(item.id, item.text)}
                        >
                          Edit
                        </Button>
                        {/* <Button variant='outlined' type='submit' className='reportBtn'>
                          Delete{' '}
                        </Button> */}
                        <IconButton size='small' onClick={() => deleteQuestion(item.id)} sx={{ color: 'text.primary' }}>
                          <Icon icon='mdi:delete' fontSize={20} />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} /> */}
          {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
        </Card>
      </Grid>
    </Grid>
  )
}
