import React, { useEffect, useState } from 'react'

import styles from './editable.module.css';
import { useKey } from '../../hook/useKey';

type Props = {
    showSavedMessage: boolean,
    handleOnChange: (event: any) => void
    md: string,
    editableRef: React.MutableRefObject<HTMLDivElement | null>,
    handleSave: () => void,
    disabled?: boolean,
}

const EditableContent = ({ handleOnChange, md, handleSave, editableRef, showSavedMessage,disabled = false }: Props) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [count, setCount] = useState(0);

    const [showWrapperAction, setShowWrapperAction] = useState(false)

    const handleWrappSelection = (tag: any, className = "", color = "", background = "") => {
        try {
            const wrapperElement: HTMLElement = document.createElement(tag)

            wrapperElement.className = className;
            if (color) {
                wrapperElement.style.color = color;
                wrapperElement.style.background = background ? background : "transparent";
            }
            const selection = document.getSelection();
            const parentElementTagName = selection?.anchorNode?.parentElement?.tagName;
            const parentOfparentElementTagName = selection?.anchorNode?.parentElement?.parentElement?.tagName;
            if (
                parentElementTagName !== tag ||
                (parentElementTagName === 'B' && tag === 'I') ||
                (parentElementTagName === 'I' && tag === 'B') ||
                parentOfparentElementTagName !== tag) {

                if (selection?.rangeCount) {
                    var range = selection?.getRangeAt(0).cloneRange();
                    range.surroundContents(wrapperElement);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        } catch (error) {
            console.log('Error Ocured when trying  wrapp element', error);
        }
        finally {
            console.log("set show wrapper action cakked to falses")
            setShowWrapperAction(false)
        }
    }

    const toggleEmoji = () => {
        setShowEmoji((prevS) => !prevS)
    }

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        toggleEmoji()
    }



    useEffect(() => {
        const handleSelect = (event: any) => {
            event?.preventDefault()
            const selection = document.getSelection();

            if (selection?.type === "Range" && selection.anchorNode && editableRef?.current?.contains(selection.anchorNode)) {
                setShowWrapperAction(true)
            } else {
                setShowWrapperAction(false)
            }
        }

        document.addEventListener('selectionchange', handleSelect);
        return () => {
            document.removeEventListener('selectionchange', handleSelect);
        }
    }, [])

    return (
        <>
            <EmojiPicker
                showBtns={showWrapperAction}
                handleWrappSelection={handleWrappSelection}
                handleCopy={handleCopy}
                showEmoji={showEmoji}
                toggleEmoji={toggleEmoji}
            />


            <button className={styles.btn} disabled={showSavedMessage} onClick={handleSave}>{showSavedMessage ? "saving ...": "save" }</button>

            <div
                ref={editableRef}
                className={styles.editable}
                spellCheck={false}
                contentEditable={!disabled}
                onBlur={handleOnChange}
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: md }}
            />
        </>
    );
};

export default EditableContent;


interface EmojiPickerProps {
    showEmoji: boolean,
    showBtns: boolean,
    handleCopy: (emoji: string) => void,
    toggleEmoji: () => void,
    handleWrappSelection: (tag: string, className?: string, color?: string, background?: string) => void
}
const EmojiPicker = ({ showEmoji, showBtns, handleCopy, toggleEmoji, handleWrappSelection }: EmojiPickerProps) => {
    const Imojis = [
        'l','o',
        '✔️', '🚀', '💵', '⚔️', '👌🏻', '🤌🏻', '🤲🏻', '👊🏻', '🤙🏻', '☝🏻', '👏🏻', '🏆', '🥇', '🥈', '🥉', '🏅', '🎬', '🎧',
        '✈️', '💰', '⏰', '⏱', '🔑', '🛒', '🛌', '📆', '🆚', '⛔️', '❌', '⭕️', '❗️', '❕', '❓', '❔', '‼️', '⁉️',
        '✅', '✳️', '❎', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣',
        '🔟', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '☑️', '🔘', '🔴', '🟠', '🟡',
        '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾️', '◽️', '◼️',
        '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '🏳️', '🏴', '🏁', '🚩', '🇩🇿', '🇦🇪', '🇬🇧', '🇶🇦', '🇫🇷'
    ]
    return (
        <div className={styles.emoji_picker_container}>

            {showEmoji ? (

                <ul>
                    {Imojis.map((car) => (
                        <li key={car} onClick={() => handleCopy(car)}>
                            {car}
                        </li>
                    ))}
                </ul>
            ) : (<button style={{ opacity: '0.3' }} onClick={toggleEmoji}>
                <img src="/icon/more-vertical.svg" />
            </button>)}
            {showBtns && (

                <ul className={styles.editor_palatte}>
                    <button onClick={() => handleWrappSelection('section')}>
                        [ ]
                    </button>
                    <button onClick={() => handleWrappSelection('span', '', '#222', 'white')} >
                        <strong>  A</strong>
                    </button>
                    <button onClick={() => handleWrappSelection('span')} >
                        ◻️
                    </button>
                    <button onClick={() => handleWrappSelection('span', 'red')} >
                        🟥
                    </button>
                    <button style={{ color: "#dd2e44" }} onClick={() => handleWrappSelection('span', '', '#dd2e44')} >
                        <strong>  A</strong>
                    </button>
                    <button onClick={() => handleWrappSelection('span', 'green')} >
                        🟩
                    </button>
                    <button style={{ color: '#78b159' }} onClick={() => handleWrappSelection('span', '', '#78b159')} >
                        <strong>  A</strong>
                    </button>
                    <button onClick={() => handleWrappSelection('span', 'orange')} >
                        🟧
                    </button>
                    <button style={{ color: '#f4900c' }} onClick={() => handleWrappSelection('span', '', '#f4900c')} >
                        <strong>  A</strong>
                    </button>
                    <button onClick={() => handleWrappSelection('span', 'blue')} >
                        🟦
                    </button>
                    <button style={{ color: '#55acee' }} onClick={() => handleWrappSelection('span', '', '#55acee')} >
                        <strong>  A</strong>
                    </button>
                </ul>
            )}

        </div>)
}