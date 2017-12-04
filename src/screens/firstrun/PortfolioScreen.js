import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { AlertIOS, KeyboardAvoidingView } from 'react-native';

import Container from '../../components/firstrun/ContainerComponent';
import Input from '../../components/firstrun/InputComponent';

@inject('cryptos') @observer
export default class AssetsScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Create an empty state.
   */
  constructor () {
    super();
    this.state = {portfolioName: ''};
  }

  /**
   * Add a new portfolio to the store.
   */
  onSubmit = async () => {
    const portfolioName = this.state.portfolioName;

    // Check for empty names.
    if (portfolioName === '') {
      return AlertIOS.alert('Please enter a portfolio name.');
    }

    // Try to add the portfolio.
    try {
      await this.props.cryptos.createPortfolio(portfolioName);
      this.props.navigator.resetTo({
        screen: 'CR.FR.AssetsOverviewScreen',

        navigatorStyle: {
          navBarHidden:             true,
          statusBarTextColorScheme: 'light',
        },
      });
    } catch (e) {
      AlertIOS.alert('Oops, something went wrong. Please try again!');
    }
  };

  /**
   * Render the body for the container component.
   */
  renderAction = () => (
    <Input
      onChangeText={value => this.setState({portfolioName: value})}
      onSubmitEditing={this.onSubmit}
      label={'Portfolio name'}/>
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: this.onSubmit},
    ];

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
        <Container
          title={'New Portfolio'}
          buttons={buttons}
          body={'The CoinResults app allows you to register multiple portfolios. It is always' +
          ' possible to add a new portfolio, but for now, let\'s start with one.'}
          action={this.renderAction()}/>
      </KeyboardAvoidingView>
    );
  }
}
