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
  nom_partenaire: "",
  contact_partenaire: "",
  adresse_partenaire: "",
  code_postale_partenaire: "",
  email_partenaire: "",
  telephone_partenaire: null
});

const changevaleurinputlivreur =(e)=>{
  console.log(e.target);
  setformlivreur({...formlivreur,[e.target.name]: e.target.value})
};

const creaDataLivreur = (e) => {
  console.log(e._id);
const url = 'http://localhost:8080/api/Livreurs';
  if (e._id !==undefined){      
   axios.put(url,e)
    .then((resp) => {    
      console.log(resp.data);
      handleClose();
      setformlivreur({
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
      
      setformlivreur({
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

  //recupere donnee en base

  const [datalivreurs, setdatalivreurs] = React.useState([{
    nom_partenaire: "fabrice 2",
    contact_partenaire: "test partenaire2",
    adresse_partenaire: "25, deux rive2",
    code_postale_partenaire: "820002",
    email_partenaire: "faben@gmail.com",
    telephone_partenaire: 252541224422
}]);

const recupDatalivreurs = () => {
  const url = 'http://localhost:8080/api/livreurs';
  axios.get(url)
    .then((resp) => {    
      console.log(resp.data);
      setdatalivreurs(resp.data)
    })
    .catch((error) => {
      console.log(error);
    });
};
React.useEffect(recupDatalivreurs,[]);


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
                        {datalivreurs.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="center"><Button variant="contained" className={classes.margin_10px} >Modifier</Button><Button variant="contained" color="secondary" className={classes.margin_10px}>Supprimer</Button></StyledTableCell>
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
                            <TextField  label="Nom entreprise" name="nom_partenaire" variant="outlined" fullWidth value={formlivreur.nom_partenaire} onChange={changevaleurinputlivreur} />
                          </Grid>
                          <Grid xs>
                          <TextField  label="Contact" name="contact_partenaire" variant="outlined" fullWidth value={formlivreur.contact_partenaire} onChange={changevaleurinputlivreur} />
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                              <TextField  label="Adresse" name="adresse_partenaire" variant="outlined" fullWidth value={formlivreur.adresse_partenaire} onChange={changevaleurinputlivreur}/>
                          </Grid>
                          <Grid xs >
                              <TextField  label="Code Postal" name="code_postale_partenaire" variant="outlined" fullWidth value={formlivreur.code_postale_partenaire} onChange={changevaleurinputlivreur} />  
                          </Grid>
                        </Grid>
                        <Grid container className={classes.padding_20px}>
                          <Grid xs>
                            <TextField  label="Telephone" name="telephone_partenaire" variant="outlined" fullWidth value={formlivreur.telephone_partenaire} onChange={changevaleurinputlivreur} /> 
                          </Grid>
                          <Grid xs>
                            <TextField  label="Email" name="email_partenaire" variant="outlined" fullWidth value={formlivreur.email_partenaire} onChange={changevaleurinputlivreur} /> 
                          </Grid>
                        </Grid>
                        <Grid xs={11} item container justify="flex-end" className={classes.padding_20px}>
                        <Button color="primary" variant="contained" onClick={()=>{handleClose(); setformlivreur({
                                                                                  nom_partenaire: "",
                                                                                  contact_partenaire: "",
                                                                                  adresse_partenaire: "",
                                                                                  code_postale_partenaire: "",
                                                                                  email_partenaire: "",
                                                                                  telephone_partenaire: null
                                                                                }) ;}} className={classes.margin_10px}>
                              Annulé
                          </Button>
                          <Button color="primary" variant="contained" onClick={()=>{}} className={classes.margin_10px}>
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