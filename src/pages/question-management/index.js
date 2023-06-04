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
import Snackbar from '@mui/material'
import Alert from '@mui/material'

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
import QuestionsHeader from 'src/views/apps/user/list/QuestionsHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material'

export default function QuestionManagement() {
  const [admins, setAdmins] = React.useState([{}])
  const [toggleEdit, setToggleEdit] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
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
  const [deleteIDSaved, setDeleteIDSaved] = React.useState()
  const [questionText, setQuestionText] = React.useState({ questionText: '' })
  const [editedQuestionText, setEditedQuestionText] = React.useState({ questionText: '', id: '' })

  useEffect(() => {
    axios
      .get(urlQuestions)
      .then(response => response.data)
      .then(data => {
        setQuestions(data)
      })
  }, [questions])

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

  function deleteQuestion() {
    if (competition === 'youth') {
      console.log(deleteID + '<- ID')
      axios
        .post('http://localhost/reactProject/maroonTest/deleteQuestion2.php', deleteID)
        .then(res => console.log(res.data))

      // return (
      //   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      //     <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
      //       This is a success message!
      //     </Alert>
      //   </Snackbar>
      // )
      handleDeleteClose()
    } else {
      console.log('delete ID is ' + id)
      setDeleteID((deleteID.id = id))
      console.log(deleteID)
      axios
        .post('http://localhost/reactProject/maroonTest/deleteQuestion3.php', deleteID)
        .then(res => console.log(res.data))
      handleDeleteClose()
    }
  }

  function handleAddQuestion() {
    axios
      .post('http://localhost/reactProject/maroonTest/insertQuestion.php', questionText)
      .then(res => console.log(res.data))
    handleClose()
  }

  function handleQuestionChange(event) {
    setQuestionText({ questionText: event.target.value })
    console.log(questionText)
  }

  function handleEditQuestionChange(event) {
    setEditedQuestionText({ ...editedQuestionText, questionText: event.target.value })
    console.log(editedQuestionText)
  }

  const [open, setOpen] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDelete, setOpenDelete] = React.useState(false)

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

  // const handleEditQuestion = (id, text) => {
  //   setEditedQuestionText({ questionText: text, id: id })
  //   console.log('Clicked' + id + text)
  //   console.log(editedQuestionText.id + editedQuestionText.questionText)
  //   handleSubmission()
  // }

  const handleEditQuestion = () => {
    console.log(editedQuestionText)
    axios
      .post('http://localhost/reactProject/maroonTest/updateQuestion.php', editedQuestionText)
      .then(res => console.log(res.data))
    handleEditClose()
  }

  const handleClickDeleteOpen = () => {
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const filteredQuestions = questions.filter(b => b.text.toLowerCase().includes(searchTerm.toLowerCase()))

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
                    <MenuItem value='youth'>Standard Award</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          <QuestionsHeader value={searchTerm} handleFilter={handleSearchChange} toggle={handleClickOpen} />

          <Divider />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Question ID</StyledTableCell>
                  <StyledTableCell>Question No.</StyledTableCell>
                  <StyledTableCell>Question Text</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredQuestions?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {item.id}
                    </TableCell>
                    <StyledTableCell>{item.question_number}</StyledTableCell>
                    <StyledTableCell>{item.text}</StyledTableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        type='button'
                        className='reportBtn'
                        onClick={event => {
                          event.preventDefault()
                          handleClickEditOpen()
                          setEditedQuestionText({ ...editedQuestionText, questionText: item.text, id: item.id })
                        }}
                      >
                        Edit
                      </Button>

                      <IconButton
                        size='small'
                        sx={{ color: 'text.primary' }}
                        onClick={event => {
                          event.preventDefault()
                          setDeleteIDSaved(item.id)
                          setDeleteID({ id: item.id })
                          handleClickDeleteOpen()
                        }}
                      >
                        <Icon icon='mdi:delete' fontSize={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      {/* The dialogue box of Adding a Question */}

      <Dialog fullWidth maxWidth='md' onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          Adding a new Question
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='outlined-multiline-flexible'
            label='Question Text'
            type='text'
            fullWidth
            variant='standard'
            multiline
            name='questionText'
            onChange={handleQuestionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddQuestion} variant='contained'>
            Add Question
          </Button>

          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth='md'
        onClose={handleEditClose}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleEditClose}>
          Editing Question
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='outlined-multiline-flexible'
            label='Question Text'
            type='text'
            fullWidth
            variant='standard'
            multiline
            name='questionText'
            onChange={handleEditQuestionChange}
            defaultValue={editedQuestionText.questionText}
            onFocus={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditQuestion} variant='contained'>
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
        <DialogTitle id='alert-dialog-title'>Delete Question ID | {deleteID.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this Question?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={deleteQuestion} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}
