export default function Sidebar() {
    return (
        <>
            <div className="fixed hidden sm:block top-0 left-0 lg:w-1/5 h-full border-r border-gray-800 backdrop-blur bg-gray-900 p-4 bg-opacity-[0.2] py-[5rem]">
                <ul className="mt-8">
                    <li className="transition-all duration-500 mb-4 hover:bg-blue-600 hover:p-2 hover:px-4 hover:w-full rounded-md hover:bg-opacity-[0.1] hover:backdrop-blur">
                        <a href="/"><i className="fa-solid fa-home mr-4 text-blue-600 drop-shadow drop-shadow-blue-900"></i> <span className="font-medium text-lg">Home</span></a>
                    </li>
                    <li className="transition-all duration-500 mb-4 hover:bg-blue-600 hover:p-2 hover:px-4 hover:w-full rounded-md hover:bg-opacity-[0.1] hover:backdrop-blur">
                        <a href="/chat"><i className="fa-solid fa-robot mr-4 text-blue-600 drop-shadow drop-shadow-blue-900"></i> <span className="font-medium text-lg">ChatBOT</span></a>
                    </li>
                    <li className="transition-all duration-500 mb-4 hover:bg-blue-600 hover:p-2 hover:px-4 hover:w-full rounded-md hover:bg-opacity-[0.1] hover:backdrop-blur">
                        <a href="/words"><i className="fa-solid fa-user mr-4 text-blue-600 drop-shadow drop-shadow-blue-900"></i> <span className="font-medium text-lg">Word Game</span></a>
                    </li>
                </ul>
            </div>
        </>
    )
}