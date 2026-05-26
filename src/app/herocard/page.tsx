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
import DeleteButton from "@/components/delete-button";

export default async function editHomePage() {
  const heroCards = await getAllHeroCards();
  function deletion(id: number) {
    console.log(`Deleting entry #${id}`)
  }
  return (
    <>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
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
                <TableCell>{item.id}</TableCell>
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
                    <DeleteButton HeroCardId={item.id} />
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