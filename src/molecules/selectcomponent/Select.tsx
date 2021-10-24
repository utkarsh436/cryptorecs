import React, {useState} from "react";
import {Select} from "@material-ui/core";

interface OptionProps{

}

type SelectOption = {
    label: string
    value: string
}
interface SelectDropDownProps {
    options: OptionProps[]
    defaultText: string
}
function SelectDropDown(props: SelectDropDownProps) {
    const {options, defaultText} = props;
    const [value, setvalue] = useState("")



        const [selectOption, setSelectedOption] = useState({
        label: defaultText,
        value:""
    })
    const isSelectOption = (v: any): v is SelectOption => {
        if((v as SelectOption).value !== undefined) return v.value
        return false
    }
    const handleClickedItem = (label: string, value: string) => {

    }

    return (
        <div>
            <Select
                // options={options}
                onChange={(v) => {
                    if(isSelectOption(v)) {
                        setvalue(v.value)
                    }
                }}
            />


        </div>
    )


}