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

function Parteniares() {

   const classes = useStyles();    
   const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };   

  //recupere donnee en base

  const [datapartenaires, setdatapartenaires] = React.useState([{
    nom_partenaire: "fabrice 2",
    contact_partenaire: "test partenaire2",
    adresse_partenaire: "25, deux rive2",
    code_postale_partenaire: "820002",
    email_partenaire: "faben@gmail.com",
    telephone_partenaire: 252541224422
}]);

const recupDataPartenaires = () => {
  const url = 'http://localhost:8080/api/partenaires';
  axios.get(url)
    .then((resp) => {    
      console.log(resp.data);
      setdatapartenaires(resp.data)
    })
    .catch((error) => {
      console.log(error);
    });
};
React.useEffect(recupDataPartenaires,[]);

// creation partenaire en base de donnee

const [formpartenaire, setformpartenaire] = React.useState({
  nom_partenaire: "",
  contact_partenaire: "",
  adresse_partenaire: "",
  code_postale_partenaire: "",
  email_partenaire: "",
  telephone_partenaire: null
});

const changevaleurinputpartenaire =(e)=>{
  console.log(e.target);
  setformpartenaire({...formpartenaire,[e.target.name]: e.target.value})
};

const creaDataPartenaires = (e) => {
  console.log(e._id);
const url = 'http://localhost:8080/api/partenaires';
  if (e._id !==undefined){      
   axios.put(url,e)
    .then((resp) => {    
      console.log(resp.data);
      handleClose();
      recupDataPartenaires();   
      setformpartenaire({
        nom_partenaire: "",
        contact_partenaire: "",
        adresse_partenaire: "",
        code_postale_partenaire: "",
        email_partenaire: "",
        telephone_partenaire: null
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
      recupDataPartenaires();   
      setformpartenaire({
        nom_partenaire: "",
        contact_partenaire: "",
        adresse_partenaire: "",
        code_postale_partenaire: "",
        email_partenaire: "",
        telephone_partenaire: null
      })   
    })
    .catch((error) => {
      console.log(error);
    });}
};

//supprime produits en base de donneé

const supDataPartenaire = (id) => {
  const url = 'http://localhost:8080/api/partenaires';
  console.log(id);
  axios.delete(url,{params: {id: id}})
    .then((resp) => {    
      console.log(resp.data);
      recupDataPartenaires();   
      setformpartenaire({
        nom_partenaire: "",
        contact_partenaire: "",
        adresse_partenaire: "",
        code_postale_partenaire: "",
        email_partenaire: "",
        telephone_partenaire: null
      })   
    })
    .catch((error) => {
      console.log(error);
    });
};

//modification donnee en base de donnee

const modifpartenaires =(e)=>{
  setformpartenaire(e);
  handleOpen();

};

    return (
        <Grid container justify="space-around">
            <Grid item >
                <TableContainer component={Paper}xs={10}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom Entreprise</StyledTableCell>
                            <StyledTableCell align="right">Contact</StyledTableCell>
                            <StyledTableCell align="right">Adresse</StyledTableCell>
                            <StyledTableCell align="right">Code postale</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Telephone</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {datapartenaires.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.nom_partenaire}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.contact_partenaire}</StyledTableCell>
                            <StyledTableCell align="right">{row.adresse_partenaire}</StyledTableCell>
                            <StyledTableCell align="right">{row.code_postale_partenaire}</StyledTableCell>
                            <StyledTableCell align="right">{row.email_partenaire}</StyledTableCell>
                            <StyledTableCell align="right">{row.telephone_partenaire}</StyledTableCell>
                            <StyledTableCell align="center"><Button className={classes.margin_10px} variant="contained" onClick={()=>{modifpartenaires(row)} } >Modifier</Button><Button className={classes.margin_10px} variant="contained" color="secondary" onClick={()=>{supDataPartenaire(row._id)}}  >Supprimer</Button></StyledTableCell>
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
                            <TextField  label="Nom entreprise" name="nom_partenaire" variant="outlined" fullWidth value={formpartenaire.nom_partenaire} onChange={changevaleurinputpartenaire} />
                          </Grid>
                          <Grid xs>
                          <TextField  label="Contact" name="contact_partenaire" variant="outlined" fullWidth value={formpartenaire.contact_partenaire} onChange={changevaleurinputpartenaire} />
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                              <TextField  label="Adresse" name="adresse_partenaire" variant="outlined" fullWidth value={formpartenaire.adresse_partenaire} onChange={changevaleurinputpartenaire}/>
                          </Grid>
                          <Grid xs >
                              <TextField  label="Code Postal" name="code_postale_partenaire" variant="outlined" fullWidth value={formpartenaire.code_postale_partenaire} onChange={changevaleurinputpartenaire} />  
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Telephone" name="telephone_partenaire" variant="outlined" fullWidth value={formpartenaire.telephone_partenaire} onChange={changevaleurinputpartenaire} /> 
                          </Grid>
                          <Grid xs>
                            <TextField  label="Email" name="email_partenaire" variant="outlined" fullWidth value={formpartenaire.email_partenaire} onChange={changevaleurinputpartenaire} /> 
                          </Grid>
                        </Grid>
                        <Grid xs={11} item container justify="flex-end" className={classes.padding_20px}>
                        <Button color="primary" variant="contained" onClick={()=>{handleClose(); setformpartenaire({
                                                                                  nom_partenaire: "",
                                                                                  contact_partenaire: "",
                                                                                  adresse_partenaire: "",
                                                                                  code_postale_partenaire: "",
                                                                                  email_partenaire: "",
                                                                                  telephone_partenaire: null
                                                                                }) ;}} className={classes.margin_10px}>
                              Annulé
                          </Button>
                          <Button color="primary" variant="contained" onClick={()=>{creaDataPartenaires(formpartenaire)}} className={classes.margin_10px}>
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
