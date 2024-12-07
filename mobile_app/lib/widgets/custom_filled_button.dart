import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final IconData? iconData;
  final Color? foregroundColor;
  final Color? backgroundColor;
  final double? fontSize;
  final double? rotationAngle;
  final double? width;
  final double? height;

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
  ///
  /// The [width] and [height] parameters are optional for customizing button size.
  const CustomFilledButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.iconData,
    this.foregroundColor = Colors.white,
    this.backgroundColor,
    this.fontSize = 14,
    this.rotationAngle = 0,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    final buttonBackgroundColor =
        backgroundColor ?? Theme.of(context).primaryColor;

    Widget rotatedText() {
      return Transform.rotate(
        angle: rotationAngle ?? 0,
        child: Text(
          label,
          style: TextStyle(
            color: foregroundColor,
            fontSize: fontSize,
          ),
        ),
      );
    }

    final buttonStyle = ButtonStyle(
      backgroundColor: MaterialStateProperty.all(buttonBackgroundColor),
      shape: MaterialStateProperty.all<RoundedRectangleBorder>(
        RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6.0),
        ),
      ),
      fixedSize: width != null && height != null
          ? MaterialStateProperty.all(Size(width!, height!))
          : null,
    );

    return iconData != null
        ? FilledButton.icon(
            onPressed: onPressed,
            icon: Icon(
              iconData,
              size: fontSize! + 4,
              color: foregroundColor,
            ),
            label: rotatedText(),
            style: buttonStyle,
          )
        : FilledButton(
            onPressed: onPressed,
            style: buttonStyle,
            child: rotatedText(),
          );
  }
}
