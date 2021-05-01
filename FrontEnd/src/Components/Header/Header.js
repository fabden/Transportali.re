import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import image from '../../Asset/5367362.jpg';
//import Facebook from '@material-ui/icons/Facebook';


//style materila ui
const useStyles = makeStyles({
    menu:{
        backgroundColor: '#232323',
        height:'60px',
    },
    image:{
        backgroundImage:`url(${image})`,
        backgroundRepeat:'no-repeat', 
        backgroundPosition:'right  ',
       // backgroundBlendMode:'overlay',
        backgroundSize:'fill',
        height:'500px',            
        backgroundColor: '#232323',  
        color: "rgb(255 255 255)",
    },
    image_text:{
        backgroundColor:'rgb(19%, 25%, 35%, 85%)',
        height:"100%",
        
    },
    couleurBlanc:{
        color: "rgb(255 255 255)",
        borderColor: "rgb(255 255 255)",
    },
    margeBas:{
        margin:"10px 0px 20px 0px",
    },

  });
  

function Header() {

    const classes = useStyles();

    return (
    <>
        <Container  justify="center" alignItems="center" maxWidth >
            <Grid container alignItems="center" justify="center" className={classes.margeBas}>
                <Grid item xs={12} sm={12} md>
                    <Typography align="center">
                    Logo
                    </Typography>
                </Grid >
                <Grid item xs={12} sm={12} md>
                    <Typography align='center'>
                    Pour toute question:
                    </Typography> 
                    <Typography align='center'>
                       010203040506
                    </Typography>                
                </Grid>
                <Grid item xs={12} sm={6} md container spacing={2} alignItems="center" justify="center">                  
                    <Grid item container alignItems="center" justify="center" spacing={2}>
                        <Grid item >
                            <Typography >
                                icone
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                12 rue edmond albiuis <br></br>
                                97441 st suzanne
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md container spacing={2} alignItems="center"  justify="center">
                    <Grid item container spacing={2} alignItems="center"  justify="center">
                        <Grid item>
                            <Typography >
                            icone
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography >
                                cpntact@dmst.re <br></br>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md container spacing={2} alignItems="center" justify="center">
                    <Typography align="center">
                        Facebook
                    </Typography>
 
                </Grid>
            </Grid >

        </Container>
        <Container  maxWidth disableGutters>
        <Grid container className={classes.menu} alignItems="center" justify="flex-start"> 
            <Grid item xs={4}  container alignItems="center" justify="space-around" className={classes.couleurBlanc}>
                    <Typography >
                            Accueil
                    </Typography>
                    <Typography >
                            Service
                    </Typography>
                    <Typography >
                            Blog
                    </Typography>
                </Grid>
            </Grid>
        </Container>
        <Container maxWidth disableGutters>
        <Grid container className={classes.image} alignItems="center" justify="center" > 
            <Grid item xs={11} sm={8} md container alignItems="center" justify="center" className={classes.image_text}>
                <Typography  align="center">
                    <Typography variant="h2" >
                        livraison Rapide
                    </Typography>
                    <Typography variant="h5" >
                        Lorsqu'il est temps de quitter votre domicile ou votre entreprise,<br></br> il est temps d'appeler DMST. <br></br> Nous vous facilitons la tâche et plus rapidement que les autres. <br></br><br></br>
                    </Typography> 
                    <Button align="center" variant="outlined" size="large" className={classes.couleurBlanc} >Devis</Button>
                </Typography>
            </Grid>
            <Grid item xs={0} sm={0} md container alignItems="center" justify="center">
        
            </Grid>
            </Grid>
        </Container>
    </>
    )
}

export default Header
