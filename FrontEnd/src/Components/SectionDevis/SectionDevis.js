import React from 'react';
import './styles.css';
import data from '../../datas';
import axios from 'axios';
import {Button,Container,Grid,Card, CardHeader,Accordion,AccordionSummary,AccordionDetails,FormControl,Select,MenuItem,InputLabel,FormLabel,RadioGroup,FormControlLabel,Radio,Tooltip} from '@material-ui/core';

function SectionDevis() {

const [expanded, setExpanded] = React.useState(false);
const [villeDepart, setVilleDepart] = React.useState('Le Tampon');
const [villeArrive, setVilleArrive] = React.useState('Le Tampon');
const [valeurCategorie, setValeurCategorie]= React.useState('M');
const [coutDevis, setCoutDevis]=React.useState (0);


const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
};
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
                    <Card>
                    <Grid container direction="column" > 
                        <CardHeader title="Livraison colis/meubles" />
                        <FormControl >
                            <InputLabel  >Ville Depart</InputLabel>
                            <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel >Ville Arrivé</InputLabel>
                            <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                 {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                            </Select>
                        </FormControl>
                        <FormControl >
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
                        
                        <Button variant="contained">Je Commande</Button>
                        </Grid>
                    </Card>
                </Grid>
                <Grid  item xs={4}>
                    <Card>
                        <Grid container direction="column" alignItems="stretch"> 
                            <CardHeader title="Demenagement" />
                            <FormControl >
                                <InputLabel  >Ville Depart</InputLabel>
                                <Select value={villeDepart} onChange={handleChangeVilleDepart}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>
                            <FormControl >
                                <InputLabel >Ville Arrivé</InputLabel>
                                <Select value={villeArrive} onChange={handleChangeVilleArrive}>
                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                </Select>
                            </FormControl>

                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary>                              
                            Cathegorie Colis
                                </AccordionSummary>
                                <AccordionDetails>
                            jjjjjjjjjj
                                </AccordionDetails>
                            </Accordion> 
                        </Grid >
                    </Card>
                </Grid >
                <Grid  item xs={4}>
                    <Card>
                        <CardHeader title="Livraison Partenaires" />
                    
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary>                              
                            Code postale Expediteur
                            </AccordionSummary>
                            <AccordionDetails>
                            jjjjjjjjjj
                            </AccordionDetails>
                        </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary>                              
                                Code postale Destinataire
                                </AccordionSummary>
                                <AccordionDetails>
                            jjjjjjjjjj
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary>                              
                            Cathegorie Colis
                                </AccordionSummary>
                                <AccordionDetails>
                            jjjjjjjjjj
                                </AccordionDetails>
                        </Accordion> 
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default SectionDevis
