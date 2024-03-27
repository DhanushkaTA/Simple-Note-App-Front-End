import Card from "../components/card/Card.tsx";
import { IoMdAdd } from "react-icons/io";

function NotesView() {

    return(
        <section className={"min-h-[92vh] max-h-max bg-[#F5F5F5] flex items-center justify-center"}>


            <main
                className={"p-4 max-w-[900px] w-full sm:w-full md:w-full lg:w-[900px] xl:w-[900px] h-full max-h-max bg-[#F5F5F5] " +
                    " grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 items-center"}>

                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </main>

            <div className={"fixed bottom-20 right-12  w-max p-3 h-[40px] rounded-md bg-black text-white text-md " +
                "flex flex-row items-center justify-center hover:cursor-pointer drop-shadow-md"}>
                <IoMdAdd size={25} className={"text-white"}/>
                <span className={"hidden sm:hidden md:hidden lg:block xl:block font-Poppins font-[500]"}>Add Note</span>
            </div>

        </section>
    )

}

export default NotesView