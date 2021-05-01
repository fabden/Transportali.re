import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../Asset/1280.jpg';


const useStyles = makeStyles({

    couleurFond:{
        backgroundColor:'rgb(51, 68, 99, 92%)',
        margin:'15px 0 10px 0',
        
    
        
},
    couleurFondu:{
        backgroundColor:'rgb(100%, 100%, 100%, 5%)',
        borderRadius:"10px",
        color:'rgb(255 255 255)',
        margin: '15px',
        padding:'5px',
    },
    image:{
        backgroundImage:`url(${image})`,
        backgroundRepeat:'no-repeat', 
        backgroundPosition:'center',
        backgroundSize:'cover',
    },

});

function Metier() {

    const classes = useStyles();


    return (
    <Container maxWidth disableGutters className={classes.image}>
        <Grid container   direction="row" justify="space-evenly" alignItems="baseline" className={classes.couleurFond}>
            <Grid xs={12} sm={5} md={2} item container   direction="column" justify="center" alignItems="center" className={classes.couleurFondu}>
                icone
                <br></br>
                <Typography variant="h5" align='center'>
                <br></br>
                 Demenagement Residense
                </Typography>
                <br></br>
                <Typography align='center'>
                Nous offrons du matériel d'emballage, des instructions d'emballage et des conseils ainsi que de la main-d'œuvre et du soutien pour rendre votre déménagement efficace et sans stress.
                </Typography>
            </Grid>
            <Grid xs={12} sm={5} md={2} item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
                icone
                <Typography variant="h5" align='center'>
                <br></br>
                    Livraison colis
                    
                </Typography>
                <Typography align='center'>
                <br></br>
                Nous avons toutes les fournitures d'emballage, y compris les boîtes spécifiquement pour les vêtements, les photos et la vaisselle ainsi que du ruban d'emballage et du papier bulle.
                </Typography>
            </Grid>

            <Grid xs={12} sm={5} md={2}  item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
                icone
                <Typography variant="h5" align='center'>
                <br></br>
                Demenagment Commerce
                </Typography>
                <Typography align='center'>
                <br></br>
                Qu'il s'agisse de déplacer simplement des étages ou d'un bout à l'autre du pays, nos déménageurs sont expérimentés et formés pour manipuler, transporter et équiper efficacement.
                </Typography> 
            </Grid>
            <Grid xs={12} sm={5} md={2} item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
                icone
                <Typography variant="h5" align='center'>
                <br></br>
                    Chargement / Dechargement
                </Typography>
                <Typography align='center'>
                <br></br>
                Si vous cherchez à économiser de l’argent, nous permettons à nos clients de louer le camion de déménagement, et nous chargerons et déchargerons vos biens.
                </Typography>
            </Grid>
        </Grid>
    </Container>
    )
}

export default Metier
