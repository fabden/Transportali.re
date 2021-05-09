import React from 'react';
import data from '../../datas';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Checkbox,Slider,Typography,Button,Container,Grid,Card, CardHeader,FormControl,Select,MenuItem,InputLabel,FormLabel,Divider,FormControlLabel,TextField, Collapse} from '@material-ui/core';
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

//state devis meuble/electro
const [devisElectroDepart,setDevisElectroDepart]=React.useState({
    ville:"",
    adresse:"",
    contact:"",
    email:"",
    telephone:"",
    commentaire:"",
    },);

const [devisElectroArrive,setDevisElectroArrive]=React.useState({
    ville:"",
    adresse:"",
    contact:"",
    email:"",
    telephone:"",
    commentaire:"",
    });
const [paramMeubleElectro, setParamMeubleElectro] = React.useState({
    choix_meuble_electro:"",
    longeur:0,
    largeur:0,
    hauteur:0,
    poids:0,
    distance:"",
    prix:0,
});

const [coutDevis, setCoutDevis]=React.useState ({prix:0, distance_livraison:0});
const [metreCarre, setMetreCarre]= React.useState(0);
const [affichageDevisElectro , setAffichageDevisElectro]=React.useState(false);

console.log(coutDevis);

const changevaleurinputElectroDepart =(e)=>{
    console.log(e.target);
    setDevisElectroDepart({...devisElectroDepart,[e.target.name]: e.target.value})
};
const changevaleurinputElectroArrive =(e)=>{
    console.log(e.target);
    setDevisElectroArrive({...devisElectroArrive,[e.target.name]: e.target.value})
};
const changevaleurinputparamMeubleElectro =(e)=>{
    console.log(e.target);
    setParamMeubleElectro({...paramMeubleElectro,[e.target.name]: e.target.value})
};

const handleChangeElecro = () => {
    setAffichageDevisElectro(!affichageDevisElectro);
  };

const handleChangeValeurmetrecarre =  (event, newValue) => {
    setMetreCarre(newValue);
};
//fonction calcul prix 
const recuperer_devis_rapide = ()=>{    
    axios.post('http://127.0.0.1:8080/api/devis-colis',{devisElectroDepart, devisElectroArrive, paramMeubleElectro })
        .then((res) => setCoutDevis(res.data))
        .catch((e) => console.log(e))
};


// useeffect pour le calcule autmatique 
React.useEffect(recuperer_devis_rapide,[devisElectroDepart, devisElectroArrive, paramMeubleElectro ]);


//style de la pages
  const classes = useStyles();

    return ( 
    <>      
        <Container className={classes.couleurGris} maxWidth={false} id="devis">
            <Grid container justify="space-around"  >  
                <Grid item  xs={11} sm={5} md={3} >
                    <Card variant="outlined"  >
                    <Grid container direction="column" > 
                        <CardHeader title="Livraison electromenagé/meubles" className={`${classes.couleurBackElectro} ${classes.couleurBack}`}/>
                        <FormControl margin="normal" className={classes.padding_10}>
                            <InputLabel  className={classes.padding_10}>Ville Depart</InputLabel >
                            <Select  id='ville_depart'name='ville'value={devisElectroDepart.ville} onChange={changevaleurinputElectroDepart}>
                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" className={classes.padding_10}>
                            <InputLabel className={classes.padding_10}>Ville Arrivé</InputLabel>
                            <Select id='ville_arrive'name='ville'value={devisElectroArrive.ville} onChange={changevaleurinputElectroArrive}>
                                 {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" className={classes.padding_10}>
                                <FormControl  className={classes.formControl}>
                                    <InputLabel>Selectionnner </InputLabel>
                                    <Select id='choix_meuble_electro'name='choix_meuble_electro'onChange={changevaleurinputparamMeubleElectro} native  value={paramMeubleElectro.choix_meuble_electro}>  
                                    <option aria-label="Selectionnner votre meuble/electromenager" />                                      
                                                <optgroup label="Meuble">
                                                    <option value="canapé 1 place">canapé 1 place</option>
                                                    <option value="canapé 1 place">canapé 2 places</option>
                                                    <option value="canapé 1 place">canapé 3 places</option>
                                                    <option value="canapé 1 place">table 2m x 3m</option>
                                                </optgroup>
                                                <optgroup label="electromenagé">
                                                    <option value="Frigidere">Frigidere</option>
                                                    <option value="Machine a laver">Machine a laver</option>
                                                    <option value="Lave vaiselle">Lave vaiselle</option>
                                                    <option value="seche linge">seche linge</option>                                                    
                                                </optgroup>
                                    </Select>
                                </FormControl>
                                <Divider className={classes.margin_10} />

                                <Typography variant="h5" align='center'>
                                    Autre(si pas dans la liste):
                                </Typography>

                                <Divider className={classes.margin_10} />

                                <form autoComplete="off">
                                    <Grid container>
                                        <Grid xs item>
                                            <TextField className={classes.margin_10} size='small' type="number" label="longeur en cm" variant="outlined" id='longeur'name='longeur'value={paramMeubleElectro.longeur} onChange={changevaleurinputparamMeubleElectro}/>
                                        </Grid>
                                        <Grid xs item >
                                            <TextField className={classes.margin_10} size='small' type="number" label="Largeur en cm" variant="outlined" id='largeur'name='largeur'value={paramMeubleElectro.largeur} onChange={changevaleurinputparamMeubleElectro} />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid xs  item>
                                            <TextField className={classes.margin_10} size='small' type="number" label="Hauteur en cm" variant="outlined" id='hauteur'name='hauteur'value={paramMeubleElectro.hauteur} onChange={changevaleurinputparamMeubleElectro}/>
                                        </Grid>
                                        <Grid item xs>
                                            <TextField className={classes.margin_10} size='small' type="number" label="Poids en Kg" variant="outlined" id='poids'name='poids'value={paramMeubleElectro.poids} onChange={changevaleurinputparamMeubleElectro} />
                                        </Grid> 
                                   </Grid>
                                    </form>
                        </FormControl>
                            <Typography variant="h5" align='right' className={classes.padding_10} >
                                Estimation :  {coutDevis.prix.toFixed(2)}  €                    
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
                                <Select >
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" className={classes.padding_10}>
                                <InputLabel className={classes.padding_10}>Ville Arrivé</InputLabel>
                                <Select value="{villeArrive}" onChange={()=>{}}>
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
            <DevisElectro ville_depart={devisElectroDepart} ville_arrive={devisElectroArrive} coutDevis={coutDevis} changeInputdepart={changevaleurinputElectroDepart} changeInputarrive={changevaleurinputElectroArrive} paramMeubleElectro={paramMeubleElectro}></DevisElectro>
        </Collapse>
     </>
    )
}

export default SectionDevis
