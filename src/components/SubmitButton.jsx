import { React, useState } from 'react';
import '../styles/Button.scss';

function SubmitButton(props) {
    return (
        <div className="text-center mt-5">
            <button type="submit" disabled={props.disabled} className="px-4">
                Submit
            </button>
        </div>
    );
}

export default SubmitButton;
