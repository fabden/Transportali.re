import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';



const useStyles = makeStyles({
    height_100:{
        height:'100px',
    },
});


function InfoMetier() {
    const classes = useStyles();
  
    return (
        <>
        <Container justify="center" alignItems="center"   >
            <Grid container justify="space-around" alignItems="center" >
                <Grid container xs={12} sm={6} md item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                        <Typography>
                            icone
                        </Typography>
                    </Grid>
                    <Grid xs={8} item  container direction="column" justify="center" alignItems="center">
                        <Grid item xs={12}> 
                            <Typography variant="h3">
                                652 
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                             CLIENTS
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={12}  sm={6} md item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                        <Typography>
                            icone
                        </Typography>
                    </Grid>
                    <Grid xs={8} item container direction="column" justify="center" alignItems="center">
                        <Grid item> 
                            <Typography variant="h3">
                                102575
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                            KM PAR ANS
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={12} sm={6}  md  item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                        <Typography>
                            icone
                        </Typography>
                    </Grid>
                    <Grid xs={8} item  container direction="column" justify="center" alignItems="center">
                        <Grid item > 
                            <Typography variant="h3">
                                4000
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Typography>
                            MARCHANDISES
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container xs={12} sm={6}  md  item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                        <Typography>
                            icone
                        </Typography>
                    </Grid>
                    <Grid xs={8} item  container direction="column" justify="center" alignItems="center">
                        <Grid item> 
                            <Typography variant="h3">
                                1452
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                DEMENAGMENT
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        
        </>
    )
}

export default InfoMetier
