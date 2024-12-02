import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../blocs/group_creation/bloc/group_creation_bloc.dart';
import '../../models/group.dart';
import '../../widgets/custom_filled_button.dart';


class GroupCreationScreen extends StatefulWidget {
  const GroupCreationScreen({Key? key}) : super(key: key);

  @override
  State<GroupCreationScreen> createState() => _GroupCreationScreenState();
}

class _GroupCreationScreenState extends State<GroupCreationScreen>  {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController membersLimitController = TextEditingController();
  final TextEditingController telegramLinkController = TextEditingController();
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
      body:  BlocProvider(
      create: (_) => GroupCreationBloc()..add(FetchCoursesListEvent()),
      child: Scaffold(
        appBar: AppBar(title: Text('Create a Study Group')),
        body: BlocConsumer<GroupCreationBloc, GroupCreationState>(
          listener: (context, state) {
            if (state.errorMessage != null) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(state.errorMessage!), backgroundColor: Colors.red),
              );
            }
          },
          builder: (context, state) {
            if (state.isLoading) {
              return Center(child: CircularProgressIndicator());
            }

            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  TextField(controller: nameController, decoration: InputDecoration(labelText: 'Name')),
                  TextField(controller: descriptionController, decoration: InputDecoration(labelText: 'Description')),
                  DropdownSearch<String>(
                    items: (filter, loadProps) => state.courses,
                    // items: state.courses,
                    selectedItem: selectedCourse,
                    onChanged: (value) {
                      selectedCourse = value!;
                    },
                  ),
                  TextField(
                    controller: membersLimitController,
                    decoration: InputDecoration(labelText: 'Members Limit'),
                    keyboardType: TextInputType.number,
                  ),
                  TextField(controller: telegramLinkController, decoration: InputDecoration(labelText: 'Telegram Link')),
                  Switch(
                    value: isPrivateGroup,
                    onChanged: (value) => isPrivateGroup = value,
                  ),
                  CustomFilledButton(
                    label: 'Create',
                    onPressed: () {
                      BlocProvider.of<GroupCreationBloc>(context).add(
                        CreateGroupEvent(
                          new Group(
                          name: nameController.text,
                          description: descriptionController.text,
                          course: selectedCourse,
                          members: int.parse(membersLimitController.text),
                          telegramLink: telegramLinkController.text,
                          isPublic: isPrivateGroup,
                          studentId: 10
                        ),
                      )
                      );
                    },
                  ),
                ],
              ),
            );
          },
        ),
      ),
    )
    );
  }
}
