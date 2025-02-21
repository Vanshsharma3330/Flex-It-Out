import { motion } from "framer-motion";
import Header from "../components/Header";
import Trainings from "../components/Trainings";
import Footer from "../components/Footer";
import Video from "../components/Video";
import { GoNorthStar } from "react-icons/go";

export default function Home() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <Header />
                <main className="flex flex-col items-center justify-center gap-8 m-auto pt-20">
                    <Video />
                    <div className="flex flex-col items-center gap-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <GoNorthStar size={50} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl uppercase text-center tracking-tight leading-10"
                        >
                            Fitness should be <br /> accessible for Everyone.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="max-w-md mx-auto"
                        >
                            Whether you're a seasoned athlete or just starting
                            out, we have a variety of equipment and classes to
                            suit your needs. Our cardio machines, weight lifting
                            equipment, and functional training areas provide a
                            comprehensive workout experience.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="uppercase border rounded-full px-4 py-1"
                        >
                            Join today
                        </motion.button>
                    </div>
                </main>
                <Trainings />
                <Footer />
            </div>
        </>
    );
}
