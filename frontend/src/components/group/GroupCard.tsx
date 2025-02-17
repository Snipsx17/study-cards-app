import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export const GroupCard = ({ name }: { name: string }) => {
  return (
    <Card className="w-[350px] flex flex-col hover:bg-purple/5">
      <CardHeader className="flex-1">
        <CardTitle className="capitalize text-center line-clamp-2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex gap-3">
        <Button className="bg-purple flex-1 hover:bg-purple/80" size={"lg"}>
          Open
        </Button>
        <Button variant="destructive" className="flex-1" size={"lg"}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
