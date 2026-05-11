import "./edit-page.css"

export default function editPage({title}) {
    return (
        <div className="edit-page">
            <h1>{title}</h1>
            <input type="text" name="title" id="title-input" />
            <input type="file" name="image-input" id="image-input" className="image-input"/>
        </div>
    )
}