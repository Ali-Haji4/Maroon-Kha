// ** React Imports
import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ACLPage = () => {
  const [deleteID, setDeleteID] = React.useState({ id: '' })

  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const [submittedCheckbox, setSubmittedCheckbox] = useState({ id: [], panel_id: '' })
  const [submittedRemovedCheckbox, setSubmittedRemovedCheckbox] = useState({ id: [] })
  const [currentPanelID, setCurrentPanelID] = useState()
  const [answersRange, setAnswersRange] = useState({ from: '', to: '', id: '' })
  const [answersList, setAnswers] = React.useState([{}])

  //Axios function to retrieve admins from database and insert them into the admins
  const urlAnswers = 'http://localhost/reactProject/maroonTest/answersList.php'

  const rolesArr = [
    'User Management',
    'Content Management',
    'Disputes Management',
    'Database Management',
    'Financial Management',
    'Reporting',
    'API Control',
    'Repository Management',
    'Payroll'
  ]

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

  const [judgeName, setJudgeName] = useState([])

  // ** Hooks
  const ability = useContext(AbilityContext)

  const urlPanels = 'http://localhost/reactProject/maroonTest/panelList.php'
  const urlJudge = 'http://localhost/reactProject/maroonTest/judgesList.php'
  const [panel, setPanel] = React.useState([])
  const [judge, setJudge] = React.useState([])
  const [refresh, setRefresher] = React.useState(false)
  const avatars = ['1.png', '2.png', '3.png', '4.png']
  useEffect(() => {
    axios
      .get(urlPanels)
      .then(response => response.data)
      .then(data => {
        setPanel(data)
      })

    axios
      .get(urlJudge)
      .then(response => response.data)
      .then(data => {
        setJudge(data)
      })

    axios
      .get(urlAnswers)
      .then(response => response.data)
      .then(data => {
        setAnswers(data)
      })
    console.log(panel)
  }, [refresh])

  function deletePanel() {
    // //This deletes the whole panel
    // console.log('delete ID is ' + id)
    // setDeleteID((deleteID.id = id))
    console.log(deleteID)
    axios.post('http://localhost/reactProject/maroonTest/deletePanel.php', deleteID).then(res => console.log(res.data))
    setRefresher(prevState => !prevState)
    handleDeleteClose()
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const handleSubmit = () => {
    if (dialogTitle === 'Add') {
      setSubmittedCheckbox((submittedCheckbox.id = selectedCheckbox))
      console.log(submittedCheckbox)

      axios
        .post('http://localhost/reactProject/maroonTest/insertPanel.php', submittedCheckbox)
        .then(res => console.log(res.data))

      console.log('Title:' + dialogTitle)

      setRefresher(prevState => !prevState)
    } else if (dialogTitle === 'Edit') {
      setSubmittedCheckbox((submittedCheckbox.id = selectedCheckbox))

      axios
        .post('http://localhost/reactProject/maroonTest/updatePanel.php', submittedCheckbox)
        .then(res => console.log(res.data))

      setSubmittedRemovedCheckbox((submittedRemovedCheckbox.id = removedCheckbox))

      axios
        .post('http://localhost/reactProject/maroonTest/removeJudgesFromPanel.php', submittedRemovedCheckbox)
        .then(res => console.log(res.data))

      if (answersRange.from <= answersRange.to) {
        axios
          .post('http://localhost/reactProject/maroonTest/panelAnswerRange.php', answersRange)
          .then(res => console.log(res.data))
      } else {
        console.log(answersRange.from + ' ' + answersRange.to)
        alert('Wrong entry')
      }

      setRefresher(prevState => !prevState)
    } else {
      console.log('ERROR 404')
    }

    setOpen(false)
    setSelectedCheckbox([])
    setRemovedCheckbox([])
    setIsIndeterminateCheckbox(false)
    setIsIndeterminateRemovedCheckbox(false)
    setAnswersRange({ from: 0, to: 0, id: '' })
  }

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([])
    } else {
      judge.forEach(row => {
        const id = row.id
        togglePermission(`${id}`)
      })
    }
  }

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
      console.log(selectedCheckbox)
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
      console.log(selectedCheckbox)
    }
  }

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateCheckbox(true)
    } else {
      setIsIndeterminateCheckbox(false)
    }
  }, [selectedCheckbox])

  const [openDelete, setOpenDelete] = React.useState(false)

  const handleClickDeleteOpen = () => {
    setOpenDelete(true)
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  //REMOVING JUDGE TESTING AREA

  const [removedCheckbox, setRemovedCheckbox] = useState([])
  const [isIndeterminateRemovedCheckbox, setIsIndeterminateRemovedCheckbox] = useState(false)

  const handleSelectAllRemovedCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setRemovedCheckbox([])
    } else {
      judge.forEach(row => {
        const id = row.id
        togglePermissionRemove(`${id}`)
      })
    }
  }

  const togglePermissionRemove = id => {
    const arr = removedCheckbox
    if (removedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setRemovedCheckbox([...arr])
      console.log(removedCheckbox)
    } else {
      arr.push(id)
      setRemovedCheckbox([...arr])
      console.log(removedCheckbox)
    }
  }

  useEffect(() => {
    if (removedCheckbox.length > 0 && removedCheckbox.length < rolesArr.length * 3) {
      setIsIndeterminateRemovedCheckbox(true)
    } else {
      setIsIndeterminateRemovedCheckbox(false)
    }
  }, [removedCheckbox])

  //QUESTION ASSIGNMENT SECTION
  function handleDataChange(event) {
    setAnswersRange({
      ...answersRange,
      [event.target.name]: event.target.value
    })
    console.log(answersRange)
  }

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Guide' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>
              This page is where you can create and edit panels, and assign judges to them
            </Typography>
            <Typography sx={{ color: 'primary.main' }}>
              The current iteration should make each panel house three judges
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can('read', 'analytics') ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Answers Range Assignment' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>
                When you assign the same answer range or a range that crosses over to a pretermenined range from a
                previous panel, the newest panel will take precedence
              </Typography>
              <Typography sx={{ color: 'error.main' }}>
                You can check the current panel ID for each answer from the answers list below
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <CardHeader
          title='King Hamad Award Panels'
          sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
        />
        <Divider></Divider>
        <Grid container spacing={6} className='match-height' sx={{ mt: '2px' }}>
          {panel?.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      Panel {index + 1} | ID {item.id}
                    </Typography>
                    <Typography variant='body2'>
                      {item.answer_range_from != -1
                        ? `Answers Range ${item.answer_range_from} - ${item.answer_range_to}`
                        : `Not Assigned`}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant='h6'>{item.title}</Typography>
                      {judge?.map(
                        items =>
                          items.panel_id === item.id && (
                            <>
                              <Typography variant='h6' key={index} sx={{ mb: 3 }}>
                                {items.name}
                              </Typography>
                            </>
                          )
                      )}
                      <Typography
                        href='/'
                        variant='body2'
                        component={Link}
                        sx={{ color: 'primary.main' }}
                        onClick={e => {
                          e.preventDefault()
                          handleClickOpen()
                          setDialogTitle('Edit')
                          setSubmittedCheckbox(existingValues => ({
                            ...existingValues,
                            panel_id: item.id,
                            id: selectedCheckbox
                          }))
                          setSubmittedRemovedCheckbox(existingValues => ({
                            ...existingValues,
                            id: removedCheckbox
                          }))
                          setAnswersRange(existingValues => ({
                            ...existingValues,
                            id: item.id
                          }))
                        }}
                      >
                        Edit Panel
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <IconButton
                        size='small'
                        onClick={event => {
                          event.preventDefault()
                          setDeleteID({ id: item.id })
                          handleClickDeleteOpen()
                        }}
                        sx={{ color: 'text.primary' }}
                      >
                        <Icon icon='mdi:delete' fontSize={20} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={5}>
                  <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <img width={65} height={130} alt='add-role' src='/images/pages/add-new-role-illustration.png' />
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <CardContent>
                    <Box sx={{ textAlign: 'right' }}>
                      <Button
                        variant='contained'
                        sx={{ mb: 2.5, whiteSpace: 'nowrap' }}
                        onClick={() => {
                          handleClickOpen()
                          setDialogTitle('Add')
                          setSubmittedCheckbox(existingValues => ({
                            ...existingValues,
                            id: selectedCheckbox
                          }))
                        }}
                      >
                        Add Panel
                      </Button>
                      <Typography variant='body2'>Add Panel, if it doesn't exist.</Typography>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* THIS IS THE CREATE section */}
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Panel | ID ${submittedCheckbox.panel_id}`}
          </Typography>
          <Typography variant='body2'>Set Panel Judges</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
          <Box sx={{ my: 4 }}>
            <Typography variant='h4'>KHA Panel</Typography>
          </Box>
          {dialogTitle === 'Edit' && (
            <>
              <Divider></Divider>
              <Divider></Divider>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant='h6' sx={{ m: 1, width: '25ch' }}>
                  Answers Range
                </Typography>
                <TextField
                  label='First Entry'
                  id='outlined-start-adornment'
                  size='small'
                  type='number'
                  name='from'
                  value={answersRange.from}
                  onChange={handleDataChange}
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>From</InputAdornment>,
                    inputProps: { min: 1 }
                  }}
                />
                <TextField
                  label='Last Entry'
                  id='outlined-start-adornment'
                  size='small'
                  type='number'
                  name='to'
                  value={answersRange.to}
                  onChange={handleDataChange}
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>To</InputAdornment>
                  }}
                />
              </Box>
              <Divider></Divider>
              <Divider></Divider>
            </>
          )}
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ pl: '0 !important' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                        textTransform: 'capitalize',
                        '& svg': { ml: 1, cursor: 'pointer' }
                      }}
                    >
                      Judges List
                      <Tooltip
                        placement='top'
                        title='The judges that are not assigned are identified, and the number on the right is their panel ID if they are already assigned to a panel'
                      >
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='mdi:information-outline' fontSize='1rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All Remove'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllRemovedCheckbox}
                          indeterminate={isIndeterminateRemovedCheckbox}
                          checked={removedCheckbox.length === rolesArr.length * 3}
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {judge.map((i, index) => {
                  const id = i.id

                  return (
                    <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: theme => `${theme.palette.text.primary} !important`
                        }}
                      >
                        {i.name} | {i.panel_id === '0' ? 'Not Assigned' : i.panel_id}
                      </TableCell>

                      {i.panel_id !== submittedCheckbox.panel_id && (
                        <TableCell>
                          <FormControlLabel
                            label='Add'
                            control={
                              <Checkbox
                                size='small'
                                id={`${id}-read`}
                                onChange={() => togglePermission(`${id}`)}
                                checked={selectedCheckbox.includes(`${id}`)}
                              />
                            }
                          />
                        </TableCell>
                      )}

                      {i.panel_id === submittedCheckbox.panel_id && (
                        <TableCell>
                          <FormControlLabel
                            label='Remove'
                            control={
                              <Checkbox
                                size='small'
                                id={`${id}-remove`}
                                onChange={() => togglePermissionRemove(`${id}`)}
                                checked={removedCheckbox.includes(`${id}`)}
                              />
                            }
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
          <Box className='demo-space-x'>
            <Button size='large' type='submit' variant='contained' onClick={handleSubmit}>
              Submit
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Delete Panel ID | {deleteID.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this panel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Disagree</Button>
          <Button onClick={deletePanel} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} sx={{ mt: 20 }}>
        <Typography variant='h6' sx={{ ml: 5, pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}>
          Participants Answer List
        </Typography>
        <Divider></Divider>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
            <TableContainer component={Paper} sx={{ minWidth: 700, mt: 10 }}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Answer ID</StyledTableCell>
                    <StyledTableCell>User ID</StyledTableCell>
                    <StyledTableCell>Panel ID</StyledTableCell>
                    <StyledTableCell>Judge 1 Status</StyledTableCell>
                    <StyledTableCell>Judge 2 Status</StyledTableCell>
                    <StyledTableCell>Judge 3 Status</StyledTableCell>
                    <StyledTableCell>Final Validation</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {answersList?.map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{item.ansID}</StyledTableCell>
                      <StyledTableCell>{item.userID}</StyledTableCell>
                      <StyledTableCell>{item.pID}</StyledTableCell>
                      <StyledTableCell>{item.j1stat}</StyledTableCell>
                      <StyledTableCell>{item.j2stat}</StyledTableCell>
                      <StyledTableCell>{item.j3stat}</StyledTableCell>
                      <StyledTableCell>{item.finalValidation}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
