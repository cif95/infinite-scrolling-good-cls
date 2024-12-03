'use client';

import { useState, useRef, useEffect, useCallback } from "react";

import dynamic from 'next/dynamic'


const mock_nfts = [
    {
        title: "1"
    },
    {
        title: "2"
    },
    {
        title: "3"
    },
    {
        title: "4"
    },
    {
        title: "5"
    },
    {
        title: "6"
    },
];



const NftCard = dynamic(
    () => import('./NftCard/NftCard.component.jsx')
    .then((mod) => mod.NftCard)
);


export const NftsWrapper = ({setHasScrolled}) => {

    const [pageCounter, setPageCounter] = useState(1);
    const [maxPages, setMaxPages] = useState(30);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [nfts, setNfts] = useState(mock_nfts);

    const observer = useRef();
    const sectionRef = useRef();

    const lastPaginatedElementRef = useCallback(node => {
        
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasMore) {
                setPageCounter(prevPageNumber => prevPageNumber + 1);
            }
            setHasScrolled(!hasMore && entries[0].isIntersecting);
        });

        if (node) observer.current.observe(node);

    }, [hasMore]);

    const loadNewPage = useCallback(() => {

        setIsLoading(true);
        
        // fetch the other page from server here.
        const newNfts = [...mock_nfts];

        setTimeout(() => {
            setNfts( prev => [...prev, ...newNfts]);
            setIsLoading(false);
        }, 500);

        setHasMore(pageCounter < maxPages);

    },[pageCounter, maxPages ]);

    useEffect(() => { loadNewPage();}, [loadNewPage]);

    const placeHolders = [ 
        { img: '/placeholder.jpg'},
        { img: '/placeholder.jpg'},
        { img: '/placeholder.jpg'},
        { img: '/placeholder.jpg'},
        { img: '/placeholder.jpg'},
        { img: '/placeholder.jpg'},
    ];


    return (
        <section ref={sectionRef}>
            <h2>All Nfts</h2>
            <p>Scroll Down To See Them All!</p>
            <ul className="container">
                {nfts.map((nft, index) => {

                    const isLast = index === nfts.length - 1;

                    if (isLast) {
                        return (
                            <li ref={lastPaginatedElementRef} key={index}>
                                <NftCard 
                                    nft={nft}
                                    isLast={isLast}
                                />
                            </li>
                        )
                    }
                    return <NftCard key={index} nft={nft} index={index} />
                })}

                {isLoading && placeHolders.map((card, index ) => (
                    <NftCard key={index} nft={card} isPlaceholder />
                ) )}

            </ul>
        </section>
    )
}
