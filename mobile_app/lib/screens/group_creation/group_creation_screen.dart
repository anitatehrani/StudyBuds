import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:study_buds/widgets/custom_filled_button.dart';
import 'package:study_buds/widgets/custom_text_button.dart';
import 'package:dropdown_search/dropdown_search.dart';

class GroupCreationScreen extends StatefulWidget {
  const GroupCreationScreen({Key? key}) : super(key: key);

  @override
  State<GroupCreationScreen> createState() => _GroupCreationScreenState();
}

class _GroupCreationScreenState extends State<GroupCreationScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController membersLimitController = TextEditingController();
  final TextEditingController telegramLinkController = TextEditingController();
  bool isPrivateGroup = true; // Default to private group
  bool isTelegramLinked = true; // Set this based on actual telegram account linking logic

  List<String> courses = [];
  String? selectedCourse;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    fetchCourses();
  }

  Future<void> fetchCourses() async {
    final url = Uri.parse('http://10.0.2.2:5000/courses/all'); // Adjust for your local API
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final responseData = jsonDecode(response.body);
        final List<dynamic> fetchedCourses = responseData['courses'];
        setState(() {
          courses = fetchedCourses.cast<String>();
          isLoading = false;
        });
        print('Courses fetched successfully');
      } else {
        print('Error fetching courses: ${response.statusCode}');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to fetch courses. Error: ${response.statusCode}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } catch (error) {
      print('Error fetching courses: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error fetching courses. Please check your connection.'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<void> createGroup(BuildContext context) async {
    if (!isTelegramLinked) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error: Please link your Telegram account before creating a group.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    if (nameController.text.isEmpty ||
        descriptionController.text.isEmpty ||
        selectedCourse == null ||
        membersLimitController.text.isEmpty ||
        telegramLinkController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error: All fields are required.'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    if (!telegramLinkController.text.startsWith('https://t.me/')) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error: Telegram link must start with "https://t.me/".'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final membersLimit = int.tryParse(membersLimitController.text);
    if (membersLimit == null || membersLimit < 2 || membersLimit > 100) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error: Members limit must be between 2 and 100.'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    final url = Uri.parse('http://10.0.2.2:5000/groups/create');
    final headers = {'Content-Type': 'application/json'};
    final body = jsonEncode({
      'name': nameController.text,
      'description': descriptionController.text,
      'course': selectedCourse,
      'isPublic': !isPrivateGroup, // If not private, make it public
      'membersLimit': membersLimit,
      'telegramLink': telegramLinkController.text,
      'studentId': 123, // Use dynamic value if necessary
    });

    try {
      final response = await http.post(url, headers: headers, body: body);
      if (response.statusCode == 201) {
        final responseData = jsonDecode(response.body);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Group created successfully!'),
            backgroundColor: Colors.green,
          ),
        );
        print('Group Created: ${responseData['group']}');
      } else if(response.statusCode == 400) {
        final errorData = jsonDecode(response.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${errorData['message']}'),
            backgroundColor: Colors.orange,
          ),
        );
        print('${errorData['error']}');
      }else {
        final errorData = jsonDecode(response.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error: ${errorData['message']}'),
            backgroundColor: Colors.red,
          ),
        );
        print('Error: ${errorData['message']}');
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Failed to create group. Please try again later.'),
          backgroundColor: Colors.red,
        ),
      );
      print('Error: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    // List<String> courses = [];
    // fetchCourses();

    return Scaffold(
      appBar: AppBar(
        title: const Padding(
          padding: EdgeInsets.only(top: 20.0),
          child: Text(
            'Create a Study Group',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Colors.black,
            ),
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Name',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: nameController,
                decoration: const InputDecoration(
                  hintText: 'Enter the group name',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                ),
                style: const TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 16),

              const Text(
                'Description',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: descriptionController,
                maxLines: 3, // Increased to allow a longer description
                decoration: const InputDecoration(
                  hintText: 'Write an additional description for your study group. Include details about goals, topics, or preferences.',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 20),
                ),
                style: const TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 16),

              const Text(
                'Course',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
            DropdownSearch<String>(
              popupProps: PopupProps.menu(
                showSearchBox: true, // Enables search functionality
              ),
              items: (filter, infiniteScrollProps) => courses,
              selectedItem: selectedCourse,
              decoratorProps: DropDownDecoratorProps(
                decoration: InputDecoration(
                  labelText: "Select a course",
                  border: OutlineInputBorder(),
                ),
              ),
              onChanged: (value) {
                setState(() {
                  selectedCourse = value;
                });
              },
              validator: (value) => value == null ? "Please select a course" : null,
            ),

              const SizedBox(height: 16),

              const Text(
                'Members Limit',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: membersLimitController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'Enter the maximum number of members',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                ),
                style: const TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 16),

              const Text(
                'Telegram Group Link',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: telegramLinkController,
                decoration: const InputDecoration(
                  hintText: 'Example: https://t.me/example_group',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                ),
                style: const TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 16),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Private Group',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                  ),
                  Switch(
                    value: isPrivateGroup,
                    onChanged: (value) {
                      setState(() {
                        isPrivateGroup = value;
                      });
                    },
                  ),
                ],
              ),
              const SizedBox(height: 16),

              Center(
                child: CustomFilledButton(
                  label: 'Create the study group',
                  onPressed: () => createGroup(context),
                  iconData: Icons.add,
                ),
              ),
              const SizedBox(height: 16),

              Center(
                child: CustomTextButton(
                  label: 'Cancel',
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}