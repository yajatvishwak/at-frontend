import { FunctionComponent } from "react";
import { supabase } from "../src/createClient";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <section className="h-screen bg-slate-800 grid place-items-center">
      <div
        onClick={async () => {
          const { user, session, error } = await supabase.auth.signIn({
            provider: "twitter",
          });
          console.log(user, session, error);
        }}
        className="text-xl btn bg-blue-500"
      >
        Login with Twitter
      </div>
    </section>
  );
};

export default Login;
