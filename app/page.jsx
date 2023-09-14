'use client';
import { useState } from "react";

import { NftsWrapper } from "./components/home/NftsWrapper/NftsWrapper.component";
import { FooterBox } from "./components/UI/Footer/Footer.component";

import './components/home/home.style.css';

const Home = () => {

  const [hasScrolledAllNfts, setHasScrolledAllNfts] = useState(false);

  return (
    <main >
      <NftsWrapper setHasScrolled={setHasScrolledAllNfts} hasScrolled={hasScrolledAllNfts} />
      <FooterBox show={hasScrolledAllNfts} />
    </main>
  )
}


export default Home;
