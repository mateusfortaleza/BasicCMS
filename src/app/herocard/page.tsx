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
import {RiPencilLine} from "@remixicon/react"


export default async function editHomePage() {
  const heroCards = await getAllHeroCards();
  return (
    <>
      <div className="w-full">
        <Table>
          <TableCaption>A list of the front page cards.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Title</TableHead>
              <TableHead>Image Path</TableHead>
              <TableHead>Color of the card</TableHead>
              <TableHead className="text-right">Link to the article</TableHead>
              <TableHead className="w-32 text-center" />
            </TableRow>
          </TableHeader>
          {heroCards.map((item, index) => (
            <TableBody key={`table-${index}`}>
              <TableRow>
                <TableCell className="font-medium">{item.title_text}</TableCell>
                <TableCell>{item.image_path}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.link}</TableCell>
                <TableCell className="w-32">
                  <div className="flex justify-center">
                    <Button asChild size="icon">
                      <Link href={`/herocard/edit/${item.id}`} aria-label={`Edit ${item.title_text}`}>
                        <RiPencilLine />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </>
  );
}
