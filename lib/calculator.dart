import 'package:flutter/material.dart';
import 'dart:math' as math;

class Calculator extends StatefulWidget {
  final Function(String, String)? onCalculate;

  const Calculator({super.key, this.onCalculate});

  @override
  State<Calculator> createState() => _CalculatorState();
}

class _CalculatorState extends State<Calculator> {
  String _display = '0';
  String _expression = '';
  String _previousValue = '';
  String _operator = '';
  bool _waitingForOperand = false;
  bool _justCalculated = false;

  void _inputDigit(String digit) {
    if (_justCalculated) {
      _display = digit;
      _expression = '';
      _previousValue = '';
      _operator = '';
      _justCalculated = false;
      _waitingForOperand = false;
    } else if (_waitingForOperand) {
      _display = digit;
      _waitingForOperand = false;
    } else {
      _display = _display == '0' ? digit : _display + digit;
    }
    setState(() {});
  }

  void _inputDecimal() {
    if (_justCalculated) {
      _display = '0.';
      _expression = '';
      _previousValue = '';
      _operator = '';
      _justCalculated = false;
      _waitingForOperand = false;
    } else if (_waitingForOperand) {
      _display = '0.';
      _waitingForOperand = false;
    } else if (!_display.contains('.')) {
      _display = '$_display.';
    }
    setState(() {});
  }

  void _performOperation(String nextOperator, String displayOp) {
    if (_previousValue.isEmpty) {
      _previousValue = _display;
      _expression = '$_display $displayOp';
    } else if (_operator.isNotEmpty && !_waitingForOperand) {
      final result = _calculate(double.parse(_previousValue), double.parse(_display), _operator);
      final resultStr = _formatResult(result);
      _expression = '$resultStr $displayOp';
      _display = resultStr;
      _previousValue = resultStr;
    } else {
      _expression = '$_previousValue $displayOp';
    }
    _operator = nextOperator;
    _waitingForOperand = true;
    _justCalculated = false;
    setState(() {});
  }

  double _calculate(double a, double b, String op) {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b == 0 ? double.nan : a / b;
      default:
        return b;
    }
  }

  String _formatResult(double result) {
    if (result.isNaN) return 'Error';
    if (result.isInfinite) return 'Error';
    if (result == result.toInt()) {
      return result.toInt().toString();
    }
    String str = result.toStringAsFixed(10);
    str = str.replaceAll(RegExp(r'0+$'), '');
    str = str.replaceAll(RegExp(r'\.$'), '');
    return str;
  }

  void _calculateResult() {
    if (_operator.isEmpty || _previousValue.isEmpty) return;

    final a = double.parse(_previousValue);
    final b = double.parse(_display);
    final result = _calculate(a, b, _operator);
    final resultStr = _formatResult(result);
    final displayOp = _getDisplayOp(_operator);

    if (widget.onCalculate != null && !result.isNaN && !result.isInfinite) {
      widget.onCalculate!('$_previousValue $displayOp $_display', resultStr);
    }

    setState(() {
      _expression = '$_previousValue $displayOp $_display =';
      _display = resultStr;
      _previousValue = '';
      _operator = '';
      _waitingForOperand = false;
      _justCalculated = true;
    });
  }

  String _getDisplayOp(String op) {
    switch (op) {
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return op;
    }
  }

  void _clear() {
    setState(() {
      _display = '0';
      _expression = '';
      _previousValue = '';
      _operator = '';
      _waitingForOperand = false;
      _justCalculated = false;
    });
  }

  void _backspace() {
    if (_justCalculated) {
      _clear();
      return;
    }
    if (_display.length > 1) {
      _display = _display.substring(0, _display.length - 1);
    } else {
      _display = '0';
    }
    setState(() {});
  }

  void _toggleSign() {
    if (_display != '0') {
      if (_display.startsWith('-')) {
        _display = _display.substring(1);
      } else {
        _display = '-$_display';
      }
      setState(() {});
    }
  }

  void _squareRoot() {
    final value = double.parse(_display);
    if (value >= 0) {
      final result = math.sqrt(value);
      final resultStr = _formatResult(result);
      _expression = '√($_display)';
      _display = resultStr;
      _justCalculated = true;
      if (widget.onCalculate != null) {
        widget.onCalculate!('√($_display)', resultStr);
      }
      setState(() {});
    }
  }

  void _square() {
    final value = double.parse(_display);
    final result = value * value;
    final resultStr = _formatResult(result);
    _expression = '$_display²';
    _display = resultStr;
    _justCalculated = true;
    if (widget.onCalculate != null) {
      widget.onCalculate!('$_display²', resultStr);
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return SafeArea(
      child: Column(
        children: [
          Expanded(
            flex: 2,
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              alignment: Alignment.bottomRight,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    _expression,
                    style: TextStyle(
                      fontSize: 20,
                      color: colorScheme.onSurfaceVariant,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    _display,
                    style: TextStyle(
                      fontSize: _display.length > 10 ? 42 : 56,
                      fontWeight: FontWeight.w300,
                      color: colorScheme.onSurface,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 5,
            child: Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  Expanded(child: _buildButtonRow(['C', 'x²', '√', '÷'], colorScheme)),
                  const SizedBox(height: 12),
                  Expanded(child: _buildButtonRow(['7', '8', '9', '×'], colorScheme)),
                  const SizedBox(height: 12),
                  Expanded(child: _buildButtonRow(['4', '5', '6', '-'], colorScheme)),
                  const SizedBox(height: 12),
                  Expanded(child: _buildButtonRow(['1', '2', '3', '+'], colorScheme)),
                  const SizedBox(height: 12),
                  Expanded(child: _buildButtonRow(['+/-', '0', '.', '='], colorScheme)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildButtonRow(List<String> buttons, ColorScheme colorScheme) {
    return Row(
      children: buttons.map((btn) => Expanded(child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 6),
        child: _buildButton(btn, colorScheme),
      ))).toList(),
    );
  }

  Widget _buildButton(String text, ColorScheme colorScheme) {
    Color bgColor;
    Color fgColor;
    double fontSize = 28;
    FontWeight weight = FontWeight.w500;

    if (text == '=') {
      bgColor = colorScheme.primary;
      fgColor = colorScheme.onPrimary;
      weight = FontWeight.w600;
    } else if (text == '+' || text == '-' || text == '×' || text == '÷') {
      bgColor = colorScheme.primaryContainer;
      fgColor = colorScheme.onPrimaryContainer;
      weight = FontWeight.w600;
    } else if (text == 'C' || text == 'x²' || text == '√' || text == '+/-') {
      bgColor = colorScheme.tertiaryContainer;
      fgColor = colorScheme.onTertiaryContainer;
    } else {
      bgColor = colorScheme.surfaceVariant;
      fgColor = colorScheme.onSurface;
    }

    return Material(
      color: bgColor,
      borderRadius: BorderRadius.circular(24),
      child: InkWell(
        borderRadius: BorderRadius.circular(24),
        onTap: () => _handleButton(text),
        child: Container(
          height: double.infinity,
          alignment: Alignment.center,
          child: Text(
            text,
            style: TextStyle(
              fontSize: fontSize,
              fontWeight: weight,
              color: fgColor,
            ),
          ),
        ),
      ),
    );
  }

  void _handleButton(String text) {
    if (text == 'C') {
      _clear();
    } else if (text == '+' || text == '-') {
      _performOperation(text, text);
    } else if (text == '×') {
      _performOperation('*', '×');
    } else if (text == '÷') {
      _performOperation('/', '÷');
    } else if (text == '=') {
      _calculateResult();
    } else if (text == '.') {
      _inputDecimal();
    } else if (text == '+/-') {
      _toggleSign();
    } else if (text == '√') {
      _squareRoot();
    } else if (text == 'x²') {
      _square();
    } else {
      _inputDigit(text);
    }
  }
}
