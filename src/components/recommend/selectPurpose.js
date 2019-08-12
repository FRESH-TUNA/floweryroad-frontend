import React from 'react'
import  '../../css/components/selectPurpose.css'

class SelectPurpose extends React.Component {
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
            <div>
                i am purpose
            </div>
        );
    }
}

export default SelectPurpose;