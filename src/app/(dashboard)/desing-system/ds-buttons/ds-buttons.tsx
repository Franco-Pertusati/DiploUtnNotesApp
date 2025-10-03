import Button from "@/app/components/ui/buttons/button/button";

const DsButtons = () => {
  return (
    <section>
      <h2 className="text-xl mb-2">Buttons</h2>
      <div className="flex gap-3">
        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-xl grow">
          <h3>CTA Buttons</h3>
          <div className="flex gap-2 wrap">
            <Button variant="cta" label="Button" icon="add" />
            <Button variant="cta" label="Button" />
            <Button variant="cta" icon="add" />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-xl grow">
          <h3>Outlined Buttons</h3>
          <div className="flex gap-2 wrap">
            <Button variant="ghost" label="Button" icon="add" />
            <Button variant="ghost" label="Button" />
            <Button variant="ghost" icon="add" />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-xl grow">
          <h3>Secondary Buttons</h3>
          <div className="flex gap-2 wrap">
            <Button variant="secondary" label="Button" icon="add" />
            <Button variant="secondary" label="Button" />
            <Button variant="secondary" icon="add" />
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-neutral p-4 rounded-xl grow">
          <h3>Text Buttons</h3>
          <div className="flex gap-2 wrap">
            <Button variant="text" label="Button" icon="add" />
            <Button variant="text" label="Button" />
            <Button variant="text" icon="add" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DsButtons;
