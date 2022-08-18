import axios from "axios";
import { FunctionComponent, useState } from "react";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function onSubmit(e: any) {
    e.preventDefault();
    if (username && password) {
      const { data } = await axios.post(process.env.NEXT_PUBLIC_URL + "login", {
        username,
        password,
      });
      console.log(data);
      if (data && data.id) {
        localStorage.setItem("userid", data.id);
        localStorage.setItem("username", username);
        window.location.href = "/app";
      } else {
        alert("something went wrong...");
      }
    } else {
      alert("No creds provided");
    }
  }
  return (
    <section className="bg-slate-800 min-h-screen text-white grid place-items-center ">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center mx-auto my-3 ">
          <img src="https://i.imgur.com/sWVfjPN.png" alt="" />
          <div className="text-2xl font-bold">AmphiTweet</div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-sm">
          <div className="flex-col flex gap-1">
            <label>Username</label>
            <input
              required
              type="text"
              // @ts-ignore
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cool username"
              className="input input-bordered bg-slate-900"
            />
          </div>
          <div className="flex-col flex gap-1">
            <label>Password</label>
            <input
              required
              type="text"
              placeholder="safepassword"
              // @ts-ignore
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered bg-slate-900"
            />
          </div>

          <button className="btn mt-5">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
