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


export default async function editHomePage({ pageId }: { pageId: string }) {
  const heroCards = await getAllHeroCards();
  return (
    <>
      <div className="mx-auto w-full max-w-225">
        <Table>
          <TableCaption>A list of the front page cards.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Title</TableHead>
              <TableHead>Image Path</TableHead>
              <TableHead>Color of the card</TableHead>
              <TableHead className="text-right">Link to the article</TableHead>
            </TableRow>
          </TableHeader>
          {heroCards.map((item, index) => (
            <TableBody key={`table-${index}`}>
              <TableRow>
                <TableCell className="font-medium"><Link href={`herocard/${pageId}/edit`}>{item.title_text}</Link></TableCell>
                <TableCell>{item.image_path}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.link}</TableCell>
                <Button><RiPencilLine/></Button>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </>
  );
}
