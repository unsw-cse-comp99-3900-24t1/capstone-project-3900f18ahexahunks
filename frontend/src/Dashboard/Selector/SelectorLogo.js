const SelectorLogo = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/hexahunkLogoBlack.png`}
        alt="icon"
        style={{
          width: '42px',
          height: '42px',
          verticalAlign: 'middle',
          marginRight: '8px',
        }}
      />
      <h1 style={{ fontSize: '32px' }}>HexaHunks.</h1>
    </div>
  );
};
export default SelectorLogo;
//
