'use client';
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
  const [stockPrice, setStockPrice] = useState(0);
  const [dividend, setDividend] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const toast = useToast();

  const handleStockPriceChange = (_val: string, valNum: number) => {
    setShowResult(false);
    setStockPrice(valNum);
  };
  const handleDividendChange = (_val: string, valNum: number) => {
    setShowResult(false);
    setDividend(valNum);
  };
  const calculate = () => {
    const storkPriceNumber = Number(stockPrice);
    const dividendNumber = Number(dividend);
    if (isNaN(storkPriceNumber) || isNaN(dividendNumber)) {
      toast({
        title: 'エラー',
        description: '数値を入力してください',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (storkPriceNumber === 0) {
      toast({
        title: 'エラー',
        description: '株価は0より大きい値を入力してください',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setShowResult(true);
  };
  const fluctuationRates = [
    { rate: -0.5, label: '-50%' },
    { rate: -0.4, label: '-40%' },
    { rate: -0.3, label: '-30%' },
    { rate: -0.2, label: '-20%' },
    { rate: -0.1, label: '-10%' },
    { rate: -0.05, label: '-5%' },
    { rate: 0, label: '±0%' },
    { rate: 0.05, label: '+5%' },
    { rate: 0.1, label: '+10%' },
    { rate: 0.2, label: '+20%' },
    { rate: 0.3, label: '+30%' },
    { rate: 0.4, label: '+40%' },
    { rate: 0.5, label: '+50%' },
  ];
  const stockPriceWithFluctuation = (rate: number) => {
    return (stockPrice * (1 + rate)).toFixed(0);
  };
  const dividendYieldWithFluctuation = (rate: number) => {
    return ((dividend / (stockPrice * (1 + rate))) * 100).toFixed(2);
  };
  return (
    <main className=" min-h-screen flex-col items-center justify-between p-12">
      <form>
        <Stack spacing={5}>
          <Heading>配当利回りシミュレータ</Heading>
          <Text fontSize="md">
            株価の変動に対する配当利回りをシミュレーションします
          </Text>
          <FormControl>
            <FormLabel>株価</FormLabel>
            <NumberInput isRequired onChange={handleStockPriceChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>年間配当金額</FormLabel>
            <NumberInput isRequired onChange={handleDividendChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Stack direction="row" align="center" justify="center">
            <Button colorScheme="teal" size="md" onClick={() => calculate()}>
              計算する
            </Button>
          </Stack>
        </Stack>
      </form>
      {showResult && (
        <TableContainer mt={8}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>株価変動割合</Th>
                <Th>株価</Th>
                <Th isNumeric>配当利回り</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fluctuationRates.map((rate) => (
                <Tr key={rate.rate}>
                  <Td>{rate.label}</Td>
                  <Td>{`${stockPriceWithFluctuation(rate.rate)}`}</Td>
                  <Td isNumeric>
                    {`${dividendYieldWithFluctuation(rate.rate)}%`}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}
