
export const NftCard = ({nft, isLast, isPlaceholder}) => {

    return(
        <div className={isLast ? 'last-nft-card card nft' : 'card nft'}>
            {isPlaceholder ? <img src={nft.img} alt="placeholder"/> : nft.title}
        </div>
    )
}