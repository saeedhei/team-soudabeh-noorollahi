function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 border-t border-gray-200 text-center text-xs sm:text-sm py-4 px-4">
      <p className="text-gray-700">
        &copy; {new Date().getFullYear()} VerbPro C1. All rights reserved.
      </p>
      <p className="mt-1 text-gray-600">
        Designed with <span className="text-red-400">&hearts;</span> for
        language learners.
      </p>
    </footer>
  );
}

export default Footer;
