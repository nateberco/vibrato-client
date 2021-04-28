import * as React from 'react';
// import { Component } from 'react';
import '../home/Home.css'

export interface Props {
    
}
 
export interface State {
    
}
 
class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {null : null };
    }
    render() { 
        return (
            <div>
                <h1 className="test">THIS is HOME PAGE COMPONENT, hi </h1>
            </div>
          );
    }
}
 
export default Home;