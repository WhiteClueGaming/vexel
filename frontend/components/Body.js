import axios from "axios"
import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Body({ user }) {
    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const configuration = new Configuration({
        apiKey: "pk-FfTYhSonVUtAcGCChqmPoySVhrKLQUgJPPDsZIVmZMNuusWE", //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",
        basePath: "https://api.pawan.krd/pai-001-light-beta/v1/chat"
    });
    const openai = new OpenAIApi(configuration);

    const model = 'gpt-3.5-turbo'; // Replace with your desired model name
    const temperature = 0.7;

    async function sendChatRequest(message, model, temperature) {

        const useDummyData = false;
        const startIndex = "0";

        const response = await openai.createCompletion({
            messages: [
                { role: 'system', content: 'You are a highly intelligent artificial intelligence (AI) named VexelAI owned by WhiteClue. To mention a user use {{user.name}} and user discord id {{user.id}}' },
                { role: 'user', content: message }
            ],
            max_tokens: 256,
            stream: false,
        })

        return response;
    }

    async function msg() {
        if (!input || input.length == 0) return;

        setDisabled(true);

        toast.success("Processing...");
        const reply = await sendChatRequest(input, model, temperature).catch((e) => {
            setDisabled(false);
            return toast.error("Something went wrong");
        })

        if(!reply.data) {
            setDisabled(false);
            return toast.error("Due to ratelimits, you can ask questions 1 time per 15 seconds.");
        }

        const md = await window.markdownit();

        setTimeout(() => {
            let html = md.render(reply.data.choices[0].message.content);

            /*if ((links || []).length > 0) {
                html += `<div class="mt-4 border-t border-gray-800 pt-4 flex">
                ${links.map(l => {
                    return (`<button class='p-4 pt-2 pb-2 bg-gray-800 rounded-md mr-4' onclick='location.href="${l}"'>${l}</button>`)
                }).join("")}
                </div>`
            }*/
            setMsgs([...msgs, { user: input, ai: reply.data.choices[0].message.content }]);
        }, 0)


        setInput("");
        setDisabled(false);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (!input || input.length == 0) return;
            msg();
        }
    };

    function resetip() {
        axios.post('https://api.pawan.krd/resetip', null, {
            headers: {
                'Authorization': `Bearer pk-FfTYhSonVUtAcGCChqmPoySVhrKLQUgJPPDsZIVmZMNuusWE`
            }
        })
            .then(response => {
                console.log('working');
            })
            .catch(error => {
                console.error("error");
            });
    }

    function handleInput(e) {
        setInput(e.target.value);
    }

    useEffect(() => {
        //resetip();
    }, []);

    return (
        <>
            <div className="fixed z-[1] bottom-0 left-0 sm:left-[20%] top-[4.5rem] p-4 right-0 border-r border-gray-800 backdrop-blur h-full overflow-scroll">

                {user?.auth == true ? (
                    <>
                        <div className="w-full h-full relative overflow-scroll">
                            <center><p className="text-slate-400 font-bold mt-4 text-4xl mb-8">VexelAI: Playground</p></center>
                            <div className="w-full flex flex-wrap mb-4 pb-4 border-b border-gray-800">
                                <div className="w-1/3 pr-4">
                                    <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                        VexelAI gives fast and accurate response!
                                    </div>
                                </div>

                                <div className="w-1/3 pr-4">
                                    <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                        VexelAI focuses on quality education not quantity wise!
                                    </div>
                                </div>

                                <div className="w-1/3 pr-4">
                                    <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800 w-full h-full">
                                        The team behind VexelAI focused to make VexelAI as better as possible!
                                    </div>
                                </div>
                            </div>
                            <div className="chat">
                                {msgs.length == 0 && <p className="text-slate-400 text-xl font-medium">Start chatting with VexelAI bot!</p>}
                                {msgs?.map(c => {
                                    return (
                                        <>
                                            <div><img src="/favicon.ico" className="w-[2.5rem] h-[2.5rem] rounded-full border-[2px] border-gray-800 inline" alt="" /><p className="ml-4 inline">{c.user}</p></div>
                                            <div className="mt-2 mb-4 pb-4 border-b border-gray-800"><img src="/bot.png" className="w-[2.5rem] h-[2.5rem] rounded-full border-[2px] border-gray-800 inline" alt="" /><p className="ml-4 inline">{c.ai ? c.ai?.replaceAll("{{user.name}}", user.user.name).replaceAll("{{user.id}}", user.user.id) : c.ai}</p></div>
                                        </>
                                    )
                                }
                                )}
                            </div>
                            <div className={"absolute z-[100] bottom-[3.5rem] left-0 right-0 p-4 flex flex-wrap w-full" + (disabled ? " hidden" : "")}><div className="w-full h-full relative"><input value={input} onChange={handleInput} onKeyDown={handleKeyPress} className="w-full focus:outline-none bg-transparent border-[2px] border-gray-800 rounded-[50px] backdrop-blur p-4 text-white" placeholder="Ask anything." disabled={disabled} /><button className="bg-gray-800 dark:text-white rounded-[20px] absolute right-[0.5rem] p-4 pt-2 pb-2 top-[0.5rem]" onClick={msg}>Send</button></div></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-transparent p-4 rounded-md bg-opacity-[0.2] backdrop-blur border border-gray-800">
                            <p>You must be logged in to try out VexelAI!</p>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}