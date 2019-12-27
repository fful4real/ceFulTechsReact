import React,{useEffect} from 'react';
import HeaderContainer from './layout/header/header-container.component';
import FulTechs from './assets/js/fultechs'

import './app.styles.scss'
import ContentContainer from './layout/content/content-container';
import FulTechsStyle from './global-style.styles';
import FooterContent from './layout/footer/footer.component';


function App() {
  useEffect(() => {
    FulTechs();
  }, [])
  return (
    <div className="hk-wrapper hk-horizontal-nav">
      <FulTechsStyle/>
      <HeaderContainer />
      <ContentContainer/>
      <FooterContent />
    </div>
  );
}

export default App;