import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import { setUtterName, setUtterText, addUtterText, undoTextRemotion, removeUtterText, changeUtterForm } from "../actions/uttersAction";
import Checkbox from '@material-ui/core/Checkbox';


class UtterForm extends Component {
  setUtterTexts() {
    let utters_texts = [];

    if (this.props.current_utter.utters !== undefined) {

      utters_texts = this.props.current_utter.utters.map((utter_text_list, utter_index) => {
        return utter_text_list.utterText.map((utter_text, text_index) => {
          return (
            <li key={"utter_text" + utter_index + text_index}>
              <textarea type="text" value={utter_text.text}
                onChange={(e) => this.props.setUtterText(utter_index, text_index, e.target.value, this.props.current_utter)} />
              <button type="button" onClick={() => this.props.removeUtterText(utter_index)}>Deleter o texto</button>
            </li>
          )
        })
      });
    }

    return utters_texts;
  }

  render() {
    let utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";

    return (
      <div>
        <form>
          <label>
            <TextField
              helperText={this.props.helper_text}
              id="utter-name"
              label="Nome da resposta"
              margin="normal"
              type="text"
              value={utter_name}
              onChange={(e) => this.props.setUtterName(e.target.value, this.props.utters)}
            />
          </label>

          <br />
          <Checkbox
                value="checkedA"
                color="default"
                checked={this.props.alternatives}
                onChange={() => this.props.changeUtterForm(this.props.alternatives, this.props.current_utter)}
          />
          <p>Os balões são falas alternativas</p>
          
          <label>
            <h1>Textos das respostas:</h1>
            <ul>
              {this.setUtterTexts()}
            </ul>
          </label>

          <button type="button" onClick={() => this.props.undoTextRemotion()}>UNDO</button>
          <button type="button" onClick={() => this.props.addUtterText()}>ADD MORE</button>
        </form>

        <h1>{utter_name}</h1>
        <pre>{JSON.stringify(this.props.current_utter, null, 2)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  addUtterText: () => dispatch(addUtterText()),
  undoTextRemotion: () => dispatch(undoTextRemotion()),
  setUtterName: (utter_name) => dispatch(setUtterName(utter_name)),
  removeUtterText: (text_position) => dispatch(removeUtterText(text_position)),
  setUtterText: (utter_position, text_position, text, current_utter) => dispatch(setUtterText(utter_position, text_position, text, current_utter)),
  changeUtterForm: (alternatives, current_utter) => dispatch(changeUtterForm(alternatives, current_utter))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterForm);
