export default function EstimateRowTitle(props) {
  const { text, value, suffixText } = props;

  return (
    <tr>
      <th className="p-4 border-b border-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-bold leading-bold text-blue-gray-900">
          {text}
        </p>
      </th>
      <td className="flex justify-content-end p-4 border-b border-blue-gray-50 font-bold">
        <span>{value}</span>
        { suffixText && (<span className="ps-2">{suffixText}</span>) }
      </td>
    </tr>
  );
}
