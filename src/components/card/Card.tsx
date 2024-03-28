import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import * as DateHandler from "../../util/dateHandler.ts";

interface Props {
    id:string,
    title:string,
    date:Date,
    deleteFunction:Function,
    editeFunction:Function,
    viewFunction:Function
}

function Card(prop:Props) {

    return(
        <section className={"w-[200px] h-[230px] relative p-2 pb-5 bg-white rounded-md m-auto border-2 border-gray-300 cursor-pointer"}>


            <div className={"absolute top-0 left-0 right-0 w-full min-h-[50px] h-max group"}>

                {/**/}

                <div className={"w-full h-[0px] group-hover:h-[50px] transition-all " +
                    "bg-gradient-to-b from-0% from-red-600/20 to-transparent " +
                    "flex items-center justify-center rounded-b-[50%] "}
                >

                    <MdDelete
                        size={22}
                        className={"opacity-0 group-hover:opacity-100 text-red-600 z-20"}
                        onClick={() => prop.deleteFunction(prop.id)}/>

                </div>

            </div>

            <div className={"absolute bottom-3 right-3 bg-black p-2 w-max rounded-md text-white" +
                " hover:bg-[#D0D1D3]  hover:text-black"}
                 onClick={() => prop.editeFunction(prop.id)}>

                <TbEdit size={20}/>

            </div>

            <div className={"w-full h-full overflow-hidden"}>

                <div className={"text-black font-Lex text-2xl font-[600] w-full h-full text-ellipsis  overflow-hidden"}
                     onClick={() => prop.viewFunction(prop.id)}>

                    {prop.title}

                </div>

            </div>

            <div className={"text-gray-400 font-Lex text-sm font-[600] absolute bottom-2 left-3"}>
                {DateHandler.formatDate(prop.date)}
            </div>


        </section>
    )

}

export default Card;