import React, { Component, PropTypes } from 'react';

import {requestUpdateElement} from '../entities/elements/actions';

import { DragSource } from 'react-dnd';
import { ItemTypes } from './dnd-constants';

import { lightenDarkenColor } from '../helpers/color';


const elementSource = {
    beginDrag(props) {
        return { elementId: props.id };
    },

    endDrag(props, monitor) {
        if (monitor.didDrop()) {
            const result = monitor.getDropResult();
            const obj = { id: props.id, sectorId: result.sectorId, slotId: result.slotId };

            props.dispatch(requestUpdateElement(obj));
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class SkyElement extends Component {
    constructor(props) {
        super(props);

        this.radialGradient = this.radialGradient.bind(this);
        this.boxShadow = this.boxShadow.bind(this);
        this.editElement = this.editElement.bind(this);
    }

    radialGradient() {
        return `radial-gradient(78.93px at 58.27% 29.92%, ${this.props.color}  0%, ${lightenDarkenColor(this.props.color, -20)} 100%)`;
    }

    boxShadow() {
        // TODO later: "box-shadow": "0px 0px 70px #{Color.mix(color, c, 0.5)}, inset 0px 0px 17px rgba(169, 209, 221, 1.0)" (mixes base color in)
        if (this.props.glow) {
            return `0px 0px 70px rgba(190, 201, 254, ${this.props.glow}), inset 0px 0px 17px rgba(169, 209, 221, 1.0)`;
        } else {
            // omits the outer glow for dock use
            return `inset 0px 0px 17px rgba(169, 209, 221, 1.0)`;
        }
    }

    editElement(e) {
        // this.props.toggleEditPanel(this);
        // console.log(this.props.title);
        // this needs to trigger the panel to slide out, with the element
    }

    render() {
        const { connectDragSource, isDragging, transformElement } = this.props;

        const halfSize = this.props.size / 2;
        const transform = transformElement ? `translate(-50%, -50%)` : '';

        const style = {
            width: `${this.props.size}px`,
            height: `${this.props.size}px`,
            borderRadius: '50%',
            background: this.radialGradient(),
            opacity: isDragging ? 0.2 : this.props.opacity,
            boxShadow: this.boxShadow(),
            transform,
            transition: 'background 0.2s',
        };

        return connectDragSource(
            <div onClick={this.editElement} className='element' style={style} />
        );
    }
};

SkyElement.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    title: PropTypes.string,
    size: PropTypes.number,
    opacity: PropTypes.number,
    glow: PropTypes.number,
    color: PropTypes.string,
    toggleEditPanel: PropTypes.func,
    sectorId: PropTypes.number,
    slotId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    transformElement: PropTypes.bool,
};

SkyElement.defaultProps = {
    transformElement: true,
};

export default DragSource(ItemTypes.ELEMENT, elementSource, collect)(SkyElement);
