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
  final TextEditingController telegramGroupIdController = TextEditingController();
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
                        _buildTextField(
                          enabled: state.isTelegramIdChecked,
                          controller: nameController,
                          label: 'Name',
                          hint: 'Capstone Project',
                          errorText: state.validationErrors['name'], 
                          onChanged: (value) {
                          _validateFields(context);
                        },
                        key: const Key('group_name_field'),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Set a descriptive name for your study group.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        _buildTextField(
                        enabled: state.isTelegramIdChecked,
                         label: 'Description',
                        hint: 'A study group for people who...',
                        controller: descriptionController,
                        maxLines: 3,
                        errorText: state.validationErrors['description'], 
                        onChanged: (value) {
                          _validateFields(context);
                        },
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
                        _buildTextField(
                          enabled: state.isTelegramIdChecked,
                          label: 'Members Limit',
                        controller: membersLimitController,
                        keyboardType: TextInputType.number,
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(10),
                        ],
                        errorText: state.validationErrors['membersLimit'], 
                        onChanged: (value) {
                          _validateFields(context);
                        },
                          key: Key('members_limit_field'),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Limit should be between 2 and 100 members.',
                          style: TextStyle(fontSize: 12, color: Colors.black),
                        ),
                        const SizedBox(height: 16),
                        _buildTextField(
                              label: 'Telegram Group ID',
                              hint: '1234567890',
                              controller: telegramGroupIdController,
                              keyboardType: TextInputType.number,
                              errorText: state.validationErrors['telegramId'],
                              onChanged: (value) {
                                _validateFields(context); 
                              },
                              enabled: state.isTelegramIdChecked, 
                              key: const Key('telegram_group_link_field'),
                              suffixIcon: IconButton(
                                icon: const Icon(Icons.info_outline, color: Colors.blue),
                                tooltip: 'Click for more information',
                                onPressed: () {
                                  showDialog(
                                    context: context,
                                    builder: (context) => AlertDialog(
                                      title: const Text('To get Telegram Group ID'),
                                      content: const Text(
                                        '1. First, create your group on Telegram.\n'
                                        '2. Add our bot "studybuds" to the group and grant it administrative privileges.\n'
                                        '3. Send the message "/start" to the group.\n'
                                        '4. The bot will reply with the Telegram Group ID.\n\n'
                                        'Copy the Group ID and enter it in the field.',
                                      ),
                                      actions: [
                                        TextButton(
                                          onPressed: () => Navigator.pop(context),
                                          child: const Text('Close'),
                                        ),
                                      ],
                                    ),
                                  );
                                },
                              ),
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
                            isEnabled: state.isTelegramIdChecked && state.isFormValid,
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
                                            int.parse(telegramGroupIdController.text),
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

void _validateFields(BuildContext context) {
    context.read<GroupCreationBloc>().add(
          ValidateFieldsEvent(
            name: nameController.text,
            description: descriptionController.text,
            membersLimit: membersLimitController.text,
            telegramGroupId: telegramGroupIdController.text,
          ),
        );
  }

  Widget _buildTextField({
  required String label,
  String? hint,
  required TextEditingController controller,
  String? errorText,
  required Function(String) onChanged,
  Key? key,
  int maxLines = 1,
  TextInputType keyboardType = TextInputType.text,
  List<TextInputFormatter>? inputFormatters,
  bool enabled = true,
  Widget? suffixIcon,
}) {
  return TextField(
    key: key,
    controller: controller,
    onChanged: onChanged,
    maxLines: maxLines,
    keyboardType: keyboardType,
    inputFormatters: inputFormatters,
    enabled: enabled,
    style: const TextStyle(color: Colors.black),
    decoration: InputDecoration(
      labelText: label,
      hintText: hint,
      floatingLabelBehavior: FloatingLabelBehavior.always,
      border: OutlineInputBorder(
        borderSide: BorderSide(
          color: errorText != null ? Colors.red : Colors.grey,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderSide: BorderSide(
          color: errorText != null ? Colors.red : Colors.black,
          width: 2,
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderSide: BorderSide(
          color: errorText != null ? Colors.red : Colors.grey,
        ),
      ),
      errorText: errorText, 
      contentPadding: const EdgeInsets.symmetric(
        horizontal: 12,
        vertical: 12,
      ),
      filled: true,
      fillColor: Colors.white,
      labelStyle: const TextStyle(color: Colors.black),
      suffixIcon: suffixIcon, 
    ),
  );
}

}
