import type { NextPage } from "next";

const Home: NextPage = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
<style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Inter;
  }
`}</style>;
export default Home;
