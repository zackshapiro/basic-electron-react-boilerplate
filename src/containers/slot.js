import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {getElementsBySlotId} from '../entities/elements/getters';
import {canMoveElement, moveElement} from '../entities/elements/dnd-actions';

import SkyElement from '../components/sky-element';

import { ItemTypes } from '../components/dnd-constants';
import { DropTarget, DropSource } from 'react-dnd';

const slotTarget = {
    drop(props) {
        // moveElement(props.x, props.y);
        return { slotId: props.id, sectorId: props.sectorId };
    },

    // todo: prevent double-drop from dock on same slot
    canDrop(props) {
        // return canDropElement(props.x, props.y); // reinstate this?

        return true;
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

class Slot extends Component {
    constructor(props) {
        super(props);

        // this.renderOverlay = this.renderOverlay.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.slotHasElements = this.slotHasElements.bind(this);
        this.showSlotView = this.showSlotView.bind(this);
        this.showElementCreateView = this.showElementCreateView.bind(this);
    }

    slotHasElements() {
        return this.props.elements.length > 0;
    }

    // used for when multiple elements exist in a slot
    showSlotView(sectorId, slotId) {
        this.props.showSlotView(sectorId, slotId);
    }

    // used when only 1 element exists in a slot
    showElementCreateView(sectorId, slotId) {
        this.props.showElementCreateView(sectorId, slotId);
    }

    handleClick() {
        this.slotHasElements()
        ? this.showSlotView(this.props.sectorId, this.props.id)
        : this.showElementCreateView(this.props.sectorId, this.props.id);
    }

    // renderOverlay(color) {
        // return (
        //     <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', opacity: 0.5, backgroundColor: color}} />
        // );
    // }

    render() {
        const { x, y, connectDropTarget, isOver, canDrop, elements } = this.props;

        let style = {};
        if (this.props.slotNumber === 0) {
            style = {
                marginTop: '0px',
                marginLeft: '-160px',
                top: '38px',
            };
        } else if (this.props.slotNumber === 1) {
        } else if (this.props.slotNumber === 2) {
            style = { top: '4px' };
        } else if (this.props.slotNumber === 3) {
            style = { top: '46px' };
        }

        return connectDropTarget(
            <div className={this.props.showOutline ? 'slot showOutline' : 'slot'} style={style} onClick={this.handleClick}>
                {
                    elements
                    .map(e => (
                        <SkyElement
                            id={e.id}
                            key={`element-id-${e.id}`}
                            title={e.title}
                            size={150}
                            opacity={e.opacity}
                            glow={e.glow}
                            color={e.color}
                            sectorId={e.sectorId}
                            slotId={e.id}
                            dispatch={this.props.dispatch}
                            isDragging={false}
                            transformElement={false} />
                    ))
                }
            </div>
        );
    }
};

Slot.propTypes = {
    id: PropTypes.number.isRequired,
    slotNumber: PropTypes.number.isRequired,
    sectorId: PropTypes.number.isRequired,
    sectorNumber: PropTypes.number.isRequired,
    elements: PropTypes.array,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    dispatch: PropTypes.func,
    showOutline: PropTypes.bool.isRequired,
    showSlotView: PropTypes.func.isRequired,
    showElementCreateView: PropTypes.func.isRequired,
};

const mapStateToProps = ({elements}, ownProps) => {
    return {
        elements: getElementsBySlotId(elements, ownProps.id),
    };
};

Slot = DropTarget(ItemTypes.ELEMENT, slotTarget, collect)(Slot);
export default connect(mapStateToProps)(Slot);
