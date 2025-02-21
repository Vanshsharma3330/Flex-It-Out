import { GoNorthStar } from "react-icons/go";

export default function Footer() {
    return (
        <div className="bg-[#212121] text-white flex flex-col items-center justify-center py-8 gap-8 text-center">
            <GoNorthStar size={50} />
            <h1 className="text-8xl uppercase leading-20 tracking-tighter">
                Your body is <br />
                your temple
            </h1>
            <p className="max-w-md mx-auto text-sm">
                Whether you•re a seasoned athlete or just starting out, we have
                a variety of equipment and classes to suit your needs. Our
                cardio machines, wei$it üfting equipment, and fu-.ctional
                traning areas provide a comprehensive workout experience.
            </p>

            <button className="uppercase border border-white rounded-full px-4 py-1">
                Join today
            </button>
        </div>
    );
}
