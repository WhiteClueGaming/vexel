import Head from "@/components/Head";
import Sidebar from "@/components/Sidebar";

export default function Index({ user }) {
    return (
        <>
            <Head user={user} />
            <div className="fixed z-[1] bottom-0 left-0 top-[4.5rem] right-0 border-r border-gray-800 backdrop-blur h-full overflow-scroll">
                <div className="w-full h-full">
                    <div className="w-full h-[30rem] relative animate__animated animate__bounceIn" style={{ background: "linear-gradient(rgba(48, 48, 48, 0.3) 10%, #000000 99%), url('/ai.png')" }}>
                        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-6xl sm:text-8xl lg:text-9xl text-slate-400 font-bold animate__animated animate__lightSpeedInRight"><span className="">Vexel</span><span className="text-slate-300">AI</span></p>
                            <p className="drop-shadow-3xl text-lg text-slate-300 font-bold mt-4 animate__animated animate__fadeIn lg:px-[20%] px-4">"Future lies beneath the sea of words and thoughts that you have written so far in your life and the words that you will write in the future as well."</p>
                            <div className="flex flex-wrap w-full justify-center mt-4">
                                <button className="mt-2 ml-2 mr-2 transition-all duration-500 text-white bg-indigo-600 hover:shadow-md hover:shadow-blue-800 px-16 py-4 rounded-md text-center w-full sm:w-1/3" onClick={() => location.href = "/chat"}><i className="fa-solid fa-robot"></i> Try VexelAI ChatBOT!</button>
                                <button className="mt-2 ml-2 mr-2 transition-all duration-500 text-white bg-indigo-800 hover:shadow-md hover:shadow-blue-800 px-16 py-4 rounded-md text-center w-full sm:w-1/3" onClick={() => location.href = "/words"}><i className="fa-solid fa-a"></i><i className="fa-solid fa-b"></i><i className="fa-solid fa-c"></i> Try Word Guessing Game!</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-wrap mb-4 p-4 pt-0">
                        <div className="w-full lg:w-1/3 p-2 animate__animated animate__backInLeft">
                            <div className="bg-transparent p-4 transition-all duration-500 hover:p-2 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                VexelAI excels in quick data analysis and decision-making. Its high-speed processing capabilities enable it to handle complex tasks efficiently, making it a valuable tool for time-sensitive operations.
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 p-2 animate__animated animate__backInUp">
                            <div className="bg-transparent p-4 transition-all duration-500 hover:p-2 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                VexelAI is known for its exceptional accuracy. It consistently delivers precise results, reducing the margin for error in various applications such as data analysis, language translation, and image recognition.
                            </div>
                        </div>
                        <div className="w-full lg:w-1/3 p-2 animate__animated animate__backInRight">
                            <div className="bg-transparent p-4 transition-all duration-500 hover:p-2 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                VexelAI offers valuable educational resources and tools at no cost. It provides a platform for students, educators, and researchers to access AI-powered assistance, enhancing the learning experience. Whether it's aiding with homework, providing explanations, or facilitating research.
                            </div>      
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}