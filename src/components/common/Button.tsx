interface Props {
  children: React.ReactNode;
  onClick?: (e: any) => void;
}

function Button({children, onClick}: Props) {
  return (
    <button
      className="px-4 py-2 border-gray-600 border rounded-xl"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;
