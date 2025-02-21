import { motion } from "framer-motion";
import { Mail, Trophy, Users } from "lucide-react";

const About = () => {
  
    return (
    <section className="w-full py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Our Project
          </h2>
          <p className="mt-4 text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Our platform is designed to enhance user experience by offering **real-time engagement, leaderboards, and seamless collaboration**.
            Built with cutting-edge technologies, we ensure an **intuitive and scalable** solution.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center"
          >
            <Trophy className="text-yellow-400 w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4 text-white">Leaderboard</h3>
            <p className="text-gray-300 text-center mt-2">
              Compete and climb the ranks on our dynamic leaderboard.
            </p>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center"
          >
            <Users className="text-blue-400 w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4 text-white">Community</h3>
            <p className="text-gray-300 text-center mt-2">
              Engage with a vibrant and supportive developer community.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center"
          >
            <Mail className="text-green-400 w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4 text-white">Contact Us</h3>
            <p className="text-gray-300 text-center mt-2">
              Reach out at <a href="mailto:contact@yourproject.com" className="text-white underline">contact@yourproject.com</a>
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold text-lg transition">
            Explore More
          </button>
        </div>
      </div>
    </section>
    );
}

export default About
