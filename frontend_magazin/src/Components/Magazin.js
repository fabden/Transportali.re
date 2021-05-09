import React from 'react'
import {Container,Grid,Stepper,Step,StepLabel,Typography,Button,TableContainer,Table, TableHead,TableRow,TableCell,TableBody,Paper, Modal, Fade,Backdrop} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function Magazin() {
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
        height:'95vh',
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
const rows = [
    createData('Fabrice DENNEMONT', "Canapé 2 place", "St Benois", "En cours"),
    createData('Toto le Hero', "lit 2 place", "St suzanne", "En cours"),
    createData('Sandra Vallon', "table", "St Benois", "Terminé"),
    createData('Fabrice DENNEMONT', "television", "St Paul", "En Attent"),
    
  ];

  ////gestion modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  ///
    return (

      

        
        <Container maxWidth={false} disableGutters>
            <Grid container>
                 {/*parti infomation gauche */ }
                <Grid xs item container justify="center" alignItems="center" direction="column" className={`${classes.couleurFond} ${classes.border_raduis} ${classes.height_100} `}>
                    
                    <Grid className={`${classes.logo} ${classes.margin_10px}`}>
                        logo DMST
                    </Grid>
                    
                    <Typography>
                     Coordonnées Clients :
                    </Typography>
                    <Typography>
                      Mme intel
                    </Typography>
                    <Typography>
                     12 chemin  de coux, 97441
                    </Typography>
                    <Typography>
                     tel: 01020304
                    </Typography>
                    <Stepper activeStep={activeStep} orientation="vertical" className={`${classes.border_raduis} ${classes.margin_10px}`}>
                        <Step key={1}>
                            <StepLabel>En attente</StepLabel>
                        </Step>
                        <Step key={2}>
                            <StepLabel>En courde livraison</StepLabel>
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
                    <Grid item className={`${classes.maps} ${classes.border_raduis}`}>
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
                            <TableCell align="center">nom</TableCell>
                            <TableCell align="center">colis</TableCell>
                            <TableCell align="center">ville</TableCell>
                            <TableCell align="center">etat</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.calories}</TableCell>
                            <TableCell align="center">{row.fat}</TableCell>
                            <TableCell align="center">{row.carbs}</TableCell>                            
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                {/*parti commande droit */ }
                <Grid item xs container  justify="flex-start" alignItems="center"  direction="column" className={`${classes.couleurfondjaune} ${classes.border_raduis} `}>
                    <Grid className={`${classes.logo} ${classes.margin_10px}`}>
                        logo
                    </Grid>
                    <Grid item>
                        <Typography>
                            Ravate st denis 
                        </Typography>
                        <Typography>
                            235 chemin le port,97441
                        </Typography>
                        <Typography>
                            0102030405
                        </Typography>
                    </Grid>
                    <Button variant="contained" onClick={handleOpen}>nouvelle demande</Button>
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
                <div className={classes.paper}>
                    <h2 id="spring-modal-title">Spring modal</h2>
                    <p id="spring-modal-description">react-spring animates me.</p>
                </div>
                </Fade>
            </Modal>
        </Container>
    )
};

export default Magazin
