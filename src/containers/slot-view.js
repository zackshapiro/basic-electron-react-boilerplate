import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {requestCreateElement} from '../entities/elements/actions';
import {getElementsBySlotId} from '../entities/elements/getters';
import {createElementSaga} from '../entities/elements/sagas';

import SkyElement from '../components/sky-element';

class SlotView extends Component {
    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.saveSlot = this.saveSlot.bind(this);
        this.createNewElement = this.createNewElement.bind(this);
    }

    goBack() {
        // We might want to check in here for unsaved stuff
        this.props.goBack();
    }

    saveSlot() {
        console.log('save slot');
        // should hit an update endpoint to update slot and element properties

        this.props.goBack();
    }

    createNewElement() {
        const element = { title: '???', size: 150, opacity: 0.8, glow: 0.5, color: '#161717', sectorId: this.props.sectorId, slotId: this.props.slotId };

        this.props.dispatch(requestCreateElement(element));
    }

    render() {
        const {elements} = this.props;

        return (
            <div className={'slot-view'}>
                <div className='slot-view-bar'>
                    <div className='back-button'>
                        <img src="../images/back-button.svg" onClick={this.goBack} />
                    </div>

                    <a href='#' className='save-button' onClick={this.saveSlot}>Save</a>
                </div>

                <div className='slot-view-elements-container'>
                    {
                        elements.map(e => (
                            <SkyElement
                                id={e.id}
                                key={`id-${e.id}`}
                                title={e.title}
                                size={e.size}
                                opacity={e.opacity}
                                color={e.color}
                                dispatch={this.props.dispatch}
                                transformElement={false} />
                        ))
                    }
                </div>

                <div className='slot-view-footer-bar'>
                    <a href='#' className='add-new-element' onClick={this.createNewElement}>
                        <img src='../images/circular-plus-button.svg' />
                        <span>Add Element</span>
                    </a>
                </div>
            </div>
        );
    }
};

SlotView.propTypes = {
    sectorId: PropTypes.number.isRequired,
    slotId: PropTypes.number.isRequired,
    goBack: PropTypes.func, // TODO make required
    elements: PropTypes.array,
    dispatch: PropTypes.func,
};

const mapStateToProps = ({elements}, ownProps) => {
    return {
        elements: getElementsBySlotId(elements, ownProps.slotId),
    };
};

export default connect(mapStateToProps)(SlotView);
