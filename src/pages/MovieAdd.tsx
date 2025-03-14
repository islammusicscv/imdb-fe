import {useEffect, useState} from "react";
import api from "../api/axios.ts";

const MovieAdd = () => {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[releaseDate, setReleaseDate] = useState('');
    const[genreId, setGenreId] = useState('');
    const[genres,setGenres] = useState('');
    const[rating, setRating] = useState('');

    useEffect(() => {
        //grem v backend po vse zanre
        const url = "/genres"
        try {
            const data = await api.get(url)
            if (data.status === 200) {
                setGenres(data.data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [])


    const submit = () => {

    }


    return (
        <>
            <div className="container">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <div className="form-label">Title</div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Vstavi ime"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">description</div>
                        <textarea
                            className="form-control"
                            placeholder="Vstavi opis"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Release date</div>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Vstavi datum izzida"
                            onChange={(e) => setReleaseDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Rating movie</div>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Vstavi oceno filma"
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Genres</div>

                    </div>
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </form>
            </div>
        </>
)
}
export default MovieAdd