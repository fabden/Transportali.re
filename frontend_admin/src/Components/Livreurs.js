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
import axios from 'axios';

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

function Livreurs() {

   const classes = useStyles();    
   const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };   

  // creation livreur en base de donnee

const [formlivreur, setformlivreur] = React.useState({
  nom_livreur: "",
  email_livreur: "",
  telephone_livreur: null
});

const changevaleurinputlivreur =(e)=>{
  console.log(e.target);
  setformlivreur({...formlivreur,[e.target.name]: e.target.value})
};

const creaDataLivreur = (e) => {
  console.log(e._id);
const url = 'http://localhost:8080/api/livreurs';
  if (e._id !==undefined){      
   axios.put(url,e)
    .then((resp) => {    
      console.log(resp.data);
      handleClose();
      recupDatalivreurs();
      setformlivreur({
        nom_livreur: "",
        email_livreur: "",
        telephone_livreur: null
      })   
    })
    .catch((error) => {
      console.log(error);
    });
  } else {
  axios.post(url,e)
    .then((resp) => {    
      console.log(resp.data);
      handleClose();
      recupDatalivreurs();
      setformlivreur({
        nom_livreur: "",
        email_livreur: "",
        telephone_livreur: null
      })   
    })
    .catch((error) => {
      console.log(error);
    });}
};

  //recupere donnee en base

  const [datalivreurs, setdatalivreurs] = React.useState([{
    nom_livreur: "",
    email_livreur: "",
    telephone_livreur: null
}]);

const recupDatalivreurs = () => {
  const url = 'http://localhost:8080/api/livreurs';
  axios.get(url)
    .then((resp) => {    
      setdatalivreurs(resp.data)
    })
    .catch((error) => {
      console.log(error);
    });
};
React.useEffect(recupDatalivreurs,[]);

//supprime Livreurs en base de donneé

const supDataLivreurs = (id) => {
  const url = 'http://localhost:8080/api/livreurs';
  console.log(id);
  axios.delete(url,{params: {id: id}})
    .then((resp) => {    
      console.log(resp.data);
      recupDatalivreurs();   
      setformlivreur({
        nom_livreur: "",
        email_livreur: "",
        telephone_livreur: null
      })   
    })
    .catch((error) => {
      console.log(error);
    });
};

//modification donnee en base de donnee

const modifLivreurs =(e)=>{
  setformlivreur(e);
  handleOpen();
}


    return (
        <Grid container justify="space-around">
            <Grid item >
                <TableContainer component={Paper}xs={10}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom livreur</StyledTableCell>
                            <StyledTableCell align="right">Tel</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                          {console.log(datalivreurs)}
                        {datalivreurs.map((row) => (
                            <StyledTableRow>
                              <StyledTableCell component="th" scope="row">{row.nom_livreur}</StyledTableCell>
                              <StyledTableCell align="right">{row.telephone_livreur}</StyledTableCell>
                              <StyledTableCell align="right">{row.email_livreur}</StyledTableCell>
                              <StyledTableCell align="center"><Button variant="contained" className={classes.margin_10px} onClick={()=>{modifLivreurs(row)} } >Modifier</Button><Button variant="contained" color="secondary" className={classes.margin_10px} onClick={()=>{supDataLivreurs(row._id)}}>Supprimer</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs alignItems="center">
                <Button color="primary" variant="contained" onClick={handleOpen}className={classes.margin_10px} >Nouveaux</Button>
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
                <Grid  xs={6} justify="center" className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Nom entreprise" name="nom_livreur" variant="outlined" fullWidth value={formlivreur.nom_livreur} onChange={changevaleurinputlivreur} />
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Telephone" name="telephone_livreur" variant="outlined" fullWidth value={formlivreur.telephone_livreur} onChange={changevaleurinputlivreur} /> 
                          </Grid>
                          <Grid xs>
                            <TextField  label="Email" name="email_livreur" variant="outlined" fullWidth value={formlivreur.email_livreur} onChange={changevaleurinputlivreur} /> 
                          </Grid>
                        </Grid>
                        <Grid xs={11} item container justify="flex-end" className={classes.padding_20px}>
                        <Button color="primary" variant="contained" onClick={()=>{handleClose(); setformlivreur({
                                                                                  nom_livreur: "",
                                                                                  email_livreur: "",
                                                                                  telephone_livreur: null
                                                                                }) ;}} className={classes.margin_10px}>
                              Annulé
                          </Button>
                          <Button color="primary" variant="contained" onClick={()=>{creaDataLivreur(formlivreur)}} className={classes.margin_10px}>
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

export default Livreurs