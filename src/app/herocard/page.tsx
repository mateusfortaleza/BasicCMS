import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllHeroCards } from "../../dal/HeroCardDAO";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RiAddLargeLine,
  RiDeleteBinLine,
  RiPencilLine,
} from "@remixicon/react";

/**
 * Render the hero cards management UI: a table of hero cards with edit and delete actions and a create button.
 *
 * Fetches all hero cards and renders a table showing each card's title, image path (truncated to 100 characters with an ellipsis when longer), color, and link, with icon buttons to edit or delete each card and a sticky button to create a new card.
 *
 * @returns A JSX element containing the edit/home management interface for hero cards.
 */
export default async function editHomePage() {
  const heroCards = await getAllHeroCards();
  return (
    <>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Title</TableHead>
              <TableHead>Image Path</TableHead>
              <TableHead>Color of the card</TableHead>
              <TableHead className="text-left">Link to the article</TableHead>
              <TableHead className="w-32 text-center" />
            </TableRow>
          </TableHeader>
          {heroCards.map((item, index) => (
            <TableBody key={`table-${index}`}>
              <TableRow>
                <TableCell className="font-medium">{item.title_text}</TableCell>
                <TableCell className="">{item.image_path.length > 100 ? item.image_path.slice(0, 100) + "..." : item.image_path}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell className="text-left">{item.link}</TableCell>
                <TableCell className="w-32">
                  <div className="flex justify-center">
                    <Button asChild size="icon">
                      <Link
                        href={`/herocard/edit/${item.id}`}
                        aria-label={`Edit ${item.title_text}`}
                      > 
                        <RiPencilLine />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Button
                      asChild
                      size="icon"
                      className="bg-red-500 hover:bg-red-800"
                    >
                      <Link
                        href={`/herocard/edit/${item.id}`}
                        aria-label={`Edit ${item.title_text}`}
                      >
                        <RiDeleteBinLine />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        <Link href="/herocard/create">
          <Button className="sticky" type="button" size="icon">
            <RiAddLargeLine color="rgba(0,255,100,1)" />
          </Button>
        </Link>
      </div>
    </>
  );
}
