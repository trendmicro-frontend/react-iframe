import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import debounce from 'lodash/debounce';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Iframe from '../src';

class App extends PureComponent {
    state = {
        fixed: {
            width: 0,
            height: 240
        },
        resizable: {
            width: 0,
            height: 0
        }
    };
    timer = null;
    iframes = {
        fixed: null,
        resizable: null
    };
    resizeIframes = debounce(() => {
        Object.keys(this.iframes).forEach(key => {
            const iframe = ReactDOM.findDOMNode(this.iframes[key]);
            this.setState(state => ({
                [key]: {
                    ...state[key],
                    width: iframe.contentWindow.document.body.offsetWidth
                }
            }));
        });
    }, 100);

    componentDidMount() {
        window.addEventListener('resize', this.resizeIframes);

        setTimeout(() => {
            this.resizeIframes();
        }, 0);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeIframes);
    }
    render() {
        const name = 'React Iframe';
        const url = 'https://github.com/trendmicro-frontend/react-iframe';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <h3>Iframe with fixed height</h3>
                            {this.state.fixed.width > 0 && this.state.fixed.height > 0 &&
                            <p>width: {this.state.fixed.width}, height: {this.state.fixed.height}</p>
                            }
                            <Iframe
                                ref={node => {
                                    this.iframes.fixed = node;
                                }}
                                src="./iframe.html"
                                style={{
                                    width: '100%',
                                    height: this.state.fixed.height,
                                    marginBottom: 20
                                }}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h3>Resize iframe to fit content (same domain only)</h3>
                            {this.state.resizable.width > 0 && this.state.resizable.height > 0 &&
                            <p>width: {this.state.resizable.width}, height: {this.state.resizable.height}</p>
                            }
                            <Iframe
                                ref={node => {
                                    if (this.timer) {
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }

                                    this.iframes.resizable = node;

                                    if (!node) {
                                        return;
                                    }

                                    const iframe = ReactDOM.findDOMNode(node);
                                    if (iframe && iframe.contentWindow) {
                                        this.timer = setInterval(() => {
                                            const nextHeight = iframe.contentWindow.document.body.offsetHeight;
                                            if (this.state.resizable.height !== nextHeight) {
                                                iframe.style.height = nextHeight + 'px';
                                                this.setState(state => ({
                                                    resizable: {
                                                        ...state.resizable,
                                                        height: nextHeight
                                                    }
                                                }));
                                            }
                                        }, 200);
                                    }
                                }}
                                src="./iframe.html"
                                style={{
                                    width: '100%',
                                    marginBottom: 20
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
