const pattern = /^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-[0-9kK]$/i;
const ruts = [
  '19.456.789-K',
  '15.123.456-7', 
  '1234567-K',
  '20.555.111-9',
  '18.987.654-2'
];

console.log('=== TEST PATRÓN REGEX ===');
ruts.forEach(rut => {
  const matches = pattern.test(rut);
  console.log(`${rut}: ${matches ? '✅ SÍ' : '❌ NO'}`);
});
