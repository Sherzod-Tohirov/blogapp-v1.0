import notfound from "../../../assets/images/not-found.webp";

export function NotFound() {
  return (
    <div
      className={"w-screen h-screen flex flex-col items-center overflow-hidden"}
    >
      <img src={notfound} width={400} />
      <p className={"text-red-300 text-4xl tracking-wide"}>
        Sorry, page not found !
      </p>
    </div>
  );
}
