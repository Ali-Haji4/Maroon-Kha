// ** React Imports
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, Divider, TextField } from '@mui/material'
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, Box, Tooltip } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const ACLPage2 = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  //States
  const [questionList, setQuestionList] = React.useState([])
  const urlQuestions = 'http://localhost/reactProject/maroonTest/questionsList.php'
  const [refresher, setRefresher] = React.useState(false)

  const [ansq1_1Valid, setAnsq1_1Valid] = useState(false)
  const [ansq1_2Valid, setAnsq1_2Valid] = useState(false)
  const [ansq1_3Valid, setAnsq1_3Valid] = useState(false)
  const [ansq2Valid, setAnsq2Valid] = useState(false)
  const [ansq3Valid, setAnsq3Valid] = useState(false)
  const [ansq4_1Valid, setAnsq4_1Valid] = useState(false)
  const [ansq4_2Valid, setAnsq4_2Valid] = useState(false)
  const [ansq4_3Valid, setAnsq4_3Valid] = useState(false)
  const [ansq4_4Valid, setAnsq4_4Valid] = useState(false)
  const [ansq4_5Valid, setAnsq4_5Valid] = useState(false)
  const [ansq5_AValid, setAnsq5_AValid] = useState(false)
  const [ansq5_B_Person_NameValid, setAnsq5_B_Person_NameValid] = useState(false)
  const [ansq5_B_Person_EmailValid, setAnsq5_B_Person_EmailValid] = useState(false)
  const [ansq5_B_Person_NumberValid, setAnsq5_B_Person_NumberValid] = useState(false)
  const [ansq5_B_Mentor_NameValid, setAnsq5_B_Mentor_NameValid] = useState(false)
  const [ansq5_B_Mentor_EmailValid, setAnsq5_B_Mentor_EmailValid] = useState(false)
  const [ansq5_B_Mentor_NumberValid, setAnsq5_B_Mentor_NumberValid] = useState(false)
  const [ansq5_C_recognitionValid, setAnsq5_C_recognitionValid] = useState(false)
  const [ansq6Valid, setAnsq6Valid] = useState(false)
  const [ansq7Valid, setAnsq7Valid] = useState(false)
  const [ansq8_1Valid, setAnsq8_1Valid] = useState(false)
  const [ansq8_2Valid, setAnsq8_2Valid] = useState(false)
  const [ansq8_3Valid, setAnsq8_3Valid] = useState(false)
  const [ansq8_4Valid, setAnsq8_4Valid] = useState(false)
  const [ansq8_5Valid, setAnsq8_5Valid] = useState(false)
  const [ansq8_6Valid, setAnsq8_6Valid] = useState(false)
  const [ansq8_7Valid, setAnsq8_7Valid] = useState(false)
  const [ansq9Valid, setAnsq9Valid] = useState(false)
  const [emailErrorPerson, setEmailErrorPerson] = useState(false)
  const [emailErrorMentor, setEmailErrorMentor] = useState(false)

  const [answers, setAnswers] = useState({
    ansq1_1: '',
    ansq1_2: '',
    ansq1_3: '',
    ansq2: '',
    ansq3: '',
    ansq4_1: '',
    ansq4_2: '',
    ansq4_3: '',
    ansq4_4: '',
    ansq4_5: '',
    ansq5_A: '',
    ansq5_B_Person_Name: '',
    ansq5_B_Person_Email: '',
    ansq5_B_Person_Number: '',
    ansq5_B_Mentor_Name: '',
    ansq5_B_Mentor_Email: '',
    ansq5_B_Mentor_Number: '',
    ansq5_C_recognition: '',
    ansq6: '',
    ansq7: '',
    ansq8_1: '',
    ansq8_2: '',
    ansq8_3: '',
    ansq8_4: '',
    ansq8_5: '',
    ansq8_6: '',
    ansq8_7: '',
    ansq9: ''
  })

  //Sustainable Development Goals List
  const sdg = [
    'No Poverty',
    'Zero Hunger',
    'Good Health and Well-being',
    'Quality Education',
    'Gender Equalityunger',
    'Clean Water and Sanitation',
    'Affordable and Clean Energy',
    'Decent Work and Economic Growth',
    'Industry, Innovation and Infrastructure',
    'Reduced Inequality',
    'Sustainable Cities and Communities',
    'Responsible Consumption and Production',
    'Climate Action',
    'Life Below Water',
    'Life on Land',
    'Peace and Justice Strong Institutions',
    'Partnerships to achieve the Goal'
  ]

  //Fetching Questions from the database
  useEffect(() => {
    axios
      .get(urlQuestions)
      .then(response => response.data)
      .then(data => {
        setQuestionList(data)
      })

    console.log(questionList)
  }, [refresher])

  //Handling Saving a draft
  function handleSaveDraft() {}

  const [isFormInvalid, setIsFormInvalid] = useState(false)

  //Validating text fields
  const validate = values => {
    setAnsq1_1Valid(false)
    setAnsq1_2Valid(false)
    setAnsq1_3Valid(false)
    setAnsq2Valid(false)
    setAnsq3Valid(false)

    //Because the answer 4 is optional in this iteration
    // setAnsq4_1Valid(false)
    // setAnsq4_2Valid(false)
    // setAnsq4_3Valid(false)
    // setAnsq4_4Valid(false)
    // setAnsq4_5Valid(false)
    setAnsq5_AValid(false)
    setAnsq5_B_Person_NameValid(false)
    setAnsq5_B_Person_EmailValid(false)
    setAnsq5_B_Person_NumberValid(false)
    setAnsq5_B_Mentor_NameValid(false)
    setAnsq5_B_Mentor_EmailValid(false)
    setAnsq5_B_Mentor_NumberValid(false)
    setAnsq5_C_recognitionValid(false)
    setAnsq6Valid(false)
    setAnsq7Valid(false)
    setAnsq8_1Valid(false)
    setAnsq8_2Valid(false)
    setAnsq8_3Valid(false)
    setAnsq8_4Valid(false)
    setAnsq8_5Valid(false)
    setAnsq8_6Valid(false)
    setAnsq8_7Valid(false)
    setAnsq9Valid(false)
    setEmailErrorMentor(false)
    setEmailErrorPerson(false)

    // setQuestionNo('question-1')

    //Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (values.ansq1_1 == '') {
      setAnsq1_1Valid(true)
      setOpen(true)
      handleClickScroll('question-1')

      return false
    } else if (values.ansq1_2 == '') {
      setAnsq1_2Valid(true)
      setOpen(true)
      handleClickScroll('question-1')

      return false
    } else if (values.ansq1_3 == '') {
      setAnsq1_3Valid(true)
      setOpen(true)
      handleClickScroll('question-1')

      return false
    } else if (values.ansq2 == '') {
      setAnsq2Valid(true)
      setOpen(true)

      handleClickScroll('question-2')

      return false
    } else if (values.ansq3 == '') {
      setAnsq3Valid(true)
      setOpen(true)

      handleClickScroll('question-3')

      return false

      // } else if (values.ansq4_1 == '') {
      //   setAnsq4_1Valid(true)

      //   return false
      // } else if (values.ansq4_2 == '') {
      //   setAnsq4_2Valid(true)

      //   return false
      // } else if (values.ansq4_3 == '') {
      //   setAnsq4_3Valid(true)

      //   return false
      // } else if (values.ansq4_4 == '') {
      //   setAnsq4_4Valid(true)

      //   return false
      // } else if (values.ansq4_5 == '') {
      //   setAnsq4_5Valid(true)

      //   return false
      //
    } else if (values.ansq5_A == '') {
      setAnsq5_AValid(true)
      setOpen(true)

      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Person_Name == '') {
      setAnsq5_B_Person_NameValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Person_Email == '') {
      setAnsq5_B_Person_EmailValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (!emailRegex.test(values.ansq5_B_Person_Email)) {
      setEmailErrorPerson(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Person_Number == '') {
      setAnsq5_B_Person_NumberValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Mentor_Name == '') {
      setAnsq5_B_Mentor_NameValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Mentor_Email == '') {
      setAnsq5_B_Mentor_EmailValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (!emailRegex.test(values.ansq5_B_Mentor_Email)) {
      setEmailErrorMentor(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_B_Mentor_Number == '') {
      setAnsq5_B_Mentor_NumberValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq5_C_recognition == '') {
      setAnsq5_C_recognitionValid(true)
      setOpen(true)
      handleClickScroll('question-5')

      return false
    } else if (values.ansq6 == '') {
      setAnsq6Valid(true)
      setOpen(true)
      handleClickScroll('question-6')

      return false
    } else if (values.ansq7 == '') {
      setAnsq7Valid(true)
      setOpen(true)
      handleClickScroll('question-7')

      return false
    } else if (values.ansq8_1 == '') {
      setAnsq8_1Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_2 == '') {
      setAnsq8_2Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_3 == '') {
      setAnsq8_3Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_4 == '') {
      setAnsq8_4Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_5 == '') {
      setAnsq8_5Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_6 == '') {
      setAnsq8_6Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq8_7 == '') {
      setAnsq8_7Valid(true)
      setOpen(true)
      handleClickScroll('question-8')

      return false
    } else if (values.ansq9 == '') {
      setAnsq9Valid(true)
      setOpen(true)
      handleClickScroll('question-9')

      return false
    } else {
      return true
    }
  }

  // Event handler for handling changes in the text fields
  const handleInputChange = event => {
    const { name, value } = event.target
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }))
    console.log(answers)
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

  function handleClickScroll(questionNo) {
    const element = document.getElementById(questionNo)
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //Handling submit
  function handleSubmit() {
    if (validate(answers)) {
      console.log('success')
    } else {
      console.log('fail')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Saving a Draft' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>
              You can save a draft of your answers and resume completing the questions at a later time/date
            </Typography>
            <Typography sx={{ color: 'primary.main' }}>
              The save draft button is located at the bottom of the page
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can('read', 'analytics') ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Submission' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>
                It is of utmost importance to ensure that the answers provided are as comprehensive and detailed as
                possible. This not only helps to maintain the integrity and precision of the information being conveyed,
                but also serves to promote transparency and clarity. To this end, we kindly request that all responses
                be crafted with careful consideration and attention to detail, with the goal of providing the fullest
                possible picture of your initiative.
              </Typography>

              <Typography sx={{ color: 'error.main' }}>
                Once you submit and complete your review, you will not be able to come back to this page again
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Grid item md={12} xs={12}>
        <Typography variant='h4' id='question-1'>
          {questionList[0]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <Typography variant='h5' mb={4}>
            {questionList[1]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans1_1'
            type='text'
            fullWidth
            variant='outlined'
            name='ansq1_1'
            value={answers.ansq1_1}
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq1_1Valid}
            helperText={ansq1_1Valid && 'Answer is required'}
          />

          <Typography variant='h5' mt={4}>
            {questionList[2]?.text}

            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans1_2'
              type='text'
              fullWidth
              variant='outlined'
              name='ansq1_2'
              value={answers.ansq1_2}
              onChange={handleInputChange}
              required
              multiline
              error={ansq1_2Valid}
              helperText={ansq1_2Valid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={4}>
            {questionList[3]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans1_3'
              type='text'
              fullWidth
              variant='outlined'
              name='ansq1_3'
              value={answers.ansq1_3}
              onChange={handleInputChange}
              required
              multiline
              error={ansq1_3Valid}
              helperText={ansq1_3Valid && 'Answer is required'}
            />
          </Typography>
        </Grid>
        <Typography variant='h4' mt={10} id='question-2'>
          {questionList[4]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans2'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq2}
            name='ansq2'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq2Valid}
            helperText={ansq2Valid && 'Answer is required'}
          />
        </Grid>
        <Typography variant='h4' mt={10} id='question-3'>
          {questionList[5]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          {' '}
          <FormControl variant='standard' sx={{ minWidth: 400 }}>
            <InputLabel id='demo-simple-select-label'>Sustainable development goals</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='SDG'
              onChange={handleInputChange}
              value={answers.ansq3}
              name='ansq3'
              error={ansq3Valid}
            >
              {sdg.map((country, index) => (
                <MenuItem key={index} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Typography variant='h4' mt={10} id='question-4'>
          {questionList[6]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <Typography variant='h5' mt={4}>
            {questionList[7]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans4_1'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq4_1}
              name='ansq4_1'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq4_1Valid}
              helperText={ansq4_1Valid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={4}>
            {questionList[8]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans4_2'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq4_2}
              name='ansq4_2'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq4_2Valid}
              helperText={ansq4_2Valid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={4}>
            {questionList[9]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans4_3'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq4_3}
              name='ansq4_3'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq4_3Valid}
              helperText={ansq4_3Valid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={4}>
            {questionList[10]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans4_4'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq4_4}
              name='ansq4_4'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq4_4Valid}
              helperText={ansq4_4Valid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={4}>
            {questionList[11]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans4_5'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq4_5}
              name='ansq4_5'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq4_5Valid}
              helperText={ansq4_5Valid && 'Answer is required'}
            />
          </Typography>
        </Grid>
        <Typography variant='h4' mt={10} id='question-5'>
          {questionList[12]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <Typography variant='h5' mt={10}>
            {questionList[13]?.text}
          </Typography>
          <Typography variant='h6' mt={10}>
            {questionList[14]?.text}
            <TextField
              margin='dense'
              id='outlined-multiline-flexible-ans5_A'
              type='text'
              fullWidth
              variant='outlined'
              value={answers.ansq5_A}
              name='ansq5_A'
              onChange={handleInputChange}
              required
              multiline
              minRows={2}
              error={ansq5_AValid}
              helperText={ansq5_AValid && 'Answer is required'}
            />
          </Typography>
          <Typography variant='h5' mt={10}>
            {questionList[15]?.text}
          </Typography>
          <Typography variant='h6' mt={10}>
            {questionList[16]?.text}
          </Typography>
          <Typography variant='h6' mt={10}>
            {questionList[17]?.text}
          </Typography>
          <TextField
            sx={{ mt: 8, minWidth: 400, mr: 15 }}
            margin='dense'
            id='outlined-multiline-flexible-person-name'
            label={`Full Name`}
            type='text'
            variant='standard'
            value={answers.ansq5_B_Person_Name}
            name='ansq5_B_Person_Name'
            onChange={handleInputChange}
            error={ansq5_B_Person_NameValid}
            helperText={ansq5_B_Person_NameValid && 'A name is required'}
          />
          <TextField
            sx={{ mt: 8, minWidth: 400, mr: 15 }}
            margin='dense'
            id='outlined-multiline-flexible-person-email'
            label={`Email Address`}
            type='email'
            variant='standard'
            value={answers.ansq5_B_Person_Email}
            name='ansq5_B_Person_Email'
            onChange={handleInputChange}
            error={ansq5_B_Person_EmailValid || emailErrorPerson}
            helperText={
              (ansq5_B_Person_EmailValid && 'Email Address is required') ||
              (emailErrorPerson && 'Invalid Email Address')
            }
          />
          <TextField
            sx={{ mt: 8, minWidth: 400 }}
            margin='dense'
            id='outlined-multiline-flexible-person-number'
            label={`Phone Number`}
            type='number'
            variant='standard'
            value={answers.ansq5_B_Person_Number}
            name='ansq5_B_Person_Number'
            onChange={handleInputChange}
            error={ansq5_B_Person_NumberValid}
            helperText={ansq5_B_Person_NumberValid && 'Phone Number is required'}
          />
          <Typography variant='h6' mt={10}>
            {questionList[18]?.text}
          </Typography>
          <TextField
            sx={{ mt: 8, minWidth: 400, mr: 15 }}
            margin='dense'
            id='outlined-multiline-flexible-peer-name'
            label={`Full Name`}
            type='text'
            variant='standard'
            value={answers.ansq5_B_Mentor_Name}
            name='ansq5_B_Mentor_Name'
            onChange={handleInputChange}
            error={ansq5_B_Mentor_NameValid}
            helperText={ansq5_B_Mentor_NameValid && 'A name is required'}
          />
          <TextField
            sx={{ mt: 8, minWidth: 400, mr: 15 }}
            margin='dense'
            id='outlined-multiline-flexible-peer-email'
            label={`Email Address`}
            type='email'
            variant='standard'
            value={answers.ansq5_B_Mentor_Email}
            name='ansq5_B_Mentor_Email'
            onChange={handleInputChange}
            error={ansq5_B_Mentor_EmailValid || emailErrorMentor}
            helperText={
              (ansq5_B_Mentor_EmailValid && 'Email Address is required') ||
              (emailErrorMentor && 'Invalid Email Address')
            }
          />
          <TextField
            sx={{ mt: 8, minWidth: 400 }}
            margin='dense'
            id='outlined-multiline-flexible-peer-number'
            label={`Phone Number`}
            type='number'
            variant='standard'
            value={answers.ansq5_B_Mentor_Number}
            name='ansq5_B_Mentor_Number'
            onChange={handleInputChange}
            error={ansq5_B_Mentor_NumberValid}
            helperText={ansq5_B_Mentor_NumberValid && 'Phone Number is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[19]?.text}
          </Typography>
          <Typography variant='h6' mt={10}>
            {questionList[20]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans5_C'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq5_C_recognition}
            name='ansq5_C_recognition'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq5_C_recognitionValid}
            helperText={ansq5_C_recognitionValid && 'Answer is required'}
          />
        </Grid>
        <Typography variant='h4' mt={10} id='question-6'>
          {questionList[21]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans_6'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq6}
            name='ansq6'
            onChange={handleInputChange}
            required
            multiline
            minRows={4}
            error={ansq6Valid}
            helperText={ansq6Valid && 'Answer is required'}
          />
        </Grid>

        <Typography variant='h4' mt={10} id='question-7'>
          {questionList[22]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans_7'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq7}
            name='ansq7'
            onChange={handleInputChange}
            required
            multiline
            minRows={4}
            error={ansq7Valid}
            helperText={ansq7Valid && 'Answer is required'}
          />
        </Grid>
        <Typography variant='h4' mt={10} id='question-8'>
          {questionList[23]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <Typography variant='h5' mt={10}>
            {questionList[24]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_1'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_1}
            name='ansq8_1'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_1Valid}
            helperText={ansq8_1Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[25]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_2'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_2}
            name='ansq8_2'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_2Valid}
            helperText={ansq8_2Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[26]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_3'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_3}
            name='ansq8_3'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_3Valid}
            helperText={ansq8_3Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[27]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_4'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_4}
            name='ansq8_4'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_4Valid}
            helperText={ansq8_4Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[28]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_5'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_5}
            name='ansq8_5'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_5Valid}
            helperText={ansq8_5Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[29]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_6'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_6}
            name='ansq8_6'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_6Valid}
            helperText={ansq8_6Valid && 'Answer is required'}
          />
          <Typography variant='h5' mt={10}>
            {questionList[30]?.text}
          </Typography>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans8_7'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq8_7}
            name='ansq8_7'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq8_7Valid}
            helperText={ansq8_7Valid && 'Answer is required'}
          />
        </Grid>
        <Typography variant='h4' mt={10} id='question-9'>
          {questionList[31]?.text}
        </Typography>
        <Divider></Divider>
        <Grid item md={10} xs={12} m={4}>
          <TextField
            margin='dense'
            id='outlined-multiline-flexible-ans9'
            type='text'
            fullWidth
            variant='outlined'
            value={answers.ansq9}
            name='ansq9'
            onChange={handleInputChange}
            required
            multiline
            minRows={3}
            error={ansq9Valid}
            helperText={ansq9Valid && 'Answer is required'}
          />
        </Grid>
      </Grid>
      <Grid item md={10} xs={12} m={4}>
        <Box textAlign='center'>
          {' '}
          <Button variant='contained' size='large' sx={{ mr: 20 }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='outlined' size='large'>
            Save Draft
          </Button>
        </Box>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message='Note archived' action={action}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Please fill in all the required fields (*)
        </Alert>
      </Snackbar>
    </Grid>
  )
}
ACLPage2.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage2
