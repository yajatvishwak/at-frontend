import type { NextPage } from "next";
import { useEffect } from "react";
import { supabase } from "./src/createClient";

const Home: NextPage = () => {
  useEffect(() => {
    console.log(supabase.auth.session());
    console.log(supabase.auth.user());
  }, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
{
  /* <style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter;
  }
`}</style>; */
}
export default Home;
