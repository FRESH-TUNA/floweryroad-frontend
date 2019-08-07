import React from 'react'
import  '../../css/selectColor.css'

class SelectColor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 1
        }
        this.blockPropagate = this.blockPropagate.bind(this)
    }
    blockPropagate(event) {
        event.stopPropagation()
    }
    
    render() {
        return (
            <div className="select-color">
                iam color
            </div>
        );
    }

}

export default SelectColor