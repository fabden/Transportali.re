import React from 'react';
import data from '../../datas';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox,Slider,Typography,Button,Container,Grid,Card, CardHeader,FormControl,Select,MenuItem,InputLabel,FormLabel,Divider,FormControlLabel,TextField,Tooltip, Collapse} from '@material-ui/core';
import DevisElectro from './DevisElectro';

//style materila ui
const useStyles = makeStyles({
    padding_10: {
      padding: '5px 15px',
    },
    margin_50:{        
      margin:'50px 0 0 0',
        
    },
    margin_10:{
        margin:'10px',
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
const [valeurCategorie, setValeurCategorie]= React.useState('');
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
    /*.then((res) => setCoutDevis(res.data.prix))*/
        .then((res) => setCoutDevis(5))
        .catch((e) => console.log(e))
};


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
                                <FormControl  className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Selectionnner votre meuble/electromenager</InputLabel>
                                    <Select                                    
                                    onChange={handleChangeValeurCategorie}
                                    native>  
                                    <option aria-label="Selectionnner votre meuble/electromenager"/>                                      
                                                <optgroup label="Meuble">
                                                    <option value={1}>canapé 1 place</option>
                                                    <option value={2}>canapé 2 places</option>
                                                    <option value={3}>canapé 3 places</option>
                                                    <option value={4}>table 2m x 3m</option>
                                                </optgroup>
                                                <optgroup label="electromenagé">
                                                    <option value={2}>Frigidere</option>
                                                    <option value={1}>Machine a laver</option>
                                                    <option value={1}>Lave vaiselle</option>
                                                    <option value={1}>seche linge</option>                                                    
                                                </optgroup>
                                    </Select>
                                </FormControl>
                                <Divider className={classes.margin_10} />

                                <Typography variant="h5" align='center'>
                                    Autre(si pas dans la liste):
                                </Typography>

                                <Divider className={classes.margin_10} />

                                <form  autoComplete="off">
                                    <TextField xs label="Longeur" variant="outlined"/>
                                    <TextField xs label="Largeur" variant="outlined" />
                                    <TextField xs label="Hauteur" variant="outlined" />
                                    <TextField xs label="Poids" variant="outlined" />
                                </form>
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
