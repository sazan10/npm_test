import React,{Component} from 'react';
import './App.css';
import ExampleComponent from 'npmtest';
import { Route, Switch, Redirect } from "react-router-dom";
import VesselBuilder from "./VesselBuilder";

import Unanimous from "./Unanimous";
import { withRouter } from "react-router-dom";


class  App extends Component {
// console.log("display",ExampleComponent())
state ={
  isauthenticated:false,
  display:false
}
async componentDidMount(){ 


  // this.setState({display:true})
// this.setState({isauthenticated:ExampleComponent()});
this.value= await ExampleComponent("http://192.168.0.5:8000");
if(!this.value)
{
console.log("not authenticated",this.value)
// this.props.history.push("/")
}
else{
  console.log("authenticated",this.value)
  // this.props.history.push("/builder");
  this.setState({isauthenticated:true})
}
  }

render(){

  let display=( <Switch>
    <Route path="/" component={()=><Unanimous/>} />
     <Redirect to="/" /> 
    
  </Switch>
);
  if(this.state.isauthenticated)
  {
   display= (
    <Switch>
      {/* <Route path="/pdf" component={() => <Pdf />} /> */}
      <Route path="/builder" component={()=><VesselBuilder/>} />
      <Route exact path="/" component={() => <VesselBuilder />} />
      <Redirect to="/builder" />
    </Switch>
  
  );
 }
  return (
    <div >
      <header>
      </header>
       {display} 
    </div>
  );
}
}



export default withRouter(App);
