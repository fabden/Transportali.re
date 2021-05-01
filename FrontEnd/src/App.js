import './App.css';
import SectionDevis from './Components/SectionDevis/SectionDevis';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InfoMetier from './Components/InfoMetier/InfoMetier';
import Metier from './Components/Metier/Metier';


function App() {
  return (

    <>
      <CssBaseline />  
      <Header/>
      <SectionDevis/> 
      <Metier></Metier>
      <InfoMetier></InfoMetier>
      <Footer></Footer>
   
    </>
  );
}
export default App;
