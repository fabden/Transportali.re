import React from 'react'
import {Button, Container, Grid,TextField, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{ height:'100vh',
    backgroundColor:'rgb(51, 53, 68)'},
    connexionDiv:{
        height:'60vh',
        width:'60vw',
        backgroundColor:'rgb(240, 177, 38)',
        borderRadius:'10px'
        
    },
    couleurtextBlanc:{color: 'rgb(51, 53, 68)'}

}));

function ConnexionsLivreurs({connexion}) {
    const classes = useStyles();
//state formulaire
    const [paramform,setParamform] = React.useState({
        login:"",
        pass:""
});

const changevaleurinputConnexion =(e)=>{
    setParamform({...paramform,[e.target.name]: e.target.value})
};

    return (
        <Container disableGutters maxWidth >
            <Grid container  justify="center" alignItems="center" className={classes.root}>
               <form>
                    <Grid item  container direction="column" alignItems="center" justify="space-around"className={`${classes.connexionDiv} ${classes.couleurtextBlanc}`}>
                        <Grid item >
                            <Typography variant="h4" >
                                Connexion Livreur
                            </Typography>
                        </Grid>
                        <Grid item >
                            <TextField id="outlined-basic" name="login" label="Login" variant="outlined" className={classes.couleurtextBlanc} value={paramform.login} onChange={changevaleurinputConnexion}/>
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" name="pass" label="Mots de passe" variant="outlined" className={classes.couleurtextBlanc} value={paramform.pass} onChange={changevaleurinputConnexion}/>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={()=>connexion(paramform)} >Connexion</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>               
        </Container>
    
    )
}

export default ConnexionsLivreurs
