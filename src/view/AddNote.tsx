import Input from "../components/input/input.tsx";
import {useEffect, useState} from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useLocation, useNavigate} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IoIosSave } from "react-icons/io";
import Cookies from "js-cookie";
import axios from "axios";

function AddNote() {

    let location = useLocation();
    const note =location?.state?.note;
    const isView =location?.state?.view;

    const [title, setTitle] = useState(note ? note.title :"Create Note")

    const [description, setDescription] = useState(note ? note.description :"")


    let navigate = useNavigate();

    useEffect(() => {
        console.log(note)
    }, []);

    useEffect(() => {

        if (!title){
            setTitle("Create Note")
        }

    }, [title]);

    const handleInput = (e:any, type:string):void => {

        switch (type){
            case 'title':
                setTitle(e.target.value)
                break;
            case 'description':
                setDescription(e.getData())
                break;
        }
    }

    function saveNote() {

        const config = {
            headers: {
                'Authorization': Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        };

        // @ts-ignore
        let user_data :string = Cookies?.get('user');


        let data = JSON.stringify({
            user:JSON.parse(user_data).email,
            title:title,
            description:description,
            date:new Date().toJSON().slice(0, 10)
        });

        console.log(data)



        if (note){
            let update_data = JSON.stringify({
                _id:note._id,
                user:JSON.parse(user_data).email,
                title:title,
                description:description,
                date:note.date
            });

            // @ts-ignore
            axios.put('http://localhost:9001/note/update',update_data,config)
                .then(res => {
                    alert(res.data.message)
                    navigate('/notes')
                })
                .catch(err => {
                    console.log(err)
                    alert("Something is wrong")
                })
        } else {
            // @ts-ignore
            axios.post('http://localhost:9001/note/save',data,config)
                .then( res => {

                    alert(res.data.message)
                    navigate('/notes')
                })
                .catch( err => {
                    console.log(err)
                    alert("Something is wrong")
                })
        }



    }


    return(
        <section className={"relative min-h-[92vh] max-h-max bg-[#F5F5F5] flex items-center justify-center flex-col"}>

            <div className={"fixed bottom-10 sm:bottom-10 md:top-[100px] left-10 " +
                " w-max h-max p-2 bg-black drop-shadow-md text-white rounded-md hover:cursor-pointer"}
                 onClick={() => navigate('/notes')} >
                <IoMdArrowRoundBack size={25}/>
            </div>

            <main className={"p-4 max-w-[900px] w-full sm:w-full md:w-full lg:w-[900px] xl:w-[900px] " +
                "h-full max-h-max min-h-[92vh] bg-[#F5F5F5]"}>
                {/**/}

                <h1 className={"font-Lex font-[500] text-4xl text-center w-full m-auto"}>{title}</h1>

                <div className={"mt-5"} >
                    <div className={"mb-3"}>
                        <Input
                            type={"text"}
                            name={"title"}
                            label={"Title"}
                            optional={false}
                            value={title}
                            callBack={handleInput}/>
                    </div>

                    <div id={'editor-container'} className={"App no-more-tailwind mt-8"}>

                        <label className={"block text-black text-[15px] font-[500] mb-2"}>Description</label>

                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event,editor) => {
                                console.log(event);
                                // console.log(editor.getData());
                                // setDescription(editor.getData())

                                handleInput(editor , 'description');
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                                console.log(event)
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                                console.log(event)
                            }}
                        />

                    </div>

                    <div className={"mt-5 w-full"}>

                        <button className={`${isView ? "hidden" : "flex"} text-white bg-black py-2 px-4 rounded-md flex-row gap-1 items-center justify-center hover:bg-gray-300 hover:text-black ml-auto`}
                            onClick={saveNote}>
                            <IoIosSave size={20}/> Save</button>

                    </div>

                </div>

            </main>


        </section>
    )
}

export default AddNote;