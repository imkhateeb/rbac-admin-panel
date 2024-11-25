const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 items-center justify-center bg-black bg-opacity-75 z-30 flex flex-col">
      {children}
    </div>
  );
};

export default Modal;
