import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
// only 2 things listen to actions: reducers and sagas

import {requestCreateElement} from '../entities/elements/actions';

import tinycolor from 'tinycolor2';

import {HueRotate} from 'gl-react-hue-rotate';

import SkyElement from '../components/sky-element';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class ElementBuilder extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeGlow = this.changeGlow.bind(this);
        this.changeOpacity = this.changeOpacity.bind(this);
        this.changeColorHue = this.changeColorHue.bind(this);
        this.saveElement = this.saveElement.bind(this);
        this.updateElement = this.updateElement.bind(this);

        this.state = {
            title: this.props.elementToEdit ? this.props.elementToEdit.title : 'NYU Law',
            size: 400,
            opacity: 1.0,
            glow: 0.5,
            color: '#4d96ce',
        };
    }

    handleChange(e) {
        this.setState({title: e.currentTarget.value});
    }

    changeSize(size) {
        this.setState({size});
    }

    changeGlow(glow) {
        this.setState({glow});
        // handler.element.style["box-shadow"] = "0px 0px 70px rgba(190, 201, 254, #{slider.value}), inset 0px 0px 17px #A9D1DD" # 17 was 34 before, should be proprtional to size of element
    }

    changeOpacity(opacity) {
        this.setState({opacity});
    }

    changeColorHue(color) {
        // TODO: factor in the radial gradient
        console.log(color);
        // console.log((color - -360) / 0.00001)
        // console.log(Math.round((color - -360) / 0.00001) * 0.00001 + -360);

        // console.log(color);
        // console.log(tinycolor(this.state.color).spin(color).toString());

        this.setState((prevState) => ({color: tinycolor('#4d96ce').spin(color).toString()}));
        // keep degree of spin in state and in the database
        // original color as a constant (randomly generated color or one from a pallate)

        // TODO: do this more smoothly so it doesn't give people seizuers
    }

    // TODO: get sector_number and slot_number working with props

    // XXX Next
    // TODO: need to do an update call if editing rather than creating new one
    // TODO: after i do this ^, fix the scale of the ones i already have and we good to go
    saveElement(e) {
        this.props.dispatch(requestCreateElement({id: `id-${Math.random()}`, title: this.state.title, size: this.state.size, opacity: this.state.opacity, glow: this.state.glow, color: this.state.color, sectorNumber: 1, slotNumber: 1 }));

        // this.props.togglePanel();
    }

    updateElement(e) {
        this.props.dispatch(requestUpdateElement({}));

        // this.props.togglePanel();
    }

    render() {
        {
            if (this.props.elementToEdit) {
                console.log(this.props.elementToEdit.color);
            }
        }

        return (
            <div className="element-builder-container">
                <div className="left-side">
                    <a href='#' className='close-button' onClick={this.props.togglePanel}>X</a>

                    // in here, use scale
                    // in css, inside of element-builder, use scale(1.3) or something like that

                    <SkyElement
                        title={this.state.title}
                        size={this.state.size}
                        opacity={this.state.opacity}
                        glow={this.state.glow}
                        color={this.state.color}
                        dispatch={this.props.dispatch} />

                    <input className='element-input' onChange={this.handleChange} value={this.state.title} style={{ 'position': 'relative', 'top': '55%' }} />
                </div>

                <div className="right-side" >
                    <div className="attributes-holder">
                        <h3>Shine</h3>
                        <Slider className="glow-slider" min={0.3} max={0.9} step={0.01} defaultValue={this.state.glow} onChange={this.changeGlow} />

                        <h3>Opacity</h3>
                        <Slider className="opacity-slider" min={0.5} max={1.0} step={0.01} defaultValue={this.state.opacity} onChange={this.changeOpacity} />

                        <h3>Color</h3>
                        <Slider className="color-slider" min={0.00000} max={360.00000} defaultValue={180.00000} step={0.00001} onChange={this.changeColorHue} />

                        <h3>Size</h3>
                        <Slider className="size-slider" min={50} max={250} defaultValue={this.state.size} onChange={this.changeSize} />
                    </div>

                    <button onClick={this.saveElement}>Save Element</button>
                </div>
            </div>
        );
    }
};

ElementBuilder.propTypes = {
    dispatch: PropTypes.func,
    togglePanel: PropTypes.func, // these 2 can prob go
    elementToEdit: PropTypes.object,
    sectorId: PropTypes.number, // these should be sectorNumber and slotNumber
    slotId: PropTypes.number,
};

// this is useless right now
const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(ElementBuilder);
