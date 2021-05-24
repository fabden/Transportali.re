import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Fade, Grid, Modal, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen fabrice', 159, 6.0, 24, 4.0),
 
];

const useStyles = makeStyles((theme) => ({
  table: {
      width:'65vw',
  },
  modal: {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  padding_20px:{
      padding:'20px 0 20px 0 ',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin_10px:{
    margin:'10px',
  },
}));

function Parteniares() {

   const classes = useStyles();    
   const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };   

    return (
        <Grid container justify="space-around">
            <Grid item >
                <TableContainer component={Paper}xs={10}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom Entreprise</StyledTableCell>
                            <StyledTableCell align="right">Adresse</StyledTableCell>
                            <StyledTableCell align="right">Code postale</StyledTableCell>
                            <StyledTableCell align="right">Tel</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="center"><Button className={classes.margin_10px} variant="contained" >Modifier</Button><Button className={classes.margin_10px} variant="contained" color="secondary">Supprimer</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs alignItems="center">
                <Button color="primary" variant="contained" onClick={handleOpen} className={classes.margin_10px}>Nouveaux</Button>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 50,
                }}
            >
                <Fade in={open}>
                <Grid xs={8} justify="center" className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Nom entreprise" variant="outlined" fullWidth  />
                          </Grid>
                          <Grid xs>
                          <TextField  label="Contact" variant="outlined" fullWidth  />
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                              <TextField  label="Adresse" variant="outlined" fullWidth />
                          </Grid>
                          <Grid xs >
                              <TextField  label="Code Postal" variant="outlined" fullWidth  />  
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Telephone" variant="outlined" fullWidth  /> 
                          </Grid>
                          <Grid xs>
                            <TextField  label="Email" variant="outlined" fullWidth  /> 
                          </Grid>
                        </Grid>
                        <Grid xs={11} item container justify="flex-end" className={classes.padding_20px}>
                        <Button color="primary" variant="contained" onClick={()=>{}}>
                              Annulé
                          </Button>
                          <Button color="primary" variant="contained" onClick={()=>{}}>
                              Valider
                          </Button>
                        </Grid>
                    </form>
                </Grid>
                </Fade>
            </Modal>
        </Grid>
    );
}

export default Parteniares
