import Head from "@/components/Head";
import Sidebar from "@/components/Sidebar";
import { generate, count } from "random-words";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Word({ user }) {
    const [word, setWord] = useState(null);
    const [def, setDef] = useState(null);
    const [hidden, setHidden] = useState(true);
    const [total, setTotal] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [input, setInput] = useState("");

    function generator() {
        let w = generate({ minLength: 8, maxLength: 15 }).toUpperCase();
        let l = w.length;
        let h1 = Math.floor(Math.random() * 4) + 1;
        let h2 = Math.floor(Math.random() * 4) + 1;
        let h3 = Math.floor(Math.random() * 4) + 1;

        let w2 = w.replace(w.charAt(h1), "*");
        w2 = w2.replace(w.charAt(h2), "*");
        w2 = w2.replace(w.charAt(h3), "*");

        setWord(w);
        setHidden(w2);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if(!input || input.length == 0) return;
            check();
        }
    };

    function check() {
        if(!input || input.length == 0) return;
        if (input.toLowerCase() == word.toLowerCase()) {
            setCorrect(correct + 1);
            toast.success("Correct!");
        } else {
            setIncorrect(incorrect + 1);
            toast.error("Incorrect! correct word: " + word);
        }
        setInput("");
        setTotal(total + 1);
        generator();
    }

    useEffect(() => {
        generator();
    }, []);

    return (
        <div>
            <Head user={user} />
            <Sidebar user={user} />
            <div className="fixed z-[1] bottom-0 left-0 sm:left-[20%] top-[4.5rem] p-4 right-0 border-r border-gray-800 backdrop-blur h-full overflow-scroll">
                <div className="w-full h-full">
                    <center>
                        <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 lg:w-1/2">
                            <h1 className="text-4xl font-bold text-center text-slate-400">Vexel</h1>
                            <h1 className="text-2xl font-bold text-center text-gray-300 mb-4 pb-4 border-b border-gray-800">Word Guessing Game</h1>
                            <p className="font-bold text-3xl">{hidden}</p>
                            {def}

                            <input className="w-full mt-8 bg-transparent py-2 rounded-md border border-gray-800 px-8 outline-none" type="text" placeholder="Write the correct word!" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} />
                            <button className="transition-all mt-4 duration-500 bg-blue-600 hover:shadow-md hover:shadow-blue-800 px-16 py-2 rounded-md hover:bg-opacity-[0.1] hover:backdrop-blur" onClick={check}>Check</button>
                        </div>

                        <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 lg:w-1/2 mt-4">
                            <div className="flex flex-wrap justify-between items-center">
                                <p>Total Words: </p>
                                <p>{total}</p>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <p>Correct Words: </p>
                                <p>{correct}</p>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <p>Incorrect Words: </p>
                                <p>{incorrect}</p>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <p>Percentage: </p>
                                <p>{correct / (total || 1) * 100}%</p>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    )
}