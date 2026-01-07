/* eslint-disable jsx-a11y/anchor-is-valid */
import Select from "react-select";

const customFilterOption = (option: any, rawInput: any) => {
    const label = option.data?.title || option.data?.label || option.data?.name;
    const input = rawInput.toLowerCase();
    const text = label?.toLowerCase() || "";
    return text.includes(input);
};

const CustomSelectWhite = (props: any) => {
    return (
        <>
            <Select
                className={props.className}
                closeMenuOnSelect={props.closeMenuOnSelect}
                hideSelectedOptions={props.hideSelectedOptions}
                defaultValue={props.defaultValue}
                options={props.options}
                isSearchable={props.isSearchable}
                getOptionLabel={props.getOptionLabel}
                isClearable={props.isClearable}
                isLoading={props.loading}
                menuPosition={props.menuPosition || "fixed"}
                filterOption={props.filterOption || customFilterOption}
                styles={{
                    placeholder: (base) => ({
                        ...base,
                        fontSize: props?.placeholderFontSize ? props?.placeholderFontSize : "1.15rem",
                        fontWeight: "500",
                        color: props.placeholderColor ? props.placeholderColor : "#9f9e9e",
                    }),
                    option: (base, {isSelected, isFocused}) => ({
                        ...base,
                        border: `0.5px solid #f9f9f9`,
                        margin: "0px",
                        backgroundColor: (isSelected && "") || (isFocused && "#f1faff") || "white",
                        padding: "1rem 1.25rem",
                        ":active": {
                            ...base[":active"],
                            color: "#1b74e4",
                            background: "#f1faff",
                        },
                        ":hover": {
                            ...base[":active"],
                            color: "#1b74e4",
                            background: "#f1faff",
                        },
                        color: "#5e6278",
                        fontSize: "16px",
                        fontWeight: "600",
                    }),
                    control: (base, state) => ({
                        ...base,
                        // border: `0.5px solid #e0e0df`,
                        border: props.border ? "0.5px solid " + props.border : "0.5px solid #e0e0df",
                        background: props?.bgColor || props?.backgroundColor || "#ffff",
                        boxShadow: "none",
                        minHeight: props.minHeight ? props.minHeight : props.isMulti ? "60px" : "45px",
                        height: props.isMulti ? "auto" : props.height ? props.height : "52px",
                        borderRadius: "8px",
                        padding: "5px 20.4px 6.5px 10px",
                        fontSize: props.controlFontSize ? props.controlFontSize : "16px",
                        fontWeight: props.fontWeight ? props.fontWeight : "600",
                        ":hover": {
                            ...base[":active"],
                            border: props.border ? "0.5px solid " + props.border : "0.5px solid #e0e0df",
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        flexWrap: props.isMulti ? "wrap" : "nowrap",
                        padding: props.isMulti ? "2px 4px" : "2px 8px",
                        gap: props.isMulti ? "4px" : "0",
                    }),
                    input: (base) => ({
                        ...base,
                        margin: props.isMulti ? "2px" : "0",
                        paddingBottom: props.isMulti ? "2px" : "0",
                        paddingTop: props.isMulti ? "2px" : "0",
                    }),
                    multiValue: (base) => {
                        return {
                            ...base,
                            fontSize: "16px",
                            fontWeight: "600",
                            borderRadius: "6px",
                            backgroundColor: "#e7f1fd",
                            padding: "8px 8px 8px 10px",
                            color: "#1a1a1a",
                        };
                    },
                    menu: (base) => ({
                        ...base,
                        maxHeight: props.menuMaxHeight || props.maxHeight || "300px",
                        overflowY: "auto",
                    }),
                    indicatorSeparator: (base) => ({
                        ...base,
                        background: "#f9f9f9",
                    }),
                    indicatorsContainer: (base) => ({
                        ...base,
                        color: "#f9f9f9",
                        strokeWidth: "5px",
                    }),
                    multiValueRemove: (base, {data}) => ({
                        ...base,
                        fontSize: "16px",
                        fontWeight: "600",
                        svg: {
                            width: "20px",
                            height: "20px",
                            color: "#7c7c7c",
                        },
                        ":hover": {
                            backgroundColor: "#e7f1fd",
                        },
                    }),
                }}
                isDisabled={props.isDisabled ? props.isDisabled : false}
                onChange={props.onChange}
                // menuIsOpen={true}
                onMenuScrollToBottom={props.onMenuScrollToBottom}
                isMulti={props.isMulti}
                value={props.value}
                placeholder={props.placeholder}
                onKeyDown={props.onKeyDown || props.handleKeyDown}
            />
        </>
    );
};
export {CustomSelectWhite};
