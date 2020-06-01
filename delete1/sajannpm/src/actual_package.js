// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import styles from './styles.css'
// import {Route, Switch, Redirect} from 'react-router-dom'
// import axios from 'axios';
// const instance = axios.create({
//   // baseURL: 'http://35.243.172.120'
//   //  baseURL: 'http://192.168.10.121:8000'
//   // baseURL: 'http://192.168.1.23:8002'
//   //baseURL: 'http://192.168.1.16:8002'
//   // baseURL: 'http://192.168.10.121:8002'
//   baseURL:'http://192.168.1.29:8000'
// });
 export default async ExampleComponent=> {
   console.log(ExampleComponent)
    // let url_token_verify="https://vesselexpress-backend.appspot.com/auth/token-verify";
    let url_token_verify=ExampleComponent+"/auth/token-verify";
    // let url_token_request ="https://vesselexpress-backend.appspot.com/oidc/auth/request/";
    let url_token_request =ExampleComponent+"/oidc/auth/request/";
    // static propTypes = {
    //   text: PropTypes.string
    // }
    
    let str = window.location.pathname;
    let token=str.split("/")
    // console.log("hell")
    // let display1 =(<Switch>
    //   <Route path="/pdf" component={()=> <Pdf/>} />
    //   <Route exact path="/auth" component={()=><Hello/>} />
    //   <Route exact path="/" component={()=><App2 />}/>
    //   <Redirect to="/"/>
    //   </Switch>);
    // let displayer=(<Switch>
    //   <Route path="/builder" component={()=><VesselBuilder/>} />
    //   <Route path="/pdf" component={()=> <Pdf/>} />
    //   <Route exact path="/auth" component={()=><Hello/>} />
    //   <Route exact path="/" component={()=><VesselBuilder/>} />
    //   </Switch>);
        // axios.get(`https://jsonplaceholder.typicode.com/users`)
        // .then(res => {
        //   const persons = res.data;
        //   console.log("glass")
        // })
    let display=false;
    if(token[2])  //check if token exists in url
       {

         let encoded_token=window.btoa(token[2])//encode the token before storing in local storage
         localStorage.setItem("token",encoded_token)
       let header1=getToken();
       let response = await fetch(url_token_verify,
         {headers:header1},
       )
         console.log("response",response)
        if(response.statusText.trim()==="Forbidden".trim())
        {
          console.log("response",response.statusText)
          // fetch(url_token_request).then(response=>{
          //   response.json().then(json => {
          //     display=false;
          //   window.open(json.redirect_url,"_self");
          // }).catch((e)=>{console.log(e)});
          //   // if(!localStorage.getItem("pollingId")){
          //  })
          window.open(url_token_request,"_self")
          }//if token is expired and forbidden, direct to login page(App2)
        else if(response.status===200)
        {
          console.log("response ok",response.status)
          
          let json= await response.json()
          
          console.log("json true",json)
        localStorage.setItem("exp_time",json.exp_time*1000);
          setTimeout( ()=>refresh_token(ExampleComponent),json.exp_time*1000-(new Date().getTime()+9000*60+20000));
            display=true;
            console.log("authenticated in package",display)
          
        }
         console.log("backend response ",response)
        //  .catch((error)=>{console.log(error)})
      
      }
      else //if url does not contain token from backend
      {
      //  fetch(url_token_request,{method:'get'}).then(response=>{
      //     response.json().then(json => {
      //       console.log('unauthenticated')
      //         display=false
      //       // setTimeout(refresh_token,5000)
      //       // setTimeout( refresh_token,response.data.exp_time*1000-(new Date().getTime()+9000*60+20000));

      //     window.open(json.redirect_url,"_self");
      //   });
      window.open(url_token_request,"_self")
        // if(!localStorage.getItem("pollingId")){
      //  }).catch(
      //    (e)=>{console.log(e)}
      //  )
      }
      console.log("value of display",display)
      return  display;

  }

  const getToken = () => {
    let token = window.atob(localStorage.getItem("token"));
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      };
      return headers;
    }

  async function refresh_token(url)
    {
      let refresh_url=url+"/oidc/refresh-token/";
      let header2=getToken();
      let response = await fetch(refresh_url,{headers:header2})
      
      let json= await response.json()
      let encoded_token=window.btoa(json.access_token)
        localStorage.setItem("token",encoded_token);
        localStorage.setItem("exp_time",json.exp_time)
        console.log("refresh token")
       setTimeout( refresh_token,json.exp_time*1000-(new Date().getTime()+9000*60+20000));
      //setTimeout(refresh_token,5000)
        
    
   
    }

