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
  margin_10px:{
    margin:'10px',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Produits() {

///gestion modal
  const classes = useStyles();    
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };   


///recupere donnee en base

const [dataproduits, setdataproduits] = React.useState([{
  nom_produits: "",
  longeur_produits: null,
  largeur_produits: null,
  hauteur_produits:null,
  poids_produits: null
  }]);

const recupDataProduits = () => {
  const url = ' http://82.165.56.203/api/produits';
  axios.get(url)
    .then((resp) => {    
      console.log(resp.data);
      setdataproduits(resp.data)
    })
    .catch((error) => {
      console.log(error);
    });
};
React.useEffect(recupDataProduits,[]);

//supprime produits en base de donneé

const supDataProduits = (id) => {
  const url = ` http://82.165.56.203/api/produits/${id}`;
  console.log(id);
  axios.delete(url)
    .then((resp) => {    
      console.log(resp.data);
      recupDataProduits();  
      setformproduits({
        nom_produits: "",
        longeur_produits: "",
        largeur_produits: "",
        hauteur_produits: "",
        poids_produits: "",
      });    
    })
    .catch((error) => {
      console.log(error);
    });
};

// creation produit en base de donnee

const [formproduits, setformproduits] = React.useState({
  nom_produits: "",
  longeur_produits: "",
  largeur_produits: "",
  hauteur_produits: "",
  poids_produits: "",
});

const creaDataProduits = (e) => {
  console.log(e._id);
const url = ' http://82.165.56.203/api/produits';
  if (e._id !==undefined){  
    console.log("diferent indefinei");
   axios.put(url,e)
    .then((resp) => {    
      console.log(resp.data);
      handleClose();
      recupDataProduits();   
      setformproduits({
        nom_produits: "",
        longeur_produits: "",
        largeur_produits: "",
        hauteur_produits: "",
        poids_produits: "",
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
      recupDataProduits();   
      setformproduits({
        nom_produits: "",
        longeur_produits: "",
        largeur_produits: "",
        hauteur_produits: "",
        poids_produits: "",
      })   
    })
    .catch((error) => {
      console.log(error);
    });}
};

const changevaleurinputproduits =(e)=>{
  console.log(e.target);
  setformproduits({...formproduits,[e.target.name]: e.target.value})
};

//modification donnee en base de donnee

const modifproduits =(e)=>{
  setformproduits(e);
  handleOpen();

};

    return (
        <Grid container justify="space-around">
            <Grid item >
                <TableContainer component={Paper}xs={10}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom produits</StyledTableCell>
                            <StyledTableCell align="right">longeurs (cm)</StyledTableCell>
                            <StyledTableCell align="right">Largeurs (cm)</StyledTableCell>
                            <StyledTableCell align="right">Hauteurs (cm)</StyledTableCell>
                            <StyledTableCell align="right">Poids (Kg)</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataproduits.map((row) => (
                            <StyledTableRow >
                            <StyledTableCell component="th" scope="row">{row.nom_produits}</StyledTableCell>
                            <StyledTableCell align="right">{row.longeur_produits}</StyledTableCell>
                            <StyledTableCell align="right">{row.largeur_produits}</StyledTableCell>
                            <StyledTableCell align="right">{row.hauteur_produits}</StyledTableCell>
                            <StyledTableCell align="right">{row.poids_produits}</StyledTableCell>
                            <StyledTableCell align="center"><Button className={classes.margin_10px} variant="contained" onClick={()=>{modifproduits(row)}} >Modifier</Button><Button className={classes.margin_10px} variant="contained" color="secondary" onClick={()=>{supDataProduits(row._id)}} >Supprimer</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs alignItems="center">
                <Button color="primary" variant="contained" className={classes.margin_10px} onClick={handleOpen}>Nouveaux</Button>
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
                }}>
                  
                <Fade in={open}>
                <Grid container xs={8} justify="center" className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid item className={classes.padding_20px}>
                          <TextField  label="Nom Produit" variant="outlined" fullWidth value={formproduits.nom_produits} name="nom_produits" onChange={changevaleurinputproduits}/>  
                        </Grid>
                        <Grid item container>
                            <TextField  label="Longeur" variant="outlined" name="longeur_produits" value={formproduits.longeur_produits}  onChange={changevaleurinputproduits}/>  
                            <TextField  label="Largeur" variant="outlined" name="largeur_produits"  value={formproduits.largeur_produits} onChange={changevaleurinputproduits}/>  
                            <TextField  label="Hauteur" variant="outlined" name="hauteur_produits"  value={formproduits.hauteur_produits} onChange={changevaleurinputproduits}/>  
                            <TextField  label="Poids" variant="outlined" name="poids_produits" value={formproduits.poids_produits}  onChange={changevaleurinputproduits}/>  
                        </Grid>
                        <Grid xs={11} item container justify="flex-end" className={classes.padding_20px}>
                        <Button color="primary" variant="contained" onClick={()=>{handleClose(); setformproduits({
                                                                                nom_produits: "",
                                                                                longeur_produits: "",
                                                                                largeur_produits: "",
                                                                                hauteur_produits: "",
                                                                                poids_produits: "",
                                                                              });}} className={classes.margin_10px}>
                            Annuler
                        </Button>
                        <Button color="primary" variant="contained" onClick={()=>{creaDataProduits(formproduits)}} className={classes.margin_10px}>
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

export default Produits
