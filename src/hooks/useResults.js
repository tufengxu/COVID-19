import { useState, useEffect } from "react";
import jhcovid from '../api/jhcovid'


export default () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async () => { // async --> await
        setErrorMessage('No errors')
        try {
            const response = await jhcovid.get('/summary')//, {
                // params: {
                //     // limit: 50,
                //     // term: searchTerm, // Equivalent to term: term (key, value identical)
                //     // location: 'san jose'
                // }
                // });
            // console.log(response.data.Countries)
            setResults(response.data.Countries) // json object we want to store
        } catch (err) {
            console.log('')
            console.log(err)
            console.log('')
            setErrorMessage('Something went wrong ')
        }
    }

    // BAD CODE
    // searchApi('pasta');
    useEffect(() => {
        searchApi()
    }, [])
    return [searchApi, results, errorMessage];
};