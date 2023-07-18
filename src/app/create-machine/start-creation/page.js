export default function StartCreationPage() {
  return (
    <div>
      <h1 className="mb-[15px]">Création d&apos;une machine virtuelle</h1>
      <h1 className="title mb-[40px]">Selectionner une environnement</h1>
      <ul className="menu w-56 rounded-box bg-white shadow ml-6">
        <li>
          <a>Ubuntu</a>
        </li>
        <li>
          <a>CentOS</a>
        </li>
        <li>
          <a>Debian</a>
        </li>
      </ul>
    </div>
  );
}
