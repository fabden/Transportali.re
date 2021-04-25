import React from 'react';
import './styles.css';
import data from '../../datas';
import axios from 'axios';
import {Checkbox,Slider,Typography,Button,Container,Grid,Card, CardHeader,FormControl,Select,MenuItem,InputLabel,FormLabel,RadioGroup,FormControlLabel,Radio,Tooltip} from '@material-ui/core';

function SectionDevis() {


const [villeDepart, setVilleDepart] = React.useState('Le Tampon');
const [villeArrive, setVilleArrive] = React.useState('Le Tampon');
const [valeurCategorie, setValeurCategorie]= React.useState('M');
const [coutDevis, setCoutDevis]=React.useState (0);


const handleChangeVilleDepart = (event) => {
    setVilleDepart(event.target.value);
};
const handleChangeVilleArrive = (event) => {
    setVilleArrive(event.target.value);
};
const handleChangeValeurCategorie =(event)=>{
    setValeurCategorie(event.target.value);
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


    return (       
        <Container maxWidth="md" component="main">
            <Grid container justify="space-around" spacing={2}>  
                <Grid item  xs={4}>
                    <Card variant="outlined">
                    <Grid container direction="column" > 
                        <CardHeader title="Livraison colis/meubles" />
                        <FormControl margin="normal">
                            <InputLabel  >Ville Depart</InputLabel>
                            <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal">
                            <InputLabel >Ville Arrivé</InputLabel>
                            <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                 {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl margin="normal">
                            <FormLabel >Categorie Colis</FormLabel>
                                <RadioGroup defaultValue='M'>
                                    <Tooltip title="Colis de taille: 50cm x 50cm x 50cm ou maximun 10Kg" placement="right-end">
                                         <FormControlLabel value="M" control={<Radio/>} label="M" onChange={handleChangeValeurCategorie}/>                                   
                                     </Tooltip>
                                     <Tooltip title="Colis de taille: 50cm x 50cm x 100cm ou maximun 30Kg" placement="right-end">
                                         <FormControlLabel value="L" control={<Radio/>} label="L" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                    <Tooltip title="Colis de taille 100cm  x 100 x 50cm cm ou maximun 40Kg" placement="right-end">
                                        <FormControlLabel value="XL" control={<Radio/>} label="XL" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                    <Tooltip title="Colis de taille </br> 200cm x 100cm x 100cm ou maximun 50Kg" placement="right-end">
                                        <FormControlLabel value="XXL" control={<Radio/>} label="XXL" onChange={handleChangeValeurCategorie}/>
                                    </Tooltip>
                                </RadioGroup>
                        </FormControl>
                        
                        Estimation prix:  {coutDevis.toFixed(2)}  €                    
                        
                        <Button  variant="contained">Je Commande</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid  item xs={4}>
                    <Card variant="outlined">
                        <Grid container direction="column" alignItems="stretch"> 
                            <CardHeader title="Demenagement" />
                            <FormControl margin="normal">
                                <InputLabel  >Ville Depart</InputLabel>
                                <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <FormControl margin="normal">
                                <InputLabel >Ville Arrivé</InputLabel>
                                <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <Typography >
                              Mon appartment /maison fait environ :
                            </Typography>
                            <Typography >
                               M²
                            </Typography>
                                <Slider  min={0} max={200} aria-labelledby="continuous-slider" valueLabelDisplay="on" defaultValue={20}/>
                                <FormControl margin="normal" component="fieldset">
                                    <FormLabel component="legend">Autre elements </FormLabel>
                                    <FormControlLabel value="Escalier" control={<Checkbox color="primary" />} label="Escalier" labelPlacement="end" />
                                    <FormControlLabel value="Ascenseur" control={<Checkbox color="primary" />} label="Ascenseur" labelPlacement="end" />
                                    <FormControlLabel value="Parking" control={<Checkbox color="primary" />} label="Parking" labelPlacement="end" />
                                </FormControl>
                            <Button variant="contained">je choisi ma formule</Button>
                        </Grid >
                    </Card>
                </Grid >
                <Grid  item xs={4}>
                    <Card variant="outlined" >
                        <Grid container direction="column" alignItems="stretch">
                        <CardHeader title="Livraison Partenaires" />
                        
                            <Grid  container>
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
                                       
                            <FormControl margin="normal">
                                <InputLabel >Ville Arrivé</InputLabel>
                                <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
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
