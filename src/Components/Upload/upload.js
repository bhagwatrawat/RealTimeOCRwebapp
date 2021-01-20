import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import './Upload.css'
import FileBase64 from 'react-file-base64'
import { Button, Form, FormGroup,  Input, Label } from 'reactstrap'




const Signin = (props) => {
  const [Files,setFiles]=useState('');
  const [invoice,setInvoice]=useState('');
  const[Date,setDate]=useState('');
  const[Amount,setAmount]=useState('');
  const [Res,setRes]=useState(false);
  const [loading,setLoading]=useState('');
 
const getFiles=(files)=>{
  
    setFiles(files[0].base64);
    setLoading("Extractiong data...");
    const randomm=Math.round(1*Math.random()*(1000000-1));
    
    const data=JSON.stringify({
      fileExt:'png',
      imageID: randomm,
      folder:randomm,
      img:files[0].base64
    })
    
    
    axios.post(" https://ul23a5fp40.execute-api.us-east-1.amazonaws.com/dev",data,{
    headers:{
      Accept:"application/json",
      "Content-Type":"application.json"
    }})
    .then(res=>{
      
      setFiles([])
      setRes(randomm+".png");
    }).catch(err=>{
      console.log(err);
    })
}

 useEffect(()=>{
   if(Res){
    
   
   const data=Res;
   const datas= JSON.stringify(data);
   
  axios.post("https://ul23a5fp40.execute-api.us-east-1.amazonaws.com/dev/ocr",datas,{
  headers:{
    Accept:"application/json",
   
    "Content-Type":"application.json"
  }}).then(res=>{
    
    
    setAmount(res.data.body[0]);
    setInvoice(res.data.body[1]);
    setDate(res.data.body[2]);
    setRes(false)
    setLoading("Extraction completed")
  }).catch(err=>{
    console.log(err)
  })
}
 },[Res])
  return (
    <div className="container-fluid">
     
    <div className="col-6 offset-3  ">

    <Form className="_thisform  p-3" >

      <FormGroup>
        {loading}
      </FormGroup>
      
      <FormGroup className=" files color ">

        <FileBase64 multiple={true} value={Files} onDone={getFiles} ></FileBase64>

      </FormGroup>
    
      <FormGroup >
        <Label className="Label">
        <h5> Invoice</h5>
        </Label>
        <Input type= "text" name="Invoice" value={invoice} id="Invoice" required />
      </FormGroup>

      <FormGroup >
        <Label className="Label">
        <h5> Amount</h5>
        </Label>
        <Input type ="text" name ="Amount" id="Amount" value={Amount} required />
      </FormGroup>

      <FormGroup>
        <Label className="Label">
        <h5> Date</h5>
        </Label>
        <Input type ="text" name ="Date" id="Date" value={Date} required />
      </FormGroup>

      <FormGroup>
        <Label className="Label">
        <h5> Description</h5>
        </Label>
        <Input type ="text" name ="description" id="description" required /> 
      </FormGroup>

      <FormGroup>
        <Label className="Label">
          <h5> Vender</h5>
        </Label>
        <Input type ="text" name ="vender" id="vender" required />
      </FormGroup>


       <Button className="_button"  type="submit" outline color="primary"><div>Submit</div></Button>
       
      </Form>
    </div >
    </div>
  )
}

export default Signin
