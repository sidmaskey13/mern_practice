import Noty from "noty";
import { useSelector } from "react-redux";

const showNotificationSuccess = (text) => {
    new Noty({
        type: "success",
        layout: "topRight",
        theme: "bootstrap-v4",
        timeout: 2000,
        text: text,
        progressBar: false,
    }).show()
}
const showNotificationError = (text) => {
    new Noty({
        type: "error",
        layout: "topRight",
        theme: "bootstrap-v4",
        timeout: 1000,
        text: text,
        progressBar: false,
    }).show()
}

function Noti() {
    const message = useSelector(state => state.notifications.message)
    const type = useSelector(state => state.notifications.type)
    return (
        <div>
            {type == 'success' ?
                <p>{message ? showNotificationSuccess(message) : ""}</p>
                :
                <p>{message ? showNotificationError(message) : ""}</p>
            }
        </div>
    )
}

export default Noti;
