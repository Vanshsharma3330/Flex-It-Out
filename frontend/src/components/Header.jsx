export default function Header() {
    return (
        <div className="flex justify-between items-center p-2">
            <h1 className="uppercase tracking-tighter text-xl">Flex-It-Out</h1>

            <ul className="flex justify-between items-center gap-4">
                <li>About</li>
                <li>Trainings</li>
                <li>Contacts</li>
            </ul>

            <button className="uppercase border rounded-full px-4 py-1 text-sm">
                Join Today
            </button>
        </div>
    );
}
