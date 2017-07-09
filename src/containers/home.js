import React, { Component, PropTypes } from 'react';

import {connect} from 'react-redux';

import {getElementsByKeyName} from '../entities/elements/getters';

import {getLoggedInUser} from '../entities/auth/getters';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import MenuBar from '../containers/menubar';
import Sky from '../containers/sky';

class Home extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     editElement: false,
        //     elementToEdit: null,
        // };
    }

    render() {
        const {elements} = this.props;

        return (
            <section className="main-content">
                <MenuBar />

                <Sky />
            </section>
        );
    }
};

Home.propTypes = {
    elements: PropTypes.array,
    dispatch: PropTypes.func,
    user: PropTypes.object,
};

// we are combining reducers now, so we can pluck out only the parts of the store we need
const mapStateToProps = ({elements, auth}) => {
    return {
        elements: getElementsByKeyName(elements, 'visibleElements'),
        user: getLoggedInUser(auth), // TODO: get this working
    };
};

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(Home));
