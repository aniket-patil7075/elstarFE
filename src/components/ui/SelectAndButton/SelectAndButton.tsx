// import { forwardRef, Ref } from "react";
// import classNames from "classnames";
// import ReactSelect, { components } from "react-select";
// import CreatableSelect from "react-select/creatable";
// import AsyncSelect from "react-select/async";
// import tw, { theme } from "twin.macro";
// import isEmpty from "lodash/isEmpty";
// import get from "lodash/get";
// import { useConfig } from "../ConfigProvider";
// import { useForm } from "../Form/context";
// import { useInputGroup } from "../InputGroup/context";
// import { HiCheck, HiChevronDown, HiPlusCircle, HiX } from "react-icons/hi";
// import Spinner from "../Spinner/Spinner";
// import { CONTROL_SIZES } from "../utils/constants";
// import type { CommonProps, TypeAttributes } from "../@types/common";
// import type {
//   ControlProps,
//   Props as ReactSelectProps,
//   GroupBase,
// } from "react-select";
// import type { AsyncProps } from "react-select/async";
// import type { CreatableProps } from "react-select/creatable";
// import type { ForwardedRef } from "react";
// import Button from "../Button";

// interface DefaultOptionProps {
//   innerProps: JSX.IntrinsicElements["div"];
//   label: string;
//   selectProps: { themeColor?: string };
//   isSelected: boolean;
//   isDisabled: boolean;
//   isFocused: boolean;
// }

// // Custom Option Component
// const DefaultOption = ({
//   innerProps,
//   label,
//   selectProps,
//   isSelected,
//   isDisabled,
//   isFocused,
// }: DefaultOptionProps) => {
//   const { themeColor } = selectProps;
//   return (
//     <div
//       className={classNames(
//         "select-option",
//         isSelected && "selected",
//         isDisabled && "disabled",
//         isFocused && "focused"
//       )}
//       {...innerProps}
//     >
//       <span className="ml-2">{label}</span>
//       {isSelected && (
//         <HiCheck className={`text-${themeColor} dark:text-white text-xl`} />
//       )}
//     </div>
//   );
// };

// interface DefaultLoadingIndicatorProps {
//   selectProps: { themeColor?: string };
// }
// const DefaultLoadingIndicator = ({
//   selectProps,
// }: DefaultLoadingIndicatorProps) => {
//   const { themeColor } = selectProps;
//   return <Spinner className={`select-loading-indicatior text-${themeColor}`} />;
// };

// interface DefaultClearIndicatorProps {
//   innerProps: JSX.IntrinsicElements["div"];
//   ref: Ref<HTMLElement>;
// }

// const DefaultClearIndicator = ({
//   innerProps: { ref, ...restInnerProps },
// }: DefaultClearIndicatorProps) => {
//   return (
//     <div {...restInnerProps} ref={ref}>
//       <div className="select-clear-indicator">
//         <HiX />
//       </div>
//     </div>
//   );
// };

// const DefaultDropdownIndicator = () => {
//   return (
//     <div className="select-dropdown-indicator">
//       <HiChevronDown />
//     </div>
//   );
// };


// const CustomMenuList = (props: any) => {
//   const { addNewClick, addNewButtonLabel } = props;
//   return (
//     <>
//       <components.MenuList {...props}>
//         <Button
//           block
//           variant="plain"
//           className="add-new-customer mb-2"
//           onClick={addNewClick}
//         >
//           <HiPlusCircle className="h-4 w-4 addIcon" /> {addNewButtonLabel}
//         </Button>
//         {props.children}
//       </components.MenuList>
//     </>
//   );
// };

// export interface SelectProps<
//   Option,
//   IsMulti extends boolean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>,
// > extends CommonProps,
//     ReactSelectProps<Option, IsMulti, Group>,
//     AsyncProps<Option, IsMulti, Group>,
//     CreatableProps<Option, IsMulti, Group> {
//   size?: TypeAttributes.ControlSize;
//   field?: any;
//   form?: any;
//   addNewClick: any;
//   addNewButtonLabel: string;
//   componentAs?: ReactSelect | CreatableSelect | AsyncSelect;
// }

// function _Select<
//   Option,
//   IsMulti extends boolean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>,
// >(
//   props: SelectProps<Option, IsMulti, Group>,
//   ref: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>
// ) {
//   const {
//     size,
//     style,
//     className,
//     form,
//     field,
//     components,
//     addNewClick,
//     addNewButtonLabel,
//     componentAs: Component = ReactSelect,
//     ...rest
//   } = props;

//   const { themeColor, controlSize, primaryColorLevel, mode } = useConfig();
//   const formControlSize = useForm()?.size;
//   const inputGroupSize = useInputGroup()?.size;

//   const selectSize = size || inputGroupSize || formControlSize || controlSize;

//   const twColor: Record<string, string> = theme`colors`;
//   const twHeight = theme`height`;

//   let isInvalid = false;

//   if (!isEmpty(form)) {
//     const { touched, errors } = form;

//     const touchedField = get(touched, field.name);
//     const errorField = get(errors, field.name);

//     isInvalid = touchedField && errorField;
//   }

//   const getBoxShadow = (state: ControlProps<Option, IsMulti, Group>) => {
//     const shadaowBase = "0 0 0 1px ";

//     if (isInvalid) {
//       return shadaowBase + twColor.red["500"];
//     }

//     if (state.isFocused) {
//       return shadaowBase + twColor[themeColor][primaryColorLevel];
//     }

//     return "none";
//   };

//   const selectClass = classNames("select", `select-${selectSize}`, className);

//   return (
//     <Component<Option, IsMulti, Group>
//       ref={ref}
//       className={selectClass}
//       classNamePrefix={"select"}
//       styles={{
//         control: (provided, state) => {
//           return {
//             ...provided,
//             height: twHeight[CONTROL_SIZES[selectSize]],
//             minHeight: twHeight[CONTROL_SIZES[selectSize]],
//             "&:hover": {
//               boxShadow: getBoxShadow(state),
//               cursor: "pointer",
//             },
//             boxShadow: getBoxShadow(state),
//             borderRadius: tw`rounded-md`.borderRadius,
//             ...(isInvalid ? { borderColor: twColor.red["500"] } : {}),
//           };
//         },
//         input: (css) => ({
//           ...css,
//           input: {
//             outline: "none",
//             outlineOffset: 0,
//             boxShadow: "none !important",
//           },
//         }),
//         menu: (provided) => ({ ...provided, zIndex: 50 }),
//         ...style,
//       }}
//       theme={(theme) => ({
//         ...theme,
//         colors: {
//           ...theme.colors,
//           neutral20:
//             mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
//           neutral30:
//             mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
//           neutral80: twColor.gray["700"],
//           neutral10:
//             mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
//           primary25: twColor[themeColor]["50"],
//           primary50: twColor[themeColor]["100"],
//           primary: twColor[themeColor][primaryColorLevel],
//         },
//       })}
//       themeColor={`${themeColor}-${primaryColorLevel}`}
//       components={{
//         IndicatorSeparator: () => null,
//         Option: DefaultOption,
//         LoadingIndicator: DefaultLoadingIndicator,
//         DropdownIndicator: DefaultDropdownIndicator,
//         ClearIndicator: DefaultClearIndicator,
//         MenuList: (props) => (
//           <CustomMenuList
//             {...props}
//             addNewClick={addNewClick}
//             addNewButtonLabel={addNewButtonLabel}
//           />
//         ),
//         ...components,
//       }}
//       {...field}
//       {...rest}
//     />
//   );
// }

// const SelectAndButton = forwardRef(_Select) as <
//   Option,
//   IsMulti extends boolean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>,
// >(
//   props: SelectProps<Option, IsMulti, Group> & {
//     ref?: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>;
//   }
// ) => ReturnType<typeof _Select>;

// export default SelectAndButton;

import { forwardRef, Ref } from "react";
import classNames from "classnames";
import ReactSelect, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import tw, { theme } from "twin.macro";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { HiCheck, HiChevronDown, HiPlusCircle, HiX, HiPencil } from "react-icons/hi";
import Spinner from "../Spinner/Spinner";
import { CONTROL_SIZES } from "../utils/constants";
import type { CommonProps, TypeAttributes } from "../@types/common";
import type {
  ControlProps,
  Props as ReactSelectProps,
  GroupBase,
} from "react-select";
import type { AsyncProps } from "react-select/async";
import type { CreatableProps } from "react-select/creatable";
import type { ForwardedRef } from "react";
import Button from "../Button";

interface DefaultOptionProps {
  innerProps: JSX.IntrinsicElements["div"];
  label: string;
  selectProps: { themeColor?: string; onEditClick?: (label: string) => void };
  isSelected: boolean;
  isDisabled: boolean;
  isFocused: boolean;
}

// Custom Option Component
const DefaultOption = ({
  innerProps,
  label,
  selectProps,
  isSelected,
  isDisabled,
  isFocused,
}: DefaultOptionProps) => {
  const { themeColor, onEditClick } = selectProps;
  return (
    <div
      className={classNames(
        "select-option",
        isSelected && "selected",
        isDisabled && "disabled",
        isFocused && "focused"
      )}
      {...innerProps}
    >
      <span className="ml-2">{label}</span>
      {isSelected && <HiCheck className={`text-${themeColor} dark:text-white text-xl`} />}
      {onEditClick && (
        <HiPencil
          className="ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation(); // Prevents selection trigger
            onEditClick(label);
          }}
        />
      )}
    </div>
  );
};

const DefaultLoadingIndicator = ({ selectProps }: { selectProps: { themeColor?: string } }) => {
  return <Spinner className={`select-loading-indicator text-${selectProps.themeColor}`} />;
};

const DefaultClearIndicator = ({ innerProps: { ref, ...restInnerProps } }: { innerProps: JSX.IntrinsicElements["div"]; ref: Ref<HTMLElement>; }) => {
  return (
    <div {...restInnerProps} ref={ref}>
      <div className="select-clear-indicator">
        <HiX />
      </div>
    </div>
  );
};

const DefaultDropdownIndicator = () => (
  <div className="select-dropdown-indicator">
    <HiChevronDown />
  </div>
);

const CustomMenuList = (props: any) => {
  const { addNewClick, addNewButtonLabel } = props;
  return (
    <components.MenuList {...props}>
      <Button block variant="plain" className="add-new-customer mb-2" onClick={addNewClick}>
        <HiPlusCircle className="h-4 w-4 addIcon" /> {addNewButtonLabel}
      </Button>
      {props.children}
    </components.MenuList>
  );
};

export interface SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>
  extends CommonProps,
    ReactSelectProps<Option, IsMulti, Group>,
    AsyncProps<Option, IsMulti, Group>,
    CreatableProps<Option, IsMulti, Group> {
  size?: TypeAttributes.ControlSize;
  field?: any;
  form?: any;
  addNewClick: any;
  addNewButtonLabel: string;
  componentAs?: ReactSelect | CreatableSelect | AsyncSelect;
  onEditClick?: (label: string) => void;
}

function _Select<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group>,
  ref: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>
) {
  const { size, className, form, field, components, addNewClick, addNewButtonLabel, componentAs: Component = ReactSelect, onEditClick, ...rest } = props;

  return (
    <Component<Option, IsMulti, Group>
      ref={ref}
      className={classNames("select", className)}
      components={{
        IndicatorSeparator: () => null,
        Option: (props) => <DefaultOption {...props} selectProps={{ ...props.selectProps, onEditClick }} />,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        MenuList: (props) => <CustomMenuList {...props} addNewClick={addNewClick} addNewButtonLabel={addNewButtonLabel} />,
        ...components,
      }}
      {...field}
      {...rest}
    />
  );
}

const SelectAndButton = forwardRef(_Select) as <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: SelectProps<Option, IsMulti, Group> & { ref?: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect> }
) => ReturnType<typeof _Select>;

export default SelectAndButton;

