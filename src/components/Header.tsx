import React from 'react';
import { Select } from 'native-base';

export default function () {
  let [language, setLanguage] = React.useState<string>('key0');
  return (
    <Select
      placeholder="Mode of payment"
      selectedValue={language}
      width={150}
      onValueChange={(itemValue: string) => setLanguage(itemValue)}
    >
      <Select.Item label="Wallet" value="key0" />
      <Select.Item label="ATM Card" value="key1" />
      <Select.Item label="Debit Card" value="key2" />
      <Select.Item label="Credit Card" value="key3" />
      <Select.Item label="Net Banking" value="key4" />
    </Select>
  );
}