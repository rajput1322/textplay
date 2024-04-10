import { useState } from "react";
import "./App.css";
import { Header, TextForm, Alert } from "./Components";

function App() {
    const [mode, setMode] = useState("light");

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const toggleMode = () => {
        if (mode === "dark") {
            setMode("light");
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
            showAlert("Light mode enabled", "success");
        } else {
            setMode("dark");
            document.body.style.backgroundColor = "#212529";
            document.body.style.color = "#FFFFFF8C";
            showAlert("Dark mode enabled", "success");
        }
    };

    return (
        <>
            <Header
                title="TextPlay"
                about="About Us"
                mode={mode}
                toggleMode={toggleMode}
            />
            <Alert alert={alert} />
            <TextForm
                      heading={"Enter your query..."}
                      mode={mode}
                      showAlert={showAlert}
                  />
        </>
    );
}

export default App;
