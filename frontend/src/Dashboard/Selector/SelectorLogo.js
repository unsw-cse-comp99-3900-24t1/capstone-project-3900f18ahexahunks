const SelectorLogo = () => {
  return (
    <h1
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/Path_1929.png`}
        alt="icon"
        style={{
          width: '50px',
          height: '50px',
          verticalAlign: 'middle',
          marginRight: '8px',
        }}
      />
      HexaHunks.
    </h1>
  );
};
export default SelectorLogo;
