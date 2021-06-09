import React from 'react';
import {Container,Grid,Stepper,Step,StepLabel,Typography,Button,TableContainer,Table, TableHead,TableRow,TableCell,TableBody, Modal, Fade,Backdrop} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DevisMagazin from './DevisMagazin';
import ConnexionsMagazin from './ConnexionsMagazin';
import axios from 'axios';

function Magazin() {
// eslint-disable-next-line no-unused-vars
const [activeStep, setActiveStep] = React.useState(0);

////style 
const useStyles = makeStyles((theme) => ({
    couleurFond:{
        backgroundColor:'rgb(51, 53, 68)',
        color:'rgb(255 255 255)',
        
    },
    border_raduis:{
        borderRadius:'5px',
    },
    logo:{
        height:'150px',
        width:'80%',
        backgroundColor:'rgb(255 255 255)', 
        color:'rgb(0 0 0 )',       
    },
    margin_10px:{
        margin:'10px'
    },

    couleurfondjaune:{
        backgroundColor:'rgb(240, 177, 38)',
    },
    height_100:{
        
    },
    maps:{
        height:'250px',
        width:'95%',
        backgroundColor:'rgb(255 255 255)', 
        color:'rgb(0 0 0 )'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },

}));

const classes = useStyles();
////

  ////gestion modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /// recupere donnee partenaire/magazin

  const [datamagazin, setdatamagazin] = React.useState([{
    expediteur: {
        id_Expediteur: "",
        contact: "",
        adresse: "",
        code_postale: "",
        email: "",
        telephone: "",
        commentaire: ""
    },
    destinataire: {
        contact: "",
        adresse: "",
        code_postale: "",
        email: "",
        telephone: "",
        commentaire: ""
    },
    reference_colis: {
        etat: {
            livraison: "",
            payement: ""
        },
        numero: "",
        date_enregistrement: "",
        date_livraisons: "",
        types: "",
        commentaire: ""
    },
    _id: "",
    __v: 0
}]);
//recupere info partnaire 
const [infoPartanire, setinfoPartanire] = React.useState({})

const recupInfoPartenaire = () => {     
    const tokenpart = localStorage.getItem('transportali')
    axios.get(`  http://localhost:8080/api/partenaires/${tokenpart}`)
    .then((e)=>{ setinfoPartanire(e.data[0]);  })
    .catch((e)=>{console.log(e)})}
    React.useEffect(recupInfoPartenaire,[infoPartanire]);


/////

const recupDataPartenaire = () => {     
const tokenpart = localStorage.getItem('transportali')
axios.get('  http://localhost:8080/api/partenaires/commande',{ params: {tokenpart} })
.then((e)=>{ setdatamagazin(e.data);  })
.catch((e)=>{console.log(e)})}
React.useEffect(recupDataPartenaire,[datamagazin])

  /// state connexion et verification 

  const [connecter, setConnecter] = React.useState(false);

///fonction connexion axios 

const connexion = (el)=>{
    console.log(el);
    axios.post('  http://localhost:8080/api/partenaires/connexion',el)
    .then((e)=>{
        localStorage.setItem('transportali', e.data.token)
        setConnecter(true);
    })
    .catch((e)=>{console.log(e)})
};

const checkconexion = () =>{
   const  localtoken = localStorage.getItem('transportali')
    if(localtoken === undefined){
       return  setConnecter(false);        
        }

        axios.put('  http://localhost:8080/api/partenaires/connexion',{token:localtoken})
        .then((e)=>{
            if (!e.data.etat){
            localStorage.removeItem('transportali')
            setConnecter(false);
            
        }else{
            setConnecter(true);
            
        }})
        .catch((e)=>{console.log(e)})

    }
    React.useEffect(checkconexion ,[]);

    ////fonction state selection devis client 

    const [selecdata, setselecdata] = React.useState({
        expediteur: {
            id_Expediteur: "",
            contact: "",
            adresse: "",
            code_postale: "",
            email: "",
            telephone: "",
            commentaire: ""
        },
        destinataire: {
            contact: "",
            adresse: "",
            code_postale: "",
            email: "",
            telephone: "",
            commentaire: ""
        },
        reference_colis: {
            etat: {
                livraison: "",
                payement: ""
            },
            numero: "",
            date_enregistrement: "",
            date_livraisons: "",
            types: "",
            commentaire: ""
        },
        _id: "",
        __v: 0
    })

    const selectdata = (e)=>{
        setselecdata(e);
        console.log(e);
    }

    return (

      <>
      {connecter ? 
        <Container maxWidth={false} disableGutters>
            <Grid container>
                 {/*parti infomation gauche */ }
                <Grid xs={3} item container justify="center" alignItems="center" direction="column" className={`${classes.couleurFond} ${classes.border_raduis} ${classes.height_100} `}>
                    
                    <Grid className={`${classes.logo} ${classes.margin_10px}`}>
                        logo DMST
                    </Grid>
                    <Typography>
                     Coordonnées Clients :
                    </Typography>
                    <Typography>
                      {selecdata.destinataire.contact}
                    </Typography>
                    <Typography>
                    {selecdata.destinataire.adresse} 
                    </Typography>
                    <Typography>
                    {selecdata.destinataire.code_postale}
                    </Typography>
                    <Typography>
                     TEL: {selecdata.destinataire.telephone}
                    </Typography>
                    <Stepper activeStep={activeStep} orientation="vertical" className={`${classes.border_raduis} ${classes.margin_10px}`}>
                        <Step key={1}>
                            <StepLabel>En attente</StepLabel>
                        </Step>
                        <Step key={2}>
                            <StepLabel>En cour de livraison</StepLabel>
                        </Step>
                        <Step key={3}>
                            <StepLabel>livraison terminee</StepLabel>
                        </Step>
                    </Stepper>
                    <Typography>
                     Coordonnées livreur :
                    </Typography>
                    <Typography>
                        Fabrice DENNEMONT
                    </Typography>
                    <Typography>
                        Tel: 0102030405
                    </Typography>
                    <Grid item  className={`${classes.maps} ${classes.border_raduis} ${classes.margin_10px}`}>
                        carte maps 
                    </Grid>
                
                </Grid>
                
                
                {/*parti tableau */ }
                <Grid item  xs={6}  container  alignItems="center" direction="column">
                    <Typography>
                        Resumer livraison  
                    </Typography>
                <TableContainer >
                    <Table >
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Nom Clients</TableCell>
                            <TableCell align="center">Colis</TableCell>
                            <TableCell align="center">Ville</TableCell>
                            <TableCell align="center">Etat</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {datamagazin.map((row) => (
                            <TableRow key={row.name} onClick={(e)=>selectdata(row)}>
                            <TableCell component="th" scope="row">
                                {row.destinataire.contact}
                            </TableCell>
                            <TableCell align="center">{row.reference_colis.commentaire}</TableCell>
                            <TableCell align="center">{row.destinataire.code_postale}</TableCell>
                            <TableCell align="center">{row.reference_colis.etat.livraison}</TableCell>                            
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                {/*parti commande droit */ }
                <Grid item xs={3} container  justify="flex-start" alignItems="center"  direction="column" className={`${classes.couleurfondjaune} ${classes.border_raduis} `}>
                    <Grid className={`${classes.logo} ${classes.margin_10px}`}>
                        logo
                    </Grid>
                    <Grid item>
                        <Typography>
                         {infoPartanire.nom_partenaire}
                        </Typography>
                        <Typography>
                        {infoPartanire.adresse_partenaire}
                        </Typography>
                        <Typography>
                        {infoPartanire.telephone_partenaire}
                        </Typography>
                    </Grid>
                    <Button variant="contained" onClick={handleOpen}>nouvelle demande</Button>
                    <Grid className={`${classes.maps} ${classes.border_raduis} ${classes.margin_10px}`}>
                    liste colis client ???
                    </Grid>
                </Grid>

            </Grid>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
             <DevisMagazin handleClose={handleClose} recupDataPartenaire={recupDataPartenaire}></DevisMagazin>
                </Fade>
            </Modal>
        </Container> : 
        <ConnexionsMagazin connexion={connexion} ></ConnexionsMagazin>}

        </>
    )
};

export default Magazin
