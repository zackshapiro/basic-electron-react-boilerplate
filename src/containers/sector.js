import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {getSky} from '../entities/sky/getters';
import {getElementsByKeyName} from '../entities/elements/getters';

import Slot from '../containers/slot';

class Sector extends Component {
    constructor(props) {
        super(props);

        this.generateSlots = this.generateSlots.bind(this);
        this.sectorTitleChanged = this.sectorTitleChanged.bind(this);
    }

    generateSlots() {
        const slots = this.props.slots.filter(slot => {
            return slot.sectorNumber === this.props.sectorNumber;
        });

        return slots.map((slot) => (
            <Slot id={slot.id}
                key={`sector-key-${slot.id}`}
                slotNumber={slot.slotNumber}
                sectorId={this.props.id}
                sectorNumber={slot.sectorNumber}
                x={0}
                y={0}
                showOutline={this.props.elements.filter(e => e.slotId === slot.id).length === 0}
                showSlotView={this.props.showSlotView}
                showElementCreateView={this.props.showElementCreateView}
                />
        ));
    }

    sectorTitleChanged(e) {
        this.setState({title: e.currentTarget.value});
    }

    render() {
        let style = {};

        if (this.props.sectorNumber === 0) {
            style = { top: '60%' };
        } else if (this.props.sectorNumber === 3) {
            style = { top: '70%' };
        }

        return (
            <div className="sector-container">
                <div className="sector">
                    <input value={this.props.title} onChange={this.sectorTitleChanged} style={style} />

                    {this.generateSlots()}
                </div>
            </div>
        );
    }
};

Sector.propTypes = {
    id: PropTypes.number.isRequired,
    sectorNumber: PropTypes.number.isRequired,
    title: PropTypes.string,
    slots: PropTypes.array,
    elements: PropTypes.array,
    showAllSlotOutlines: PropTypes.bool.isRequired,
    showSlotView: PropTypes.func.isRequired,
    showElementCreateView: PropTypes.func.isRequired,
};

// TODO: refactor to use getElementsBySectorId
const mapStateToProps = ({sky, elements}) => {
    return {
        slots: getSky(sky).slots,
        elements: getElementsByKeyName(elements, 'visibleElements'),
    };
};

export default connect(mapStateToProps)(Sector);
