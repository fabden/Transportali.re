import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../Asset/1280.jpg';
import Home from '@material-ui/icons/Home';
import MoveToInbox from '@material-ui/icons/MoveToInbox';
import Store from '@material-ui/icons/Store';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({

    couleurFond:{
        backgroundColor:'rgb(51, 68, 99, 92%)',
        //margin:'15px 0 10px 0',
},

    couleurGrisfont:{
        color:'rgb(102,102,102)',
},
couleurBleu:{
    color:'rgb(38, 53, 80)',
},
    couleurFondu:{
        backgroundColor:'rgb(100%, 100%, 100%, 85%)',
        borderRadius:"5px",
        color:'rgb(0 0  0)',
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
    <Container maxWidth={false} disableGutters className={classes.image}>
        <Grid container   direction="row" justify="space-evenly" alignItems="baseline" className={classes.couleurFond}>
            <Grid xs={12} sm={5} md={2} item container   direction="column" justify="center" alignItems="center" className={classes.couleurFondu}>
                <Home fontSize='large' className={classes.couleurBleu}></Home>
                <Typography variant="h5" align='center' className={classes.couleurBleu}>
                 Demenagement Residense
                </Typography>
                <br></br>
                <Typography align='center' className={classes.couleurGrisfont}>
                Nous offrons du matériel d'emballage, des instructions d'emballage et des conseils ainsi que de la main-d'œuvre et du soutien pour rendre votre déménagement efficace et sans stress.
                </Typography>
            </Grid>
            <Grid xs={12} sm={5} md={2} item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
                <MoveToInbox fontSize='large' className={classes.couleurBleu}></MoveToInbox>
                <Typography variant="h5" align='center' className={classes.couleurBleu}>                
                    Livraison colis
                </Typography>
                <Typography align='center' className={classes.couleurGrisfont}>
                <br></br>
                Nous avons toutes les fournitures d'emballage, y compris les boîtes spécifiquement pour les vêtements, les photos et la vaisselle ainsi que du ruban d'emballage et du papier bulle.
                </Typography>
            </Grid>

            <Grid xs={12} sm={5} md={2}  item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
               <Store fontSize='large' className={classes.couleurBleu}></Store>
                <Typography variant="h5" align='center' className={classes.couleurBleu}>
                    Demenagment Commerce
                </Typography>
                <Typography align='center' className={classes.couleurGrisfont}>
                <br></br>
                Qu'il s'agisse de déplacer simplement des étages ou d'un bout à l'autre du pays, nos déménageurs sont expérimentés et formés pour manipuler, transporter et équiper efficacement.
                </Typography> 
            </Grid>
            <Grid xs={12} sm={5} md={2} item container  direction="column" justify="flex-start" alignItems="center" className={classes.couleurFondu}>
                <ShoppingCart fontSize='large' className={classes.couleurBleu}></ShoppingCart>
                <Typography variant="h5" align='center' className={classes.couleurBleu}>
                    Chargement / Dechargement
                </Typography>
                <Typography align='center' className={classes.couleurGrisfont}>
                <br></br>
                Si vous cherchez à économiser de l’argent, nous permettons à nos clients de louer le camion de déménagement, et nous chargerons et déchargerons vos biens.
                </Typography>
            </Grid>
        </Grid>
    </Container>
    )
}

export default Metier
