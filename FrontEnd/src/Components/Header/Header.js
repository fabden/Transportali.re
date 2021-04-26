import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container,Grid, Paper,Typography} from '@material-ui/core';





//style materila ui
const useStyles = makeStyles({
 
    couleurBack:{
        backgroundColor: 'rgb(255,255,255)',
        height:'128px',
    }
  });

function Header() {

    //style de la pages
  const classes = useStyles();



    return (
    <Container  component="header"  maxWidth disableGutters >
            <Grid container direction="row"  justify="center"  alignItems="center" className={classes.couleurBack}> 
                <Grid container item xs={10}  direction="row" justify="space-evenly" >
                    <Grid item xs={2}>
                        <Paper>
                          logo  
                        </Paper>                                            
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="button" component="h2">
                                Pour toutes questions
                        </Typography> 
                        <Typography variant="body2" component="h2">
                                0607080910
                        </Typography> 
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="button" component="h2">
                            Adresse
                        </Typography>     
                        <Typography variant="body2" component="h2">
                            12 rue edmond albius
                            97441 St Suzanne
                        </Typography>                
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant="button" component="h2">
                                Envoye mail a 
                        </Typography>     
                        <Typography variant="body2" component="h2">
                                contact@dmst.com
                        </Typography>                  
                    </Grid>
                    <Grid item xs={2}>
                    facebook                  
                    </Grid>
                </Grid>
            </Grid>
      </Container>
    )
}

export default Header



