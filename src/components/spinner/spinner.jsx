const Spinner = () => {
  return (
    <>
      <i className='fal fa-spinner-third'></i>

      <style jsx>
        {`
          i {
            color: var(--color);
            font-size: 1.1rem;
            animation: spinner 1.2s infinite;
          }

        @keyframes spinner {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        `}
      </style>
    </>
  );
}

export default Spinner;
