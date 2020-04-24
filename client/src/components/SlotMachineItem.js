import React from 'react';

class SlotMachineItem extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        console.log(this.props.spin);
        return (
            <tr>
                <td>
                    {this.props.spin.spins.map(spin => {
                        return <span>{spin} </span>
                    })}
                </td>
                <td>
                    {this.props.spin.reward}
                </td>
            </tr>

        );
    }
}

export default SlotMachineItem;