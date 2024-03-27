import Input from "../components/input/input.tsx";
import {useState} from "react";

function LoginView() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInput = (e:any, type:string):void => {

        switch (type){
            case 'Email':
                setEmail(e.target.value)
                break;
            case 'Password':
                setPassword(e.target.value)
                break;
        }
    }

    return(
        <section className={"h-[92vh] bg-[#F5F5F5] flex items-center justify-center"}>

            <div className={"h-[400px] max-w-[400px] w-[400px] bg-[#EFEFEF] border-2 border-black flex flex-col p-4"}>

                <div className={"font-sans text-4xl font-[700] text-center"}>
                    WELCOME
                </div>
                
                <div>
                    <Input 
                        type={"text"} 
                        name={"email"} 
                        label={"Email"} 
                        optional={true}
                        callBack={handleInput}/>
                </div>

            </div>

        </section>
    )

}

export default LoginView