import React from 'react';
import {Grid,Paper,FormControl,TextField, InputLabel, Select, MenuItem} from '@material-ui/core';
import data from '../datas';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';

function DevisMagazin({handleClose}) {

    //state formulaire commande
    const [paramformCommande,setParamformCommande] = React.useState({
        ville:"Le Port",
        adresse:"",
        contact:"",
        email:"",
        telephone:"",
        commentaire:"",
        });

    const changevaleurinputPartenaire =(e)=>{
            console.log(e.target);
            setParamformCommande({...paramformCommande,[e.target.name]: e.target.value})
        };

    const resetFormInput = ()=>{
        handleClose();
        setParamformCommande({
            ville:"Le Port",
            adresse:"",
            contact:"",
            email:"",
            telephone:"",
            commentaire:"",
            });  
    }

    const envoiCommande = ()=>{

        const  localtokencommande = localStorage.getItem('transportali')

        axios.post('http://localhost:8080/api/partenaires/commande',{token: localtokencommande, addressArriver: paramformCommande,})
        .then((e)=>{

            
           
        })
        .catch((e)=>{console.log(e)})

        handleClose();
    };

    return (
        <Grid  >
            <Paper>
                 <Typography align="center">Adresse de livraison </Typography>
                    <Grid item xs={12} container spacing={1} direction="column" justify="center" alignItems="center" >
                        <Grid container item xs justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={7} >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Adresse" variant="outlined" fullWidth size="small"  name="adresse" value={paramformCommande.adresse} onChange={changevaleurinputPartenaire}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Code Postal</InputLabel>
                                    <Select name='ville' value={paramformCommande.ville} onChange={changevaleurinputPartenaire} variant="outlined" >
                                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item container justify="flex-start" alignItems="center" spacing={2}>
                            <Grid item xs={7}>
                                <FormControl fullWidth size="small">                                
                                    <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" name="contact" value={paramformCommande.contact} onChange={changevaleurinputPartenaire}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Telephone" variant="outlined" fullWidth size="small" name="telephone" value={paramformCommande.telephone} onChange={changevaleurinputPartenaire}/>
                                </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item container xs  >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Email" variant="outlined" fullWidth size="small" name='email' value={paramformCommande.email} onChange={changevaleurinputPartenaire}/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container xs={11} justify="flex-start" alignItems="center" >
                            <TextField label="Commentaire pour le chargement" multiline rows={4} variant="outlined" fullWidth name='commentaire' value={paramformCommande.commentaire} onChange={changevaleurinputPartenaire}/>  
                        </Grid> 
                        <Grid item container xs={12} justify="center" alignItems="center"  >
                            <Grid item container xs justify="center" alignItems="center">
                                <Typography >
                                    Proposition livraison : 50€
                                </Typography> 
                            </Grid> 
                            <Grid item container xs={4} justify="center" alignItems="space-around" direction="row">
                               <Button onClick={resetFormInput}>Annuler</Button>
                               <Button onClick={envoiCommande }>Valider</Button>
                                
                            </Grid>                      
                        </Grid>
                    </Grid>


            </Paper>
        </Grid>
            
        
    )
}

export default DevisMagazin
