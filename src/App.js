import React,{useEffect} from 'react';

import MyCard from './components/MyCard';
import Header from './components/Header';
function App() {
	
  return (
    <div >
		<Header/>
		<div style={{paddingTop:'80px'}}>
      		<MyCard/>
		</div>
    </div>
  ); 
}
export default App;
