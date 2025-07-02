import { GoNorthStar } from "react-icons/go";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="fixed flex justify-between items-center px-4 py-2 z-10 w-full bg-white/80 backdrop-blur-sm bg-blend-hard-light">
            <h1 className="uppercase tracking-tighter text-3xl flex items-center gap-2">
                <GoNorthStar />
                FlexIt-Out
            </h1>

            <ul className="hidden md:flex justify-between items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
                <li>
                    <Link
                        to="/about"
                        className="hover:text-gray-600 transition-colors duration-300"
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/workout"
                        className="hover:text-gray-600 transition-colors duration-300"
                    >
                        Workout
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contacts"
                        className="hover:text-gray-600 transition-colors duration-300"
                    >
                        Contacts
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contest"
                        className="hover:text-gray-600 transition-colors duration-300"
                    >
                        Contest
                    </Link>
                </li>
            </ul>

            <button
                onClick={toggleMenu}
                className="md:hidden hover:text-gray-600 transition-colors duration-300"
            >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-sm md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/trainings"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Trainings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacts"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Contacts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacts"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Contacts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="uppercase border rounded-full px-4 py-1 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Join Today
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
            <button
                onClick={toggleMenu}
                className="md:hidden hover:text-gray-600 transition-colors duration-300"
            >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>

            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-sm md:hidden">
                    <ul className="flex flex-col items-center gap-4 py-4">
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/trainings"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Trainings
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacts"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Contacts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacts"
                                className="hover:text-gray-600 transition-colors duration-300"
                            >
                                Contacts
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="uppercase border rounded-full px-4 py-1 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                            >
                                Join Today
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
            <Link
                to="/login"
                className="uppercase border rounded-full px-4 py-1 text-sm hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
                Join Today
            </Link>
        </div>
    );
}
