import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import useJournals from "../hook/useJournals";

import styles from "./journal.module.css";
import EditableContent from "../UI/Editable";

type Props = {
  date: string;
};

const JournalComponent = (props: Props) => {
  const { getJournalByDay } = useJournals();
  const [md, setMd] = useState("");
  const editableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMd(getJournalByDay(props.date)?.md || "");
  }, [props.date]);

  return (
    <div className={styles.mydaily_journal_container}>
      <EditableContent
        showSavedMessage={false}
        disabled={true}
        editableRef={editableRef}
        handleOnChange={() => {}}
        handleSave={() => {}}
        md={md}
      />
    </div>
  );
};

export default JournalComponent;
