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

    return FilledButton(
      onPressed: onPressed,
      style: buttonStyle,
      child: rotationAngle == 0
          ? Text(
              label,
              style: TextStyle(
                color: foregroundColor,
                fontSize: fontSize,
              ),
              maxLines: 1, // Prevents text from wrapping
              overflow: TextOverflow.ellipsis, // Truncates text if necessary
            )
          : RotatedBox(
              quarterTurns: (rotationAngle! / 1.57).round(), // Rotate text
              child: Text(
                label,
                style: TextStyle(
                  color: foregroundColor,
                  fontSize: fontSize,
                ),
                maxLines: 1, // Prevents text from wrapping
                overflow: TextOverflow.ellipsis, // Truncates text if necessary
              ),
            ),
    );
  }
}
