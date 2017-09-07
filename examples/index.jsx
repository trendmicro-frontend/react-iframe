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
        }
    };
    timer = null;
    iframes = {
        fixed: null
    };
    resizeIframeWidth = debounce(() => {
        Object.keys(this.iframes).forEach(key => {
            const iframe = ReactDOM.findDOMNode(this.iframes[key]);
            const target = iframe.contentDocument.body;
            this.setState(state => ({
                [key]: {
                    ...state[key],
                    width: target ? target.offsetWidth : 0
                }
            }));
        });
    }, 100);

    componentDidMount() {
        window.addEventListener('resize', this.resizeIframeWidth);

        setTimeout(() => {
            this.resizeIframeWidth();
        }, 0);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeIframeWidth);
    }
    render() {
        const name = 'React Iframe';
        const url = 'https://github.com/trendmicro-frontend/react-iframe';

        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-sm-12">
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
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Resize iframe to fit content (same domain only)</h3>
                        </div>
                        <div className="col-sm-6">
                            <h5>MutationObserver</h5>
                            <Iframe
                                ref={node => {
                                    if (!node) {
                                        return;
                                    }

                                    const iframe = ReactDOM.findDOMNode(node);
                                    iframe.addEventListener('load', () => {
                                        const target = iframe.contentDocument.body;
                                        const nextHeight = target.scrollHeight;
                                        iframe.style.height = `${nextHeight}px`;

                                        const observer = new MutationObserver(mutations => {
                                            const nextHeight = target.scrollHeight;
                                            iframe.style.height = `${nextHeight}px`;
                                        });
                                        observer.observe(target, {
                                            attributes: true,
                                            childList: true,
                                            characterData: true,
                                            subtree: true
                                        });
                                    });
                                }}
                                src="./iframe.html"
                                style={{
                                    width: '100%',
                                    marginBottom: 20
                                }}
                            />
                        </div>
                        <div className="col-sm-6">
                            <h5>Polling every 200ms</h5>
                            <Iframe
                                ref={node => {
                                    if (this.timer) {
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }

                                    if (!node) {
                                        return;
                                    }

                                    const iframe = ReactDOM.findDOMNode(node);
                                    iframe.addEventListener('load', () => {
                                        const target = iframe.contentDocument.body;
                                        const nextHeight = target.scrollHeight;
                                        iframe.style.height = `${nextHeight}px`;

                                        this.timer = setInterval(() => {
                                            const nextHeight = target.scrollHeight;
                                            iframe.style.height = `${nextHeight}px`;
                                        }, 200);
                                    });
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
