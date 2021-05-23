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
  nom_produits: "pp333333pp22rod4444uits",
  longeur_produits: 1325444,
  largeur_produits: 231444,
  hauteur_produits:45,
  poids_produits: 2315444
  }]);

const recupDataProduits = () => {
  const url = 'http://localhost:8080/api/produits';
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
  const url = 'http://localhost:8080/api/produits';
  console.log(id);
  axios.delete(url,{params: {id: id}})
    .then((resp) => {    
      console.log(resp.data);
      recupDataProduits();      
    })
    .catch((error) => {
      console.log(error);
    });
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
                            <StyledTableCell align="center"><Button variant="contained" >Modifier</Button><Button variant="contained" color="secondary" onClick={()=>{supDataProduits(row._id)}} >Supprimer</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs alignItems="center">
                <Button color="primary" variant="contained" onClick={handleOpen}>Nouveaux</Button>
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
                <Grid container xs={6} justify="center" className={classes.paper}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid item className={classes.padding_20px}>
                          <TextField  label="Nom Produit" variant="outlined" fullWidth  />  
                        </Grid>
                        <Grid item container>
                            <TextField  label="Longeur" variant="outlined" />  
                            <TextField  label="Largeur" variant="outlined" />  
                            <TextField  label="Hauteur" variant="outlined" />  
                            <TextField  label="Poids" variant="outlined" />  
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

export default Produits
