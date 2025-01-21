import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../blocs/group_creation/bloc/group_creation_bloc.dart';
import '../../models/group.dart';
import '../../widgets/custom_filled_button.dart';

class GroupCreationScreen extends StatefulWidget {
  const GroupCreationScreen({Key? key}) : super(key: key);

  @override
  State<GroupCreationScreen> createState() => _GroupCreationScreenState();
}

class _GroupCreationScreenState extends State<GroupCreationScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController membersLimitController = TextEditingController();
  final TextEditingController telegramIdController = TextEditingController();
  bool isPrivateGroup = true;
  String selectedCourse = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text(
            'Create a Study Group',
            style: TextStyle(fontWeight: FontWeight.w600),
          ),
          centerTitle: true,
          backgroundColor: Theme.of(context).scaffoldBackgroundColor,
          elevation: 0,
          foregroundColor: Theme.of(context).primaryColor,
        ),
        body: BlocProvider(
          create: (_) => GroupCreationBloc()..add(TelegramIdCheckEvent()),
          child: Scaffold(
            body: BlocConsumer<GroupCreationBloc, GroupCreationState>(
              listener: (context, state) {
                if (state is TelegramIdCheckNotPassed) {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        title: Text('Profile Update Required'),
                        content: Text(
                          "For creating groups, add telegram ID in your profile.",
                          key: Key('telegram_id_popup'),
                        ),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.pushReplacementNamed(
                                  context, '/profile');
                              // Navigator.of(context).pop();
                            },
                            child: Text('Ok'),
                          ),
                        ],
                      );
                    },
                  );
                }
                if (state is GroupCreationSuccess) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                        content: Text(
                          state.message,
                          key: Key('success_snackbar'),
                        ),
                        backgroundColor: Colors.green),
                  );
                  Navigator.pushReplacementNamed(context, '/home');
                } else if (state is GroupCreationFailed) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                        content: Text(state.error, key: Key('error_snackbar')),
                        backgroundColor: Colors.red),
                  );
                }
              },
              builder: (context, state) {
                if (state.isLoading) {
                  return const Center(
                      child: CircularProgressIndicator(
                          key: Key('loading_indicator')));
                } else if (state is TelegramIdCheckPassed) {
                  context
                      .read<GroupCreationBloc>()
                      .add(FetchCoursesListEvent());
                }

                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        TextField(
                          enabled: state.isTelegramIdChecked,
                          controller: nameController,
                          decoration: InputDecoration(
                              labelText: 'Name',
                              hintText: 'Capstone Project',
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.always,
                              border: OutlineInputBorder(),
                              contentPadding: EdgeInsets.symmetric(
                                  horizontal: 12, vertical: 12),
                              filled: true,
                              fillColor: Colors.white,
                              labelStyle: TextStyle(color: Colors.black)),
                          style: const TextStyle(color: Colors.black),
                          key: Key('group_name_field'),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Set a descriptive name for your study group.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          enabled: state.isTelegramIdChecked,
                          controller: descriptionController,
                          maxLines: 3,
                          decoration: const InputDecoration(
                            labelText: 'Description',
                            hintText: 'A study group for people who...',
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                                horizontal: 12, vertical: 16),
                            fillColor: Colors.white,
                            // Set the fill color
                            labelStyle: TextStyle(
                                color: Colors
                                    .black), // Make the label white for visibility
                          ),
                          style: const TextStyle(color: Colors.black),
                          key: Key(
                              'group_description_field'), // he text color white
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Provide details about the goals, topics, or preferences.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        DropdownSearch<String>(
                          enabled: state.isTelegramIdChecked,
                          items: (filter, loadProps) => state.courses,
                          // items: state.courses,
                          selectedItem: selectedCourse,
                          onChanged: (value) {
                            selectedCourse = value!;
                          },
                          key: Key('course_dropdown_field'),
                          decoratorProps: const DropDownDecoratorProps(
                            decoration: InputDecoration(
                              labelText: 'Course',
                              hintText: 'Select a course',
                              floatingLabelBehavior:
                                  FloatingLabelBehavior.always,
                              border: OutlineInputBorder(),
                              labelStyle: TextStyle(color: Colors.black),
                              fillColor: Colors.white,
                            ),
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Choose a course from the list.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          enabled: state.isTelegramIdChecked,
                          controller: membersLimitController,
                          decoration: InputDecoration(
                            labelText: 'Members Limit',
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(
                                horizontal: 12, vertical: 12),
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                          ),
                          style: const TextStyle(color: Colors.black),
                          //
                          key: Key('members_limit_field'),
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly,
                            LengthLimitingTextInputFormatter(10),
                          ],
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Limit should be between 2 and 100 members.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          enabled: state.isTelegramIdChecked,
                          controller: telegramIdController,
                          decoration: InputDecoration(
                            labelText: 'Telegram Group Id',
                            hintText: '1234567890',
                            floatingLabelBehavior: FloatingLabelBehavior.always,
                            border: OutlineInputBorder(),
                            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                            fillColor: Colors.white,
                            labelStyle: TextStyle(color: Colors.black),
                            suffixIcon: IconButton(
                              icon: Icon(Icons.info_outline, color: Colors.blue),
                              tooltip: 'Click for more information',
                              onPressed: () {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('To get Telegram Group ID'),
                                    content: Text(
                                      '1. First, create your group on Telegram.\n'
                                      '2. Add our bot "studybuds" to the group and grant it administrative privileges.\n'
                                      '3. Send the message "/start" to the group.\n'
                                      '4. The bot will reply with the Telegram Group ID.\n\n'
                                      'Copy the Group ID and enter it in the field.'
                                    ),
                                    actions: [
                                      TextButton(
                                        onPressed: () => Navigator.pop(context),
                                        child: Text('Close'),
                                      ),
                                    ],
                                  ),
                                );
                              },
                            ),
                          ),
                          key: Key('telegram_group_link_field'),
                          keyboardType: TextInputType.number,
                          style: const TextStyle(color: Colors.black),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'You have to create your Telegram group and add its id here.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Private Group',
                              style: TextStyle(
                                  fontSize: 14, fontWeight: FontWeight.w500),
                            ),
                            Switch(
                              value: isPrivateGroup,
                              key: Key('is_private_group_switch'),
                              onChanged: state.isTelegramIdChecked
                                  ? (value) {
                                      setState(() {
                                        isPrivateGroup = value;
                                      });
                                    }
                                  : null,
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Center(
                          child: CustomFilledButton(
                            isEnabled: state.isTelegramIdChecked,
                            label: 'Create the study group',
                            key: Key('create_group_button'),
                            iconData: Icons.add,
                            onPressed: () {
                              context
                                  .read<GroupCreationBloc>()
                                  .add(CreateGroupEvent(
                                    Group(
                                        name: nameController.text,
                                        description: descriptionController.text,
                                        course: selectedCourse,
                                        membersLimit: membersLimitController
                                                .text.isNotEmpty
                                            ? int.parse(
                                                membersLimitController.text)
                                            : 2,
                                        members: [],
                                        telegramId:
                                            int.parse(telegramIdController.text),
                                        isPublic: !isPrivateGroup,
                                        ownerId: 10),
                                  ));
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ));
  }
}
