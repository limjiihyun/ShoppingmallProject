import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import bg from './img/shoes.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import React from 'react';
import Cart from './routes/Cart.js'

export let Context1 = React.createContext();
export let 재고context = React.createContext();


function App() {

  let [shoes, setShoes]=useState(data)
  let [재고, 재고변경]= useState([10, 11, 12])
  let navigate = useNavigate();

  return (
    <div className="App">
       <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/detail')}}>cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

<Routes>
  <Route path="/" element={
  <>
  <div className="main-bg"></div>
   <div className="container">
     <div className="row">
     { shoes.map((a, i)=>{
         return <Card shoes={shoes[i]} i={i} key={i}></Card>
        })}
      </div>
    </div> 
    <button onClick={()=>{
      axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((결과)=>{
        console.log(결과.data)
        let copy=[...shoes, ...결과.data];
        setShoes(copy);
      })
      .catch(()=>{
        console.log('실패함')
      })
    }}>더보기</button>
    </>
    }/>

<Route path="/detail/:id" element={ 
  <Detail shoes={shoes}/>
}/>

  <Route path="/cart" element={ <Cart/>}></Route>


<Route path="*" element={ <div>없는페이지임</div> } />

     </Routes>    
        </div>     
  );
}

function Card(props){
  return(
     <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ props.i +'.jpg'} 
      width="80%"/>
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
     </div>
  )
}


export default App;
