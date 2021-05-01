import React from 'react';
import data from '../../datas';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox,Slider,Typography,Button,Container,Grid,Card, CardHeader,FormControl,Select,MenuItem,InputLabel,FormLabel,RadioGroup,FormControlLabel,Radio,Tooltip} from '@material-ui/core';




//style materila ui
const useStyles = makeStyles({
    padding_10: {
      padding: '5px 15px',
    },
    margin_50:{        
        margin:'50px 0 0 0',
        
    },
    couleurBack:{
        backgroundColor: 'rgb(237, 154, 59, 95%)',
        borderRadius:'5px 5px 0 0 ',
        height:'200px',
        color:'rgb(255, 255, 255)',
    },
    couleurGris:{
        backgroundColor:"rgb(224, 225, 224)",
    }
  });

function SectionDevis() {

const [villeDepart, setVilleDepart] = React.useState('Le Tampon');
const [villeArrive, setVilleArrive] = React.useState('Le Tampon');
const [valeurCategorie, setValeurCategorie]= React.useState('M');
const [coutDevis, setCoutDevis]=React.useState (0);
const [metreCarre, setMetreCarre]= React.useState(0);


const handleChangeVilleDepart = (event) => {
    setVilleDepart(event.target.value);
};
const handleChangeVilleArrive = (event) => {
    setVilleArrive(event.target.value);
};
const handleChangeValeurCategorie =(event) => {
    setValeurCategorie(event.target.value);
};
const handleChangeValeurmetrecarre =  (event, newValue) => {
    setMetreCarre(newValue);
};


//fonction calcul prix 
const recuperer_devis_rapide = ()=>{    
    axios.post('http://localhost:8080/devis-colis',{ville:{depart:villeDepart,
    arrive:villeArrive},
    categorie:valeurCategorie
    })
        .then((res) => setCoutDevis(res.data.prix))
        .catch((e) => console.log(e))
}

// useeffect pour le calcule autmatique 
React.useEffect(recuperer_devis_rapide,[villeDepart,villeArrive,valeurCategorie]);


//style de la pages
  const classes = useStyles();

    return (       
        <Container className={classes.couleurGris} maxWidth>
            <Grid container justify="center" spacing={4} >  
                <Grid item  xs={11} sm md={3} >
                    <Card variant="outlined"  >
                    <Grid container direction="column" > 
                        <CardHeader title="Livraison electromenagé/meubles" className={`${classes.couleurBackElectro} ${classes.couleurBack}`}/>
                        <FormControl margin="normal" className={classes.padding_10}>
                            <InputLabel  className={classes.padding_10}>Ville Depart</InputLabel >
                            <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" className={classes.padding_10}>
                            <InputLabel className={classes.padding_10}>Ville Arrivé</InputLabel>
                            <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                 {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" className={classes.padding_10}>
                            <FormLabel >Categorie Colis</FormLabel>
                                <RadioGroup defaultValue='M'>
                                    <Tooltip title="Colis de taille: 50cm x 50cm x 50cm ou maximun 10Kg" placement="left">
                                         <FormControlLabel value="M" control={<Radio/>} label="M --  Taille: 50cm x 50cm x 50cm / maximun 10Kg" onChange={handleChangeValeurCategorie}/>                                   
                                     </Tooltip>
                                     <Tooltip title="Colis de taille: 50cm x 50cm x 100cm ou maximun 30Kg" placement="right-end">
                                         <FormControlLabel value="L" control={<Radio/>} label="L -- Taille: 50cm x 50cm x 100cm / maximun 30Kg" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                    <Tooltip title="Colis de taille 100cm  x 100 x 50cm cm ou maximun 40Kg" placement="right-end">
                                        <FormControlLabel value="XL" control={<Radio/>} label="XL -- Taille 100cm  x 100 x 50cm cm / maximun 40Kg" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                    <Tooltip title="Colis de taille </br> 200cm x 100cm x 100cm ou maximun 50Kg" placement="right-end">
                                        <FormControlLabel value="XXL" control={<Radio/>} label="XXL -- Taille 200cm x 100cm x 100cm / maximun 50Kg" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                </RadioGroup>
                        </FormControl>
                            <Typography className={classes.padding_10} >
                                Estimation prix:  {coutDevis.toFixed(2)}  €                    
                            </Typography>
                        <Button  variant="contained">Je Commande</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid  item xs={11} sm md={4}  >
                    <Card variant="outlined" >
                        <Grid container direction="column" alignItems="stretch"> 
                            <CardHeader title="Demenagement" className={classes.couleurBack}/>
                            <FormControl margin="normal" className={classes.padding_10}>
                                <InputLabel className={classes.padding_10} >Ville Depart</InputLabel>
                                <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" className={classes.padding_10}>
                                <InputLabel className={classes.padding_10}>Ville Arrivé</InputLabel>
                                <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <Typography className={classes.padding_10} >
                              Mon appartment /maison fait environ : {metreCarre}M²
                            </Typography>
                            <Grid container justify="space-around" className={classes.margin_50}>
                                <Grid item xs={11} >
                                    <Slider onChange={handleChangeValeurmetrecarre} min={0} max={200} aria-labelledby="continuous-slider" valueLabelDisplay="on" value={metreCarre} />
                                </Grid>
                            </Grid>                         
                                <FormControl  className={classes.padding_10} margin="normal" component="fieldset">
                                    <FormLabel component="legend">Autre elements </FormLabel>
                                    <FormControlLabel value="Escalier" control={<Checkbox color="primary" />} label="Escalier" labelPlacement="end" />
                                    <FormControlLabel value="Ascenseur" control={<Checkbox color="primary" />} label="Ascenseur" labelPlacement="end" />
                                    <FormControlLabel value="Parking" control={<Checkbox color="primary" />} label="Parking" labelPlacement="end" />
                                </FormControl>
                            <Button variant="contained">je choisi ma formule</Button>
                        </Grid >
                    </Card>
                </Grid >
                <Grid  item xs={11} sm md={3} >
                    <Card variant="outlined" >
                        <Grid container direction="column" alignItems="stretch">
                        <CardHeader title="Livraison Partenaires" className={classes.couleurBack} />
                        
                            <Grid  container className={classes.padding_10}>
                                <Button size="large" >
                                        Ravate
                                </Button>
                                <Button size="large" >
                                        Weldom
                                </Button>
                                <Button size="large" >
                                        BUT
                                </Button>
                                <Button size="large" >
                                        Leclere
                                </Button>
                            </Grid> 
                                       
                            <FormControl margin="normal" className={classes.padding_10}>
                                <InputLabel className={classes.padding_10}>Ville Arrivé</InputLabel>
                                <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" className={classes.padding_10}>
                            <FormLabel >Je recupere</FormLabel>
                                <RadioGroup defaultValue='M'>
                                    
                                         <FormControlLabel value="Meuble" control={<Radio/>} label="Meuble" />                                   
                                     
                                     
                                         <FormControlLabel value="Electromenagé" control={<Radio/>} label="Electromenagé" />
                                    
                                    
                                        <FormControlLabel value="Table" control={<Radio/>} label="Table" />
                                    
                                   
                                        <FormControlLabel value="Kit Cuisine" control={<Radio/>} label="Kit Cuisine" />
                                   
                                </RadioGroup>
                        </FormControl>
                            <Button  variant="contained">Je Commande</Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SectionDevis
