
export const NftCard = ({nft, index, isLast, isPlaceholder}) => {

    return(
        <div className={isLast ? 'last-nft-card card nft' : 'card nft'}>
            {isPlaceholder ? <img src={nft.img} alt="placeholder"/> : index}
        </div>
    )
}