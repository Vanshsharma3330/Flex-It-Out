import { Sparkle } from "lucide-react";
import Header from "../components/Header";

export default function Home() {
    return (
        <>
            <div className="flex flex-col h-screen gap-4">
                <Header />
                <main className="flex flex-col items-center justify-center h-full gap-4 m-auto">
                    <p className="text-xs tracking-wider">
                        ACHIEVE YOUR FITNESS GOALS
                    </p>
                    <h1 className="text-9xl text-center text-gray-800 tracking-tighter leading-24">
                        FIND YOUR <br />
                        STRENGTH
                    </h1>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Sparkle size={50} />
                        <h1 className="text-4xl uppercase text-center tracking-tight leading-10">
                            Fitness should be <br /> accessible for Everyone.
                        </h1>
                        <p className="max-w-md mx-auto">
                            Whether you're a seasoned athlete or just starting
                            out, we have a variety of equipment and classes to
                            suit your needs. Our cardio machines, weight lifting
                            equipment, and functional training areas provide a
                            comprehensive workout experience.
                        </p>
                        <button className="uppercase border rounded-full px-4 py-1">
                            Join today
                        </button>
                    </div>
                </main>
            </div>
        </>
    );
}
