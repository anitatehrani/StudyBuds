import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  // Sample data for the student
  final String studentName = "Parsa Moslem";
  final String studentId = "5755015";
  String telegramAccountId = " "; // Editable field

  // Controller for the Telegram Account ID field
  final TextEditingController telegramController = TextEditingController();
 final String botLink = "https://t.me/study_buds_bot";
  @override
  void initState() {
    super.initState();
    // Initialize the controller with the existing Telegram Account ID
    telegramController.text = telegramAccountId;
  }

  @override
  void dispose() {
    // Dispose of the controller when the widget is disposed
    telegramController.dispose();
    super.dispose();
  }

  Future<void> launchTelegramBot() async {
    if (await canLaunch(botLink)) {
      await launch(botLink);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Could not open Telegram bot')),
      );
    }
  }

  void saveChanges() {
    setState(() {
      telegramAccountId = telegramController.text;
    });


    // You can add further actions to save the data, e.g., API calls.
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Changes saved successfully!')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Personal Information',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        centerTitle: true,
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 0,
        foregroundColor: Theme.of(context).primaryColor,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 20),
            TextFormField(
              initialValue: studentName,
              readOnly: true,
              decoration: const InputDecoration(
                labelText: 'Full name',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              initialValue: studentId,
              readOnly: true,
              decoration: const InputDecoration(
                labelText: 'Student ID',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            TextField(
               controller: telegramController,
              decoration: InputDecoration(
                labelText: 'Telegram Account ID',
                border: const OutlineInputBorder(),
                helperText: 'Use the bot below to get your Telegram ID.',
                ),
            ),
             const SizedBox(height: 10),
            Center(
              child: TextButton.icon(
                onPressed: launchTelegramBot,
                icon: const Icon(Icons.telegram),
                label: const Text('Get Telegram ID via Bot'),
                style: TextButton.styleFrom(
                  foregroundColor: Theme.of(context).primaryColor,
                ),
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: saveChanges,
                icon: const Icon(Icons.save),
                label: const Text('Save the changes'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                ),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
