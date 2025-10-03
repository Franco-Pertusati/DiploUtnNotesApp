import Card from "@/app/components/ui/card/card";
import CardFooter from "@/app/components/ui/card/card-footer/card-footer";
import CardHeader from "@/app/components/ui/card/card-header/card-header";

const DsCards = () => {
  return (
    <section>
      <h2 className="text-xl mb-2">Cards</h2>
      <div className="flex gap-3">
        <Card variant="flat" classList="grow">
          <CardHeader>Card part</CardHeader>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            error soluta iure necessitatibus recusandae harum, ad totam tenetur
            ducimus nihil, illo qui eveniet. Dignissimos, voluptates. Dolore
            quod doloribus cupiditate amet?
          </div>
          <CardFooter>Card part</CardFooter>
        </Card>
        <Card variant="shadow" classList="grow">
          <CardHeader>Card part</CardHeader>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            error soluta iure necessitatibus recusandae harum, ad totam tenetur
            ducimus nihil, illo qui eveniet. Dignissimos, voluptates. Dolore
            quod doloribus cupiditate amet?
          </div>
          <CardFooter>Card part</CardFooter>
        </Card>
        <Card variant="gradient" classList="grow">
          <CardHeader>Card part</CardHeader>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            error soluta iure necessitatibus recusandae harum, ad totam tenetur
            ducimus nihil, illo qui eveniet. Dignissimos, voluptates. Dolore
            quod doloribus cupiditate amet?
          </div>
          <CardFooter>Card part</CardFooter>
        </Card>
        <Card variant="negative" classList="grow">
          <CardHeader>Card part</CardHeader>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            error soluta iure necessitatibus recusandae harum, ad totam tenetur
            ducimus nihil, illo qui eveniet. Dignissimos, voluptates. Dolore
            quod doloribus cupiditate amet?
          </div>
          <CardFooter>Card part</CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default DsCards;
