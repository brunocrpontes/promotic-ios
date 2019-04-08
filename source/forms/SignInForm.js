import _ from "lodash";
import * as React from "react";
import {
  Button,
  TextInput,
  Divider,
  Text,
  HelperText
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import NavigationService from "../routes/NavigationService";
import { connect } from "react-redux";
import { createLoadingSelector } from "../reducers/loading";
import { Prefix as UserPrefix } from "../reducers/user";
import { login } from "../actions/user";
import { validateEmail } from "../utils/functions";

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

class SignInForm extends React.Component {
  static ValidationPrefix = "SIGN_IN_VALIDATION";

  constructor(props) {
    super(props);

    this.state = {
      email: { value: "", hasError: false, errorMessage: null },
      senha: { value: "", hasError: false, errorMessage: null }
    };

    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSignUpPress = this.onSignUpPress.bind(this);
    this.onChangeEmailText = this.onChangeEmailText.bind(this);
    this.onSubmitEmailText = this.onSubmitEmailText.bind(this);
    this.onBlurEmailText = this.onBlurEmailText.bind(this);
    this.onBlursenhaText = this.onBlursenhaText.bind(this);
    this.onChangesenhaText = this.onChangesenhaText.bind(this);
  }

  onChangeEmailText(email) {
    this.setState({
      email: {
        value: email
      }
    });
  }

  onBlurEmailText() {
    const { email } = this.state;

    if (!email.value || !validateEmail(email.value)) {
      this.setState({
        email: {
          ...email,
          hasError: true,
          errorMessage: !email.value
            ? "Campo Obrigatório"
            : "Insira um e-mail válido"
        }
      });

      return;
    }

    if (email.hasError)
      this.setState({
        email: { ...email, hasError: false, errorMessage: null }
      });
  }

  onSubmitEmailText() {
    this.senha.focus();
  }

  onBlursenhaText() {
    const { senha } = this.state;

    if (!senha.value || senha.value.length < 6) {
      this.setState({
        senha: {
          ...senha,
          hasError: true,
          errorMessage: !senha.value
            ? "Campo Obrigatório"
            : "A senha deve ser igual ou maior a 6 caracteres"
        }
      });

      return;
    }

    if (senha.hasError)
      this.setState({
        senha: { ...senha, hasError: false, errorMessage: null }
      });
  }

  onChangesenhaText(senha) {
    this.setState({
      senha: {
        value: senha
      }
    });
  }

  onSignUpPress() {
    NavigationService.navigate("SignUp");
  }

  async onSubmitLogin() {
    const { login } = this.props;
    const { email, senha } = this.state;

    const keys = Object.keys(this.state);

    const errors = _(keys).reduce((acc, key) => {
      const isEmpty = !Boolean(this.state[key].value);

      if (isEmpty)
        return {
          ...acc,
          [key]: {
            hasError: true,
            errorMessage: "Campo Obrigatório"
          }
        };
    }, {});

    await this.setState(prevState => ({
      ...prevState,
      ...errors
    }));

    if (_(keys).some(key => _.get(this.state, `${key}.hasError`, false)))
      return;

    login(email.value, senha.value);
  }

  render() {
    const { email, senha } = this.state;
    const { isLoading, hasInternet } = this.props;

    const disabled = isLoading && !hasInternet;

    return (
      <View>
        <TextInput
          error={email.hasError}
          disabled={isLoading}
          value={email.value}
          label="E-mail"
          mode="outlined"
          returnKeyType="next"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={"email@dominio.com"}
          onChangeText={this.onChangeEmailText}
          onSubmitEditing={this.onSubmitEmailText}
          onBlur={this.onBlurEmailText}
        />
        <HelperText visible={email.hasError} type="error">
          <Text>{email.errorMessage}</Text>
        </HelperText>
        <TextInput
          disabled={isLoading}
          error={senha.hasError}
          label="Senha"
          mode="outlined"
          secureTextEntry
          value={senha.value}
          keyboardType="default"
          returnKeyType="send"
          onSubmitEditing={this.onSubmitLogin}
          ref={input => (this.senha = input)}
          onChangeText={this.onChangesenhaText}
          onBlur={this.onBlursenhaText}
        />
        <HelperText visible={senha.hasError} type="error">
          <Text>{senha.errorMessage}</Text>
        </HelperText>
        <View style={styles.containerButtons}>
          <Button
            isLoading={isLoading}
            onPress={this.onSignUpPress}
            mode="outlined"
          >
            <Text>Cadastrar-se</Text>
          </Button>
          <Button
            disabled={!hasInternet}
            loading={isLoading}
            style={styles.loginButton}
            mode="contained"
            onPress={this.onSubmitLogin}
          >
            <Text>Entrar</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const loadingState = createLoadingSelector([
  UserPrefix.USER_LOGIN,
  UserPrefix.FACEBOOK_LOGIN
]);

const mapStateToProps = state => ({
  isLoading: loadingState(state),
  hasInternet: state.connection
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
