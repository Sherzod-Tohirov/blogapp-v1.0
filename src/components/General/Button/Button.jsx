export const Button = ({children, type, stylex, ...props}) => {
  const generalStyles = "flex items-center gap-2 px-5 py-3 text-white font-medium rounded-md active:scale-95 transition";
  const dangerButtonStyles = "bg-red-500";
  const infoButtonStyles = "bg-teal-500";
  return (
    <button className={`${generalStyles}`+ " " +`${type === 'danger' ? dangerButtonStyles : infoButtonStyles} + " " + ${stylex || ""}`} {...props}>{children}</button>
  )
}
