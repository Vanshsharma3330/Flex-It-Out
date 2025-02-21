import video from "../../public/video.mp4";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function Video() {
    return (
        <div className="relative text-white text-center rounded-4xl overflow-hidden drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            <motion.div
                className="absolute top-1/4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.p
                    className="text-xs tracking-wider pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    ACHIEVE YOUR FITNESS GOALS
                </motion.p>
                <motion.h1
                    className="text-8xl text-center text-white tracking-tighter leading-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    FIND YOUR STRENGTH
                </motion.h1>
            </motion.div>
            <motion.div
                className="absolute bottom-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    className="uppercase text-7xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Inside <br />
                    and Out.
                </motion.h1>
                <motion.p
                    className="mx-auto text-md px-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    We are dedicated to helping you achieve your fitness goals
                    and improve your overall health and well being.
                </motion.p>
            </motion.div>
            <div className="video-container h-screen">
                <ReactPlayer
                    url={video}
                    playing={true}
                    loop={true}
                    width="100%"
                    height="100%"
                    controls={false}
                    muted={true}
                />
            </div>
        </div>
    );
}
