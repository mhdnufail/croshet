function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "px-5 py-2.5 rounded-lg font-medium transition duration-200";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-dark",

    secondary:
      "bg-secondary text-text hover:bg-accent",

    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;