const SelectorLogo = () => {
  return (
    <h1>
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
      Hexa Hunks
    </h1>
  );
};
export default SelectorLogo;
