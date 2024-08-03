import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Apologies!</h1>
            <p>The previous action failed due to the following error:</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}