export default function PanelHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <>
      <h3 className="app-panel-header__title">{title}</h3>
      <span className="app-panel-header__desc">{desc}</span>
    </>
  );
}
