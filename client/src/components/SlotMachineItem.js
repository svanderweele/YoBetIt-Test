import React from 'react';

class SlotMachineItem extends React.Component {



    render() {
        return (
            <tr>
                <td>
                    {this.props.spin.results.map(result => {
                        return <span>{result} </span>
                    })}
                </td>
                <td>
                    100 coins
                </td>
            </tr>

        );
    }
}

export default SlotMachineItem;