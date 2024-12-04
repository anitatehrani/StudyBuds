import 'package:flutter/material.dart';

class CustomIconButton extends StatelessWidget {
  final VoidCallback onPressed;
  final IconData? iconData;
  final Color? foregroundColor;
  final Color? backgroundColor;
  final double? size;

  /// Creates a [CustomIconButton] widget.
  ///
  /// The [onPressed] parameter must not be null.
  ///
  /// The [iconData] parameter specifies the icon inside the button.
  ///
  /// The [foregroundColor] is the color of the icon. Defaults to white.
  ///
  /// The [backgroundColor] is the background color of the button. Defaults to the primary color.
  ///
  /// The [size] determines the button's diameter. Defaults to 48.
  const CustomIconButton({
    super.key,
    required this.onPressed,
    this.iconData,
    this.foregroundColor = Colors.white,
    this.backgroundColor,
    this.size = 18.0,
  });

  @override
  Widget build(BuildContext context) {
    final buttonBackgroundColor =
        backgroundColor ?? Theme.of(context).primaryColor;

    return InkWell(
      onTap: onPressed,
      borderRadius: BorderRadius.circular(size! / 2),
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: buttonBackgroundColor,
          shape: BoxShape.circle,
        ),
        child: Icon(
          iconData,
          color: foregroundColor,
          size: size! / 2, // Adjust icon size relative to button size
        ),
      ),
    );
  }
}
