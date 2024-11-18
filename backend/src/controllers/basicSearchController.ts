import { basicSearch } from '../service/basic_search_service';

export const basicSearchResult = async (req,res)=>{
    try {
        const result = await basicSearch(req.params.text, req.params.student_id);
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};



