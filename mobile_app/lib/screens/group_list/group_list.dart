import 'package:flutter/material.dart';
import 'package:study_buds/models/group.dart';
import 'package:study_buds/widgets/group_card.dart';

class GroupList extends StatelessWidget {
  const GroupList({super.key});

  @override
  Widget build(BuildContext context) {
    // TODO: Change these joinedGroupSampleList and ownedGroupSampleList to actual data
    List<Group> joinedGroupSampleList = [
      Group(
          name: "Capstone Project",
          course: "Capstone",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Capstone Project",
          course: "Capstone",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Capstone Project",
          course: "Capstone",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Capstone Project",
          course: "Capstone",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Software Engineering",
          course: "CSE 110",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Data Structures",
          course: "CSE 101",
          description: "Blah blah",
          members: 23,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
    ];
    List<Group> ownedGroupSampleList = [
      Group(
          name: "Advanced Algorithms",
          course: "CSE 201",
          description: "In-depth study of algorithms",
          members: 15,
          isPublic: false,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Machine Learning",
          course: "CSE 301",
          description: "Exploring ML techniques",
          members: 30,
          isPublic: true,
          telegramLink: '',
          studentId: 10),
      Group(
          name: "Database Systems",
          course: "CSE 202",
          description: "Understanding database design",
          members: 20,
          isPublic: false,
          telegramLink: '',
          studentId: 10),
    ];
    return Scaffold(
      body: DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Groups', style: TextStyle(color: Colors.white)),
            automaticallyImplyLeading: false,
            backgroundColor: Theme.of(context).primaryColor,
            bottom: TabBar(
              overlayColor: WidgetStatePropertyAll(Color(0x25FFFFFF)),
              indicatorColor: Theme.of(context).colorScheme.secondary,
              labelColor: Colors.white,
              unselectedLabelColor: Colors.white70,
              tabs: [
                Tab(text: 'Joined Groups'),
                Tab(text: 'Owned Groups'),
              ],
            ),
          ),
          body: TabBarView(
            children: [
              GroupListTab(
                groups: joinedGroupSampleList,
                isJoinedScreen: true,
              ),
              GroupListTab(
                groups: ownedGroupSampleList,
                isJoinedScreen: false,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class GroupListTab extends StatelessWidget {
  final List<Group> groups; // it could be a list of owned or joined groups
  final bool isJoinedScreen;

  const GroupListTab(
      {super.key, required this.groups, this.isJoinedScreen = true});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: ListView.builder(
        itemCount: groups.length,
        itemBuilder: (context, index) {
          final group = groups[index];
          return Padding(
            padding:
                const EdgeInsets.symmetric(vertical: 2.0, horizontal: 16.0),
            // Add vertical and horizontal padding
            child: GroupCard(
              backgroundColor: Colors.white,
              buttonLabel:
                  isJoinedScreen ? "Leave the group" : "Change settings",
              additionalButtonLabel:
                  isJoinedScreen ? "See more" : "Delete the group",
              additionalButtonColor: isJoinedScreen
                  ? Theme.of(context).colorScheme.primary
                  : Colors.red,
              group: group,
              index: index,
            ),
          );
        },
      ),
    );
  }
}
