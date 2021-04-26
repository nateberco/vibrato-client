import * as React from 'react';
import { Component } from 'react';

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
                <h1>THIS is HOME PAGE COMPONENT, hi </h1>
            </div>
          );
    }
}
 
export default Home;