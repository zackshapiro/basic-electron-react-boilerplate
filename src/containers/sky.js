import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {requestSkySetup} from '../entities/sky/actions';
import {getSky} from '../entities/sky/getters';

import {requestAllElements, requestCreateElement} from '../entities/elements/actions';
import {getElementsByKeyName} from '../entities/elements/getters';

import Panel from '../components/panel';

import Sector from '../containers/sector';
import Dock from '../containers/dock';

class Sky extends Component {
    constructor(props) {
        super(props);

        // this.createElementInDock = this.createElementInDock.bind(this);

        this.generateSectors = this.generateSectors.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
        this.showSlotView = this.showSlotView.bind(this);
        this.showElementCreateView = this.showElementCreateView.bind(this);

        this.state = {
            loadedSky: false,
            loadedElements: false,
            panelIsOpen: false,
            panelType: {
                type: null,
                sectorId: null,
                slotId: null,
            }, // TODO on panel close, set all to null back to null
        };
    }

    generateSectors(showAll = false) {
        // debugger;
        return this.props.sectors.map((sector) => (
            <Sector id={sector.id}
                key={`sky-key-${sector.id}`}
                sectorNumber={sector.sectorNumber}
                title={sector.title}
                showAllSlotOutlines={showAll}
                showSlotView={this.showSlotView}
                showElementCreateView={this.showElementCreateView} />
        )).reverse();
    }

    // createElementInDock() {
        // const element = {id: `id-${Math.random()}`, title: 'New Element', size: 400, opacity: 0.8, glow: 0.5, color: '#4d96ce'};
        // this.props.dispatch(requestCreateElement(element));
    // }

    togglePanel(panelType) {
        this.setState({
            panelIsOpen: !this.state.panelIsOpen,
            panelType: panelType || { type: null, sectorId: null, slotId: null },
        });
    }

    showSlotView(sectorId, slotId) {
        // console.log(`show slot ${slotId}`);
        this.togglePanel({
            type: 'slotView',
            sectorId,
            slotId,
        });
    }

    showElementCreateView(sectorId, slotId) {
        // console.log(`show element create view ${sectorId} ${slotId}`);
        this.togglePanel({
            type: 'elementCreate',
            sectorId,
            slotId,
        });
    }

    componentWillMount() {
        this.props.dispatch(requestSkySetup());
        this.props.dispatch(requestAllElements());

        this.setState({loadedSky: true, loadedElements: true});
    }

    render() {
        console.log(process.env.NODE_ENV);

        return (
            <div className="sky">
                { this.generateSectors(this.props.unplacedElements.length > 0) }

                <Dock />

                <Panel
                    active={this.state.panelIsOpen}
                    onToggleSlide={this.togglePanel}
                    panelType={this.state.panelType} />
            </div>
        );
    }
};

Sky.propTypes = {
    sectors: PropTypes.array,
    elements: PropTypes.array,
    unplacedElements: PropTypes.array,
    dispatch: PropTypes.func,
};

const mapStateToProps = ({sky, elements}) => {
    return {
        sectors: getSky(sky).sectors,
        elements: getElementsByKeyName(elements, 'visibleElements'),
        unplacedElements: getElementsByKeyName(elements, 'unplacedElements'),
    };
};

export default connect(mapStateToProps)(Sky);
