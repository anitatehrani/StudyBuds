import 'package:flutter/material.dart';

class CustomTextButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final IconData? iconData;
  final Color? foregroundColor;
  final double? fontSize;

  /// Creates a [CustomTextButton] widget.
  ///
  /// The [label] and [onPressed] parameters must not be null.
  ///
  /// The [iconData] parameter is optional, in case you don't want to add an icon
  /// for the button, simply do not provide this parameter.
  ///
  /// The [foregroundColor] parameter is optional, if not provided, the primary color will be used.
  ///
  /// The [fontSize] parameter is optional, if not provided, the default font size will be used.
  const CustomTextButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.iconData,
    this.foregroundColor,
    this.fontSize = 14,
  });

  @override
  Widget build(BuildContext context) {
    final buttonForegroundColor = foregroundColor ?? Theme.of(context).primaryColor;

    return iconData != null
        ? TextButton.icon(
            onPressed: onPressed,
            icon: Icon(
              iconData,
              color: buttonForegroundColor,
              size: fontSize! + 6,
            ),
            label: Text(
              label,
              style: TextStyle(
                color: buttonForegroundColor,
                fontSize: fontSize,
              ),
            ),
          )
        : TextButton(
            onPressed: onPressed,
            child: Text(
              label,
              style: TextStyle(
                color: buttonForegroundColor,
                fontSize: fontSize,
              ),
            ),
          );
  }
}