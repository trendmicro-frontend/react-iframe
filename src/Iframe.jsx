/* eslint jsx-a11y/iframe-has-title: 0 */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

const mapSandboxToString = (sandbox = '') => {
    if (typeof sandbox === 'string') {
        return sandbox;
    }
    sandbox = { ...sandbox };
    return Object.keys(sandbox)
        .filter(key => sandbox[key])
        .map(s => s.replace(/[A-Z]/g, '-$&').toLowerCase())
        .join(' ');
};

class Iframe extends PureComponent {
    static propTypes = {
        sandbox: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                // Re-enables form submission
                allowForms: PropTypes.bool,

                // Sandboxed frames will block modal dialogs by default
                allowModals: PropTypes.bool,

                // Re-enables APIs
                allowPointerLock: PropTypes.bool,

                // Re-enables popups
                allowPopups: PropTypes.bool,

                // Allows the iframe content to be treated as being from the same origin
                allowSameOrigin: PropTypes.bool,

                // Re-enables scripts
                allowScripts: PropTypes.bool,

                // Allows the iframe content to navigate its top-level browsing context
                allowTopNavigation: PropTypes.bool
            })
        ])
    };
    static defaultProps = {
        frameBorder: 0,
        width: '100%',
        height: '100%',
        sandbox: {
            allowForms: true,
            allowModals: true,
            allowPointerLock: false,
            allowPopups: true,
            allowSameOrigin: true,
            allowScripts: true,
            allowTopNavigation: false
        }
    };

    get iframe() {
        const iframe = ReactDOM.findDOMNode(this);
        return iframe;
    }
    get contentWindow() {
        const iframe = ReactDOM.findDOMNode(this);
        const { contentWindow } = { ...iframe };
        return contentWindow;
    }
    render() {
        const props = { ...this.props };
        const sandbox = mapSandboxToString(props.sandbox);
        delete props.sandbox;

        return (
            <iframe
                sandbox={sandbox}
                {...props}
            />
        );
    }
}

export default Iframe;
