import {useEffect, useState} from "react";
import axios from "axios";
import Card from "../commponents/Card.tsx";
import api from "../api/axios.ts";

const Movies = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [movies, setMovies] = useState([])
    const url = "movies"

    const loadMovies = async () => {
        try {
            const res = await api.get(url)
            if (res.status === 200) {
                console.log(res.data)
                setMovies(res.data)
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response ) {
                setErrorMessage(error.response.data.message)
            }
        }
    }

    useEffect( () => {
        loadMovies()
    }, [])

    return (
        <>
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            {
                                movies.map((movie, i) => {
                                    return <Card key={i} data={movie} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Movies