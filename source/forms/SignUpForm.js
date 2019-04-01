import _ from "lodash";
import {
  Button,
  TextInput,
  Divider,
  Text,
  HelperText
} from "react-native-paper";
import * as React from "react";
import { connect } from "react-redux";
import { signUp } from "../actions/user";
import { View, StyleSheet } from "react-native";
import { add as addError } from "../actions/error";
import { validateEmail } from "../utils/functions";
import { Prefix as UserPrefix } from "../reducers/user";
import loading, { createLoadingSelector } from "../reducers/loading";
import { TextInputMask, MaskService } from "react-native-masked-text";

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 4
  },
  loginButton: {
    alignSelf: "flex-end",
    marginVertical: 8
  }
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: { value: "", hasError: false, errorMessage: null },
      cpf: { value: "", hasError: false, errorMessage: null },
      telefone: { value: "", hasError: false, errorMessage: null },
      email: { value: "", hasError: false, errorMessage: null },
      senha: { value: "", hasError: false, errorMessage: null },
      confirm: { value: "", hasError: false, errorMessage: null }
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeNameText = this.onChangeNameText.bind(this);
    this.onBlurNameText = this.onBlurNameText.bind(this);
    this.onSubmitNameText = this.onSubmitNameText.bind(this);
    this.onChangeCpfText = this.onChangeCpfText.bind(this);
    this.onBlurCpfText = this.onBlurCpfText.bind(this);
    this.onSubmitCpfText = this.onSubmitCpfText.bind(this);
    this.onChangePhoneText = this.onChangePhoneText.bind(this);
    this.onBlurPhoneText = this.onBlurPhoneText.bind(this);
    this.onSubmitPhoneText = this.onSubmitPhoneText.bind(this);
    this.onChangeEmailText = this.onChangeEmailText.bind(this);
    this.onBlurEmailText = this.onBlurEmailText.bind(this);
    this.onSubmitEmailText = this.onSubmitEmailText.bind(this);
    this.onChangePasswordText = this.onChangePasswordText.bind(this);
    this.onSubmitPasswordText = this.onSubmitPasswordText.bind(this);
    this.onChangeConfirmText = this.onChangeConfirmText.bind(this);
  }

  onChangeNameText(nome: string) {
    this.setState({
      nome: {
        value: nome
      }
    });
  }

  onBlurNameText() {
    const { nome } = this.state;

    if (
      !nome.value ||
      !new RegExp(/(([A-Z ])+ (.*))\w+$/, "i").test(nome.value)
    ) {
      this.setState({
        nome: {
          ...nome,
          hasError: true,
          errorMessage: !nome.value
            ? "Campo Obrigatório"
            : "Insira um nome válido"
        }
      });

      return;
    }

    if (nome.hasError)
      this.setState({ nome: { ...nome, hasError: false, errorMessage: null } });
  }

  onSubmitNameText() {
    this.cpf.getElement().focus();
  }

  onChangeCpfText(cpf: string) {
    this.setState({
      cpf: {
        value: cpf
      }
    });
  }

  onBlurCpfText() {
    const { cpf } = this.state;

    if (!cpf.value || !MaskService.isValid("cpf", cpf.value)) {
      this.setState({
        cpf: {
          ...cpf,
          hasError: true,
          errorMessage: !cpf.value
            ? "Campo Obrigatório"
            : "Insira um CPF válido"
        }
      });

      return;
    }

    if (cpf.hasError)
      this.setState({ cpf: { ...cpf, hasError: false, errorMessage: null } });
  }

  onSubmitCpfText() {
    this.telefone.getElement().focus();
  }

  onChangePhoneText(telefone: string) {
    this.setState({
      telefone: {
        value: telefone
      }
    });
  }

  onBlurPhoneText() {
    const { telefone } = this.state;

    if (!telefone.value || !MaskService.isValid("cel-phone", telefone.value)) {
      this.setState({
        telefone: {
          ...telefone,
          hasError: true,
          errorMessage: !telefone.value
            ? "Campo Obrigatório"
            : "Insira um telefone válido"
        }
      });

      return;
    }

    if (telefone.hasError)
      this.setState({
        telefone: { ...telefone, hasError: false, errorMessage: null }
      });
  }

  onSubmitPhoneText() {
    this.email.focus();
  }

  onChangeEmailText(email: string) {
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

  onBlurPasswordText() {
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

  onChangePasswordText(senha: string) {
    this.setState({
      senha: {
        value: senha
      }
    });
  }

  onSubmitPasswordText() {
    this.confirm.focus();
  }

  onBlurConfirmText() {
    const { confirm, password } = this.state;

    if (!confirm.value || senha.value !== confirm.value) {
      this.setState({
        confirm: {
          ...confirm,
          hasError: true,
          errorMessage: !confirm.value
            ? "Campo Obrigatório"
            : "Este campo deve ser igual ao campo senha"
        }
      });

      return;
    }

    if (confirm.hasError)
      this.setState({
        confirm: { ...confirm, hasError: false, errorMessage: null }
      });
  }

  onChangeConfirmText(confirm: string) {
    this.setState({
      confirm: {
        value: confirm
      }
    });
  }

  onSubmitForm() {
    const { signUp, addError } = this.props;

    const keys = Object.keys(this.state);

    const errors =
      _(keys).reduce((acc, key) => {
        const isEmpty = !Boolean(this.state[key].value);

        if (isEmpty)
          return {
            ...acc,
            [key]: {
              hasError: true,
              errorMessage: "Campo Obrigatório"
            }
          };
      }, {}) &&
      this.setState(prevState => ({
        ...prevState,
        ...errors
      }));

    if (_(keys).some(key => _.get(this.state, `${key}.hasError`, false))) {
      addError(
        UserPrefix.USER_SIGNUP,
        "Há um ou mais campos inválidos no formulário"
      );

      return;
    }

    const user = _.zipObject(
      keys,
      keys.map(key => _.get(this.state, `${key}.value`, ""))
    );

    signUp(user);
  }

  render() {
    const {
      nome,
      cpf,
      telefone,
      email,
      senha,
      confirm,
      isLoading,
      hasInternet
    } = this.state;

    return (
      <View>
        <TextInput
          autoFocus
          error={nome.hasError}
          label="Nome"
          mode="outlined"
          value={nome.value}
          keyboardType="default"
          style={styles.textInput}
          onBlur={this.onBlurNameText}
          ref={input => (this.nome = input)}
          onSubmitEditing={this.onSubmitNameText}
          onChangeText={this.onChangeNameText}
          placeholder="Nome Sobrenome"
          autoCapitalize="words"
        />
        <HelperText visible={nome.hasError} type="error">
          <Text>{nome.errorMessage}</Text>
        </HelperText>
        <TextInput
          label="CPF"
          mode="outlined"
          error={cpf.hasError}
          value={cpf.value}
          keyboardType="number-pad"
          style={styles.textInput}
          onChangeText={this.onChangeCpfText}
          onSubmitEditing={this.onSubmitCpfText}
          onBlur={this.onBlurCpfText}
          placeholder={"123.465.789-10"}
          render={props => (
            <TextInputMask
              {...props}
              ref={input => (this.cpf = input)}
              type={"cpf"}
            />
          )}
        />
        <HelperText visible={cpf.hasError} type="error">
          <Text>{cpf.errorMessage}</Text>
        </HelperText>
        <TextInput
          label="Telefone"
          error={telefone.hasError}
          mode="outlined"
          value={telefone.value}
          keyboardType="phone-pad"
          style={styles.textInput}
          onChangeText={this.onChangePhoneText}
          onSubmitEditing={this.onSubmitPhoneText}
          onBlur={this.onBlurPhoneText}
          placeholder={"(83) 9 9999-9999"}
          render={props => (
            <TextInputMask
              {...props}
              ref={input => (this.telefone = input)}
              type={"cel-phone"}
            />
          )}
        />
        <HelperText visible={telefone.hasError} type="error">
          <Text>{telefone.errorMessage}</Text>
        </HelperText>
        <TextInput
          value={email.value}
          label="E-mail"
          mode="outlined"
          error={email.hasError}
          returnKeyType="next"
          style={styles.textInput}
          keyboardType="email-address"
          ref={input => (this.email = input)}
          onChangeText={this.onChangeEmailText}
          placeholder={"email@dominio.com"}
          onBlur={this.onBlurEmailText}
          onSubmitEditing={this.onSubmitEmailText}
          autoCapitalize="none"
        />
        <HelperText visible={email.hasError} type="error">
          <Text>{email.errorMessage}</Text>
        </HelperText>
        <TextInput
          label="Senha"
          mode="outlined"
          error={senha.hasError}
          secureTextEntry
          value={senha.value}
          keyboardType="default"
          style={styles.textInput}
          ref={input => (this.senha = input)}
          onChangeText={this.onChangePasswordText}
          onBlur={this.onBlurPasswordText}
          onSubmitEditing={this.onSubmitPasswordText}
        />
        <HelperText visible={senha.hasError} type="error">
          <Text>{senha.errorMessage}</Text>
        </HelperText>
        <TextInput
          label="Confirmar Senha"
          mode="outlined"
          secureTextEntry
          value={confirm.value}
          error={senha.hasError}
          keyboardType="default"
          style={styles.textInput}
          onSubmitEditing={this.onSubmitForm}
          onBlur={this.onBlurConfirmText}
          ref={input => (this.confirm = input)}
          onChangeText={this.onChangeConfirmText}
        />
        <HelperText visible={confirm.hasError} type="error">
          <Text>{confirm.errorMessage}</Text>
        </HelperText>
        <Button
          disabled={hasInternet}
          loading={isLoading}
          style={styles.loginButton}
          mode="contained"
          onPress={this.onSubmitForm}
        >
          <Text>Cadastrar</Text>
        </Button>
      </View>
    );
  }
}
const loadingState = createLoadingSelector(UserPrefix.USER_SIGNUP);

const mapStateToProps = state => ({
  isLoading: loadingState(state),
  hasInternet: state.connection
});

const mapDispatchToProps = {
  signUp,
  addError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);
