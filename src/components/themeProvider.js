import * as React from "react";
import {ThemeProvider as EmotionThemeProvider} from "emotion-theming";
import {default as defaultTheme} from "./theme";
import Header from './Header';
import './styles.scss';

// ({children, theme = {}, location})
class ThemeProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isIframeLoaded: false};
  }

  componentDidMount() {
    const parentUrl = (window.location !== window.parent.location) ? document.referrer : document.location.href;
    const checkParent = parentUrl.indexOf('/dash') !== -1; // check that is loaded in the hypi.app
    if (checkParent) this.setState({isIframeLoaded: true});   // update the state
  };

  render() {
    return (
      <div>
        <Header location={this.location} hideHeader={this.state.isIframeLoaded ? "hideHeader" : ""}/>
        <EmotionThemeProvider theme={{...defaultTheme, ...this.theme}}>
          {this.props.children}
        </EmotionThemeProvider>
      </div>
    );
  }
}

export default ThemeProvider;
