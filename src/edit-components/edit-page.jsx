import "./edit-page.css"
import { insertion } from "../dal/InsertDAO";

export default function editPage({title}) {
    

    return (
        <div className="edit-page">
            <h1>{title}</h1>

            <label for="title-input">Title: </label>
            <input type="text" name="title" id="title-input" />

            <label for="image-input">Image: </label>
            <input type="file" name="image-input" id="image-input" className="image-input"/>

            <label for="color-input">Background Color: </label>
            <input type="color" name="color-input" id="color-input" />

        </div>
    )
}