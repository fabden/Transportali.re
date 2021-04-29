import './App.css';
import SectionDevis from './Components/SectionDevis/SectionDevis';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Avis from './Components/Avis/Avis';
import Metier from './Components/Metier/Metier';


function App() {
  return (

    <>
      <CssBaseline />  
      <Header/>
      <SectionDevis/> 
      <Metier></Metier>
      <Avis></Avis>
      <Footer></Footer>
   
    </>
  );
}
export default App;
