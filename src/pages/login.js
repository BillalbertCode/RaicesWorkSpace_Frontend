import LoginForm from "@/components/User/Forms/LoginForm";
import { useContext } from "react";
import { TokenContext } from "@/contexts/TokenContext";

const Login = () => {
    const { loginStatus } = useContext(TokenContext)

    //Nose por que deje los div pero ahi los dejo xd
    return (
        <div className="container">
            {loginStatus
                ? (<div>
                    Logineado
                </div>)
                : (<div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <LoginForm ></LoginForm>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}
export default Login;