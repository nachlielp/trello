import { DownOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState, useEffect, useRef } from "react";

export function CustomSelect({ options = [], onSelect,currentSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(options);
  const divRef = useRef(null);
  useEffect(()=>{
    onSelect(options.find(o=>o.id===currentSelect))
  },[currentSelect])
  
  useEffect(() => {

    setFilteredItems(options);
    if (options.length > 0) {
      setSelectedItem(options[0]);
    }
    
    if(currentSelect){
    setSelectedItem(options.find(o=>o.id===currentSelect))
    }
  }, [options]);
  

  function onInput(e) {
    setSearchValue(e.target.value);
  
  }

  function onSelectOption(item) {
   
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  }


  return (
    <Popover
      trigger="click"
      placement="bottomLeft"
      open={isOpen}
      onOpenChange={setIsOpen}
      arrow={false}
      content={
        <div
          className="options"
          style={{ width: `${divRef.current?.clientWidth}px` }}
        >
          {filteredItems.map((item) => (
            <button
              key={item?.id}
              onClick={()=>onSelectOption(item)}
              className={selectedItem?.name === item?.name ? "selected" : ""}
            >
              {item?.name}
            </button>
          ))}
        </div>
      }
    >
      <div
        className="custom-select-item"
        onClick={() => setIsOpen(!isOpen)}
        ref={divRef}
      >
        <input
          className=""
          placeholder={selectedItem?.name || options[0]?.name}
          value={searchValue}
          onChange={onInput}
        />
        <DownOutlined className="arrow-down" />
      </div>
    </Popover>
  );
}
