import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const GroupCard = ({ name }: { name: string }) => {
  return (
    <Card className="md:w-[250px] lg:w-[350px] flex flex-col hover:bg-purple/5">
      <CardHeader className="flex-1">
        <CardTitle className="capitalize text-center line-clamp-2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col md:flex-row  gap-3">
        <Button
          className="bg-purple w-full  md:flex-1 hover:bg-purple/80"
          size={"lg"}
        >
          Open
        </Button>
        <Button variant="destructive" className="w-full md:flex-1" size={"lg"}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
