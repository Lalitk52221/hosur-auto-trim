"use client";

import About from "./components/About";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Hero from "./components/Hero";

function Home() {
  return (
    <div>
      <Header />
      <Hero/>
      <Categories/>
      <About/>
    </div>
  );
}

export default Home;
