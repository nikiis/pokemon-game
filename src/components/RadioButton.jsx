import { React } from 'react';
// import Form from 'react-bootstrap/Form';
import '../styles/Radiobutton.scss';

function RadioButton(props) {
    return (
        <div className="col-sm-12 col-md-6 mt-3">
            <input
                className="mt-4 custom-radio selected"
                name="Answers"
                type="radio"
                id={props.id}
                disabled={!props.enabled}
                onClick={() => {
                    props.handleAnswerAttempt(props.id);
                }}
            />
            <label htmlFor={props.id}>{props.answerText}</label>
        </div>
    );
}

export default RadioButton;
