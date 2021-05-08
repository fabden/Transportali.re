import { Container, Grid,TextField,MenuItem,Select,InputLabel,FormControl, Typography,Box,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import data from '../../datas';
import React from 'react';

const useStyles = makeStyles({
    border_adresse_arriver:{
        borderColor:'rgb(220,20,60)',
        borderStyle:"solid",
        borderRadius:'5px',
        padding:'5px',
        margin:'0 0 10px 0',
    },
    border_adresse_depart:{
        borderColor:'rgb(4, 170, 109)',
        borderStyle:"solid",
        borderRadius:'5px',
        padding:'5px',
        margin:'0 0 10px 0',
    },
    padding_20:{padding:'20px',
    },
    margin_20_bas:{
        margin:'0 0 20px 0',
    },
    Fond_devis:{
        backgroundColor:'rgb(38, 53, 80)',
        borderRadius:'5px',
        padding: '15px',
    },
    dimention_maps:{
        height:'300px',
        backgroundColor:'rgb(4, 10, 9,5%)',
        width:"100%",
        borderRadius:'5px',
    },
    couleurblancfont:{
        color:'rgb(255, 255, 255)',
    }

});

function DevisElectro({ville_depart, ville_arrive, changeInputdepart,changeInputarrive, paramMeubleElectro}) {

    const classes = useStyles();

  
    /// Calcule coût livraison

    const [coutDevis, setCoutDevis]=React.useState ({distance_livraison:0,
        prix:0,
    });

    const recuperer_devis_rapide = ()=>{    
        axios.post('http://82.165.56.203/api/devis-colis',{ville:{depart:'"rr"',
        arrive:'rr'},
        categorie:"valueCategorie"
        })
            .then((res) => {
                console.log(res);
                setCoutDevis(res.data);
            })
            .catch((e) => console.log(e))
    }

    ///Generateur de pdf (devis)
    const generateur_pdf_devis = ()=>{


    axios({
        method:'post',
        url:'http://82.165.56.203/api/devis-colis/pdf',
        responseType:'arraybuffer',
        data: { }
      })
      .then(function(response) {
          let blob = new Blob([response.data], { type:'application/pdf' } );
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'Bon_Livraison_DMST.pdf';
          link.click();
      });
    }
  


    ///

    // useeffect pour le calcule autmatique 
        React.useEffect(recuperer_devis_rapide,[]);
    ///

    ///gestion Date livraison
    const [dateLivraison, setDateLivraison] = React.useState("2017-05-24T10:30");

    const handleChangeDate = (event) => {
        setDateLivraison(event.target.value);
      };
    
    ///

    return (
    <Container maxWidth={false}>
        <Grid container className={classes.padding_20} justify="space-around" alignItems="center">
            {/*partie de gauche adresse */}
            <Grid item xs={12} sm={12} md={12} lg={8} container justify="space-around" alignItems="center" >
                {/*Date de la mission*/}
                <Grid item container xs={12} sm={10} md={10} justify="space-around" alignItems="center" className={classes.padding_20} >
                    <Grid item xs={12} sm={5} >
                        <Typography variant="h5">Mission prevu pour le  :</Typography>
                   </Grid> 
                    <Grid item xs={12} sm={3}>
                       <form noValidate>
                            <TextField  label="Date previsionnel" type="datetime-local" value={dateLivraison} onChange={handleChangeDate}/>
                        </form>
                    </Grid>
                </Grid>
                {/*case de chargement*/}
                <Grid item xs={12} sm={12} md={9} container justify="space-around" alignItems="center" direction="column" className={classes.border_adresse_depart}>
                    <Grid item xs={12}>
                        <Typography align="center" variant="h5">
                            Ardesse de chargement
                        </Typography>
                    </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={7} >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Adresse" variant="outlined" fullWidth size="small"  name="adresse" value={ville_depart.adresse} onChange={(e)=>changeInputdepart(e)}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Code Postal</InputLabel>
                                    <Select name='ville' value={ville_depart.ville} onChange={(e)=>changeInputdepart(e)} variant="outlined" >
                                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item container justify="flex-start" alignItems="center" spacing={2}>
                            <Grid item xs={7}>
                                <FormControl fullWidth size="small">                                
                                    <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" name="contact" value={ville_depart.contact} onChange={(e)=>changeInputdepart(e)}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Telephone" variant="outlined" fullWidth size="small" name="telephone" value={ville_depart.telephone} onChange={(e)=>changeInputdepart(e)}/>
                                </FormControl>
                                </Grid>
                        </Grid>
                        <Grid item container xs justify="flex-start" alignItems="center" >
                            <FormControl fullWidth size="small">                                
                                <TextField label="Email" variant="outlined" fullWidth size="small" name='email' value={ville_depart.email} onChange={(e)=>changeInputdepart(e)}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                        <Grid item container xs justify="flex-start" alignItems="center" >
                            <TextField label="Commentaire pour le chargement" multiline rows={4} variant="outlined" fullWidth name='commentaire' value={ville_depart.commentaire} onChange={(e)=>changeInputdepart(e)}/>  
                        </Grid>
                    </Grid>
                </Grid>
                {/*case livraison */}
                <Grid item xs={12} sm={12} md={9} container justify="space-around" alignItems="center" direction="column" className={classes.border_adresse_arriver} >
                    <Grid item xs={12}>
                            <Typography align="center" variant="h5">
                                Ardesse de livraison
                            </Typography>
                        </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="flex-start" alignItems="center" spacing={2}>
                                <Grid item xs={7} >
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Adresse" variant="outlined" fullWidth size="small" name='adresse' value={ville_arrive.adresse} onChange={(e)=>changeInputarrive(e)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Code Postal</InputLabel>
                                        <Select name="ville" value={ville_arrive.ville} onChange={(e)=>changeInputarrive(e)} variant="outlined" >
                                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                        </Select>
                                    </FormControl>
                                </Grid>
                            <Grid item container justify="flex-start" alignItems="center" spacing={1}>
                                <Grid item xs={7}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" name='contact' value={ville_arrive.contact} onChange={(e)=>changeInputarrive(e)}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                        <FormControl fullWidth size="small">                                
                                            <TextField label="Telephone" variant="outlined" fullWidth size="small"name='telephone' value={ville_arrive.telephone} onChange={(e)=>changeInputarrive(e)}/>
                                        </FormControl>
                                    </Grid>
                            </Grid>
                            <Grid item container xs justify="flex-start" alignItems="center" >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Email" variant="outlined" fullWidth size="small" name='email' value={ville_arrive.email} onChange={(e)=>changeInputarrive(e)}/>
                                </FormControl>
                            </Grid>                        
                        </Grid>
                        <Grid item container xs justify="flex-start" alignItems="center" >
                            <TextField id="outlined-multiline-static" label="Commentaire pour l'arrivé" multiline rows={4} variant="outlined" name="commentaire" fullWidth value={ville_arrive.commentaire} onChange={(e)=>changeInputarrive(e)}/>  
                        </Grid>
                    </Grid>
                 </Grid>
                {/*case detail categorie en attente*/} 
            </Grid>
            {/*partie de droit devis */}
            <Grid item xs={12} sm={12} md={12} lg={4}container className={classes.Fond_devis} alignItems="center" justify="center" direction="column"> 
                {/*Parti maps */}
                <Grid item container alignItems="center" justify="flex-start" direction="column">
                    <Grid item xs container alignItems="center" justify="center" className={`${classes.dimention_maps} ${classes.margin_20_bas}`}>
                        <Box className={`${classes.dimention_maps} ${classes.margin_20_bas}`}>
                            Carte position boxmaps
                        </Box>
                    </Grid>                    
                    <Grid item xs container alignItems="center" justify="center" className={`${classes.margin_20_bas}`}>
                        <Grid xs item container alignItems="center" justify="flex-start" >
                            <Typography variant="h4" className={classes.couleurblancfont}>
                                    Distance : 
                            </Typography> 
                            <Typography variant="h4" className={classes.couleurblancfont}>
                                 {` ${coutDevis.distance_livraison.toFixed(2)} Km`}
                            </Typography> 
                        </Grid>
                    </Grid>
                </Grid>
                {/*Parti cathegory */}

                <Grid container>
                    <Grid xs item >
                        <Typography align='center' className={classes.couleurblancfont}>
                            Electromenagé/meuble: 
                        </Typography>
                        <Typography align='center' className={classes.couleurblancfont}>
                            {paramMeubleElectro.choix_meuble_electro} 
                        </Typography>
                        <br></br>
                    </Grid>

                </Grid>
                
                {/*Parti payement */}
                
                
                <Grid item container alignItems="center" justify="center" >
                    <Grid item container xs alignItems="center" justify="center" >
                        <Typography variant="h5" className={classes.couleurblancfont}>
                          Payment   :
                        </Typography>
                        <Typography variant="h5" className={classes.couleurblancfont}>
                            {` ${coutDevis.prix.toFixed(2)} €`}
                        </Typography>
                    </Grid>
                    <Grid item xs alignItems="center" justify="center" container >
                        <Button xs variant="contained" onClick={generateur_pdf_devis}>Payement</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
    )
}

export default DevisElectro
