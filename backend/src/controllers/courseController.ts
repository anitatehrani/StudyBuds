import { Request, Response } from 'express';
import axios from 'axios';
import { exec } from 'child_process';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        // Step 1: Dynamically generate the token

        // Step 2: Fetch courses from the external API using the token
        const response = await axios.get(`${process.env.UNIGEAPI_URL}/courses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const courses = response.data;

        res.status(200).json({
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
