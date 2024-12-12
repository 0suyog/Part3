import { useEffect } from "react";
import "./index.css";

export default function Popup({ description, timeOutFunction }) {
    useEffect(() => {
        setTimeout(() => {
            timeOutFunction();
        }, 3000);
    }, []);
    return (
        <>
            <h3>{description}</h3>
        </>
    );
}
