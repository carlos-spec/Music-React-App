import React,{ useState, useEffect, Fragment } from 'react';
import Formulario from './components/Formulario'
import axios from 'axios';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';




function App() {
  //utilizar useState con 3 state

  const[artista,guardarArtista]=useState('')
  const[letra,guardarLetra]=useState([])
  const[info,agregarInfo]= useState({})


  // metodopara consultar la API de cnciones 
  const consultarAPIletra = async busqueda =>{
    const {artista,cancion}= busqueda
    const url= `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    // consulta a la Api
    const resultado= await axios(url);
    //console.log(resultado.data.lyrics)

    //almacenar artista que se busco
    guardarArtista(artista)

    // al macenar la letra (resultado.data.lyrics)
    guardarLetra(resultado.data.lyrics)

  }

  // metodo para consultar la API de informacion 
  
    const consultarAPIInfo= async()=>{
      if(artista){
        const url=`https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`
  
        const resultado= await axios(url);
        agregarInfo(resultado.data.artists[0])
        console.log(info)
      }
    }
  

  useEffect(() => {
    consultarAPIInfo();
  }, [artista]);

  return (
    <Fragment>
      <Formulario
      consultarAPIletra={consultarAPIletra}
      />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
                <Informacion
                info={info}
                />
          </div>
          <div className='col-md-6'>
                <Cancion
                letra={letra}
                />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;