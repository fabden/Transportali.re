import {Tooltip, Container, Grid,TextField,MenuItem,Select,InputLabel,FormControl, Typography, BottomNavigation , Box, BottomNavigationAction, Divider, Button   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import axios from 'axios';
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
    const [valueCategorie, setValue] = React.useState('M');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    ///

    ///gestion state adresse de chargemement
        const[adresseChargement, setAdresseChargement] = React.useState({
            adresse: "",
            code_postale:"Le Port",
            nom_contact:"",
            telephone_contact:'',
            mail_contact:'',
            commentaire_contact:'',
        });
        const handleChangeadresseChargement = (event) => {

            setAdresseChargement({...adresseChargement, adresse:event.target.value} );
          };
          const handleChangeCodePostaleChargement = (event) => {
            setAdresseChargement({...adresseChargement, code_postale:event.target.value});
            console.log(adresseChargement.code_postale)
          };
          const handleChangeDateNomContactChargement = (event) => {
            setAdresseChargement({...adresseChargement,nom_contact:event.target.value});
            console.log(adresseChargement.nom_contact)
          };
          const handleChangeMailContactTelephonne = (event) => {
            setAdresseChargement({...adresseChargement, telephone_contact:event.target.value});
            console.log(adresseChargement.telephone_contact)
          };
          const handleChangeMailContact = (event) => {
            setAdresseChargement({...adresseChargement, mail_contact:event.target.value});
            console.log(adresseChargement.mail_contact)
          };
          const handleChangeCommentaireChargement = (event) => {
            setAdresseChargement({...adresseChargement, commentaire_contact:event.target.value});
            console.log(adresseChargement.commentaire_contact)         
          };

    ///

    ///gestion state adresse de Livraison
    const [adresseLivraison, setAdresseLivraison] = React.useState({
        adresse: "",
        code_postale:"Le Port",
        nom_contact:"",
        telephone_contact:'',
        mail_contact:'',
        commentaire_contact:'',
       
    });
    const handleChangeadresseLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison, adresse:event.target.value} );
      };
      const handleChangeCodePostaleLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison, code_postale:event.target.value});
        console.log("livraisn adresse" + adresseLivraison.code_postale)
      };
      const handleChangeDateNomContactLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison,nom_contact:event.target.value});
        console.log("contact livraison" +adresseLivraison.nom_contact)
      };
      const handleChangeMailContactTelephonneLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison, telephone_contact:event.target.value});
        console.log(adresseLivraison.telephone_contact)
      };
      const handleChangeMailContactLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison, mail_contact:event.target.value});
        console.log(adresseLivraison.mail_contact)
      };
      const handleChangeCommentaireLivraison = (event) => {
        setAdresseLivraison({...adresseLivraison, commentaire_contact:event.target.value});
        console.log(adresseLivraison.commentaire_contact)         
      };

    ///
    /// Calcule coût livraison

    const [coutDevis, setCoutDevis]=React.useState ({distance_livraison:0,
        prix:0,
    });

    const recuperer_devis_rapide = ()=>{    
        axios.post('http://localhost:8080/devis-colis',{ville:{depart:adresseChargement.code_postale,
        arrive:adresseLivraison.code_postale},
        categorie:valueCategorie
        })
            .then((res) => {
                console.log(res);
                setCoutDevis(res.data);
            })
            .catch((e) => console.log(e))
    }

    ///Generateur de pdf (devis)
    const generateur_pdf_devis = ()=>{
        axios.get('http://localhost:8080/devis-colis/pdf',{adresseLivraison, adresseChargement, valueCategorie })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Bon_DMST.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link)
              })
            .catch((e) => console.log(e))

    }


    ///

    // useeffect pour le calcule autmatique 
        React.useEffect(recuperer_devis_rapide,[adresseChargement.code_postale,adresseLivraison.code_postale,valueCategorie]);
    ///

    ///gestion Date livraison
    const [dateLivraison, setDateLivraison] = React.useState("2017-05-24T10:30");

    const handleChangeDate = (event) => {
        setDateLivraison(event.target.value);
      };

    ///

    return (
    <Container maxWidth>
        <Grid container className={classes.padding_20} justify="space-around" alignItems="center">
            {/*partie de gauche adresse */}
            <Grid item xs={12} sm={12} md={12} lg={7} container justify="space-around" alignItems="center" >
                {/*Date de la mission*/}
                <Grid item container xs={12} sm={10} md={12} justify="center" alignItems="center" className={classes.padding_20} >
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
                <Grid item xs={12} sm={12} md={12} container justify="space-around" alignItems="center" direction="column" className={classes.border_adresse_depart}>
                    <Grid item xs={12}>
                        <Typography align="center" variant="h5">
                            Ardesse de chargement
                        </Typography>
                    </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="center" alignItems="center" spacing={2}>
                            <Grid item xs={7} >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Adresse" variant="outlined" fullWidth size="small" value={adresseChargement.adresse} onChange={handleChangeadresseChargement}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Code Postal</InputLabel>
                                    <Select value={adresseChargement.code_postale} onChange={handleChangeCodePostaleChargement} variant="outlined" >
                                                {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                    </Select>
                                </FormControl>
                            </Grid>
                        <Grid item container justify="start" alignItems="center" spacing={2}>
                            <Grid item xs={7}>
                                <FormControl fullWidth size="small">                                
                                    <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" value={adresseChargement.nom_contact} onChange={handleChangeDateNomContactChargement}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Telephone" variant="outlined" fullWidth size="small" value={adresseChargement.telephone_contact} onChange={handleChangeMailContactTelephonne}/>
                                </FormControl>
                                </Grid>
                        </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <FormControl fullWidth size="small">                                
                                <TextField label="Email" variant="outlined" fullWidth size="small" value={adresseChargement.mail_contact} onChange={handleChangeMailContact}/>
                            </FormControl>
                        </Grid>
                    </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <TextField label="Commentaire pour le chargement" multiline rows={4} variant="outlined" fullWidth value={adresseChargement.commentaire_contact} onChange={handleChangeCommentaireChargement}/>  
                        </Grid>
                    </Grid>
                </Grid>
                {/*case livraison */}
                <Grid item xs={12} sm={12} md={12} container justify="space-around" alignItems="center" direction="column" className={classes.border_adresse_arriver} >
                    <Grid item xs={12}>
                            <Typography align="center" variant="h5">
                                Ardesse de livraison
                            </Typography>
                        </Grid>
                    <Grid item xs={11} container spacing={1} direction="column">
                        <Grid container item xs justify="start" alignItems="center" spacing={2}>
                                <Grid item xs={7} >
                                    <FormControl fullWidth size="small">                                
                                        <TextField label="Adresse" variant="outlined" fullWidth size="small" value={adresseLivraison.adresse} onChange={handleChangeadresseLivraison}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Code Postal</InputLabel>
                                        <Select value={adresseLivraison.code_postale} onChange={handleChangeCodePostaleLivraison} variant="outlined" >
                                                    {data.map((e) => (<MenuItem value={e.nom_ville}>{e.nom_ville}</MenuItem>))}    
                                        </Select>
                                    </FormControl>
                                </Grid>
                            <Grid item container justify="start" alignItems="center" spacing={1}>
                                <Grid item xs={7}>
                                    <FormControl fullWidth size="small">                                
                                        <TextField label=" Nom Contact" variant="outlined" fullWidth size="small" value={adresseLivraison.nom_contact} onChange={(e)=>{handleChangeDateNomContactLivraison(e)}}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5}>
                                        <FormControl fullWidth size="small">                                
                                            <TextField label="Telephone" variant="outlined" fullWidth size="small" value={adresseLivraison.telephone_contact} onChange={handleChangeMailContactTelephonneLivraison}/>
                                        </FormControl>
                                    </Grid>
                            </Grid>
                            <Grid item container xs justify="start" alignItems="center" >
                                <FormControl fullWidth size="small">                                
                                    <TextField label="Email" variant="outlined" fullWidth size="small" value={adresseLivraison.mail_contact} onChange={handleChangeMailContactLivraison}/>
                                </FormControl>
                            </Grid>                        
                        </Grid>
                        <Grid item container xs justify="start" alignItems="center" >
                            <TextField id="outlined-multiline-static" label="Commentaire pour l'arrivé" multiline rows={4} variant="outlined" fullWidth value={adresseLivraison.commentaire_contact} onChange={handleChangeCommentaireLivraison}/>  
                        </Grid>
                    </Grid>
                 </Grid>
                {/*case detail categorie en attente*/} 
            </Grid>
            {/*partie de droit devis */}
            <Grid item xs={12} sm={12} md={12} lg={4}container className={classes.Fond_devis} alignItems="center" justify="center" direction="column"> 
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
                                 {` ${coutDevis.distance_livraison.toFixed(2)} Km`}
                            </Typography> 
                        </Grid>
                    </Grid>
                </Grid>
                {/*Parti cathegory */}
                <Grid item container alignItems="center" justify="center" direction="column" className={`${classes.margin_20_bas}`}>
                    <Typography variant="h6">Catégorie :</Typography>                   
                    <BottomNavigation value={valueCategorie} onChange={handleChange} showLabels>
                            <Tooltip title="Colis de taille: 50cm x 50cm x 50cm ou maximun 10Kg" placement="end">
                                <BottomNavigationAction label="M" value="M" icon={(valueCategorie==='M')?(<Check></Check>):(<></>)} />
                            </Tooltip>
                        <Divider orientation="vertical" flexItem />
                            <Tooltip title="Colis de taille: 50cm x 50cm x 100cm ou maximun 30Kg" placement="end">
                                <BottomNavigationAction label="L" value="L"icon={(valueCategorie==='L')?(<Check></Check>):(<></>)}/>
                            </Tooltip>
                        <Divider orientation="vertical" flexItem />
                            <Tooltip title="Colis de taille 100cm  x 100 x 50cm cm ou maximun 40Kg" placement="end">
                                <BottomNavigationAction label="XL" value="XL" icon={(valueCategorie==='XL')?(<Check></Check>):(<></>)}/>
                            </Tooltip>
                        <Divider orientation="vertical" flexItem />
                            <Tooltip title="Colis de taille 200cm x 100cm x 100cm ou maximun 50Kg" placement="end">
                                <BottomNavigationAction label="XXL" value="XXL" icon={(valueCategorie==='XXL')?(<Check></Check>):(<></>)}/>
                            </Tooltip>
                    </BottomNavigation>
                </Grid>
                {/*Parti payement */}
                
                
                <Grid item container alignItems="center" justify="center" >
                    <Grid item container xs alignItems="center" justify="center" >
                        <Typography variant="h5">
                          Payment   :
                        </Typography>
                        <Typography variant="h5">
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
