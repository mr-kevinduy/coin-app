import InputNumber from '@/components/InputNumber';

export default function EstimateRow(props) {
  const { className, lable, name, value, suffixText, onChange } = props;

  return (
    <tr className={className}>
      <th className="p-4 border-b border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          {lable}
        </p>
      </th>
      <td className="p-4 border-b border-blue-gray-50">
        <InputNumber
          name={name}
          suffixText={suffixText}
          value={value}
          onChange={onChange}
        />
      </td>
    </tr>
  );
}
