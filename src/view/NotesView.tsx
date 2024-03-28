import Card from "../components/card/Card.tsx";
import { IoMdAdd } from "react-icons/io";
import Input from "../components/input/input.tsx";
import {CiSearch} from "react-icons/ci";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

interface Data {
    _id:string,
    user:string,
    title:string,
    description:string,
    date:Date
}

function NotesView() {

    const [search, setSearch] = useState("")
    const [dataArray, setDataArray] = useState<Data[]>([])

    let navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (search) {
            searchNote();
        }else {
            getData()
        }
    }, [search]);

    const handleInput = (e:any, type:string):void => {

        switch (type){
            case 'search':
                setSearch(e.target.value)
                break;

        }
    }

    function getData() {

        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };

        // @ts-ignore
        axios.get('http://localhost:9001/note/get/all',config)
            .then(res => {


                console.log(res.data.data)
                setDataArray(res.data.data)

            })
            .catch(err => {
                console.log(err)
            })

    }


    function searchNote() {

        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };

        // @ts-ignore
        axios.get(`http://localhost:9001/note/get/note?title=${search}`,config)
            .then(res => {

                console.log(res.data.data)
                setDataArray(res.data.data)

            })
            .catch(err => {
                console.log(err)
            })

    }

    function deleteNote(id:string) {



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgba(0,0,0,0.86)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                deleteAction(id)

            }
        });



    }

    function deleteAction(id:string) {
        const config = {
            headers: {
                'Authorization': Cookies.get('token')
            }
        };

        // @ts-ignore
        axios.delete(`http://localhost:9001/note/delete/${id}`,config)
            .then(res => {
                // alert(res.data.message)

                Swal.fire({
                    title: "Deleted!",
                    text: res.data.message,
                    icon: "success"
                });

                getData()
            })
            .catch(err => {
                console.log(err)
                alert("Something went wrong!")
            })
    }

    function editeNote(noteData:any) {

        navigate('/add',{state:{note:noteData}})

    }

    function viewNote(noteData: any) {
        navigate('/add',{state:{note:noteData,view:true}})
    }

    return(
        <section className={"relative min-h-[92vh] max-h-max bg-[#F5F5F5] flex items-center justify-center flex-col"}>

            <div
                className={"sticky z-50 top-5 bg-white w-[80%] sm:w-[80%] md:w-[80%] lg:w-[30rem] h-[50px] drop-shadow-xl rounded-md flex flex-row items-center justify-center"}>

                <div className={"w-[88%]"}>
                    <Input
                        type={"text"}
                        name={"search"}
                        label={""}
                        optional={true}
                        placeholder={"Search here ..."}
                        callBack={handleInput}/>
                </div>

                <div className={"flex-1 flex items-center justify-center"}>
                    <CiSearch string={40}/>
                </div>
            </div>


            <main
                className={"p-4 max-w-[900px] w-full sm:w-full md:w-full lg:w-[900px] xl:w-[900px] min-h-[92vh] h-full max-h-max bg-[#F5F5F5] " +
                    " grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 items-center"}>


                {
                    dataArray.map(value => {
                        return <Card
                            id={value._id}
                            title={value.title}
                            date={value.date}
                            note={value}
                            deleteFunction={deleteNote}
                            editeFunction={editeNote}
                            viewFunction={viewNote}
                        />
                    })
                }




            </main>

            <div className={"fixed bottom-20 right-12  w-max p-3 h-[40px] rounded-md bg-black text-white text-md " +
                "flex flex-row items-center justify-center hover:cursor-pointer drop-shadow-md"}
                 onClick={() => navigate("/add")}>
                <IoMdAdd size={25} className={"text-white"}/>
                <span className={"hidden sm:hidden md:hidden lg:block xl:block font-Poppins font-[500]"}>Add Note</span>
            </div>

        </section>
    )

}

export default NotesView