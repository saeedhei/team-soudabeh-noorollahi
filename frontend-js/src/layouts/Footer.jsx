function Footer() {
  return (
    <footer className="w-full">
      <div
        className="max-w-[1600px] mx-auto px-4 py-4 text-center 
                bg-gradient-to-b from-white to-gray-100 border-t border-gray-200 
                shadow-sm text-xs sm:text-sm rounded-t-md"
      >
        <p className="text-gray-700">
          &copy; {new Date().getFullYear()} VerbPro C1. All rights reserved.
        </p>
        <p className="mt-1 text-gray-600">
          Designed with <span className="text-red-400">&hearts;</span> for
          language learners.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
