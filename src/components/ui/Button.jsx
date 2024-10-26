const Button = ({ children, onClick, variant = 'primary', disabled = false, type = 'button' }) => {
    const variants = {
      primary: 'bg-green-600 hover:bg-green-700 text-white',
      secondary: 'bg-white hover:bg-gray-50 text-green-600 border border-green-600',
      outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300'
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]}
        `}
      >
        {children}
      </button>
    );
  };
  
  export default Button;