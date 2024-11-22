import 'package:flutter/material.dart';
import '../models/group.dart';

class GroupCard extends StatelessWidget {
  final Group group;
  GroupCard({required this.group});
  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      elevation: 2,
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children:[
                    Text(
                    group.name,
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    )
                    ),
                    Icon(group.isPublic ? Icons.lock_open : Icons.lock)]
                  ),
                Row(
                  children: [
                    Icon(Icons.group),
                    SizedBox(width: 4),
                    Text('${group.members} members'),
                  ],
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(
              group.description,
              style: TextStyle(fontSize: 14, color: Colors.grey[700]),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: ElevatedButton(
                onPressed: () {
                  // Handle button action
                },
                child: Text(group.isPublic ? 'Send a join request' : 'Join'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
