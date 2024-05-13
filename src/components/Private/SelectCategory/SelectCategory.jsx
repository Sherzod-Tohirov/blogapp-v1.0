import { forwardRef } from "react";
import { CATEGORIES } from "../../../constants/CONSTANTS"

export const SelectCategory = forwardRef(({error, value}, ref) => {
        return (
          <>
            <select className="w-full p-4 border-2 pr-11 border-slate-300 shadow text-lg rounded-md appearance-none category-select" name="category" id="category" ref={ref}>
                        <option value="" hidden>Choose category</option>
                        {
                            CATEGORIES?.map(item => {
                                return (
                                    <option value={item?.title} key={item?.id} {...(value === item?.title && {selected: true})}>{item?.title}</option>
                                )
                            })
                        }
            </select>
            <span className={`absolute left-2 z-10 w-full text-red-500 ml-1 text-sm bottom-[-20px]`}>{error}</span>
          </>

        )
});


SelectCategory.displayName = "SelectCategoryComponent";