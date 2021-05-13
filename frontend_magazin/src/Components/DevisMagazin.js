import React from 'react';
import {Grid,Paper,FormControl,TextField, InputLabel, Select, MenuItem} from '@material-ui/core';
import data from '../datas';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

function DevisMagazin() {


    return (
        <Grid  >
            <Paper>
                 <Typography align="center">Adresse de livraison </Typography>
                    <Grid item xs={12} container spacing={1} direction="column" justify="center" alignItems="center" >
                        <Grid container item xs justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={7} >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Adresse" variant="outlined" fullWidth size="small"  name="adresse" value={"ville_depart.adresse"} onChange={()=>{}}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Code Postal</InputLabel>
                                    <Select name='ville' value={"ville_depart.ville"} onChange={()=>{}} variant="outlined" >
                                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item container justify="flex-start" alignItems="center" spacing={2}>
                            <Grid item xs={7}>
                                <FormControl fullWidth size="small">                                
                                    <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" name="contact" value={"ville_depart.contact"} onChange={()=>{}}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Telephone" variant="outlined" fullWidth size="small" name="telephone" value={"ville_depart.telephone"} onChange={()=>{}}/>
                                </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container xs  >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Email" variant="outlined" fullWidth size="small" name='email' value={"ville_depart.email"} onChange={()=>{}}/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container xs={11} justify="flex-start" alignItems="center" >
                            <TextField label="Commentaire pour le chargement" multiline rows={4} variant="outlined" fullWidth name='commentaire' value={"ville_depart.commentaire"} onChange={()=>{}}/>  
                        </Grid> 
                        <Grid item container xs={12} justify="center" alignItems="center"  >
                            <Grid item container xs justify="center" alignItems="center">
                                <Typography >
                                    Proposition livraison : 50€
                                </Typography> 
                            </Grid> 
                            <Grid item container xs={4} justify="center" alignItems="space-around" direction="row">
                                <Button >Valider</Button>
                                <Button>Annuler</Button>
                            </Grid>                      
                        </Grid>
                    </Grid>


            </Paper>
        </Grid>
            
        
    )
}

export default DevisMagazin
