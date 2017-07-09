import React, { Component, PropTypes } from 'react';

import ElementBuilder from '../containers/element-builder';
import SlotView from '../containers/slot-view';

import SkyElement from '../components/sky-element';

class Panel extends Component {
    constructor(props) {
        super(props);

        this.isActive = this.isActive.bind(this);
    }

    isActive() {
        return this.props.active ? 'panel active' : 'panel';
    }

    // i should pass the sector and slotids into ElementBuilder too, eventually
    // TODO when you click on an element, show a spinner as the slot view changes to an element edit view. then the user can go back to the slot view
    render() {
        return (
            <div className={this.isActive()}>
                {
                    this.props.panelType.type === 'slotView'
                    ? <SlotView
                        sectorId={this.props.panelType.sectorId}
                        slotId={this.props.panelType.slotId}
                        goBack={this.props.onToggleSlide} />
                    : <ElementBuilder togglePanel={this.props.onToggleSlide} />
                }
            </div>
        );
    }
};

Panel.propTypes = {
    active: PropTypes.bool.isRequired,
    onToggleSlide: PropTypes.func,
    panelType: PropTypes.object,
};

export default Panel;
