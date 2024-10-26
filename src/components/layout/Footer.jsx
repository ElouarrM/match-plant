const Footer = () => {
    return (
      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="text-center">
            <p className="text-gray-600">
              © {new Date().getFullYear()} PlantMatch. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;