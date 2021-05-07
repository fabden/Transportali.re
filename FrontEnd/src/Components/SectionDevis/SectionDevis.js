import React from 'react';
import data from '../../datas';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox,Slider,Typography,Button,Container,Grid,Card, CardHeader,FormControl,Select,MenuItem,InputLabel,FormLabel,RadioGroup,FormControlLabel,Radio,Tooltip, Collapse} from '@material-ui/core';
import DevisElectro from './DevisElectro';




//style materila ui
const useStyles = makeStyles({
    padding_10: {
      padding: '5px 15px',
    },
    margin_50:{        
      margin:'50px 0 0 0',
        
    },
    Boutton_partenaire:{
        height:"150px",
    },
    couleurBack:{
        backgroundColor: 'rgb(237, 154, 59, 95%)',
        borderRadius:'5px 5px 0 0 ',
        height:'200px',
        color:'rgb(255, 255, 255)',
    },
    couleurGris:{
        backgroundColor:"rgb(224, 225, 224)",
        padding: '15px 0 15px  0',
       
    },
    couleurBoutton:{
        backgroundColor: 'rgb(237, 154, 59, 95%)',
        borderRadius:'5 5 5 5',        
    },
    bouton_wight:{
        width:'200px',
    },
  });

function SectionDevis() {

const [villeDepart, setVilleDepart] = React.useState('Le Tampon');
const [villeArrive, setVilleArrive] = React.useState('Le Tampon');
const [valeurCategorie, setValeurCategorie]= React.useState('M');
const [coutDevis, setCoutDevis]=React.useState (0);
const [metreCarre, setMetreCarre]= React.useState(0);
const [affichageDevisElectro , setAffichageDevisElectro]=React.useState(false)

const handleChangeElecro = () => {
    setAffichageDevisElectro(!affichageDevisElectro);
  };

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
    axios.post('http://82.165.56.203/api/devis-colis',{ville:{depart:villeDepart, arrive:villeArrive},
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
    <>      
        <Container className={classes.couleurGris} maxWidth id="devis">
            <Grid container justify="space-around"  >  
                <Grid item  xs={11} sm={5} md={3} >
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
                            <Typography variant="h5" align='right' className={classes.padding_10} >
                                Estimation :  {coutDevis.toFixed(2)}  €                    
                            </Typography>
                        <Button  variant="contained" className={classes.couleurBoutton} href='#deviselectro' onClick={handleChangeElecro}>Je Commande</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid  item xs={11} sm={5} md={4}  >
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
                            <Button variant="contained" className={classes.couleurBoutton}>je choisi ma formule</Button>
                        </Grid >
                    </Card>
                </Grid >
                <Grid  item xs={11} sm={6} md={3} >
                    <Card variant="outlined" >
                        <Grid container direction="column" alignItems="stretch">
                        <CardHeader title="Connexion Partenaires" className={classes.couleurBack} />
                            <Grid item container direction="column" justify="space-around" alignItems="center" className={`${classes.Boutton_partenaire}`}>
                                <Button className={`${classes.couleurBoutton} ${classes.bouton_wight}`}>Magazin</Button>
                                <Button className={`${classes.couleurBoutton} ${classes.bouton_wight}`}>Chaufeur</Button>
                           </Grid>                            
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        <Collapse in={affichageDevisElectro} timeout='auto' id='#deviselectro'>
            <DevisElectro ></DevisElectro>
        </Collapse>
     </>
    )
}

export default SectionDevis
