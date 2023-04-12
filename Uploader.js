import React, {Component} from 'react';
import ReactS3 from 'react-s3';
import { ReactDOM } from 'react-dom';
import axios from 'axios';

// const axios = require("axios").default;
const API_ENDPOINT = "";
class Uploader extends Component{
    state = {
  
        // Initially, no file is selected
        selectedFile: null
      };
       
   
    constructor(props){
        super(props)
        this.state={
            Textinput: ''
        }
    }
    onFileChange = (event) => {
        console.log(event.target.files[0])   
        // setSelectedFile(event.target.files[0]);  
        this.setState({ selectedFile: event.target.files[0] });    
    }
    submitFile = async (files) => {
        console.log(this.state.selectedFile);
        const f = files[0];
        
        console.log(API_ENDPOINT);
        // * GET request:   URL
        const response = await axios({
          method: "GET",
          url: API_ENDPOINT,
          
        });

        console.log("Response: ", response);

        // * PUT request: upload file to S3
        const result = await fetch(response.data.uploadURL, {
          method: "PUT",
          headers: {
            "Content-Type": "Inputfile/txt"
          },
          body: this.state.selectedFile[0],
        });
        console.log("Result: ", result);
    };
    
    

    handleTextinputChange = (event) => {
        this.setState({
            Textinput: event.target.value
        })
    }
    render(){
        return(
            <><div>
                <label>Text input: </label>
                <input type='text' value={this.state.Textinput} onChange={this.handleTextinputChange} />
            </div>
            <div>
                <label>File input: </label>
                <input type="file" name="file_upload" onChange={this.onFileChange}/>
            </div>
            <div>
                 <button onClick={this.submitFile}>Submit</button>
            </div></>
            
        )
    }
}

export default Uploader




