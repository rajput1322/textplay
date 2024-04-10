import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm(props) {
    const setText = (txt) => {
        setDisplayText(txt);
        setPreviewText(txt);
    };

    const clearBoard = () => {
        setText("");
        props.showAlert("Clipboard cleared.", "danger");
    };

    const handleOnChange = (e) => {
        setText(e.target.value);
    };

    const handleOnFindChange = (e) => {
        setFWord(e.target.value);
    };

    const handleOnReplaceChange = (e) => {
        setRWord(e.target.value);
    };

    const toUpper = () => {
        setText(text.toUpperCase());
        props.showAlert("Converted to uppercase.", "success");
    };

    const toLower = () => {
        setText(text.toLowerCase());
        props.showAlert("Converted to lowercase.", "success");
    };
    const removeExtraSpaces = () => {
        let newTxt = text.split(/[ ]+/);
        setText(newTxt.join(" "));
        props.showAlert("All extra spaces removed.", "success");
    };

    const capitaliseText = () => {
        let strArr = text.split(".");
        let newArr = [];
        strArr.forEach((str) => {
            if (str !== "") {
                str = str.trim();
                str = str[0].toUpperCase() + str.slice(1).toLowerCase();
                newArr.push(str);
            }
        });
        newArr.length > 0 ? setText(newArr.join(". ") + ".") : setText("");
        props.showAlert("Text capitalised.", "success");
    };

    const extractEmails = () => {
        let emails = [];
        text.split(" ").forEach((word) => {
            if (word.includes("@") && word.includes(".")) emails.push(word);
        });
        emails.length > 0
            ? setPreviewText(emails.join(" "))
            : setPreviewText("No emails found.");
        props.showAlert("Emails extracted and are shown in preview panel.", "success");
    };

    const extractPhoneNumbers = () => {
        let re = /(?:[-+() ]*\d){10,13}/gm;
        let res = text.match(re);
        res === null
            ? setPreviewText("No Phone numbers found.")
            : setPreviewText(res);
        props.showAlert("Extracted phone numbers are shown in preview panel.", "success");
    };

    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Text to speech running...", "warning");

    };

    const handleReverse = (event) => {
        let strArr = text.split("");
        strArr = strArr.reverse();
        let newText = strArr.join("");
        setText(newText);
        props.showAlert("Text reversed.", "success");
    };

    const replaceFirstWord = () => {
        var newstring = text.replace(fword, rword);
        setText(newstring);
        props.showAlert("First word replaced.", "success");
    };
    const replaceAllWords = () => {
        // eslint-disable-next-line no-eval
        let res = text.replace(eval("/" + fword + "/g"), rword);
        setText(res);
        props.showAlert("All words replaced.", "success");
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to clipboard.", "primary");
    };

    const [text, setDisplayText] = useState("");
    const [fword, setFWord] = useState("");
    const [rword, setRWord] = useState("");
    const [preTxt, setPreviewText] = useState(
        "Type anything to get a preview..."
    );

    return (
        <>
            <div className="mb-3 container">
                <label
                    htmlFor="mytext"
                    className="form-label my-5"
                >
                    <h2>{props.heading}</h2>
                </label>
                <textarea
                    className="form-control"
                    id="mytext"
                    rows="5"
                    value={text}
                    placeholder="Enter text here..."
                    style={{
                        backgroundColor:
                            props.mode === "dark" ? "black" : "white",
                        color: props.mode === "dark" ? "white" : "black",
                    }}
                    onChange={handleOnChange}
                ></textarea>
                <button
                    className="btn btn-primary my-3"
                    onClick={capitaliseText}
                    disabled={text.length === 0}
                >
                    Capitalise
                </button>
                <button
                    className="btn btn-secondary mx-1 my-3"
                    onClick={toUpper}
                    disabled={text.length === 0}
                >
                    Uppercase
                </button>
                <button
                    className="btn btn-secondary mx-1 my-3"
                    onClick={toLower}
                    disabled={text.length === 0}
                >
                    Lowercase
                </button>
                <button
                    className="btn btn-secondary mx-1 my-3"
                    onClick={removeExtraSpaces}
                    disabled={text.length === 0}
                >
                    Remove extra spaces
                </button>
                <button
                    className="btn btn-success mx-1 my-3"
                    onClick={extractEmails}
                    disabled={text.length === 0}
                >
                    Extract Emails
                </button>
                <button
                    className="btn btn-success mx-1 my-3"
                    onClick={extractPhoneNumbers}
                    disabled={text.length === 0}
                >
                    Get Phone numbers
                </button>
                <button
                    type="submit"
                    className="btn btn-success mx-2 my-2"
                    onClick={speak}
                    disabled={text.length === 0}
                >
                    Speak
                </button>
                <button
                    type="submit"
                    className="btn btn-warning mx-2 my-2"
                    onClick={handleReverse}
                    disabled={text.length === 0}
                >
                    Reverse Text
                </button>
                <button
                    type="submit"
                    className="btn btn-primary mx-2 my-2"
                    onClick={copyToClipboard}
                    disabled={text.length === 0}
                >
                    <img
                        src="https://www.freeiconspng.com/thumbs/copy-icon/copy-icon-25.png"
                        alt=""
                        height={25}
                    />
                </button>
                <button
                    className="btn btn-danger mx-1 my-3"
                    onClick={clearBoard}
                    disabled={text.length === 0}
                >
                    Clear board
                </button>
                <div className="input-group mb-3">
                    <span
                        className={`input-group-text ${
                            props.mode === "light" ? "" : "bg-dark text-light"
                        }`}
                    >
                        Find
                    </span>
                    <input
                        type="text"
                        className={`form-control ${
                            props.mode === "light" ? "" : "bg-dark text-light"
                        }`}
                        onChange={handleOnFindChange}
                        value={fword}
                        placeholder="word"
                    />
                    <input
                        type="text"
                        className={`form-control mx-2 ${
                            props.mode === "light" ? "" : "bg-dark text-light"
                        }`}
                        value={rword}
                        placeholder="Replace with"
                        onChange={handleOnReplaceChange}
                    />
                    <button
                        className="btn btn-success mx-1"
                        type="button"
                        id="replace-btn"
                        onClick={replaceFirstWord}
                        disabled={text.length === 0}
                    >
                        Replace
                    </button>
                    <button
                        className="btn btn-warning mx-1"
                        type="button"
                        id="replace-btn"
                        onClick={replaceAllWords}
                        disabled={text.length === 0}
                    >
                        Replace All
                    </button>
                </div>
            </div>
            <div className="container my-2">
                <h2>Word Counter:</h2>
                <h5>
                    {text.split(" ").length > 1 && text.split(" ")[0] !== ""
                        ? text.split(" ").length
                        : 0}{" "}
                    {text.split(" ").length > 1 ? "words" : "word"} {"and "}
                    {text.length} {text.length > 1 ? "characters" : "character"}
                    .
                </h5>
                <p>
                    {text.split(" ").length > 1 && text.split(" ")[0] !== ""
                        ? text.split(" ").length * 0.008
                        : 0}{" "}
                    {text.split(" ").length * 0.008 > 1 ? "minutes" : "minute"}{" "}
                    read.
                </p>
            </div>
            <div className="container my-2">
                <h2>Preview</h2>
                <p>
                    {preTxt !== ""
                        ? preTxt
                        : "Type anything to get a preview..."}
                </p>
            </div>
        </>
    );
}

TextForm.propTypes = {
    heading: PropTypes.string,
};

TextForm.defaultProps = {
    heading: "Heading",
};
