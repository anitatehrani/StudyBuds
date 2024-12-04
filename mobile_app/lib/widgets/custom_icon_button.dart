import 'package:flutter/material.dart';

class CustomIconButton extends StatelessWidget {
  final VoidCallback onPressed;
  final IconData? iconData;
  final Color? foregroundColor;
  final Color? backgroundColor;
  final double? fontSize;

  /// Creates a [CustomFilledButton] widget.
  ///
  /// The [label] and [onPressed] parameters must not be null.
  ///
  /// The [iconData] parameter is optional, in case you don't want to add an icon
  /// for the button, simply do not provide this parameter.
  ///
  /// The [foregroundColor] parameter is optional, if not provided, white color will be used.
  ///
  /// The [backgroundColor] parameter is optional, if not provided, the primary color will be used.
  ///
  /// The [fontSize] parameter is optional, if not provided, the default font size will be used.
  const CustomIconButton({
    super.key,
    required this.onPressed,
    this.iconData,
    this.foregroundColor = Colors.white,
    this.backgroundColor,
    this.fontSize = 12
  });

  @override
  Widget build(BuildContext context) {
    final buttonBackgroundColor =
        backgroundColor ?? Theme.of(context).primaryColor;

    return IconButton(
            onPressed: onPressed,
            icon: Icon(
              iconData,
              size: fontSize! + 4,
              color: Colors.white,
            ),
            style: ButtonStyle(
              // backgroundColor: WidgetStateProperty.all(Theme.of(context).colorScheme.primary),
              backgroundColor: WidgetStatePropertyAll(backgroundColor),
              shape: WidgetStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(6.0),
                ),
              ),
            ),
          );
  }
}
