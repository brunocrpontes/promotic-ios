import _ from "lodash";
import { Button, TextInput, Text, HelperText } from "react-native-paper";
import * as React from "react";
import { connect } from "react-redux";
import { requestDeleteAccount, requestUpdateUserData } from "../actions/user";
import { View, StyleSheet } from "react-native";
import { add as addError } from "../actions/error";
import { validateEmail } from "../utils/functions";
import { Prefix as UserPrefix } from "../reducers/user";
import { createLoadingSelector } from "../reducers/loading";
import { createErrorSelector } from "../reducers/error";
import { Prefix as ConnectionPrefix } from "../reducers/connection";
import { TextInputMask, MaskService } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ErrorNotification } from "../components";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  textInput: {
    marginVertical: 4
  },
  loginButton: {
    alignSelf: "flex-end",
    marginVertical: 8
  },
  buttonsContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  }
});

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;

    this.state = {
      nome: { value: user.nome || "", hasError: false, errorMessage: null },
      cpf: { value: user.cpf || "", hasError: false, errorMessage: null },
      telefone: {
        value: user.telefone || "",
        hasError: false,
        errorMessage: null
      },
      email: { value: user.email || "", hasError: false, errorMessage: null },
      senha: { value: "*********", hasError: false, errorMessage: null }
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
    this.onBlurPasswordText = this.onBlurPasswordText.bind(this);
    this.onSubmitPasswordText = this.onSubmitPasswordText.bind(this);
  }

  onChangeNameText(nome) {
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

  onChangeCpfText(cpf) {
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

  onChangePhoneText(telefone) {
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

  onChangePasswordText(senha) {
    this.setState({
      senha: {
        value: senha
      }
    });
  }

  onSubmitPasswordText() {
    this.onSubmitForm();
  }

  async onSubmitForm() {
    const { addError, requestUpdateUserData } = this.props;

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

      return acc;
    }, {});

    await this.setState(prevState => ({
      ...prevState,
      ...errors
    }));

    if (_(keys).some(key => _.get(this.state, `${key}.hasError`, false))) {
      addError(
        UserPrefix.USER_UPDATE_DATA,
        "Há um ou mais campos inválidos no formulário"
      );

      return;
    }

    const user = _.zipObject(
      keys,
      keys.map(key => _.get(this.state, `${key}.value`, ""))
    );

    requestUpdateUserData(user);
  }

  render() {
    const { nome, cpf, telefone, email, senha } = this.state;

    const {
      isLoadingUpdate,
      isLoadingDelete,
      connectionError,
      updateError,
      deleteError,
      hasInternet,
      requestDeleteAccount
    } = this.props;

    return (
      <React.Fragment>
        <KeyboardAwareScrollView
          scrollEnabled
          contentContainerStyle={styles.container}
        >
          <TextInput
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
            placeholder="João da Silva"
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
            onFocus={() =>
              this.setState(prevState => ({
                ...prevState,
                state: {
                  value: ""
                }
              }))
            }
            onChangeText={this.onChangePasswordText}
            onBlur={this.onBlurPasswordText}
            onSubmitEditing={this.onSubmitPasswordText}
          />
          <HelperText visible={senha.hasError} type="error">
            <Text>{senha.errorMessage}</Text>
          </HelperText>
          <View style={styles.buttonsContainer}>
            <Button
              disabled={!hasInternet || isLoadingUpdate}
              loading={isLoadingDelete}
              style={styles.loginButton}
              mode="outlined"
              onPress={requestDeleteAccount}
            >
              <Text>Excluir Conta</Text>
            </Button>
            <Button
              disabled={!hasInternet || isLoadingDelete}
              loading={isLoadingUpdate}
              style={styles.loginButton}
              mode="contained"
              onPress={this.onSubmitForm}
            >
              <Text>Salvar</Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
        {Boolean(updateError) && (
          <ErrorNotification
            message={updateError}
            prefixError={UserPrefix.USER_UPDATE_DATA}
          />
        )}
        {Boolean(deleteError) && (
          <ErrorNotification
            message={deleteError}
            prefixError={UserPrefix.USER_DELETE}
          />
        )}
        {Boolean(connectionError) && (
          <ErrorNotification
            message={connectionError}
            prefixError={ConnectionPrefix.CONNECTION_STATE}
          />
        )}
      </React.Fragment>
    );
  }
}

//loadings
const loadingUpdateState = createLoadingSelector([UserPrefix.USER_UPDATE_DATA]);
const loadingDeleteState = createLoadingSelector([UserPrefix.USER_DELETE]);

//erros
const updateStateError = createErrorSelector([UserPrefix.USER_UPDATE_DATA]);
const deleteStateError = createErrorSelector([UserPrefix.USER_DELETE]);
const connectionStateError = createErrorSelector([
  ConnectionPrefix.CONNECTION_STATE
]);

const mapStateToProps = state => ({
  isLoadingUpdate: loadingUpdateState(state),
  isLoadingDelete: loadingDeleteState(state),
  updateError: updateStateError(state),
  deleteError: deleteStateError(state),
  connectionError: connectionStateError(state),
  hasInternet: state.connection,
  user: state.user
});

const mapDispatchToProps = {
  requestDeleteAccount,
  requestUpdateUserData,
  addError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
