import { IoLogOut } from "react-icons/io5";

function Header() {
    return(
        <header
            className={"h-[8vh] sticky top-0 left-0 bg-[#F5F5F5] " +
                "px-5 py-1 flex flex-row items-center justify-between"}>

            <div className={"h-full"}>

                <img src={"../src/assets/image/logo/Logo.jpeg"} className={"h-full"}  alt={"logo"}/>

            </div>

            <div>
                <div
                    className={"w-max p-2 h-full flex flex-row items-center justify-around" +
                        " bg-black text-white hover:cursor-pointer"}>
                    <IoLogOut size={20}/>
                    <label className={"font-Zet text-sm hidden sm:hidden md:block lg:block xl:block "}>LogOut</label>
                </div>
            </div>

        </header>
    )
}

export default Header;