import { IoArrowForwardCircleSharp } from "react-icons/io5";
import pullUp from "../../public/pull-up.jpg";
import pushUp from "../../public/push-up.jpg";
import squat from "../../public/squat.jpg";

export default function Trainings() {
    const trainings = [
        { title: "DeadLift training", image: pullUp },
        { title: "Squat training", image: squat },
        { title: "Push-up training", image: pushUp },
    ];

    return (
        <div className="px-16">
            <div className="flex items-center justify-between py-2">
                <h1 className="text-3xl uppercase tracking-tighter">
                    Trainings
                </h1>
                <button className="flex items-center gap-2">
                    See all <IoArrowForwardCircleSharp />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {trainings.map((training, index) => (
                    <div
                        key={index}
                        className="relative rounded-4xl overflow-hidden h-56"
                    >
                        <img
                            src={training.image}
                            alt={training.title}
                            className="w-full h-full object-cover object-[center_20%]"
                        />
                        <h1 className="absolute right-6 top-4 uppercase text-3xl tracking-tight">
                            {training.title}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
