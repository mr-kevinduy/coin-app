export default function InputNumber(props) {
  const { name, value, suffixText, onChange } = props;

  return (
    <>
      <input
        type="number"
        step="0.0000000001"
        min='0'
        max='2000000000'
        name={name}
        value={value}
        onChange={onChange}
      />
      { suffixText && (<span className="ps-2">{suffixText}</span>) }
    </>
  );
}
