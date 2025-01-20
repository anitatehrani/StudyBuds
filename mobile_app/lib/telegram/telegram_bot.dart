import 'package:url_launcher/url_launcher.dart';

class TelegramBot {
  static final String botLink = "https://t.me/study_buds_bot";

  static Future<void> launchTelegramBot() async {
    final Uri botUri = Uri.parse(botLink);

    if (await canLaunchUrl(botUri)) {
      await launchUrl(botUri, mode: LaunchMode.externalApplication);
    } else {
      // ScaffoldMessenger.of(context).showSnackBar(
      //   const SnackBar(content: Text('Could not open Telegram bot')),
      // );
    }
  }
}
