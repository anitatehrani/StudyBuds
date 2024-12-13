import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:study_buds/widgets/custom_text_button.dart';

import '../models/group.dart';

class GroupDetailsDialog extends StatelessWidget {
  final Group group;
  final bool isOwner;

  const GroupDetailsDialog(
      {super.key, required this.group, this.isOwner = false});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: [
                Text(
                  group.name,
                  style: TextStyle(
                      color: Theme.of(context).primaryColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0),
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
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Text(
                group.course,
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontWeight: FontWeight.w500,
                  fontSize: 16.0,
                ),
              ),
            ),
            SizedBox(
              height: 8,
            ),
            Text(
              'Description',
              style: TextStyle(
                color: Theme.of(context).primaryColor,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: 4,
            ),
            Text(
              group.description,
              style: TextStyle(
                color: Theme.of(context).primaryColor,
              ),
            ),
            SizedBox(
              height: 12,
            ),
            Row(
              children: [
                Text(
                  'Group Members ',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(
                  width: 8,
                ),
                Text(
                  '• ${group.members} members',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 8,
            ),
            Row(
              children: [
                Expanded(
                  flex: 3,
                  child: Wrap(
                    spacing: 1.0,
                    runSpacing: 4.0,
                    children: List.generate(
                        group.members > 10 ? 10 : group.members, (index) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4.0),
                        child: Container(
                          width: 21.0,
                          height: 21.0,
                          decoration: BoxDecoration(
                            color: (index % 2 == 0)
                                ? Theme.of(context).colorScheme.secondary
                                : Theme.of(context).colorScheme.primary,
                            shape: BoxShape.circle,
                          ),
                          child: Center(
                            child: Text(
                              'A',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 12.0,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      );
                    })
                      ..add(group.members > 10
                          ? Padding(
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 4.0),
                              child: Container(
                                width: 21.0,
                                height: 21.0,
                                decoration: BoxDecoration(
                                  color:
                                      Theme.of(context).colorScheme.secondary,
                                  shape: BoxShape.circle,
                                ),
                                child: Center(
                                  child: Icon(
                                    Icons.more_horiz_rounded,
                                    size: 14,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            )
                          : Spacer()),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Spacer(),
                ),
              ],
            ),
            if (isOwner)
              Padding(
                padding: const EdgeInsets.fromLTRB(0, 12, 0, 0),
                child: GestureDetector(
                  onTap: () {
                    //todo open modify members page
                    print('modify clicked');
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
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                CustomTextButton(
                    label: 'Close',
                    onPressed: () {
                      Navigator.pop(context);
                    }),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
