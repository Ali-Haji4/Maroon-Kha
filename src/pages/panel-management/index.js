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
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'

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
  const [currentPanelID, setCurrentPanelID] = useState()

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
  const [judgeName, setJudgeName] = useState([])

  // ** Hooks
  const ability = useContext(AbilityContext)

  const urlPanels = 'http://localhost/reactProject/maroonTest/panelList.php'
  const urlJudge = 'http://localhost/reactProject/maroonTest/judgesList.php'
  const [panel, setPanel] = React.useState([{}])
  const [judge, setJudge] = React.useState([{}])
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
  }, [panel])

  function deletePanel(id) {
    //This deletes the whole panel
    console.log('delete ID is ' + id)
    setDeleteID((deleteID.id = id))
    console.log(deleteID)
    axios.post('http://localhost/reactProject/maroonTest/deletePanel.php', deleteID).then(res => console.log(res.data))

    //This removes the panel id from all the judges that were assigned to the deleted panel
    alert('Panel Deleted Succesfully')
    window.location.reload(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
  }

  const handleSubmit = () => {
    if (dialogTitle === 'Add') {
      console.log('Beginning submission')
      setSubmittedCheckbox((submittedCheckbox.id = selectedCheckbox))
      console.log(submittedCheckbox)

      axios
        .post('http://localhost/reactProject/maroonTest/insertPanel.php', submittedCheckbox)
        .then(res => console.log(res.data))

      console.log('Title:' + dialogTitle)
    } else if (dialogTitle === 'Edit') {
      console.log('Beginning submission')

      setSubmittedCheckbox((submittedCheckbox.id = selectedCheckbox))

      // setSubmittedCheckbox(((submittedCheckbox = selectedCheckbox), (submittedCheckbox.panel_id = currentPanelID)))
      console.log(submittedCheckbox)

      axios
        .post('http://localhost/reactProject/maroonTest/updatePanel.php', submittedCheckbox)
        .then(res => console.log(res.data))
      console.log('Current panel ID:' + currentPanelID + ' Title:' + dialogTitle + ' Checkbox ' + submittedCheckbox.id)
      console.log()
    } else {
      console.log('ERROR 404')
    }

    setOpen(false)
    setSelectedCheckbox([])
    setIsIndeterminateCheckbox(false)
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
            <CardHeader title='Segmentation' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>
                As there are two competitions, each of them has a seperate panel viewing and management section
              </Typography>
              <Typography sx={{ color: 'error.main' }}>
                Ensure selecting the appropriate competition when working with panels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Youth Award Panels' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <Divider></Divider>
          <Grid container spacing={6} className='match-height' sx={{ mt: '2px' }}>
            {panel?.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body2'>Panel {index + 1}</Typography>
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
                          }}
                        >
                          Edit Panel
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <IconButton size='small' onClick={() => deletePanel(item.id)} sx={{ color: 'text.primary' }}>
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
          <CardHeader
            title='Panel Management (Youth Award)'
            sx={{ mt: 10, pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
          />
          <Divider></Divider>
          <Button
            variant='contained'
            type='button'
            sx={{ ml: '20px', mt: '30px', mb: '30px' }}
            onClick={handleClickOpen}
          >
            Create Panel
          </Button>

          <h4> {submittedCheckbox.id}</h4>
          <h4> {selectedCheckbox}</h4>
          <h4>Current Panel_id: {submittedCheckbox.panel_id}</h4>
        </Card>
      </Grid>
      {/* THIS IS THE CREATE section */}
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant='h5' component='span'>
            {`${dialogTitle} Panel`}
          </Typography>
          <Typography variant='body2'>Set Panel Judges</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
          <Box sx={{ my: 4 }}>
            <Typography variant='h4'>Youth Award</Typography>
          </Box>

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
                      Unassigned Judges
                      <Tooltip placement='top' title='These are the judges that are not assigned with a panel yet'>
                        <Box sx={{ display: 'flex' }}>
                          <Icon icon='mdi:information-outline' fontSize='1rem' />
                        </Box>
                      </Tooltip>
                    </Box>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControlLabel
                      label='Select All'
                      sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      control={
                        <Checkbox
                          size='small'
                          onChange={handleSelectAllCheckbox}
                          indeterminate={isIndeterminateCheckbox}
                          checked={selectedCheckbox.length === rolesArr.length * 3}
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
                        {i.name}
                      </TableCell>
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
    </Grid>
  )
}
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
