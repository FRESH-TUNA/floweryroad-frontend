import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

import '../../css/components/loading.css'

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="loading">
        <ScaleLoader
          height={50}
          width={5}
          color={"#FFB6C1"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loading;
