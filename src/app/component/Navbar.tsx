const favicon = require("/home/vijay/Code_Test/DSC_5661.JPG");
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className=" relative">
      <div className="animate-spin absolute border-r w-14 h-14 rounded-full"></div>
      <button className="">
        <div
          className="w-14 h-14 rounded-full border border-black
             overflow-hidden
             "
        >
          <Image
            src={favicon}
            alt=""
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </button>
    </div>
  );
};
