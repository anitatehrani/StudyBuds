import { Request, Response } from 'express';
import axios from 'axios';
import { exec } from 'child_process';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Dynamically generate the token
        const token = await new Promise<string>((resolve, reject) => {
            exec('docker-compose run --rm unigeapi python -m main', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error generating token:', error);
                    reject('Failed to generate token');
                } else if (stderr) {
                    console.error('Error output during token generation:', stderr);
                    reject(stderr);
                } else {
                    resolve(stdout.trim());
                }
            });
        });

        // Step 2: Fetch courses from the external API using the token
        const response = await axios.get('http://127.0.0.1:8000/courses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const courses = response.data;

        res.status(200).json({
            message: 'Courses retrieved successfully',
            courses,
        });
    } catch (error) {
        console.error('Error fetching courses:', error);

        res.status(500).json({
            message: 'Failed to fetch courses',
            error: error.response ? error.response.data : error.message,
        });
    }
};
