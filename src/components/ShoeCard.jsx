const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
    const handleClick = () => {
        if (bigShoeImg !== imgURL.bigShoe) {
            changeBigShoeImage(imgURL.bigShoe)
        }
    }
    return (
        <div className={`border-2 rounded-xl ${bigShoeImg === imgURL.bigShoe ? 'border-coral-red' : 'border-transparent'
            } cursor-pointer max-sm:flex-1 transition-all duration-300`}
            onClick={handleClick}
        >
            <div className="flex justify-center items-center bg-black dark:bg-dark-secondary bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4 transition-all duration-300">
                <img
                    src={imgURL.thumbnail}
                    alt="shoe collection"
                    width={127}
                    height={103}
                    className="object-contain dark:filter dark:brightness-110"
                />
            </div>
        </div>
    )
}

export default ShoeCard