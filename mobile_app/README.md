# mobile_app

Mobile Application of Study Buds

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://docs.flutter.dev/cookbook)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.

## Troubleshooting: Java Version Compatibility

If you encounter build errors related to Java version compatibility, especially after adding packages like `flutter_web_auth` and `flutter_secure_storage`, follow these steps:

1. Ensure you have JDK 17 installed on your system.

2. Configure Flutter to use JDK 17 by running the following command in your terminal:


    `flutter config --jdk-dir=/path/to/java17`

    Replace `/path/to/java17` with the actual path to your JDK 17 installation.

    For example:
    - On Windows: `flutter config --jdk-dir="C:\Program Files\Java\jdk-17"`

3. After setting the JDK path, clean your project and get dependencies:

    flutter clean
    flutter pub get

4. Try running your app again:

    If you still encounter issues, ensure that your `JAVA_HOME` environment variable is set correctly to point to JDK 17.
    
    Note: This solution is specific to our project configuration and may need to be adjusted if the project's Java version requirements change in the future.