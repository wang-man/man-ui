import React, { FC, useState, useRef, ChangeEvent, KeyboardEvent, ReactElement, useEffect } from "react";
import classnames from 'classnames';
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOut from "../../hooks/useClickOutside";

export interface DataSourceObject {
  value: string;
  [key: string]: any
}
// export type DataSourceType<T = {}> = T & DataSourceObject;


interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceObject[] | Promise<DataSourceObject[]>;
  onSelect?: (item: DataSourceObject) => void
  renderOption?: (item: DataSourceObject, index: number) => ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = props => {
  const {
    fetchSuggestions,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props;

  const [suggestions, setSuggestions] = useState<DataSourceObject[]>([]);
  const [inputValue, setInputValue] = useState(value as string);
  const [uploading, setUploading] = useState(false);
  const [highLightIndex, setHighLightIndex] = useState(0);
  const triggerSearch = useRef(false);
  const autoCompleteRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 1000);
  useClickOut(autoCompleteRef, () => {
    setSuggestions([]);
  })

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        results.then(data => {
          setSuggestions(data);
          setUploading(false);
        })
      } else {
        setSuggestions(results || []);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true;
    setUploading(true);
    const value = e.target.value.trim();
    setInputValue(value);
  }

  const setIndex = (currentIndex: number) => {
    if (currentIndex < 0) {
      setHighLightIndex(0);
    } else if (currentIndex >= suggestions.length - 1) {
      setHighLightIndex(suggestions.length - 1);
    } else {
      setHighLightIndex(currentIndex);
    }
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:   // 回车
        suggestions[highLightIndex] && handleSelect(suggestions[highLightIndex], highLightIndex);
        break;
      case 38:   // 向上
        setIndex(highLightIndex - 1);
        break;
      case 40:  // 向下
        setIndex(highLightIndex + 1);
        break;
      case 27:  // Esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  }

  // 选择某一项时触发事件
  const handleSelect = (item: DataSourceObject, index: number) => {
    triggerSearch.current = false;
    setSuggestions([]);
    onSelect?.(item)
    setInputValue(item.value);
  }

  const renderTemplate = (item: DataSourceObject, index: number) => {
    return renderOption ? renderOption(item, index) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul>
        {
          suggestions.map((item, index) => {
            const itemClasses = classnames('suggestion-item', { 'hightLight-item': index === highLightIndex })
            return <li key={index} onClick={() => handleSelect(item, index)} className={itemClasses}>
              {renderTemplate(item, index)}
            </li>
          })
        }
      </ul>
    )
  }

  return (
    <div className='man-autoComplete' ref={autoCompleteRef}>
      <Input onChange={handleChange} value={inputValue} onKeyDown={handleKeyDown} />

      {uploading && <Icon icon='spinner' spin={true} />}
      {suggestions.length > 0 && generateDropdown()}

    </div>
  )
}

export default AutoComplete;