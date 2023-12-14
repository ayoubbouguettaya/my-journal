import { useEffect, useRef } from "react";

export function useKey(key: "ctrly" | "ctrls" , cb: (...arg: any) => void,editableRef: React.MutableRefObject<HTMLDivElement | null>) {
  
  const handleSave = (event:any ) => {
    event.preventDefault()
    event?.persist();
    const md = editableRef.current?.innerHTML || '';
    cb(md)
  }

  useEffect(() => {
    function handle(event: KeyboardEvent) {
        if (key === "ctrls" && event.key === "s" && event.ctrlKey) {
            handleSave(event)
            return;
        }

        if (key === "ctrly" && event.key === "y" && event.ctrlKey) {
            event.preventDefault()
            cb(event);
            return;
        }

        if (event.code === key) {
          cb(event);
        } 
        
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key,cb]);
}
