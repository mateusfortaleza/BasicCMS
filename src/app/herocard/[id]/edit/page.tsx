import EditPage from "../../../../edit-components/edit-page";
import { Field, FieldGroup } from "../../../../components/ui/field"

export default function HeroCardEditPage() {
    // get id from query string
    // get database record
    // populate form
    return (
        <>
            <FieldGroup className="w-full h-screen m-auto flex justify-center items-center">
                <EditPage title="Edit Page" />
            </FieldGroup>
        </>
    )
}