import { getProfileService } from '../service/profile_service';


export const getProfileById = async (req, res) => {
    try {
        console.log(req.params.id);
        
        // if (isNaN(studentId)) {
        //     res.status(400).json({ message: 'Invalid student ID' });
        //     return;
        // }
        const result = await getProfileService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

