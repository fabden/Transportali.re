import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';



const useStyles = makeStyles({

    height_80:{
        height:"50px",
        backgroundColor:"rgb(237, 154, 59)",
        color:"rgb(255, 255, 255)",

},

});

function Footer() {

    const classes = useStyles();

    return (
        
        <Container justify="center" alignItems="center" maxWidth disableGutters >
            <Grid container className={classes.height_80} justify="center" alignItems="center">
                <Grid item>
                    <Typography>
                        Condition general de vente | Utilisation
                    </Typography>
                </Grid>
            </Grid>
        </Container>
     
    
    )
}

export default Footer
