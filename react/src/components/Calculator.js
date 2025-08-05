import React, { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import './Calculator.css';

const { Content } = Layout;
const { Title } = Typography;

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setWaitingForSecondValue(false);
    }
  };

  const handleOperationClick = (op) => {
    setPrevValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualClick = () => {
    if (!prevValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = prevValue + currentValue;
    } else if (operation === '-') {
      result = prevValue - currentValue;
    } else if (operation === '×') {
      result = prevValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Ошибка');
        return;
      }
      result = prevValue / currentValue;
    } else if (operation === '%') {
      result = (prevValue * currentValue) / 100;
    }

    setDisplay(result.toString());
    setPrevValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '%', '='
  ];

  return (
    <Layout className="calculator-layout">
      <Content className="calculator-content">
        <Title level={2} className="calculator-title">Калькулятор</Title>
        <div className="calculator-display">
          {display}
        </div>
        <div className="calculator-buttons">
          {buttons.map((btn) => (
            <Button
              key={btn}
              className={`calculator-button ${btn === '=' ? 'equals' : ''} ${btn === 'C' ? 'clear' : ''}`}
              onClick={() => {
                if (btn === 'C') handleClearClick();
                else if (btn === '=') handleEqualClick();
                else if (['+', '-', '×', '÷', '%'].includes(btn)) handleOperationClick(btn);
                else handleNumberClick(btn);
              }}
            >
              {btn}
            </Button>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default Calculator;
