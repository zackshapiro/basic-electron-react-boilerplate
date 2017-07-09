import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {requestAllElements} from '../entities/elements/actions';

import {getAllUnplacedElements} from '../entities/elements/getters';

import SkyElement from '../components/sky-element';

class Dock extends Component {
    constructor(props) {
        super(props);

        this.isActive = this.isActive.bind(this);

        this.state = {
            active: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            const active = nextProps.elements.length !== 0;

            if (active !== prevState.active) {
                return { active: nextProps.elements.length !== 0 };
            } else {
                return {};
            }
        });
    }

    isActive() {
        return this.state.active ? 'dock-container active' : 'dock-container';
    }

    render() {
        const {elements} = this.props;

        return (
            <div className={this.isActive()}>
                <div className="dock-scrollable">
                    {
                        elements.map(e => (
                            <SkyElement
                                id={e.id}
                                key={`id-${e.id}`}
                                title={e.title}
                                size={120}
                                opacity={e.opacity}
                                color={e.color}
                                dispatch={this.props.dispatch}
                                transformElement={false} />
                        ))
                    }
                </div>
            </div>
        );
    }
};

Dock.propTypes = {
    elements: PropTypes.array,
    dispatch: PropTypes.func,
};

const mapStateToProps = ({elements}) => {
    return {
        elements: getAllUnplacedElements(elements, 'unplacedElements'),
    };
};

export default connect(mapStateToProps)(Dock);
