import { FunctionComponent } from "react";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <section className="h-screen bg-slate-800 grid place-items-center">
      <div className="text-xl btn bg-blue-500">Login with Twitter</div>
    </section>
  );
};

export default Login;
