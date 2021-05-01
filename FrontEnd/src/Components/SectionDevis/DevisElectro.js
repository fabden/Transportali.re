import { Container, Grid,TextField,MenuItem,Select,InputLabel,FormControl, Typography, BottomNavigation , Box, BottomNavigationAction, Divider, Paper, Button   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import data from '../../datas';
import React from 'react';

const useStyles = makeStyles({
    border_adresse_arriver:{
        borderColor:'rgb(220,20,60)',
        borderStyle:"solid",
        borderRadius:'10px',
        padding:'5px',
        margin:'0 0 10px 0',
    },
    border_adresse_depart:{
        borderColor:'rgb(4, 170, 109)',
        borderStyle:"solid",
        borderRadius:'10px',
        padding:'5px',
        margin:'0 0 10px 0',
    },
    padding_20:{padding:'20px',
    },
    margin_20_bas:{
        margin:'0 0 20px 0',
    },
    Fond_devis:{
        backgroundColor:'rgb(237, 154, 59, 40%)',
        borderRadius:'5px',
        padding: '15px',
    },
    dimention_maps:{
        height:'300px',
        backgroundColor:'rgb(4, 10, 9,5%)',
        width:"100%",
        borderRadius:'20px'
    }

});

function DevisElectro() {

    const classes = useStyles();

    //gestion menu categorie
    const [value, setValue] = React.useState('recents');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    ///
    ///gestion state adresse de chargemement
        const[adresseChargement, setAdresseChargement] = React.useState({});

    ///

    ///gestion state adresse de chargemement
    const [adresseLivraison, setAdresseLivraison] = React.useState({});

    ///

    ///gestion Categorie
    const [Categorie, setCategorie] = React.useState({});

    ///

    ///gestion Date livraison
    const [dateLivraison, setDateLivraison] = React.useState("2017-05-24T10:30");

    const handleChangeDate = (event) => {
        setDateLivraison(event.target.value);
      };

    ///
    console.log(dateLivraison)

    return (
    <Container maxWidth>
        <Grid container className={classes.padding_20}>
            {/*partie de gauche adresse */}
            <Grid item xs={12} sm={12} md={12} lg={8} container justify="space-around" alignItems="center">
                {/*Date de la mission*/}
                <Grid item container xs={12} sm={8} justify="center" alignItems="center" className={classes.padding_20} >
                    <Grid item xs={12} sm={5} >
                        <Typography variant="h5">Mission prevu pour le  :</Typography>
                   </Grid> 
                    <Grid item xs={12} sm={3}>
                       <form noValidate>
                            <TextField  label="Date previsionnel" type="datetime-local" value={dateLivraison} onChange={handleChangeDate}/>
                        </form>
                    </Grid>
                </Grid>
                {/*case de dapart */}
                <Grid item xs={12} sm={5} container justify="space-around" alignItems="center" direction="column"  className={classes.border_adresse_depart}>
                    <Grid item xs={12}>
                        <Typography align="center" variant="h5">
                            Ardesse de chargement
                        </Typography>
                    </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={7} >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Adresse" variant="outlined" fullWidth size="small"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Code Postal</InputLabel>
                                    <Select value="eDDDD" onChange={()=>{}} variant="outlined" >
                                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item container justify="start" alignItems="center" spacing={2}>
                            <Grid item xs={7}>
                                <FormControl fullWidth size="small">                                
                                    <TextField label=" Nom Contact" variant="outlined" fullWidth size="small"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Telephone" variant="outlined" fullWidth size="small"/>
                                    </FormControl>
                                </Grid>
                        </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <FormControl fullWidth size="small">                                
                                <TextField label="Email" variant="outlined" fullWidth size="small"/>
                            </FormControl>
                        </Grid>
                    </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <TextField id="outlined-multiline-static" label="Commentaire pour le chargement" multiline rows={4} variant="outlined" fullWidth />  
                        </Grid>
                    </Grid>
                </Grid>
                {/*case d'arriver */}
                <Grid item xs={12} sm={5} container justify="space-around" alignItems="center" direction="column" className={classes.border_adresse_arriver} >
                    <Grid item xs={12}>
                            <Typography align="center" variant="h5">
                                Ardesse de livraison
                            </Typography>
                        </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="start" alignItems="center" spacing={2}>
                                <Grid item xs={7} >
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Adresse" variant="outlined" fullWidth size="small"/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Code Postal</InputLabel>
                                        <Select value="eDDDD" onChange={()=>{}} variant="outlined" >
                                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                        </Select>
                                    </FormControl>
                                </Grid>
                            <Grid item container justify="start" alignItems="center" spacing={1}>
                                <Grid item xs={7}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label=" Nom Contact" variant="outlined" fullWidth size="small"/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                        <FormControl fullWidth size="small">                                
                                            <TextField label="Telephone" variant="outlined" fullWidth size="small"/>
                                        </FormControl>
                                    </Grid>
                            </Grid>
                            <Grid item container xs justify="start" alignItems="center" >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Email" variant="outlined" fullWidth size="small"/>
                                </FormControl>
                            </Grid>                        
                        </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <TextField id="outlined-multiline-static" label="Commentaire pour l'arrivé" multiline rows={4} variant="outlined" fullWidth />  
                        </Grid>
                    </Grid>
                 </Grid>
            </Grid>
            {/*partie de droit devis */}
            <Grid item xs={12} sm={12} md={12} lg={4}container className={classes.Fond_devis} alignItems="center" justify="start" direction="column"> 
                {/*Parti maps */}
                <Grid item container alignItems="center" justify="start" direction="column">
                    <Grid item xs container alignItems="center" justify="center" className={`${classes.dimention_maps} ${classes.margin_20_bas}`}>
                        <Box className={`${classes.dimention_maps} ${classes.margin_20_bas}`}>
                            Carte position boxmaps
                        </Box>
                    </Grid>                    
                    <Grid item xs container alignItems="center" justify="center" className={`${classes.margin_20_bas}`}>
                        <Grid xs item container alignItems="center" justify="start" >
                            <Typography variant="h4">
                                    Distance : 
                            </Typography> 
                            <Typography variant="h4">
                                 154Km
                            </Typography> 
                        </Grid>
                    </Grid>
                </Grid>
                {/*Parti cathegory */}
                <Grid item container alignItems="center" justify="center" direction="column" className={`${classes.margin_20_bas}`}>
                    <Typography variant="h6">Catégorie :</Typography>                   
                    <BottomNavigation value={value} onChange={handleChange} showLabels>
                        <BottomNavigationAction label="M" value="M" />
                        <Divider orientation="vertical" flexItem />
                        <BottomNavigationAction label="L" value="L" />
                        <Divider orientation="vertical" flexItem />
                        <BottomNavigationAction label="XL" value="XL"  />
                        <Divider orientation="vertical" flexItem />
                        <BottomNavigationAction label="XXL" value="XXL"   />
                    </BottomNavigation>
                </Grid>
                {/*Parti payement */}
                
                
                <Grid item container alignItems="center" justify="center" >
                    <Grid item container xs alignItems="center" justify="center" >
                        <Typography variant="h5">
                          Payment   :
                        </Typography>
                        <Typography variant="h5">
                            54€
                        </Typography>
                    </Grid>
                    <Grid item xs alignItems="center" justify="center" container >
                        <Button xs variant="contained">Payement</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Container>
    )
}

export default DevisElectro
