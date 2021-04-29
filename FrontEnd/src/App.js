import './App.css';
import SectionDevis from './Components/SectionDevis/SectionDevis';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Avis from './Components/Avis/Avis';

function App() {
  return (

    <>
      <CssBaseline />  
      <Header/>
      <SectionDevis/>  
      <Footer></Footer>
      <Avis></Avis>
    </>
  );
}
export default App;
