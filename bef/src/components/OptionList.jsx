import React, { useState,useEffect } from "react";
import Overlay from "./Overlay";
import "./OptionList.css"

class OptionList extends React.Component {
  constructor(props) {
		super(props);
    this.state = {
      options : [],
      len : 0,
      name : props.name,
      single : props.single,
      showOverlay: false
    }
  }

  componentDidMount(){
    var temp = JSON.parse(localStorage.getItem(this.state.name))
    if(temp !== null){
      this.setState(prevState => {
        return {len:temp.length,
                options:temp}
      })
    }
  }

  toggleOverlay(){
    this.setState({showOverlay:!this.state.showOverlay})
  }

  addOption(option) {
    this.state.options.push({ option, selected: false });
    this.setState(prevState => {
      return { len: prevState.len + 1 };
    }, ()=>{this.save()})
  }

  selectOption(index) {
    this.setState({
      options: this.state.options.map((option, idx) => {
                if (idx === index) {
                  return { ...option, selected: !option.selected };
                }else{
                  return this.state.single? {...option, selected: false} : option;
                }
              })
    },()=>{this.save()})
  }

  deleteOption(index) {
    this.state.options.splice(index, 1);
    this.setState(prevState => {
      return { len: prevState.len - 1 };
    }, ()=>{this.save()})
  }

  save(){
    localStorage.setItem(this.state.name, JSON.stringify(this.state.options))
  }


  render() {
    return (
      <div className="optionlist-container">
        <ul>
          {this.state.options.map((opt, index) => (
            <li key={index}>
              <button onClick={() => this.selectOption(index)}>{opt.option}</button>
              <button onClick={() => this.deleteOption(index)}>Delete</button>
            </li>
          ))}
        </ul>
        {this.state.showOverlay && 
          <Overlay 
            onConfirm={(input) => {this.addOption(input);this.toggleOverlay()}} 
            onCancel={() => this.setState({showOverlay: false})}/>}
        <button className="add-opt-btn" onClick={() => this.toggleOverlay()}>Add option</button>
      </div>
    );
  }
}
export default OptionList;
