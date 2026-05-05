import { useNavigate } from "react-router"

export default function NotFoundPage() {
    const navigate = useNavigate();
    return <>
        <center>
            <h1 className="text-center text-red-500 text-9xl">404</h1>

            <h2 className="text-red-400 text-3xl text-center">Page Not Found</h2>
            <button onClick={() => {
                navigate('/');
            }}>Goto Home</button>
        </center>
    </>
}