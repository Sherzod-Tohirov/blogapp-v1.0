
export const SettingsPostList = ({children}) => {
  return (
    <>
        <ul className="list-none flex flex-col gap-3 pr-4 w-full max-h-[80%] overflow-auto">
            {children}
        </ul>
    </>
  )
}
