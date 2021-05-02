import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import DirectionsRun from '@material-ui/icons/DirectionsRun';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Storefront from '@material-ui/icons/Storefront';








function InfoMetier() {
   
  
    return (
        <>
        <Container justify="center" alignItems="center"   >
            <Grid container justify="space-around" alignItems="center" >
                <Grid container xs={12} sm={6} md item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                        <PeopleAlt fontSize='large'></PeopleAlt>
                    </Grid>
                    <Grid xs={7} item  container direction="column" justify="center" alignItems="center">
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
                <Grid container xs={7}  sm={6} md item  justify="center" alignItems="center">
                    <Grid xs={1} item>
                     <DirectionsRun fontSize='large'></DirectionsRun>
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
                    <OpenInNew fontSize='large'></OpenInNew>
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
                  <Storefront fontSize='large'></Storefront>
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
