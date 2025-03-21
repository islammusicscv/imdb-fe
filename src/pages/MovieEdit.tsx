import {useEffect, useState} from "react";
import api from "../api/axios.ts";
import * as React from "react";
import {Navigate, useParams} from "react-router-dom";

const MovieEdit = () => {
    const { id }  = useParams<{id: string}>();

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[releaseDate, setReleaseDate] = useState('');
    const[genreId, setGenreId] = useState('');
    const[genres,setGenres] = useState<{id:number; title:string}[]>([]);
    const[rating, setRating] = useState('');
    const[redirect, setRedirect] = useState(false);

    useEffect(() => {
        //pridobim podatke o filmu, ki ga urejam
        const fetchMovie = async () => {
            const url = `/movies/${id}`
            try {
                const data = await api.get(url)
                if (data.status === 200) {
                    console.log(data.data);
                    const movie = data.data
                    setTitle(movie.title)
                    setDescription(movie.description)
                    setReleaseDate(movie.release_date)
                    setGenreId(movie.genre.id)
                    setRating(movie.rating)
                }
            }
            catch (e) {
                console.log(e);
            }
        }

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
        fetchMovie()
    }, [id])


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
            const url = `/movies/${id}`
            const res = await api.patch(url, data)
            if (res.status === 200) {
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">description</div>
                        <textarea
                            className="form-control"
                            placeholder="Vstavi opis"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Release date</div>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Vstavi datum izzida"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Rating movie</div>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Vstavi oceno filma"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-label">Genres</div>
                        <select
                            className="form-control"
                            value={genreId}
                            onChange={(e) => setGenreId(e.target.value)}
                        >
                            <option>Izberi žanr ...</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Shrani</button>
                </form>
            </div>
        </>
    )
}
export default MovieEdit