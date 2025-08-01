function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} VerbPro C1. All rights reserved.</p>
      <p className="mt-1">
        Designed with <span className="text-red-400">&hearts;</span> for
        language learners.
      </p>
    </footer>
  );
}

export default Footer;
