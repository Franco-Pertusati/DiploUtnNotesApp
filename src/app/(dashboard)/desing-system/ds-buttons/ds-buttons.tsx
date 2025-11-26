import Button from "@/app/components/ui/buttons/button/button";
import Card from "@/app/components/ui/card/card";

const DsButtons = () => {
  return (
    <section>
      <h2 className="text-xl mb-2">Buttons</h2>
      <div className="flex gap-3">
        <Card>
          <div className="flex flex-col gap-2 p-2">
            <h3>CTA Buttons</h3>
            <div className="flex gap-2 wrap">
              <Button variant="cta" label="Button" icon="add" />
              <Button variant="cta" label="Button" />
              <Button variant="cta" icon="add" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2 p-2">
            <h3>Outlined Buttons</h3>
            <div className="flex gap-2 wrap">
              <Button variant="outlined" label="Button" icon="add" />
              <Button variant="outlined" label="Button" />
              <Button variant="outlined" icon="add" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2 p-2">
            <h3>Secondary Buttons</h3>
            <div className="flex gap-2 wrap">
              <Button variant="secondary" label="Button" icon="add" />
              <Button variant="secondary" label="Button" />
              <Button variant="secondary" icon="add" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-2 p-2">
            <h3>Text Buttons</h3>
            <div className="flex gap-2 wrap">
              <Button variant="text" label="Button" icon="add" />
              <Button variant="text" label="Button" />
              <Button variant="text" icon="add" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DsButtons;
