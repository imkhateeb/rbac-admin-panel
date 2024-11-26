import { ShieldCheck, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center">
      <div className="animate-slight-up w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col gap-5">
        <ShieldCheck size={80} weight="fill" />
        <p className="text-xl font-semibold text-gray-500">Permisio</p>
        <p className="text-[50px] max-md:text-[40px] font-bold">
          An Example of Simplifying dynamic access control effortlessly.
        </p>
        <Link
          to={"/admin"}
          type="button"
          className="flex items-center gap-2 py-4 px-8 bg-black rounded-full text-white w-[250px] justify-center"
        >
          <p className="text-lg font-semibold text-nowrap">Try Admin Panel</p>
          <ArrowUpRight size={32} weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
