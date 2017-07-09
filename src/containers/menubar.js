import React, { Component } from 'react';

class MenuBar extends Component {
    render() {
        return (
            <div className="menu-bar">
                <img src="../../images/glimpse-menu-bar.svg" />

                <div className="nav">
                    <a className="selected" href="#">Sky</a>
                    <a href="#">HQ</a>
                    <a href="#">Settings</a>
                </div>
            </div>
        );
    }
}

export default MenuBar;
