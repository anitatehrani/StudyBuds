import 'package:flutter/material.dart';
import 'package:study_buds/models/group_details_model.dart';
import 'package:url_launcher/url_launcher.dart';

import '../models/group.dart';
import '../widgets/custom_text_button.dart';

class GroupDetailsDialog extends StatelessWidget {
  final Group group;
  final bool isOwner;
  final GroupDetails groupDetails;

  const GroupDetailsDialog({
    super.key,
    required this.group,
    this.isOwner = false,
    required this.groupDetails,
  });

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    group.name,
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(4.0),
                    child: Icon(
                      group.isPublic
                          ? Icons.lock_open_rounded
                          : Icons.lock_rounded,
                      size: 16,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                group.course,
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontWeight: FontWeight.w500,
                  fontSize: 16.0,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Description',
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                group.description,
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                ),
              ),
              const SizedBox(height: 12),
              // Group Members
              Row(
                children: [
                  Text(
                    'Group Members ',
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '• ${group.members} members',
                    style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 4.0,
                runSpacing: 4.0,
                children: List.generate(
                  group.members > 10 ? 10 : group.members,
                  (index) {
                    return Container(
                      width: 24.0,
                      height: 24.0,
                      decoration: BoxDecoration(
                        color: (index % 2 == 0)
                            ? Theme.of(context).colorScheme.secondary
                            : Theme.of(context).colorScheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          'A',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    );
                  },
                )..addAll(
                    group.members > 10
                        ? [
                            Container(
                              width: 24.0,
                              height: 24.0,
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.secondary,
                                shape: BoxShape.circle,
                              ),
                              child: const Center(
                                child: Icon(
                                  Icons.more_horiz_rounded,
                                  size: 14,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ]
                        : [],
                  ),
              ),
              if (isOwner)
                Padding(
                  padding: const EdgeInsets.fromLTRB(0, 12, 0, 0),
                  child: GestureDetector(
                    onTap: () {
                      print('Modify clicked');
                    },
                    child: Text(
                      'Modify group members?',
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.w500,
                        fontSize: 14.0,
                      ),
                    ),
                  ),
                ),
              const SizedBox(height: 12),
              if (groupDetails.isPublic) ...[
                Text(
                  'Telegram Link ',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                GestureDetector(
                  onTap: () async {
                    final url = Uri.parse(groupDetails.telegramLink);
                    if (await canLaunchUrl(url)) {
                      await launchUrl(url);
                    } else {
                      throw 'The link is not correct. Add some validation check for the link: $url';
                    }
                  },
                  child: Text(
                    groupDetails.telegramLink,
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.secondary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                const SizedBox(height: 12),
              ],
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  CustomTextButton(
                    label: 'Close',
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
