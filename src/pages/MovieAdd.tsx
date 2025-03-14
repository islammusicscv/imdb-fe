import {useEffect, useState} from "react";
import api from "../api/axios.ts";
import * as React from "react";
import {Navigate} from "react-router-dom";

const MovieAdd = () => {
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[releaseDate, setReleaseDate] = useState('');
    const[genreId, setGenreId] = useState('');
    const[genres,setGenres] = useState([]);
    const[rating, setRating] = useState('');
    const[redirect, setRedirect] = useState(false);

    useEffect(() => {
        //grem v backend po vse zanre
        const fetchGenres = async () => {
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
        }
        fetchGenres()
    }, [])


    const submit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            title,
            description,
            release_date: releaseDate,
            genre: {
                id: genreId,
            },
            rating: parseInt(rating),
        }

        try {
            const url = '/movies'
            const res = await api.post(url, data)
            if (res.status === 201) {
                //redirect
                setRedirect(true)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    if (redirect) {
        return <Navigate to="/movies" />
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
                        <select
                            className="form-control"
                            onChange={(e) => setGenreId(e.target.value)}
                        >
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </form>
            </div>
        </>
)
}
export default MovieAdd