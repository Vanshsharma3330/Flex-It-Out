import { motion } from "framer-motion";

const About = () => {
  return <>
    <section className="relative w-full py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Our Project
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Our platform is designed to provide seamless solutions, integrating the latest web technologies 
              to create an intuitive and engaging experience. Built with performance and scalability in mind, 
              our project ensures an effortless user journey.
            </p>
            <p className="mt-2 text-lg text-gray-300">
              We aim to bridge the gap between **innovation and functionality**, 
              empowering users with tools that drive efficiency and creativity.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold text-lg transition">
              Learn More
            </button>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://source.unsplash.com/500x400/?technology,abstract" 
              alt="About Us" 
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  </>
}

export default About
