import React from 'react';

import Left from "./Left/Left";
import Right from "./Right/Right";

class App extends React.Component {

    render() {
        return (
            <div className="container py-5 px-4">
                <div className="row rounded-lg overflow-hidden shadow">
                    <Left/>
                    <Right/>
                </div>
            </div>

        );
    }
}

export default App;